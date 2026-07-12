# Deployment Guide

## Prerequisites

- Node.js 20+
- MongoDB (Atlas recommended for production)
- SMTP credentials (Gmail App Password, SendGrid, or AWS SES)

---

## Frontend — Vercel

1. Push `frontend/` to GitHub/Bitbucket
2. Import project in [Vercel](https://vercel.com)
3. Set root directory to `frontend`
4. Environment variables:
   ```
   VITE_API_URL=https://your-api.onrender.com/api
   VITE_SITE_URL=https://your-domain.com
   ```
5. Deploy — Vercel auto-detects Vite

`vercel.json` handles SPA routing.

---

## Backend — Render

1. Create **Web Service** on [Render](https://render.com)
2. Root directory: `backend`
3. Build: `npm install && npm run build`
4. Start: `npm start`
5. Environment variables (from `.env.example`):
   - `MONGODB_URI` — MongoDB Atlas connection string
   - `FRONTEND_URL` — Your Vercel domain
   - `ADMIN_API_KEY` — Strong random key
   - `SMTP_*` — Email credentials
   - `ADMIN_EMAIL` — Notification recipient

6. After deploy, run seed once:
   ```bash
   npm run seed
   ```

### Backend — AWS (Alternative)

- **ECS/Fargate** or **EC2** with PM2
- **MongoDB Atlas** for database
- **ALB** with HTTPS (ACM certificate)
- Store secrets in **AWS Secrets Manager**

---

## MongoDB Atlas Setup

1. Create free M0 cluster
2. Database Access → create user
3. Network Access → allow `0.0.0.0/0` (or restrict to Render IPs)
4. Copy connection string to `MONGODB_URI`

---

## Post-Deploy Checklist

- [ ] Run `npm run seed` on backend
- [ ] Replace `frontend/public/logo.svg` with your logo
- [ ] Update theme colors in `frontend/src/index.css` to match logo
- [ ] Update `COMPANY` info in `frontend/src/utils/constants.ts`
- [ ] Update `sitemap.xml` and `robots.txt` with production domain
- [ ] Test contact form email delivery
- [ ] Test inquiry/order email flow
- [ ] Verify CORS allows frontend domain

---

## Local Development

```bash
# Terminal 1 — MongoDB (or use Atlas)
mongod

# Terminal 2 — Backend
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev

# Terminal 3 — Frontend
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

---

## Future Improvements

See README.md § Future Improvements
