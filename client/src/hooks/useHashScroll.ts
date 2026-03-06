import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Scrolls to the element matching window.location.hash after every route change.
 * Works for both same-page hash clicks and cross-page navigation (e.g. /services#grc).
 *
 * A small delay is used so the target page has time to render before we scroll.
 */
export function useHashScroll() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      // No hash — scroll to top on every page navigation
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Try immediately first (element may already be in DOM)
    const tryScroll = (attemptsLeft: number) => {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attemptsLeft > 0) {
        // Element not yet rendered — retry after a short delay
        setTimeout(() => tryScroll(attemptsLeft - 1), 80);
      }
    };

    // Start after a brief delay to let React render the new page
    setTimeout(() => tryScroll(10), 50);
  }, [location]);
}
