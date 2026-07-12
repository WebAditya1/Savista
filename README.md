# Savista — Precision uPVC Solutions

A modern, production-ready full-stack website for a UPVC doors and windows manufacturer.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, Tailwind CSS v4, Framer Motion |
| Backend | Node.js, Express, MongoDB (Mongoose) |
| Forms | React Hook Form + Zod |
| Email | Nodemailer (HTML templates) |
| Icons | Lucide React |
| SEO | React Helmet Async, sitemap, structured data |

## Project Structure

```
upvc-premium-website/
├── frontend/          # React SPA (deploy to Vercel)
│   ├── src/
│   │   ├── components/   # Atomic UI (animations, home, layout, seo, ui)
│   │   ├── pages/        # Route pages
│   │   ├── services/     # API client
│   │   └── utils/        # Constants, helpers
│   └── public/           # Static assets, sitemap, robots.txt
├── backend/           # Express API (deploy to Render)
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── utils/        # Email templates, mailer, logger
│       └── scripts/      # Database seed
├── shared/            # Shared TypeScript types
├── assets/            # Place your company logo here
└── docs/              # Wireframe, schema, deployment
```

## Quick Start

```bash
# Backend
cd backend && cp .env.example .env && npm install && npm run seed && npm run dev

# Frontend (new terminal)
cd frontend && cp .env.example .env && npm install && npm run dev
```

## Pages

- **Home** — Hero, features, products, stats, process, gallery, testimonials, CTA
- **Products** — Filterable catalogue with search
- **Product Detail** — Gallery, specs, sizes, inquiry CTA
- **About** — Story, mission, manufacturing, team, timeline
- **Contact** — Form with validation, map, business hours
- **FAQ** — Searchable accordion by category
- **Inquiry** — Multi-product quote request with image upload

## API Endpoints

### Public
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | List products (filter: category, search, featured) |
| GET | `/api/products/slug/:slug` | Product by slug |
| GET | `/api/categories` | List categories |
| GET | `/api/gallery` | Gallery items |
| GET | `/api/testimonials` | Testimonials |
| GET | `/api/faqs` | FAQs |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/orders` | Submit order inquiry |

### Admin (requires `X-Api-Key` header)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/dashboard` | Stats + recent enquiries |
| CRUD | `/api/admin/products` | Products management |
| CRUD | `/api/admin/categories` | Categories management |
| CRUD | `/api/admin/gallery` | Gallery management |
| CRUD | `/api/admin/testimonials` | Testimonials management |
| CRUD | `/api/admin/faqs` | FAQ management |
| GET/PATCH | `/api/admin/contacts` | Contact requests |
| GET/PATCH | `/api/admin/orders` | Order requests |

## Customizing Your Brand

1. **Logo:** Replace `frontend/public/logo.svg` with your logo file
2. **Colors:** Update CSS variables in `frontend/src/index.css` (`@theme` block) to match your logo palette
3. **Company info:** Edit `frontend/src/utils/constants.ts`
4. **Email branding:** Update colors in `backend/src/utils/emailTemplates.ts`

## Environment Variables

See `frontend/.env.example` and `backend/.env.example`.

## Documentation

- [UI Wireframe](docs/WIREFRAME.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Demo hosting (Vercel + Render + Atlas)](docs/DEMO-HOSTING.md)

## Future Improvements

- Admin dashboard UI (React admin panel)
- CMS integration (Sanity/Strapi)
- Multi-language support (i18n)
- Live chat / WhatsApp widget
- Product comparison tool
- 3D window configurator
- Customer portal for order tracking
- Image CDN (Cloudinary) for uploads
- Redis caching for API responses
- Automated brochure PDF generation
- Google Analytics / GTM integration
- A/B testing for CTAs
- PWA with offline support

## License

Proprietary — All rights reserved.
