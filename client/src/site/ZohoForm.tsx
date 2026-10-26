/**
 * The "Brief overview of your challenge" form, hosted by Zoho Forms (27 Oct 2026). Every contact form on
 * the site uses it; submissions go to Zoho, which also records the page the visitor wrote from.
 *
 * With `zf_rszfm=1` Zoho posts "<form perma>|<height>" to the parent whenever the form changes height
 * (validation messages, the thank-you screen); the iframe follows, as in Zoho's own embed script.
 */
import { useEffect, useRef } from "react";

const ORIGIN = "https://forms.zohopublic.com";
const PERMA = "L9v4OiaNdbdYUDdhP6m94ZkAmgZVflIlI4QNPlwQznY";
const SRC = `${ORIGIN}/darwishco1/form/formdarwishcobriefoverviewofyourchallenge/formperma/${PERMA}?zf_rszfm=1`;

export default function ZohoForm({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGIN || typeof e.data !== "string") return;
      const [perma, height] = e.data.split("|");
      const px = parseInt(height, 10);
      if (perma !== PERMA || !ref.current || !Number.isFinite(px)) return;
      ref.current.style.height = `${px + 15}px`;
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={ref}
      className={"zf-frame" + (className ? " " + className : "")}
      src={SRC}
      title="Brief overview of your challenge"
      aria-label="Brief overview of your challenge"
      loading="lazy"
    />
  );
}
