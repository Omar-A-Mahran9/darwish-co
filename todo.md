
## Custom Notification System

- [x] Add announcement banner at top of website
- [x] Add toast notifications for visitors (form submission success/error)
- [x] Implement contact form backend API endpoint
- [x] Send owner notification when contact form is submitted
- [x] Test all notification flows (9/9 tests passing)

## Bug Fixes

- [x] Fix contact form: no response/toast shown when message is submitted

## Contact Inbox & Email Forwarding

- [x] Add contact_submissions table to database schema
- [x] Push DB schema migration
- [x] Update /api/contact to save submissions to database
- [x] Add email forwarding via Resend API on form submission
- [x] Build admin Contact Inbox page (view/manage messages)
- [x] Protect inbox with owner-only authentication
- [x] Test full flow end-to-end (9/9 tests passing)

## Admin Inbox Link

- [x] Add discreet admin inbox link to the website footer

## Email Address Updates

- [x] Update Contact page email to info@darwish-co.com
- [x] Update footer email to info@darwish-co.com
- [x] Update contact form email forwarding to info@darwish-co.com
- [x] Update server-side contact handler email address

## Projects Section

- [x] Extract AI POC project data from Manus shared task
- [x] Create /projects page with D&Co design identity
- [x] Add AI POC project card with full details
- [x] Add Projects link to navigation menu

## International Trade Advisor Project Section

- [x] Extract project data from Manus shared task
- [x] Add Hebei-Egypt Industrial Partnership Portal section to Projects page

## Navigation Dropdown Submenus

- [x] Add dropdown submenu to Services nav item (GRC, HR, Business Dev sub-pages)
- [x] Add dropdown submenu to Projects nav item (AI POC, Trade Portal sub-pages)

## Anchor Navigation Fix

- [x] Add id="grc", id="hr", id="bizdev", id="strategy" to Services page sections
- [x] Add id="ai-poc", id="trade-portal" to Projects page sections
- [x] Ensure smooth scroll works for hash navigation
- [x] Fix mobile "Get Started" button to navigate to /contact

## Homepage Projects Teaser

- [x] Add two-card Projects preview section to Home page (AI POC + Hebei-Egypt)

## Hash Anchor Navigation Fix

- [x] Create useHashScroll hook that scrolls to anchor after page navigation
- [x] Wire hook into App.tsx so it fires on every route change
- [x] Fix dropdown links to correctly navigate cross-page with hash
- [x] Add scroll-margin-top offset to all anchor sections (accounts for sticky header)

## Partners & Corporate Partners Sections

- [x] Add partners and corporatePartners tables to Drizzle schema
- [x] Add API procedures to fetch partners and corporate partners
- [x] Run pnpm db:push to migrate schema
- [x] Build Partners & Consultants page (individual professionals)
- [x] Build Corporate Partners & Licences page (organisations)
- [x] Add navigation links for both new pages
- [x] Add footer links for both new pages
