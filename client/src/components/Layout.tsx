import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="font-heading text-2xl font-bold text-primary tracking-tight">
                Darwish & Co.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
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
            ))}
            <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading">
              Get Started
            </Button>
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
          <div className="md:hidden border-t border-border bg-background p-4 space-y-4 animate-in slide-in-from-top-5">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span
                  className={cn(
                    "block py-2 text-base font-medium transition-colors hover:text-primary cursor-pointer",
                    location === item.path
                      ? "text-primary font-bold"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            <Button className="w-full bg-primary text-primary-foreground font-heading">
              Get Started
            </Button>
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
              <li>Governance Frameworks</li>
              <li>Risk Management</li>
              <li>Compliance Solutions</li>
              <li>HR Strategy</li>
              <li>Talent Acquisition</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about"><span className="cursor-pointer hover:underline">About Us</span></Link></li>
              <li><Link href="/services"><span className="cursor-pointer hover:underline">Our Services</span></Link></li>
              <li><Link href="/contact"><span className="cursor-pointer hover:underline">Contact</span></Link></li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@darwishco.com</li>
              <li>+971 4 123 4567</li>
              <li>Dubai, UAE</li>
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
