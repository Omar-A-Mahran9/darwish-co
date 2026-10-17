import { useEffect } from "react";
import { useLocation } from "wouter";
import { resolveSeo } from "@shared/seo";

/** Creates the tag on first use, then reuses it on every later route change. */
function upsertTag<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  selector: string,
  apply: (element: HTMLElementTagNameMap[K]) => void,
) {
  let element = document.head.querySelector<HTMLElementTagNameMap[K]>(selector);
  if (!element) {
    element = document.createElement(tag);
    document.head.appendChild(element);
  }
  apply(element);
}

function setMetaByName(name: string, content: string) {
  upsertTag("meta", `meta[name="${name}"]`, (element) => {
    element.setAttribute("name", name);
    element.setAttribute("content", content);
  });
}

function setMetaByProperty(property: string, content: string) {
  upsertTag("meta", `meta[property="${property}"]`, (element) => {
    element.setAttribute("property", property);
    element.setAttribute("content", content);
  });
}

/**
 * Keeps the document head in step with the current route: title, description,
 * canonical address, social tags, robots directive and page structured data.
 *
 * The server writes the same values into the HTML it serves, so this only has
 * to correct the head after client-side navigation.
 */
export function useSeo() {
  const [location] = useLocation();

  useEffect(() => {
    const seo = resolveSeo(location);

    document.title = seo.title;
    setMetaByName("description", seo.description);
    setMetaByName("robots", seo.robots);

    setMetaByProperty("og:type", seo.ogType);
    setMetaByProperty("og:url", seo.canonical);
    setMetaByProperty("og:title", seo.title);
    setMetaByProperty("og:description", seo.description);
    setMetaByProperty("og:image", seo.ogImage);

    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", seo.title);
    setMetaByName("twitter:description", seo.description);
    setMetaByName("twitter:image", seo.ogImage);

    upsertTag("link", 'link[rel="canonical"]', (element) => {
      element.setAttribute("rel", "canonical");
      element.setAttribute("href", seo.canonical);
    });

    const pageJsonLd = document.head.querySelector('script[data-seo="page"]');
    if (seo.jsonLd) {
      upsertTag("script", 'script[data-seo="page"]', (element) => {
        element.setAttribute("type", "application/ld+json");
        element.setAttribute("data-seo", "page");
        element.textContent = JSON.stringify(seo.jsonLd);
      });
    } else if (pageJsonLd) {
      pageJsonLd.remove();
    }
  }, [location]);
}
