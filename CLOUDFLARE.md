# Cloudflare Deployment Guide

This project is configured to run smoothly on **both** Cloudflare deployment systems:
1. **Cloudflare Workers (with Static Assets)** via `wrangler deploy`
2. **Cloudflare Pages** via Git integration or `wrangler pages deploy dist`

---

## Explanation of the Error in Your Log

In your log:
```
2026-09-21T11:55:27.963Z Executing user deploy command: npx wrangler deploy
...
✘ [ERROR] Missing entry-point to Worker script or to assets directory
```

When Cloudflare executes `npx wrangler deploy`, Wrangler requires an entry-point file (`main = "..."`) or a defined assets directory (`[assets] directory = "..."`).

---

## What We Configured to Fix This

1. **`worker.js` Entry Point**:
   Added a lightweight, high-performance Worker script that binds to `env.ASSETS` and automatically serves all files from `dist/` with SPA routing (fallback to `index.html` for deep links and sub-routes).

2. **`wrangler.toml`**:
   ```toml
   name = "green-bulk-maritime"
   main = "worker.js"
   compatibility_date = "2024-09-23"
   compatibility_flags = ["nodejs_compat"]

   pages_build_output_dir = "dist"

   [assets]
   directory = "./dist"
   binding = "ASSETS"
   html_handling = "auto-trailing-slash"
   not_found_handling = "single-page-application"
   ```

3. **`vite.config.ts`**:
   Updated to native Node ES modules URL pathing (`fileURLToPath`), removing the `__dirname` warning.

---

## Cloudflare Dashboard Settings

In your Cloudflare Dashboard (**Workers & Pages**):

### If using **Cloudflare Pages** (Recommended):
- **Framework Preset**: `Vite` (or None)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Deploy command**: *(Leave blank or set to `wrangler pages deploy dist`)*

### If using **Cloudflare Workers**:
- **Build command**: `npm run build`
- **Deploy command**: `npx wrangler deploy` (or `npm run deploy`)
- The `worker.js` and `[assets]` directory in `wrangler.toml` will handle everything automatically.
