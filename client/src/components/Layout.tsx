import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

type NavItem = {
  name: string;
  path: string;
  children?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "Services",
    path: "/services",
    children: [
      { name: "Governance & Risk (GRC)", path: "/services#grc" },
      { name: "Human Resources", path: "/services#hr" },
      { name: "Business Development", path: "/services#bizdev" },
      { name: "Digital Marketing", path: "/services#digital-marketing" },
      { name: "Strategy & Performance System", path: "/services#strategy" },
      { name: "Integrity & Anti-Corruption", path: "/services#integrity" },
      { name: "Market Research & Insights", path: "/services#market-research" },
      { name: "Training Academy", path: "/training" },
    ],
  },
  {
    name: "Projects",
    path: "/projects",
    children: [
      { name: "AI POC Platform", path: "/projects#ai-poc" },
      { name: "Hebei-Egypt Trade Portal", path: "/projects#trade-portal" },
      { name: "Education Organization Development", path: "/projects#education" },
    ],
  },
  {
    name: "Partners",
    path: "/partners",
    children: [
      { name: "Consultants & Advisors", path: "/partners" },
      { name: "Corporate Partners & Licences", path: "/corporate-partners" },
    ],
  },
  {
    name: "Smart Solutions",
    path: "/smart-solutions",
    children: [
      { name: "Audex Compass", path: "/smart-solutions#audex-compass" },
      { name: "Audex Command", path: "/smart-solutions#audex-command" },
      { name: "Audex Perfect", path: "/smart-solutions#audex-perfect" },
    ],
  },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

/**
 * Navigate to a path that may contain a hash anchor.
 * - If we're already on the target page, scrolls directly to the anchor.
 * - If we're on a different page, navigates there and lets useHashScroll handle the scroll.
 */
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

function DropdownMenu({ item, location }: { item: NavItem; location: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const go = useHashNav();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = location === item.path || location.startsWith(item.path + "/");

  return (
    <div ref={ref} className="relative">
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary cursor-pointer",
          isActive ? "text-primary font-bold" : "text-muted-foreground"
        )}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
      >
        {item.name}
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", open ? "rotate-180" : "")}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-md shadow-lg z-50 py-1"
          onMouseLeave={() => setOpen(false)}
        >
          {/* Parent page link — goes to top of page */}
          <button
            className="block w-full text-left px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary/50 cursor-pointer border-b border-border"
            onClick={() => go(item.path, () => setOpen(false))}
          >
            All {item.name}
          </button>

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
      )}
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const go = useHashNav();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenMobileSection(null);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/logo-nobg_7762efbd.png" alt="Darwish & Co." className="h-12 w-auto object-contain" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.path} item={item} location={location} />
              ) : (
                <Link key={item.path} href={item.path}>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
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
            <Link href="/contact">
              <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading">
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background p-4 space-y-1 animate-in slide-in-from-top-5">
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
                        <button
                          className="block w-full text-left py-1.5 text-sm font-semibold text-primary cursor-pointer"
                          onClick={() => go(item.path, () => { setIsMenuOpen(false); setOpenMobileSection(null); })}
                        >
                          All {item.name}
                        </button>
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
            <Link href="/contact">
              <Button className="w-full bg-primary text-primary-foreground font-heading mt-2" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

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
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-primary">Darwish & Co.</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A wise word in the right moment. Empowering SMEs in the MENA region with expert GRC and HR solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-primary">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services#grc"><span className="cursor-pointer hover:text-primary hover:underline transition-colors">Governance & Risk</span></Link></li>
              <li><Link href="/services#hr"><span className="cursor-pointer hover:text-primary hover:underline transition-colors">Human Resources</span></Link></li>
              <li><Link href="/services#bizdev"><span className="cursor-pointer hover:text-primary hover:underline transition-colors">Business Development</span></Link></li>
              <li><Link href="/services#strategy"><span className="cursor-pointer hover:text-primary hover:underline transition-colors">Strategy & Performance</span></Link></li>
              <li><Link href="/services#integrity"><span className="cursor-pointer hover:text-primary hover:underline transition-colors">Integrity & Anti-Corruption</span></Link></li>
              <li><Link href="/training"><span className="cursor-pointer hover:text-primary hover:underline transition-colors font-medium">Training Academy</span></Link></li>
              <li><Link href="/smart-solutions"><span className="cursor-pointer hover:text-primary hover:underline transition-colors font-medium">Smart Solutions</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about"><span className="cursor-pointer hover:underline">About Us</span></Link></li>
              <li><Link href="/projects"><span className="cursor-pointer hover:underline">Projects</span></Link></li>
              <li><Link href="/partners"><span className="cursor-pointer hover:text-primary hover:underline transition-colors">Partners & Consultants</span></Link></li>
              <li><Link href="/corporate-partners"><span className="cursor-pointer hover:text-primary hover:underline transition-colors">Corporate Partners</span></Link></li>
              <li><Link href="/contact"><span className="cursor-pointer hover:underline">Contact</span></Link></li>
              <li><Link href="/admin/inbox"><span className="cursor-pointer hover:text-primary hover:underline transition-colors">Admin Inbox</span></Link></li>
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
        <div className="container mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Darwish & Co. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
