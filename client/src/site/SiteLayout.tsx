import { useEffect, useRef, useState, type ReactNode } from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { TOAST_EVENT } from "./toast";

/** Page frame for the redesigned website: header, main content, footer and a status toast. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onToast = (e: Event) => {
      setToast((e as CustomEvent<string>).detail);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(null), 3500);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <div className="toast" role="status" aria-live="polite" hidden={!toast}>
        {toast}
      </div>
    </>
  );
}
