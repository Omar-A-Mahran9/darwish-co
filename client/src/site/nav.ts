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
  clientLogin: "/client-login",
} as const;

export const CONTACT = {
  email: "info@darwish-co.com",
  phone: "+20 110 110 1090",
  phoneHref: "tel:+201101101090",
  address: "Office T-10, 3rd Floor, RIO Mall, Dr. Ahmed Okasha St., off Sadat Axis, New Cairo",
} as const;

/** Official social profiles (confirmed 25 Oct 2026). Used in the footer and on the Contact page; also listed as sameAs in the Organization record in index.html. */
export const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/darwishandcoeg/",
    path: "M5 3.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM1.2 8h3.6v13H1.2zM8.2 8h3.5v1.8h.05c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6V21h-3.6v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V21H8.2z",
  },
  { name: "Facebook", href: "https://www.facebook.com/darwishandcoeg", path: "M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z" },
  { name: "Instagram", href: "https://www.instagram.com/darwishandcoeg/", path: "" },
];
