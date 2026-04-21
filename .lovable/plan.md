

## Goal

Make this Lovable project the source of truth for `optimumhealthandwellnessclinic.com` so Google indexes the new content (blog, updated copy, "physician" wording, $70-only pricing) under the correct slugs.

## Slug audit — already aligned

Comparing the live sitemap to this project's router, every URL already matches. **No slug changes needed.**

| Live URL | Lovable Route | Status |
|---|---|---|
| `/` | `/` (Index) | Match |
| `/about` | `/about` (AboutUs) | Match |
| `/services` | `/services` (Services) | Match |
| `/resources` | `/resources` (Resources) | Match |
| `/resources/:slug` | `/resources/:slug` (ArticlePage) | Match |
| `/check-in` | `/check-in` (CheckIn) | Match |
| `/wound-care` | `/wound-care` (WoundCare) | Match |
| `/blog` | `/blog` (Blog) | Match |
| `/blog/why-choose-cash-clinic-pharr-tx` | `/blog/:slug` (BlogPost) | Match |

`public/sitemap.xml` and `public/robots.txt` already point to `https://optimumhealthandwellnessclinic.com/...` — also correct.

## What's actually needed

The reason your live site doesn't show the new changes is that **the custom domain is currently pointing at an older deployment**, not this Lovable project. We need to publish this project and connect the domain.

### Step 1 — Publish this project
Click **Publish** (top-right). This creates a `.lovable.app` URL with all current changes (new Blog, $70 pricing, "physician" wording, fixed nav).

### Step 2 — Connect the custom domain
In **Project Settings → Domains**, add `optimumhealthandwellnessclinic.com` and `www.optimumhealthandwellnessclinic.com`. Lovable will give DNS records (A / CNAME) to set at your domain registrar. Once DNS propagates (usually 15 min – 24 hr), the domain serves this project.

### Step 3 — Verify SEO infrastructure (I'll do this in code)
Once approved, I will:

1. **Confirm `public/sitemap.xml` is complete and accurate** — already correct, no edits needed unless you want to add/remove pages.
2. **Confirm `public/robots.txt` references the correct sitemap URL** — already correct.
3. **Audit `<SEOHead>` canonical URLs across every page** to ensure each page passes `canonicalUrl="https://optimumhealthandwellnessclinic.com/<path>"` so Google attributes the content to the right URL. Today only some pages do this consistently — I'll standardize all of them.
4. **Verify BlogPost.tsx canonical + JSON-LD** uses the production domain (already does).

### Step 4 — Re-submit sitemap to Google
After the domain points at the new build, in **Google Search Console** for `optimumhealthandwellnessclinic.com`, resubmit `https://optimumhealthandwellnessclinic.com/sitemap.xml`. Google will re-crawl and index the new blog post and updated pages within a few days.

## What I will change in code (Step 3 only)

- **`src/pages/Index.tsx`** — add/verify `<SEOHead canonicalUrl="https://optimumhealthandwellnessclinic.com/" />`
- **`src/pages/AboutUs.tsx`** — set canonical `/about`
- **`src/pages/Services.tsx`** — set canonical `/services`
- **`src/pages/Resources.tsx`** — set canonical `/resources`
- **`src/pages/ArticlePage.tsx`** — set canonical `/resources/<slug>`
- **`src/pages/CheckIn.tsx`** — set canonical `/check-in`
- **`src/pages/WoundCare.tsx`** — set canonical `/wound-care`
- **`src/pages/Blog.tsx`** — set canonical `/blog`
- **`src/pages/BlogPost.tsx`** — already correct, just verify

No database changes. No route renames. No slug edits.

## What you need to do (outside Lovable)

1. Click **Publish** in Lovable.
2. Go to **Project Settings → Domains**, add `optimumhealthandwellnessclinic.com`, follow DNS instructions.
3. Wait for DNS propagation.
4. In Google Search Console, resubmit the sitemap.

Once you approve, I'll make the canonical URL fixes in code so everything is airtight for SEO before you publish.

