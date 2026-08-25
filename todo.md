
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

## Partner Data Verification & VisionEthics Addition

- [x] Research VisionEthics (visionethics.com) — verified: Malaysia, GRC/anti-corruption advisory
- [x] Verify Widebot data — verified: Egypt, Arabic AI platform, widebot.ai
- [x] Replace all placeholder partners with verified real data (removed unverifiable entries)
- [x] Add VisionEthics as a new corporate partner entry with contact details

## New Consultants Addition

- [x] Extract Sherin Hamouda Ibrahim data from CV PDF
- [x] Extract Teh Chau Chin data from VisionEthics profile PDF
- [x] Add both consultants to Partners page with verified data
- [x] Extract Fouad's data from CV and add as first entry in Partners page

## Techno-Management Partner Addition

- [x] Research techno-management.com and extract verified company data
- [x] Add Techno-Management to Corporate Partners page

## VisionEthics Services Integration

- [x] Research all VisionEthics services from their website (14 services across 4 categories)
- [x] Add VisionEthics services as a new section on the Services page (id="integrity")
- [x] Add Integrity & Anti-Corruption link to Services dropdown in navigation

## Services Page — Remove Malaysia-Specific Legal References

- [x] Remove S17A MACC Act, MACC Adequate Procedures, NACP, GIACC references from all VisionEthics service descriptions
- [x] Rewrite affected descriptions to be universally applicable

## Partner Logos Banner

- [x] Download logos for VisionEthics, WideBot, Techno-Management from their websites
- [x] Upload logos to CDN
- [x] Add partner logos banner section to homepage (below hero, above value proposition)

## Keheilan & New Consultants

- [x] Extract Ahmed Barakat CV data
- [x] Extract Ahmed Mohamed GRC CV data
- [x] Research Keheilan (keheilan.com) — hedge fund & venture capital
- [x] Add Ahmed Barakat to Partners page
- [x] Add Ahmed Mohamed to Partners page
- [x] Add Keheilan to Corporate Partners page
- [x] Add Keheilan logo to homepage partner banner

## Keheilan Logo Update

- [x] Upload official Keheilan logo to CDN
- [x] Replace old screenshot logo URL in Home.tsx and CorporatePartners.tsx

## Training Portal

- [x] Research shared Manus task for training functions and course content
- [x] Build Training Portal page (/training) with 14 courses across 6 categories
- [x] Add Training Academy to Services navigation dropdown and footer

## Fouad Certifications Update

- [ ] Replace placeholder certifications in Fouad's Partners profile with 12 verified credentials across 4 categories (pending — requires Fouad's CV)

## Ahmed Tharwat Certifications Update

- [x] Replace placeholder certifications in Ahmed Mohamed (Ahmed Tharwat)'s Partners profile with 12 verified credentials across 4 categories

## New Consultants — Dr. Amr Fouad & Mohamed Abdel Sattar

- [x] Extract Dr. Amr Fouad CV data from PDF
- [x] Extract Mohamed Abdel Sattar CV data from PDF
- [x] Add both to Partners page with verified data

## Digital Marketing Section (Services / Business Development)

- [x] Add Digital Marketing section to Services page (id="digital-marketing") using Abdelsattar's expertise
- [x] Add Digital Marketing link to Services dropdown in navigation

## Digital Marketing — Subtitle & Homepage Teaser

- [x] Update Digital Marketing section subtitle to include Egyptian, Gulf, MENA and African markets
- [x] Add Digital Marketing teaser section to homepage (3 cards: Strategy, AI Content, Social Media)

## In-Light Tech Partner Addition

- [x] Research in-light.tech — MENA's first consumer panel, 10,500+ respondents, 405 projects
- [x] Download/save In-Light Tech logo from their website
- [x] Upload logo to CDN
- [x] Add In-Light Tech to Corporate Partners page (id=5, Strategic Partner)
- [x] Add In-Light Tech logo to homepage partner banner

## Market Research & Consumer Insights Section

- [x] Add Market Research & Consumer Insights section to Services page (id="market-research")
- [x] Include In Light Consumer Insights partnership attribution badge
- [x] Add stats bar (10,500+ respondents, 405+ projects, MENA coverage, Quant & Qual methods)
- [x] Add 6 service cards: Consumer Research, Brand Health Tracking, Market Entry Research, Competitive Intelligence, Data Analytics, Qualitative Research (FGDs & IDIs)
- [x] Add CTA strip with "Request a Study" and "Visit In Light" buttons
- [x] Add "Market Research & Insights" link to Services dropdown in navigation

## Education Organization Development — Projects Page

- [x] Extract project data from shared Manus task (vF8zzrYg8RWv8X4KzLuqEv)
- [x] Add Education Organization Development section to Projects page (id="education")
- [x] Include 6 service pillars: Organizational Design, QA & Accreditation, HR & Talent, Digital Transformation, Financial Governance, Communications
- [x] Include 4 client segments with descriptions
- [x] Include programme highlights stats (6 pillars, 4 segments, 19+ years, 100% accreditation rate)
- [x] Include results banner with 20-30% cost reduction, 100% accreditation rate, 19+ years, 6 pillars
- [x] Add "Education Organization Development" link to Projects dropdown in navigation
- [x] Update Projects count bar from 2 to 3 active initiatives

## Consultant Partner Addition — Engy Saeed Morsy

- [x] Extract professional profile from CV (Finance & Investment, Capital Markets, Education)
- [x] Add Engy Saeed Morsy Ahmed as partner id 8 to Partners page (displayOrder: 7)
- [x] Title: Finance & Investment Consultant — Financial Analysis & Education
- [x] Include 8 certifications/credentials from CV
- [x] Email contact: engy.saeed@gmail.com

## Homepage Redesign — Video Hero & Strategic Management Focus

- [x] Add Inter font to index.html and index.css body
- [x] Add liquid-glass CSS utility class to index.css
- [x] Rebuild hero section: full-screen video background, liquid-glass navbar, animated character-by-character heading
- [x] Reorder homepage sections: Strategic Management as primary focus (first section after hero)
- [x] Add Supporting Services grid (GRC, HR, Business Dev, Digital & AI)
- [x] Add Projects Teaser section (AI POC + Hebei-Egypt cards)
- [x] Retain Why Darwish & Co, Quote/Image Break, and CTA sections

## SEO Improvements

- [x] Update page title to "Strategic Management & Business Consulting | MENA"
- [x] Add meta description to index.html
- [x] Add Open Graph and Twitter Card meta tags
- [x] Add canonical link tag
- [x] Create sitemap.xml in public/ folder (17 pages)
- [x] Create robots.txt in public/ folder
- [x] Add JSON-LD Organization structured data to index.html
- [x] Add JSON-LD Service ItemList structured data to index.html
- [x] Create Blog page (/blog) with 3 SEO-targeted articles
- [x] Add Blog route to App.tsx
- [x] Add Blog link to main navigation

## Floating WhatsApp Button

- [x] Add floating WhatsApp button (fixed bottom-right, links to +20 110 110 1090)

## SEO Fixes — /about page

- [x] Shorten /about meta description to 50–160 characters (148 chars)
- [x] Add target keywords to /about page content and meta tags

## Smart Solutions — Audex

- [x] Add a new main section named Smart Solutions to the website navigation and homepage structure
- [x] Add an Audex product family subsection under Smart Solutions
- [x] Create three product sections/cards for Audex Compass, Audex Command, and Audex Perfect using the uploaded presentation content
- [x] Style the Smart Solutions / Audex section to match the website while reflecting the Audex presentation visual language
- [x] Validate the new Smart Solutions section and save a checkpoint

## Projects Page — Hide Sections

- [x] Hide Hebei-Egypt Industrial Partnership Portal section from Projects page
- [x] Hide Education Organization Development section from Projects page
- [x] Remove corresponding nav dropdown links for hidden sections

## Smart Solutions — Audex Image Enrichment

- [x] Extract images from Audex.pptx
- [x] Upload Audex images to CDN
- [x] Integrate images into SmartSolutions page (Compass, Command, Perfect sections)

## Logo Replacement

- [x] Upload horizontal logo (text beside emblem) to CDN
- [x] Upload stacked logo (emblem above text) to CDN
- [x] Replace logo in navbar (Layout.tsx) with horizontal variant
- [x] Replace logo in hero nav (Home.tsx) with horizontal variant
- [x] Replace orbital satellite logos (LOGOIN_URL) with stacked variant
- [x] Replace public/images/logo.png (OG/Twitter/JSON-LD) with horizontal variant

## Blog — 3 New Articles

- [x] Find and upload cover images for all 3 articles
- [x] Add Article 1: "When AI Accelerates the Wrong Decision" to blog
- [x] Add Article 2: "AI in MENA Education: When Automation Reinforces Existing Inequality" to blog
- [x] Add Article 3: "AI Does Not Eliminate Institutional Bias—It Can Scale It" to blog
- [x] Ensure individual article detail pages render full content with proper formatting

## Training Academy — Instructor Registration Section

- [x] Read LinkedIn post content for messaging
- [x] Add instructor registration section to Training Academy page with Google Form CTA

## Website Request Email Notifications

- [x] Audit all website request and enquiry submission flows for email notifications
- [x] Ensure every supported request submission emails the Darwish & Co. team
- [x] Add automated test coverage for website request email notifications

## Request Email Delivery Bug

- [x] Diagnose why saved website requests are not delivering notification emails (Resend account is in test mode and does not have a verified sending domain)
- [ ] Fix the email provider configuration or delivery behavior
- [ ] Verify a request notification email can be delivered
- [x] Change the website request notification recipient to darwishandcoeg@gamil.com
