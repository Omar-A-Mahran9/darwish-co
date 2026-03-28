import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import AnnouncementBanner from "@/components/AnnouncementBanner";

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
      { name: "Strategy & Performance System", path: "/services#strategy" },
    ],
  },
  {
    name: "Projects",
    path: "/projects",
    children: [
      { name: "AI POC Platform", path: "/projects#ai-poc" },
      { name: "Hebei-Egypt Trade Portal", path: "/projects#trade-portal" },
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
      {/* Announcement Banner */}
      <AnnouncementBanner
        message="📢 Introducing our Strategy & Performance Management System — digital excellence for MENA SMEs."
        linkText="Explore Services →"
        linkHref="/services"
      />
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src="/images/logo.png" alt="Darwish & Co." className="h-12 w-auto object-contain" />
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
