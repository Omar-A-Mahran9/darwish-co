#!/usr/bin/env bash
# Deploys one commit of main to the production server.
#
# Run over SSH by .github/workflows/deploy.yml, or by hand on the server:
#   bash scripts/deploy.sh <commit>
#
# The live checkout keeps serving while the commit is built in a separate
# worktree. Only a build that completes and answers HTTP on a spare port is
# swapped in, and the app is restarted only then. If the restarted app fails its
# health check, the previous build and commit are put back and the deploy fails.
#
# Server-only files in the live checkout (.env, untracked notes, backups) are
# never touched: the checkout only ever fast-forwards.

set -euo pipefail

APP_DIR=/var/www/darwish-co
APP_NAME=darwish-co
BUILD_DIR=/var/www/darwish-co-build
SMOKE_PORT=3101
PUBLIC_HOST=darwish-co.com
LOCK_FILE=/var/lock/darwish-co-deploy.lock

SHA=${1:?usage: deploy.sh <commit>}

log() { printf '\n==> %s\n' "$*"; }
die() { printf '\n!!! %s\n' "$*" >&2; exit 1; }

# Waits up to 60s for a URL to answer 200. Extra curl options go after the URL.
wait_for_200() {
  local url=$1 code=000; shift
  for _ in $(seq 1 30); do
    code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "$@" "$url" || true)
    [ "$code" = 200 ] && { echo "$url answered 200"; return 0; }
    sleep 2
  done
  echo "$url answered $code" >&2
  return 1
}

# Prints "<status> <restart count>" for the PM2 app.
pm2_state() {
  pm2 jlist | node -e '
    let s = ""; process.stdin.on("data", (d) => (s += d)).on("end", () => {
      const app = JSON.parse(s).find((p) => p.name === process.argv[1]);
      console.log(app ? `${app.pm2_env.status} ${app.pm2_env.restart_time}` : "missing 0");
    });' "$APP_NAME"
}

# Restarts the app and confirms it stays online and serves pages, both directly
# and through nginx.
restart_and_check() {
  pm2 restart "$APP_NAME" >/dev/null
  sleep 8
  local state restarts
  state=$(pm2_state); echo "pm2: $state"
  restarts=${state#* }
  [ "${state%% *}" = online ] || return 1
  wait_for_200 "http://127.0.0.1:$LIVE_PORT/" || return 1
  wait_for_200 "https://$PUBLIC_HOST/" --resolve "$PUBLIC_HOST:443:127.0.0.1" || return 1
  # A crash loop shows up as a climbing restart count.
  state=$(pm2_state); echo "pm2: $state"
  [ "${state%% *}" = online ] && [ "${state#* }" = "$restarts" ]
}

exec 9>"$LOCK_FILE"
flock -n 9 || die "another deploy is running"

cd "$APP_DIR"
LIVE_PORT=$(sed -n 's/^PORT=["]*\([0-9]*\).*/\1/p' .env | tail -n 1)
LIVE_PORT=${LIVE_PORT:-3000}
echo "node $(node -v), pnpm $(pnpm -v), pm2 $(pm2 -v)"

# ── Decide what to deploy ────────────────────────────────────────────────────
git fetch --quiet origin main
SHA=$(git rev-parse --verify --quiet "$SHA^{commit}") || die "unknown commit $1"
git merge-base --is-ancestor "$SHA" origin/main || die "$SHA is not on origin/main"

PREVIOUS=$(git rev-parse HEAD)
if [ "$SHA" != "$PREVIOUS" ] && git merge-base --is-ancestor "$SHA" "$PREVIOUS"; then
  log "Live checkout is already at a newer commit ($PREVIOUS); nothing to do"
  exit 0
fi
git merge-base --is-ancestor "$PREVIOUS" "$SHA" \
  || die "live checkout ($PREVIOUS) has commits that are not on main; refusing to deploy"
if ! git diff --quiet HEAD; then
  git status --short --untracked-files=no >&2
  die "tracked files in $APP_DIR were edited on the server; commit or discard those edits first"
fi
log "Deploying $SHA (live: $PREVIOUS)"

# ── Build away from the live checkout ────────────────────────────────────────
SMOKE_PID=
cleanup() {
  [ -n "$SMOKE_PID" ] && kill "$SMOKE_PID" 2>/dev/null || true
  git -C "$APP_DIR" worktree remove --force "$BUILD_DIR" 2>/dev/null || true
  rm -rf "$BUILD_DIR"
}
trap cleanup EXIT

cleanup
git worktree prune
git worktree add --detach --quiet "$BUILD_DIR" "$SHA"
install -m 600 .env "$BUILD_DIR/.env"

log "Installing dependencies (build)"
(cd "$BUILD_DIR" && pnpm install --frozen-lockfile)

log "Building"
(cd "$BUILD_DIR" && pnpm build)
for f in dist/index.js dist/public/index.html dist/server/entry-server.js; do
  [ -s "$BUILD_DIR/$f" ] || die "build did not produce $f"
done

log "Smoke test of the new build on port $SMOKE_PORT"
(cd "$BUILD_DIR" && exec env PORT="$SMOKE_PORT" NODE_ENV=production node dist/index.js) &
SMOKE_PID=$!
wait_for_200 "http://127.0.0.1:$SMOKE_PORT/" || die "new build did not serve pages; production untouched"
kill "$SMOKE_PID"; wait "$SMOKE_PID" 2>/dev/null || true; SMOKE_PID=

# ── Swap it in ───────────────────────────────────────────────────────────────
log "Updating the live checkout"
git merge --ff-only --quiet "$SHA"
# dist/index.js loads its packages from the live node_modules.
pnpm install --frozen-lockfile

rm -rf dist.previous
mv dist dist.previous
mv "$BUILD_DIR/dist" dist

log "Restarting $APP_NAME"
if restart_and_check; then
  log "Deployed $(git rev-parse --short HEAD)"
  exit 0
fi

# ── Roll back ────────────────────────────────────────────────────────────────
log "Health check failed; restoring $PREVIOUS"
pm2 logs "$APP_NAME" --lines 40 --nostream || true
rm -rf dist.failed
mv dist dist.failed
mv dist.previous dist
git reset --keep --quiet "$PREVIOUS"
pnpm install --frozen-lockfile
if restart_and_check; then
  die "deploy of $SHA failed; previous version restored and healthy (failed build kept in dist.failed)"
fi
die "deploy of $SHA failed and the previous version is not healthy either; check the server now"
