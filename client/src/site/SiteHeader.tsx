import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ROUTES, SERVICE_GROUPS, SITE_SERVICES, serviceHref } from "./nav";

// useLayoutEffect warns during the build-time render; the header state only matters in the browser.
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const Chevron = () => (
  <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/** Which top-level section the current address belongs to. */
function sectionOf(path: string): "services" | "about" | "work" | "insights" | null {
  if (path.startsWith("/services") || path.startsWith("/industries")) return "services";
  if (path.startsWith("/about")) return "about";
  if (path.startsWith(ROUTES.work)) return "work";
  if (path.startsWith(ROUTES.insights)) return "insights";
  return null;
}

/**
 * Header: transparent over a dark page hero, navy glass after 64px of scrolling, solid navy on pages
 * with a light hero and while the mobile menu is open.
 */
export default function SiteHeader() {
  const [location] = useLocation();
  const [solid, setSolid] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [hasContactSection, setHasContactSection] = useState(false);
  const navItemRef = useRef<HTMLLIElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const section = sectionOf(location);

  const updateHeader = useCallback(() => {
    const dark = !!document.querySelector("main .hero, main .page-hero");
    setSolid(!dark);
    setScrolled(dark && window.scrollY > 64);
    setHasContactSection(!!document.getElementById("contact"));
  }, []);

  // Re-check after every page change, and close any open menu.
  useBrowserLayoutEffect(() => {
    updateHeader();
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location, updateHeader]);

  useEffect(() => {
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        updateHeader();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pageshow", updateHeader);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pageshow", updateHeader);
    };
  }, [updateHeader]);

  // Services menu: closes on an outside click, when focus leaves it, and on Escape.
  useEffect(() => {
    if (!megaOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!navItemRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaOpen]);

  // Mobile menu: Escape closes it and returns focus; widening to the desktop layout closes it too.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1080px)");
    const onDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener?.("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener?.("change", onDesktop);
    };
  }, [mobileOpen]);

  const cta = hasContactSection ? "#contact" : ROUTES.contact;
  const CtaLink = ({ className }: { className: string }) =>
    cta.startsWith("#") ? (
      <a className={className} href={cta} onClick={() => setMobileOpen(false)}>
        <span className="cta-label">Discuss your challenge</span>
      </a>
    ) : (
      <Link className={className} href={cta}>
        <span className="cta-label">Discuss your challenge</span>
      </Link>
    );

  const navLink = (href: string, label: string, key: typeof section) => (
    <li>
      <Link className="nav-link" href={href} aria-current={section === key ? "page" : undefined}>
        {label}
      </Link>
    </li>
  );

  const classes = ["site-header", solid && "is-solid", scrolled && "is-scrolled", mobileOpen && "is-menu-open"]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className={classes}>
        <div className="wrap header-row">
          <Link className="brand" href="/" aria-label="Darwish & Co. home" id="logo">
            <img src="/media/emblem.png" alt="" width={34} height={34} />
            <span className="brand-name">Darwish &amp; Co.</span>
          </Link>
          <nav className="nav" aria-label="Main">
            <ul>
              <li
                className="nav-item"
                ref={navItemRef}
                onBlur={(e) => {
                  if (!navItemRef.current?.contains(e.relatedTarget as Node)) setMegaOpen(false);
                }}
              >
                <button
                  ref={toggleRef}
                  className={"nav-toggle" + (section === "services" ? " is-current" : "")}
                  type="button"
                  aria-expanded={megaOpen}
                  aria-controls="menu-practices"
                  onClick={() => setMegaOpen((open) => !open)}
                >
                  Services <Chevron />
                </button>
                <div className="menu-panel mega" id="menu-practices" hidden={!megaOpen}>
                  <div className="mega-grid">
                    {SERVICE_GROUPS.map((group) => (
                      <div key={group}>
                        <h3>{group}</h3>
                        <ul>
                          {SITE_SERVICES.filter((s) => s.group === group).map((s) => (
                            <li key={s.slug}>
                              <Link href={serviceHref(s.slug)}>{s.title}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mega-foot">
                    <Link href={ROUTES.services}>All services</Link>
                    <Link href={ROUTES.industries}>Industries</Link>
                  </div>
                </div>
              </li>
              {navLink(ROUTES.about, "About us", "about")}
              {navLink(ROUTES.work, "Our work", "work")}
              {navLink(ROUTES.insights, "Insights", "insights")}
            </ul>
            <CtaLink className="btn btn-blue header-cta" />
          </nav>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>{" "}
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
        <nav className="mobile-nav" id="mobile-nav" aria-label="Main" hidden={!mobileOpen}>
          <div className="wrap">
            <ul>
              <li className="m-row">
                <button
                  className="m-acc"
                  type="button"
                  aria-expanded={mobileServicesOpen}
                  aria-controls="m-practices"
                  onClick={() => setMobileServicesOpen((open) => !open)}
                >
                  Services <Chevron />
                </button>
                <div className="m-sub" id="m-practices" hidden={!mobileServicesOpen}>
                  {SERVICE_GROUPS.map((group) => (
                    <Fragment key={group}>
                      <h3>{group}</h3>
                      {SITE_SERVICES.filter((s) => s.group === group).map((s) => (
                        <Link key={s.slug} href={serviceHref(s.slug)}>
                          {s.title}
                        </Link>
                      ))}
                    </Fragment>
                  ))}
                  <h3>More</h3>
                  <Link href={ROUTES.services}>All services</Link>
                  <Link href={ROUTES.industries}>Industries</Link>
                </div>
              </li>
              <li className="m-row">
                <Link href={ROUTES.about}>About us</Link>
              </li>
              <li className="m-row">
                <Link href={ROUTES.work}>Our work</Link>
              </li>
              <li className="m-row">
                <Link href={ROUTES.insights}>Insights</Link>
              </li>
            </ul>
            <CtaLink className="btn btn-blue" />
          </div>
        </nav>
      </header>
    </>
  );
}
