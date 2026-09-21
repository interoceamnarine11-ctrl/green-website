# Cloudflare Deployment Guide

This application is configured for both **Cloudflare Workers (Static Assets)** and **Cloudflare Pages**.

---

## What was resolved from the build log

Your build log showed:
```
Executing user deploy command: npx wrangler deploy
▲ [WARNING] It seems that you have run `wrangler deploy` on a Pages project...
✘ [ERROR] Missing entry-point to Worker script or to assets directory
```

**Root Cause:**
When deploying with `npx wrangler deploy` (Wrangler v4 Workers with Static Assets), Wrangler requires the `[assets]` block in `wrangler.toml` specifying the directory where Vite generated files (`./dist`).

**Resolution:**
We added the `[assets]` block to `wrangler.toml`:
```toml
[assets]
directory = "./dist"
html_handling = "auto-trailing-slash"
not_found_handling = "single-page-application"
```

Now `npx wrangler deploy` knows exactly where `./dist` is and deploys all static assets with automatic Single-Page Application (SPA) routing.

---

## Deployment Options

### Option 1: Cloudflare Dashboard CI (Git Connected)

Whenever your repository builds on Cloudflare:
- **Build command**: `npm run build`
- **Deploy command**: `npx wrangler deploy` (or automatic Pages deploy)
- **Output / assets directory**: `dist`
- **Node version**: Automatically set to `20` via `.node-version`

### Option 2: Terminal Deployment

**For Cloudflare Workers (Static Assets):**
```bash
npm run build
npx wrangler deploy
```
*(or simply `npm run deploy`)*

**For Cloudflare Pages:**
```bash
npm run build
npx wrangler pages deploy dist --project-name=green-bulk-maritime
```
*(or `npm run deploy:pages`)*

---

## Features Included in This Project

- **`wrangler.toml`**: Configured with `[assets] directory = "./dist"` and `not_found_handling = "single-page-application"`.
- **`public/_redirects`**: Copied to `dist/_redirects` for Cloudflare Pages SPA rewrite (`/* /index.html 200`).
- **`public/_headers`**: Copied to `dist/_headers` for edge security headers (`X-Frame-Options`, `X-Content-Type-Options`) and immutable caching on `/assets/*`.
- **`vite.config.ts`**: Clean native ES module path resolution without legacy `__dirname` warnings.
