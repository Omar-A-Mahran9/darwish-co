import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { PUBLISHED_SERVICES } from "@shared/services";
import { guidesIndexIsWorthHaving, PUBLISHED_GUIDES } from "@shared/guides";
import { useState, useRef, useEffect, useCallback } from "react";

type NavItem = {
  name: string;
  path: string;
  children?: { name: string; path: string }[];
};

/**
 * The guides, for the Insights menu.
 *
 * While one guide is published the menu names it, because a category holding a
 * single item reads as an empty shelf. Once there are two, `/guides` earns an
 * index page and the entry becomes "Guides". Nothing appears at all until the
 * first guide publishes, so the menu never advertises a gap.
 */
function insightsChildren(): { name: string; path: string }[] {
  if (guidesIndexIsWorthHaving()) {
    return [
      { name: "Guides", path: "/guides" },
      { name: "Articles", path: "/blog" },
    ];
  }

  // With one guide published, name it. If that guide is a spoke written before
  // its hub, the menu names the spoke rather than pointing at a hub that does
  // not exist yet.
  const single = PUBLISHED_GUIDES[0];

  return [
    ...(single ? [{ name: single.navLabel, path: `/guides/${single.slug}` }] : []),
    { name: "Articles", path: "/blog" },
  ];
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "Services",
    path: "/services",
    // The mobile menu adds its own "All Services" entry, so this lists only the pages.
    children: [
      ...PUBLISHED_SERVICES.map((service) => ({
        name: service.navLabel,
        path: `/services/${service.slug}`,
      })),
    ],
  },
  // What we wrote to help you decide. A plain link to the articles until a
  // guide exists to sit above them.
  PUBLISHED_GUIDES.length > 0
    ? { name: "Insights", path: "/blog", children: insightsChildren() }
    : { name: "Insights", path: "/blog" },
  // Who does the work, and what we have built.
  {
    name: "Our work",
    path: "/projects",
    children: [
      { name: "Projects", path: "/projects" },
      { name: "Consultants & advisers", path: "/partners" },
      { name: "Partner firms", path: "/corporate-partners" },
    ],
  },
  { name: "Contact", path: "/contact" },
];

/**
 * Navigate to a path that may contain a hash anchor.
 * - If we're already on the target page, scrolls directly to the anchor.
 * - If we're on a different page, navigates there and lets useHashScroll handle the scroll.
 */
/**
 * True once the page has scrolled past `threshold`. Used to let the header sit
 * transparently over the homepage hero and pick up a background after a scroll.
 */
function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

function useHashNav() {
  const [location, navigate] = useLocation();

  return useCallback(
    (path: string, onDone?: () => void) => {
      const [pagePath, hash] = path.split("#");
      const targetPage = pagePath || "/";
      const currentPage = location.split("#")[0];

      if (hash && currentPage === targetPage) {
        // Same page — scroll directly without re-navigating
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Different page — navigate; useHashScroll will scroll after render
        navigate(path);
      }

      onDone?.();
    },
    [location, navigate]
  );
}

/**
 * Which dropdown is open is decided by the header, not by each menu, so opening
 * one closes the others. `open` and `onOpenChange` come from there.
 */
function DropdownMenu({
  item,
  location,
  open,
  onOpenChange,
}: {
  item: NavItem;
  location: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const go = useHashNav();
  const setOpen = onOpenChange;
  const panelId = `nav-menu-${item.name.toLowerCase().replace(/\s+/g, "-")}`;

  const cancelClose = () => clearTimeout(closeTimer.current);
  // A short delay so a small wobble of the mouse does not shut the menu.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => onOpenChange(false), 150);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    // Only the open menu listens, so a click on another menu's button is not
    // first read as "outside" and then toggled back open.
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onOpenChange(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  const isActive = location === item.path || location.startsWith(item.path + "/");

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        // Keyboard focus moving out of the menu closes it.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary cursor-pointer",
          isActive ? "text-primary font-bold" : "text-muted-foreground"
        )}
        onClick={() => setOpen(!open)}
      >
        {item.name}
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", open ? "rotate-180" : "")}
        />
      </button>

      {open && (
        // The padding, not a margin, spans the gap under the button, so the
        // pointer never crosses a dead zone between the button and the panel.
        <div id={panelId} className="absolute top-full left-0 z-50 w-56 pt-2">
         <div className="rounded-md border border-border bg-background py-1 shadow-lg">
          {/* The parent page, unless a child already links to it. */}
          {!item.children?.some((child) => child.path === item.path) && (
            <button
              className="block w-full text-left px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary/50 cursor-pointer border-b border-border"
              onClick={() => go(item.path, () => setOpen(false))}
            >
              All {item.name}
            </button>
          )}

          {item.children?.map((child) => (
            <button
              key={child.path}
              className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50 cursor-pointer transition-colors"
              onClick={() => go(child.path, () => setOpen(false))}
            >
              {child.name}
            </button>
          ))}
         </div>
        </div>
      )}
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const go = useHashNav();
  const scrolled = useScrolled();

  // Only the homepage opens with a hero the header can sit on top of. Every
  // other page starts with a solid coloured band, so the header keeps its
  // background there from the first pixel.
  const overHero = location === "/" && !scrolled && !isMenuOpen;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenMobileSection(null);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-foreground">
      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300",
          overHero
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border/40 bg-background/70 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
        )}
      >
        {/*
          The bar keeps one height and the logo one size at every width: only the
          background changes on scroll, so nothing shifts under the reader. The
          gap keeps the logo clear of the first nav item.
        */}
        <div className="site-container flex h-20 items-center justify-between gap-10 lg:gap-16">
          <Link href="/" className="shrink-0">
            <div className="flex shrink-0 items-center space-x-2 cursor-pointer">
              <img
                src="/images/logo-horizontal.webp"
                alt="Darwish & Co."
                width={887}
                height={192}
                className="h-10 w-auto max-w-none shrink-0 object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav. Seven items plus a button need room: below 1024px the
              row cannot hold them without squeezing the logo, so the compact
              menu takes over there rather than at the narrower md breakpoint. */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) =>
              item.children ? (
                <DropdownMenu
                  key={item.path}
                  item={item}
                  location={location}
                  open={openDropdown === item.path}
                  onOpenChange={(next) =>
                    // A late close from one menu must not shut another that has opened since.
                    setOpenDropdown((current) =>
                      next ? item.path : current === item.path ? null : current,
                    )
                  }
                />
              ) : (
                <Link key={item.path} href={item.path}>
                  <span
                    className={cn(
                      "whitespace-nowrap text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                      location === item.path
                        ? "text-primary font-bold"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              )
            )}
            {/* Utility link, not a main destination: it gives up its place in
                the row first when space runs short. Still in the footer and the
                compact menu at every width. */}
            <Link href="/client-login" className="hidden xl:block"><span className="cursor-pointer whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Client Login</span></Link>
            <Link href="/contact" className="shrink-0">
              <Button variant="default" className="whitespace-nowrap">
                Book a consultation
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-primary"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background p-4 space-y-1 animate-in slide-in-from-top-5">
            {navItems.map((item) => (
              <div key={item.path}>
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        "flex items-center justify-between w-full py-2 text-base font-medium transition-colors hover:text-primary cursor-pointer",
                        location === item.path ? "text-primary font-bold" : "text-muted-foreground"
                      )}
                      onClick={() =>
                        setOpenMobileSection(openMobileSection === item.path ? null : item.path)
                      }
                    >
                      {item.name}
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform duration-200",
                          openMobileSection === item.path ? "rotate-180" : ""
                        )}
                      />
                    </button>
                    {openMobileSection === item.path && (
                      <div className="pl-4 space-y-1 pb-2 border-l-2 border-primary/30 ml-2">
                        {!item.children.some((child) => child.path === item.path) && (
                          <button
                            className="block w-full text-left py-1.5 text-sm font-semibold text-primary cursor-pointer"
                            onClick={() => go(item.path, () => { setIsMenuOpen(false); setOpenMobileSection(null); })}
                          >
                            All {item.name}
                          </button>
                        )}
                        {item.children.map((child) => (
                          <button
                            key={child.path}
                            className="block w-full text-left py-1.5 text-sm text-muted-foreground hover:text-primary cursor-pointer"
                            onClick={() => go(child.path, () => { setIsMenuOpen(false); setOpenMobileSection(null); })}
                          >
                            {child.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.path}>
                    <span
                      className={cn(
                        "block py-2 text-base font-medium transition-colors hover:text-primary cursor-pointer",
                        location === item.path ? "text-primary font-bold" : "text-muted-foreground"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </span>
                  </Link>
                )}
              </div>
            ))}
            <Link href="/client-login"><span className="block cursor-pointer py-2 text-base font-medium text-muted-foreground transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>Client Login</span></Link>
            <Link href="/contact">
              <Button className="w-full bg-primary text-primary-foreground mt-2" onClick={() => setIsMenuOpen(false)}>
                Book a consultation
              </Button>
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      {/*
        On the homepage the hero slides up behind the transparent header so the
        header sits over it. Every other page keeps its normal offset.
      */}
      <main className={cn("flex-1", location === "/" && "-mt-20")}>{children}</main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/201101101090"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 9999,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#25D366",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 200ms ease, box-shadow 200ms ease",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.transform = "scale(1.1)";
          el.style.boxShadow = "0 6px 28px rgba(37,211,102,0.6), 0 3px 12px rgba(0,0,0,0.22)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.transform = "scale(1)";
          el.style.boxShadow = "0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.18)";
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="white"
          aria-hidden="true"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.48.67 4.8 1.84 6.8L2 30l7.4-1.82A13.94 13.94 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.82-1.59l-.42-.25-4.39 1.08 1.1-4.27-.27-.44A11.44 11.44 0 0 1 4.5 16C4.5 9.6 9.6 4.5 16 4.5S27.5 9.6 27.5 16 22.4 27.5 16 27.5zm6.28-8.56c-.34-.17-2.02-1-2.34-1.11-.32-.11-.55-.17-.78.17-.23.34-.9 1.11-1.1 1.34-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.7-2.01-1.9-2.35-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.57-.28-.67-.57-.58-.78-.59h-.66c-.23 0-.6.09-.91.43-.31.34-1.2 1.17-1.2 2.85s1.23 3.3 1.4 3.53c.17.23 2.42 3.7 5.87 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.02-.82 2.31-1.62.28-.8.28-1.48.2-1.62-.09-.14-.32-.23-.66-.4z" />
        </svg>
      </a>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="site-container grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-primary">Darwish & Co.</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A wise word in the right moment. Governance and management consulting for SMEs in the MENA region.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-primary">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {PUBLISHED_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`}>
                    <span className="cursor-pointer hover:text-primary hover:underline transition-colors">
                      {service.navLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about"><span className="cursor-pointer hover:underline">About Us</span></Link></li>
              <li><Link href="/projects"><span className="cursor-pointer hover:underline">Projects</span></Link></li>
              {insightsChildren().map((entry) => (
                <li key={entry.path}>
                  <Link href={entry.path}>
                    <span className="cursor-pointer hover:text-primary hover:underline transition-colors">
                      {entry.name}
                    </span>
                  </Link>
                </li>
              ))}
              <li><Link href="/partners"><span className="cursor-pointer hover:text-primary hover:underline transition-colors">Partners & Consultants</span></Link></li>
              <li><Link href="/corporate-partners"><span className="cursor-pointer hover:text-primary hover:underline transition-colors">Corporate Partners</span></Link></li>
              <li><Link href="/contact"><span className="cursor-pointer hover:underline">Contact</span></Link></li>
              <li><Link href="/client-login"><span className="cursor-pointer hover:underline">Client Login</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@darwish-co.com</li>
              <li>+20 110 110 1090</li>
              <li>www.darwish-co.com</li>
            </ul>
          </div>
        </div>
        <div className="site-container mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Darwish & Co. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
