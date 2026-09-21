# Cloudflare Deployment Guide

## What Caused the Error

```
✘ [ERROR] Processing wrangler.toml configuration:
    - The name 'ASSETS' is reserved in Pages projects. Please use a different name for your Assets binding.
```

### Why This Happened:
In Cloudflare Pages, Cloudflare automatically injects and manages a reserved internal binding named `ASSETS` to serve your static files from `dist`. 

When `wrangler.toml` had:
```toml
binding = "ASSETS" # <-- Cloudflare Pages reserves this identifier!
```
Wrangler stopped because custom bindings in a Pages project cannot be named `ASSETS`.

---

## What We Fixed in the Code

1. **Removed `binding = "ASSETS"` from `wrangler.toml`**:
   `wrangler.toml` is now streamlined for Pages:
   ```toml
   name = "green-bulk-maritime"
   pages_build_output_dir = "dist"
   compatibility_date = "2024-09-23"
   compatibility_flags = ["nodejs_compat"]

   [assets]
   directory = "./dist"
   html_handling = "auto-trailing-slash"
   not_found_handling = "single-page-application"
   ```

2. **Removed `worker.js`**:
   Cloudflare Pages serves the compiled Vite assets directly from `dist/` with edge caching and SPA fallback without needing a custom worker script.

3. **Updated `package.json` deploy command**:
   ```json
   "deploy": "wrangler pages deploy dist"
   ```

---

## Action Needed in Your Cloudflare Dashboard

In your Cloudflare Dashboard (**Build settings**):

1. **Deploy command**:
   Change it to:
   ```bash
   npx wrangler pages deploy dist
   ```
   *(Or simply **clear/delete** the text in the "Deploy command" box, because Cloudflare Pages automatically deploys the output directory `dist` by default without needing a custom deploy command).*

2. **Push the updated files** (`wrangler.toml`, `package.json`) to your GitHub repository.
