# Cloudflare Deployment Guide

## What Caused the Error in Your Log

In your log:
```
✘ [ERROR] A request to the Cloudflare API (/accounts/.../workers/scripts/green-website/versions) failed.
  Invalid _redirects configuration:
  Line 2: Infinite loop detected in this rule. This would cause a redirect to strip `.html` or `/index` and end up triggering this rule again. [code: 100324]
```

### Explanation:
1. **The `_redirects` conflict**:
   When using Cloudflare Workers Static Assets with:
   ```toml
   [assets]
   directory = "./dist"
   not_found_handling = "single-page-application"
   ```
   Cloudflare automatically routes all pages to `index.html`. Having a `_redirects` file with `/* /index.html 200` caused Cloudflare's API validator to detect an infinite loop (since `/index.html` matches `/*`).
2. **Worker Name Mismatch**:
   Cloudflare CI expects the project name to be `"green-website"`.

---

## What We Fixed

1. **Deleted `_redirects`**:
   Cloudflare handles SPA routing automatically using `not_found_handling = "single-page-application"` in `wrangler.toml`.
2. **Updated Worker Name in `wrangler.toml`**:
   Set `name = "green-website"` to match your Cloudflare project name.

---

## Deploy Settings in Cloudflare

Your current build and deploy settings are now aligned:
- **Build command**: `npm run build`
- **Deploy command**: `npx wrangler deploy` (or `npx wrangler deploy --assets=./dist`)

Once you push these changes (`wrangler.toml` updated and `_redirects` removed), Cloudflare will deploy successfully.
