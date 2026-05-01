# Craft Distillery Finder — CLAUDE.md

> Source of truth for Claude Code on this project. Last updated: 2026-04-30

## Project Identity

- **Site**: Craft Distillery Finder
- **Domain**: craftdistilleryfinder.com
- **Purpose**: Location finder for craft distilleries across the United States
- **Type**: utility-site (ad-supported location directory)
- **Compliance Tier**: Standard

## Tech Stack

- **Framework**: Next.js | **Deployment**: Vercel | **Language**: TypeScript | **Styling**: Tailwind CSS | **Package Manager**: npm

## 1. AdSense & Monetization

- **Publisher ID**: `ca-pub-7171402107622932`
- **ads.txt**: `google.com, pub-7171402107622932, DIRECT, f08c47fec0942fa0`
- Ads must never dominate content

## 2. SEO

- SSR/SSG required for all pages
- Each distillery page: name, location, spirits produced, tasting room hours, tours available
- CRITICAL: All alcohol-related content must include age-gating or age disclaimer ("21+ only") where legally required

## 3. Core Web Vitals

- **LCP** ≤ 2.5s | **INP** ≤ 200ms | **CLS** ≤ 0.1

## 4. E-E-A-T

- Attribution: "Built by an experienced web developer" — no personal name
- IMPORTANT: Do not make health claims about alcohol. Factual directory content only.

## 5. Structured Data

- Organization, WebSite, LocalBusiness (per distillery), BreadcrumbList
- LocalBusiness: include amenity info (tasting room, tours, retail)

## 6. Mobile-First

- Touch targets 48px+, body text 16px+, responsive

## 7. Bing Optimization

- meta keywords on all pages, SSR mandatory, IndexNow on deploy

## 8. GEO / AI

- `/llms.txt` at root
- Standard AI crawler allow/block rules in robots.txt

## 9. Privacy & Consent

- `/privacy` and `/terms` required
- Age verification consideration: consult legal before implementing any form of age-gating

## 10. Accessibility (WCAG 2.1 AA)

- Alt text, keyboard nav, skip links, color contrast

## 11. Security Headers

Standard Empire security headers (see allskateparks.com CLAUDE.md for full spec)

## 12. Sitemaps & Metadata

- Sitemap via `app/sitemap.ts`, submit to GSC and Bing WMT

## Cross-Site Links

Footer: all sister sites (excluding self)

## Deployment

Vercel | main branch | `npm run build` | Env: INDEXNOW_API_KEY

## Warnings

Standard Empire warnings + Never make health claims about alcohol products
