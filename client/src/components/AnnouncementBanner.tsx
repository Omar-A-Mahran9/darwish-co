import { useState } from "react";
import { X, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnnouncementBannerProps {
  message?: string;
  linkText?: string;
  linkHref?: string;
  dismissible?: boolean;
  variant?: "primary" | "success" | "warning";
}

const BANNER_DISMISSED_KEY = "darwish_banner_dismissed_v1";

export default function AnnouncementBanner({
  message = "🎉 New: Strategy & Performance Management System — empowering SMEs across the MENA region.",
  linkText = "Learn more →",
  linkHref = "/services",
  dismissible = true,
  variant = "primary",
}: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(BANNER_DISMISSED_KEY) === "true";
    }
    return false;
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(BANNER_DISMISSED_KEY, "true");
  };

  const variantClasses = {
    primary: "bg-primary text-primary-foreground",
    success: "bg-chart-2 text-white",
    // Gold is a light color — white text on it fails contrast (1.4:1). Charcoal
    // foreground passes at 10.9:1.
    warning: "bg-chart-3 text-foreground",
  };

  return (
    <div
      className={cn(
        "relative w-full py-2.5 px-4 text-center text-sm font-medium",
        variantClasses[variant]
      )}
      role="banner"
      aria-label="Announcement"
    >
      <div className="site-container flex items-center justify-center gap-3">
        <Megaphone className="w-4 h-4 shrink-0 opacity-80" />
        <span className="leading-relaxed">
          {message}{" "}
          {linkText && linkHref && (
            <a
              href={linkHref}
              className="underline underline-offset-2 font-bold opacity-90 hover:opacity-100 transition-opacity"
            >
              {linkText}
            </a>
          )}
        </span>
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
