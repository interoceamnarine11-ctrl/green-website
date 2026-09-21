# Cloudflare Pages Deployment Guide

This application is fully optimized for **Cloudflare Pages**.

---

## Option 1: Direct Cloudflare Dashboard (GitHub / GitLab Integration)

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select your repository.
3. In the **Set up builds and deployments** step, configure:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (default)
4. (Optional) Under **Environment variables**, ensure `NODE_VERSION` is `20` (already set via `.node-version`).
5. Click **Save and Deploy**.

---

## Option 2: Deploy via Cloudflare Wrangler CLI

You can deploy directly from your local terminal using `wrangler`:

```bash
# 1. Build the production bundle
npm run build

# 2. Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=green-bulk-maritime
```

Or using the npm shortcut:
```bash
npm run deploy
```

---

## Pre-Configured Cloudflare Features Included:

- **`public/_redirects`**: Automatically copied to `dist/_redirects` to handle Single Page Application (SPA) routing, deep links, and client-side URL reloads without 404 errors.
- **`public/_headers`**: Provides edge security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) and 1-year immutable caching for all static hashed assets in `/assets/*`.
- **`wrangler.toml`**: Configures the project output directory (`dist`) and Node.js compatibility flags.
- **`.node-version` & `.nvmrc`**: Pins Node.js 20 runtime for Cloudflare Pages build runners.
