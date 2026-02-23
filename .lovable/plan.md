

## Hero Redesign: Full-Screen Cinematic Image with Text Overlay

Transform the current split-layout hero into an immersive, full-screen image hero with bold text overlaid on a cinematic gradient -- like a movie poster for the clinic.

### What Changes

**Desktop Layout (complete redesign)**
- The hero image (`hero-family-doctor.jpg`) fills the entire section edge-to-edge as a background image
- A dramatic multi-layer gradient overlay (bottom-to-top and left-to-right) darkens the image so white/gold text pops
- All content (badge, headline, subtitle, CTAs, trust indicators) is centered-left over the image
- The floating stat cards (5000+ Patients, 10+ Years, 4.9 Rating) reposition as a horizontal row at the bottom of the hero, sitting on a glass-morphism bar
- Remove the grid/two-column layout, diagonal clip-path, and geometric SVG grid
- Keep the animated gradient orbs and particles as subtle background texture behind the image overlay

**Mobile Layout (adjusted)**
- Image fills the full viewport height behind all content (no separate image + card layout)
- Stronger bottom gradient so the text card area blends seamlessly over the image
- Content card becomes semi-transparent, overlaid at the bottom of the screen
- More dramatic, immersive feel compared to the current stacked approach

**Animations (enhanced)**
- Headline fades up with a slight blur-to-sharp effect (cinematic reveal)
- CTAs slide in from the bottom with a spring bounce
- Stats bar slides up from below the fold
- Subtle Ken Burns (slow zoom) effect on the background image for a living, breathing feel

**What stays the same**
- All text content (headline, subhead, badge, trust indicators, CTAs)
- Bilingual support (EN/ES)
- Animated counters for stats
- Gold accent color scheme and shimmer text effect
- All button links and scroll behaviors

### Technical Details

Only one file changes: `src/components/Hero.tsx`

Key structural changes:
- Replace the two-column `grid` layout with a single full-width container
- Set `heroImage` as a CSS `background-image` with `object-cover` sizing on the section
- Add layered gradient overlays using `absolute` positioned divs
- Reposition stat cards into a horizontal flex row at the bottom
- Add `@keyframes kenBurns` for the slow background zoom (or use framer-motion scale)
- Mobile layout switches from image-then-card to a single full-bleed image with overlaid content

No changes needed to `index.css`, `Index.tsx`, or any other files.
