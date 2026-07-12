# Client demo hosting (free tier)

Two options: **share a link in 2 minutes** (temporary) or **permanent URL** (20 minutes setup).

---

## Option A — Instant demo link (today, temporary)

Works while your laptop is on and servers are running. Good for a quick client call.

```bash
# Terminal 1 — backend (if not already running)
cd backend && npm run dev

# Terminal 2 — frontend (if not already running)
cd frontend && npm run dev

# Terminal 3 — public tunnel to frontend
npx localtunnel --port 5173
```

Copy the `https://….loca.lt` URL and send it to your client.

**Note:** First visit may show a LocalTunnel reminder page — click through to continue. API calls are proxied via Vite to your local backend.

---

## Option B — Permanent demo (recommended for client)

**Stack:** Vercel (frontend) + Render (backend) + MongoDB Atlas (database) — all have free tiers.

### Step 1 — MongoDB Atlas (5 min)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) → create free **M0** cluster.
2. **Database Access** → add user + password.
3. **Network Access** → **Allow access from anywhere** (`0.0.0.0/0`) for demo.
4. **Connect** → copy connection string, e.g.  
   `mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/savista?retryWrites=true&w=majority`

### Step 2 — Push code to GitHub

```bash
cd upvc-premium-website
git init   # if not already a repo
git add .
git commit -m "Savista UPVC demo site"
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USER/savista-upvc.git
git push -u origin main
```

### Step 3 — Deploy backend on Render (10 min)

1. [dashboard.render.com](https://dashboard.render.com) → **New** → **Blueprint**.
2. Connect your GitHub repo (uses `render.yaml` in project root).
3. Set secrets when prompted:
   - `MONGODB_URI` — Atlas connection string from Step 1
   - `FRONTEND_URL` — leave blank for now; update after Vercel deploy (e.g. `https://savista-demo.vercel.app`)
   - `ADMIN_EMAIL` — your email (form notifications)
   - `SMTP_USER` / `SMTP_PASS` — optional for demo (forms save to DB even without email)
4. After deploy, note API URL: `https://savista-api.onrender.com`
5. **Seed the database** (Render Shell or locally with production URI):
   ```bash
   cd backend
   MONGODB_URI="your-atlas-uri" npm run seed
   ```

### Step 4 — Deploy frontend on Vercel (5 min)

1. [vercel.com](https://vercel.com) → **Add New Project** → import GitHub repo.
2. **Root Directory:** `frontend`
3. **Environment variables:**
   ```
   VITE_API_URL=https://savista-api.onrender.com/api
   VITE_SITE_URL=https://YOUR-PROJECT.vercel.app
   ```
4. Deploy.

### Step 5 — Finish CORS

In Render → savista-api → **Environment** → set:

```
FRONTEND_URL=https://YOUR-PROJECT.vercel.app
```

Redeploy backend (or it may pick up on next request).

---

## Demo checklist for client

- [ ] Home, Products, Product detail load with real data
- [ ] Quote cart + inquiry form works
- [ ] Contact form submits (check MongoDB or email if SMTP set)
- [ ] Mobile layout looks good
- [ ] Share Vercel URL: `https://YOUR-PROJECT.vercel.app`

---

## Render free tier note

Backend may **sleep after ~15 min idle**. First page load after sleep can take 30–60 seconds. Tell the client to wait on first open, or upgrade Render for always-on.

---

## Custom domain (later)

- **Vercel:** Project → Settings → Domains → add `savista.in`
- **Render:** Service → Settings → Custom Domain → `api.savista.in`
- Update `VITE_API_URL` and `FRONTEND_URL` accordingly.
