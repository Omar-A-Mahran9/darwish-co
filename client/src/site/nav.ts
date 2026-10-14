/**
 * Site structure for the redesigned website (ported from the approved prototype, prototype/).
 * One source for the header menu, footer, homepage service grid and service routes.
 */

export { SERVICE_GROUPS, SITE_SERVICES } from "@shared/site";
export type { ServiceGroup, SiteService } from "@shared/site";

export const serviceHref = (slug: string) => `/services/${slug}`;

/** Addresses of the main pages. */
export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  industries: "/industries",
  work: "/projects",
  insights: "/insights",
  contact: "/contact",
  privacy: "/privacy",
  integrity: "/about/integrity",
  growth360: "/growth-360",
  clientLogin: "/client-login",
} as const;

export const CONTACT = {
  email: "info@darwish-co.com",
  phone: "+20 110 110 1090",
  phoneHref: "tel:+201101101090",
  address: "Office T-10, 3rd Floor, RIO Mall, Dr. Ahmed Okasha St., off Sadat Axis, New Cairo",
} as const;
