# UI Wireframe

## Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  STICKY NAV (transparent → solid on scroll)             │
│  Logo | Home Products About FAQ Contact | [Request Quote]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  PAGE CONTENT (varies per route)                        │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  FOOTER: Links | Contact | Map | Social | Copyright     │
└─────────────────────────────────────────────────────────┘
```

## Homepage Sections (top → bottom)

1. **Hero** — Full-viewport parallax background, headline, dual CTAs, scroll indicator
2. **Why Choose Us** — 3×2 grid of icon cards (premium quality, weather, energy, etc.)
3. **Products Preview** — 4-column product cards with hover lift
4. **Statistics** — Animated counters on gradient band
5. **Process Timeline** — 5-step horizontal timeline (consultation → support)
6. **Gallery Preview** — Masonry-style image grid
7. **Testimonials** — 3-column quote cards with star ratings
8. **Brands** — Partner logo/name strip
9. **CTA Banner** — Gradient card with quote + contact buttons

## Product Catalogue

- Left sidebar: search + category filters
- Right grid: product cards (image, category tag, title, excerpt, link)
- Detail page: 2-column (gallery left, info right) + spec cards below

## About Page

- Hero band → Story (text + image) → Mission/Vision → Manufacturing steps
- Quality badges → Team grid → Vertical timeline

## Contact Page

- 60/40 split: form (left) + contact cards + map (right)

## FAQ Page

- Search bar + category pills
- Accordion list with smooth expand/collapse

## Inquiry Page

- Single-column form: contact details → dynamic product rows → image upload → submit

## Design Tokens (from logo palette)

| Token | Value | Usage |
|-------|-------|-------|
| brand-600 | #0B3D5C | Primary navy |
| brand-400 | #1A8FC4 | Accent blue |
| accent-500 | #C9A227 | Gold highlights |
| surface | #F8FAFC | Section backgrounds |

## Typography

- **Display:** DM Sans (headings)
- **Body:** Inter (paragraphs, UI)

## Responsive Breakpoints

- Mobile: < 640px (single column, drawer nav)
- Tablet: 640–1024px (2-column grids)
- Desktop: > 1024px (full layout, sticky sidebar)
