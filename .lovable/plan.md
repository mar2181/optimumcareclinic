

## Internal Linking Audit

### What's working well
- **Navbar** links to `/services`, `/resources`, `/blog` (desktop + mobile)
- **PricingTable** CTA → `/services`
- **BlogPost** has back link → `/blog`
- **ArticlePage** has back link → `/resources`
- **MobileBottomNav** links to `/resources`
- Sitemap.xml lists every page

### Gaps hurting SEO and indexing speed
1. **Footer Quick Links use `#hash` scrolls** instead of real `<Link>` URLs — Google sees these as one page, not separate pages. No links to `/about`, `/blog`, `/wound-care`, `/services`, `/resources` from the footer.
2. **Homepage has zero text links to `/blog`, `/about`, `/wound-care`, or `/resources`** outside the navbar. Google heavily weights body-content links over nav links.
3. **Blog posts are orphaned** — only reachable from `/blog`. No homepage preview, no contextual links from `/services` or `/wound-care`.
4. **No "related articles" or cross-linking** between blog posts and resources.
5. **Wound Care page** doesn't link out to `/services`, `/blog`, or `/check-in`.
6. **Services page** doesn't link to `/wound-care`, `/blog`, or `/check-in` from individual service cards (only the wound-care card on the homepage `ServiceGrid` links).
7. **Logo uses `<a href="/">`** instead of React Router `<Link>` — causes a full page reload (slower, breaks SPA crawling).
8. **Blog post body** has only a single CTA to `/check-in`. No links to `/services`, `/wound-care`, or related articles.

## The Plan

### 1. Fix the Footer (biggest SEO win)
Replace the `#hash` scroll links with a proper sitemap-style footer:

```text
QUICK LINKS         SERVICES              READ
- Home (/)          - All Services        - Blog
- About Us          - Wound Care          - Health Hub
- Check In          - Sick Visits         - Latest Post
- Contact           - Chronic Care
```

Every link a real `<Link to="/...">`. This gives every page an inbound link from every other page — exactly what Google wants.

### 2. Add a "Latest from the Blog" section to the homepage
Insert between `WhyChooseUs` and `TestimonialsSection`. Pulls 3 most recent blog posts, each card links to `/blog/:slug`. Bonus: a "View all articles →" link to `/blog`. This is the single biggest fix for getting blog posts indexed quickly.

### 3. Add a "Related Articles" section to BlogPost.tsx
Below the CTA card, query 2–3 other blog posts (excluding current). Each links to `/blog/:slug`. Keeps users on-site and creates a link graph between posts.

### 4. Add contextual cross-links inside content
- **Wound Care page**: add a "See all our services" link → `/services` and a "Learn why patients choose us" link → `/blog/why-choose-cash-clinic-pharr-tx`
- **Services page**: add a "Need wound care?" callout → `/wound-care` and "Read our blog" → `/blog`
- **Blog post body**: render a small "Related: [Wound Care Services](/wound-care) | [Check In](/check-in)" line inside the article CTA section

### 5. Make every service card clickable on the homepage
Currently only the wound-care card has a link. Wrap each `ServiceGrid` card in a `<Link to="/services">` (or future per-service slugs) so the homepage funnels traffic into `/services`.

### 6. Convert Navbar logo `<a href="/">` to `<Link to="/">`
Small but matters — keeps SPA navigation and avoids full reloads when crawled.

### 7. Add About Us to navigation
Currently `/about` exists but is **not linked from the navbar**. Add it to desktop + mobile nav and footer. Orphan pages don't rank.

### Files to be edited
- `src/components/Footer.tsx` — rebuild Quick Links column with real `<Link>`s, add Services + Read columns
- `src/components/Navbar.tsx` — convert logo to `<Link>`, add About Us link
- `src/components/MobileBottomNav.tsx` — add Blog link
- `src/components/ServiceGrid.tsx` — wrap each card in `<Link to="/services">`
- `src/pages/Index.tsx` — insert new `<LatestFromBlog />` section
- `src/components/LatestFromBlog.tsx` — **NEW** component, queries 3 latest posts
- `src/pages/BlogPost.tsx` — add Related Articles section + inline contextual links
- `src/pages/WoundCare.tsx` — add cross-links to `/services` and `/blog`
- `src/pages/Services.tsx` — add cross-link callout to `/wound-care` and `/blog`

### Expected SEO impact
- Every page gains 4–8 new inbound internal links → faster Google discovery
- Blog posts go from orphaned (1 inbound link from `/blog` only) to **5+ inbound links** (homepage, footer, related posts, contextual links)
- Logo + footer fixes give every page a clean link from every other page
- Faster indexing of new blog posts (homepage signals freshness to Google)

No database changes, no schema changes, no slug changes. All routes already exist.

