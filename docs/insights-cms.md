# Insights CMS (Sveltia)

Insights articles are Markdown files in `content/insights/`, one per article. The CMS at
**darwish-co.com/cms** is a friendly editor that writes those files to GitHub for you. There is no
database: every change is a pull request on `Omar-A-Mahran9/darwish-co`, and merging it publishes
the article automatically (the Deploy workflow builds, checks and deploys `main`).

```
Writer opens darwish-co.com/cms
  → Sign in with GitHub
  → writes the article in the form and clicks Save
  → the CMS creates a branch and a pull request
  → GitHub Actions checks the article (a red ✗ names what to fix)
  → someone merges the pull request
  → the live site rebuilds with the article, its page and its sitemap entry
```

---

## For writers

### Signing in

Open **darwish-co.com/cms** and choose **Sign in with GitHub**. You need a GitHub account with write
access to `Omar-A-Mahran9/darwish-co` (ask Omar to add you).

### Writing an article

Choose **New Article** and fill in the form:

- **Web address**: lowercase words joined by hyphens, such as `delegation-of-authority`. It becomes
  `darwish-co.com/insights/delegation-of-authority` and cannot change later.
- **Title**: 10–110 characters. **Summary**: 50–260. **Listing card text**: 30–160.
- **Search title** (optional): 20–60 characters, used whole in Google results and the browser tab. Add one
  when the title is longer than about 45 characters, or Google cuts it off. Google shows the summary as the
  description when it fits in 160 characters, and the listing card text when it doesn't.
- **Topic** and **Related service**: pick from the lists.
- **Author**: defaults to Fouad Darwish. Partner expertise is credited to the partner by name.
- **Date**: `2026-10` or `2026-10-27`.
- **Status**: *Planned* keeps it off the site. *Published* puts it on the site once merged.
- **Order**: lower numbers appear first on the Insights page.
- **Cover photo** and its **description** (the description is required when there is a photo).
- **Article**: use `##` for section headings. A published article needs at least one. No raw HTML.

### Images

Upload images in the CMS. Don't link to images on other sites. Photos are converted to WebP and
resized to 1600 px automatically, and must end up at 250 KB or less (diagrams as SVG: 100 KB). Give
every image a description.

### Review and publish

Every **Save** creates a branch and a pull request. The **Workflow** tab shows articles moving through
*Draft → In Review → Ready*.

- GitHub checks the article on the pull request. If the check fails, open it: the log lists each
  problem with the file and the field or line, for example
  `my-article.md: title is 8 characters; it must be 10–110`.
- Publishing means setting **Status** to *Published* and merging the pull request. The site updates
  about two minutes later.

---

## For developers

### One-time setup: "Sign in with GitHub" (Omar)

The website's own server handles sign-in (`server/cmsAuth.ts`), so no extra service is needed. It
follows the protocol of Sveltia's official authenticator.

1. Create a GitHub OAuth App on the account that owns the repository (GitHub → Settings → Developer
   settings → OAuth Apps → New OAuth App):
   - Application name: `Darwish & Co. CMS`
   - Homepage URL: `https://darwish-co.com`
   - Authorization callback URL: `https://darwish-co.com/api/cms/callback`
   - Leave "Expire user access tokens" **unticked**. Sign-in does not refresh tokens, so writers
     would be signed out every ~8 hours.
2. Generate a client secret.
3. Add both to the server's `/var/www/darwish-co/.env` (never commit them), then restart:
   ```
   CMS_GITHUB_CLIENT_ID=…
   CMS_GITHUB_CLIENT_SECRET=…
   ```
   `pm2 restart darwish-co`
4. Give each writer write access to the repository.

Until the keys are set, the sign-in window says the CMS is not set up yet. Nothing else on the site is
affected.

The sign-in page sits on `https://darwish-co.com`. If `www.darwish-co.com` is ever made the main
address, update the callback URL above and `backend.base_url` in `client/public/cms/config.yml`.

### Running locally

Open `http://localhost:3000/cms/index.html` with `pnpm dev` running. (Vite's app fallback catches
`/cms/`, so use the full path.) Choose **Work with Local Repository** and select the repository folder.
Edits are written straight to your working tree, with no branch or pull request. Check them with
`git diff` and `pnpm run insights`.

### How the pieces fit

| Piece | Where |
|---|---|
| CMS page and form | `client/public/cms/index.html`, `client/public/cms/config.yml` |
| Article rules (source of truth) | `scripts/insights-schema.mjs`, tested in `server/insightsSchema.test.ts` |
| Markdown → site data | `scripts/build-insights.mjs` (runs first in `pnpm check` and `pnpm build`) |
| Sign-in | `server/cmsAuth.ts` (`/api/cms/auth`, `/api/cms/callback`) |
| Sitemap | `shared/sitemap.ts`, written by `scripts/prerender.mjs` on every build |
| Checks on pull requests, deploy from `main` | `.github/workflows/deploy.yml` |

When you change `scripts/insights-schema.mjs` (a topic, service, limit or image size), update
`config.yml` to match, so the form and the build agree.

### Upgrading Sveltia

The version is pinned in `client/public/cms/index.html` and in the schema URL at the top of
`config.yml`: 0.217.0, the version Growthino runs. After a bump, open an existing article in local
mode, change one field, save, and confirm `git diff` shows only that field.
