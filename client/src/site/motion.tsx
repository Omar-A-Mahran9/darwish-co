import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * A figure that counts up from zero the first time it scrolls into view. Screen readers always hear the
 * final number; reduced motion, or a browser without IntersectionObserver, shows the final number at once.
 */
export function CountUp({ value, as: Tag = "strong", className, delay = 0 }: { value: number; as?: "strong" | "span"; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(value);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || prefersReducedMotion()) return;
    setShown(0);
    let raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const finish = () => {
      setShown(value);
      setDone(true);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const dur = 1600;
        let t0: number | null = null;
        const step = (t: number) => {
          if (t0 === null) t0 = t;
          const p = Math.min(1, (t - t0) / dur);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
          else finish();
        };
        timers.push(setTimeout(() => (raf = requestAnimationFrame(step)), delay));
        timers.push(setTimeout(finish, delay + dur + 400)); // the true number always lands
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [value, delay]);

  return (
    <Tag ref={ref as never} className={[className, done && "is-counted"].filter(Boolean).join(" ") || undefined} data-count={value}>
      <span className="sr-only">{value}</span>
      <span className="count" aria-hidden="true">
        {shown}
      </span>
    </Tag>
  );
}

/**
 * Growth 360 headline: a new word every second (700 ms readable, 300 ms flip). The word folds flat, swaps
 * at the midpoint, then unfolds, so mirrored text never shows. Pauses offscreen or in a hidden tab, and
 * never runs with reduced motion.
 */
export function FlipWord({ words, rootId }: { words: string[]; rootId: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const root = document.getElementById(rootId);
    if (!el || !root || !el.animate) return;
    const HOLD = 700, HALF = 150, P = "perspective(500px) ";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let index = 0, timer: ReturnType<typeof setTimeout> | null = null, flipping = false, onScreen = false, alive = true;

    const flip = () => {
      flipping = true;
      const out = el.animate([{ transform: P + "rotateX(0deg)", opacity: 1 }, { transform: P + "rotateX(88deg)", opacity: 0.6 }], {
        duration: HALF,
        easing: "cubic-bezier(.45, 0, .85, .55)",
        fill: "forwards",
      });
      out.onfinish = () => {
        if (!alive) return;
        index = (index + 1) % words.length;
        el.textContent = words[index];
        const inn = el.animate([{ transform: P + "rotateX(-88deg)", opacity: 0.6 }, { transform: P + "rotateX(0deg)", opacity: 1 }], {
          duration: HALF,
          easing: "cubic-bezier(.15, .45, .55, 1)",
          fill: "forwards",
        });
        out.cancel();
        inn.onfinish = () => {
          inn.cancel();
          flipping = false;
          schedule();
        };
      };
    };
    const running = () => !reduce.matches && onScreen && !document.hidden;
    const schedule = () => {
      if (timer) clearTimeout(timer);
      timer = running() ? setTimeout(flip, HOLD) : null;
    };
    const sync = () => {
      if (reduce.matches) {
        if (timer) clearTimeout(timer);
        timer = null;
        index = 0;
        el.textContent = words[0];
        return;
      }
      if (!flipping) schedule();
    };
    const io = new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      sync();
    });
    io.observe(root);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener?.("change", sync);
    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener?.("change", sync);
    };
  }, [words, rootId]);

  return (
    <span className="flip-word" ref={ref}>
      {words[0]}
    </span>
  );
}

/** Copy of a row item for the marquee: hidden from assistive tech, not focusable, no duplicate ids. */
function cloneItem(node: ReactNode, key: string): ReactNode {
  if (!isValidElement(node)) return node;
  const strip = (el: ReactElement<any>): ReactElement<any> => {
    const props: Record<string, unknown> = {};
    if (el.props.id) props.id = undefined;
    if (el.type === "a") props.tabIndex = -1;
    if (el.type === "img") {
      props.alt = "";
      props.loading = "eager";
    }
    const kids = el.props.children;
    const children = kids === undefined ? undefined : Children.map(kids, (c: ReactNode) => (isValidElement(c) ? strip(c as ReactElement<any>) : c));
    return cloneElement(el, props, children);
  };
  const copy = strip(node as ReactElement<any>);
  return cloneElement(copy, { key, "aria-hidden": "true", inert: true } as never);
}

/**
 * A row that drifts sideways at a fixed speed, with inert copies on both sides so it loops seamlessly.
 * Hover or keyboard focus pauses it; dragging, touch and horizontal wheel or trackpad move it by hand.
 * Reduced motion keeps only the manual part.
 */
export function Marquee({ items, speed = 16, dir = 1, className, label, id }: { items: ReactElement[]; speed?: number; dir?: number; className: string; label: string; id?: string }) {
  const vpRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const vp = vpRef.current, track = trackRef.current;
    if (!vp || !track) return;
    const n = items.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let setWidth = 0, offset = 0, last = 0, raf = 0;
    let hovering = false, focused = false, dragging = false, onScreen = false;
    let startX = 0, startOffset = 0, moved = false;

    const measure = () => {
      const kids = track.children as HTMLCollectionOf<HTMLElement>;
      if (kids.length < 2 * n) return;
      setWidth = kids[n].offsetLeft - kids[0].offsetLeft;
      const need = Math.ceil((vp.clientWidth * 2) / Math.max(setWidth, 1));
      if (need !== copies) setCopies(need);
      render();
    };
    const wrap = () => {
      if (!focused && setWidth) offset = ((offset % setWidth) + setWidth) % setWidth;
    };
    const render = () => {
      track.style.transform = `translate3d(${-(setWidth + offset)}px,0,0)`;
    };
    const moving = () => !reduce.matches && !hovering && !focused && !dragging;
    const tick = (t: number) => {
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
      last = t;
      if (moving()) {
        offset += speed * dir * dt;
        wrap();
        render();
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!raf && onScreen && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => (onScreen && !document.hidden ? start() : stop());

    const onEnter = (e: PointerEvent) => e.pointerType === "mouse" && (hovering = true);
    const onLeave = (e: PointerEvent) => e.pointerType === "mouse" && (hovering = false);
    const onFocusIn = (e: FocusEvent) => {
      focused = true;
      vp.scrollLeft = 0;
      const item = (e.target as HTMLElement).closest<HTMLElement>(".wcard");
      if (!item) return;
      const left = item.offsetLeft - (track.children[0] as HTMLElement).offsetLeft - setWidth;
      offset = Math.max(-setWidth, left - (vp.clientWidth - item.offsetWidth) / 2);
      render();
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!vp.contains(e.relatedTarget as Node)) {
        focused = false;
        wrap();
        render();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startOffset = offset;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) {
        moved = true;
        vp.classList.add("is-dragging");
        try {
          vp.setPointerCapture(e.pointerId);
        } catch {
          /* capture is optional */
        }
      }
      if (moved) {
        offset = startOffset - dx;
        wrap();
        render();
      }
    };
    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      vp.classList.remove("is-dragging");
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    const onDragStart = (e: DragEvent) => e.preventDefault();
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      offset += e.deltaX;
      wrap();
      render();
    };
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 200);
    };

    vp.addEventListener("pointerenter", onEnter);
    vp.addEventListener("pointerleave", onLeave);
    vp.addEventListener("focusin", onFocusIn);
    vp.addEventListener("focusout", onFocusOut);
    vp.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    vp.addEventListener("click", onClick, true);
    vp.addEventListener("dragstart", onDragStart);
    vp.addEventListener("wheel", onWheel, { passive: false });
    const io = new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      sync();
    });
    io.observe(vp);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("resize", onResize);
    // Images change the item widths as they load.
    track.querySelectorAll("img").forEach((img) => !img.complete && img.addEventListener("load", onResize, { once: true }));
    measure();
    sync();

    return () => {
      stop();
      io.disconnect();
      clearTimeout(resizeTimer);
      vp.removeEventListener("pointerenter", onEnter);
      vp.removeEventListener("pointerleave", onLeave);
      vp.removeEventListener("focusin", onFocusIn);
      vp.removeEventListener("focusout", onFocusOut);
      vp.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      vp.removeEventListener("click", onClick, true);
      vp.removeEventListener("dragstart", onDragStart);
      vp.removeEventListener("wheel", onWheel);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", onResize);
    };
  }, [items, speed, dir, copies]);

  const before = items.map((it, i) => cloneItem(it, `b${i}`));
  const after = Array.from({ length: copies + 1 }, (_, c) => items.map((it, i) => cloneItem(it, `a${c}-${i}`))).flat();

  return (
    <div className={`mq ${className}`} ref={vpRef} aria-label={label} role="region" id={id}>
      <ul className="mq-track" role="list" ref={trackRef} style={{ listStyle: "none", margin: 0, paddingInlineStart: 0 }}>
        {before}
        {items}
        {after}
      </ul>
    </div>
  );
}
