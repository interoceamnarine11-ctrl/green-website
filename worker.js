// Cloudflare Worker entry point to serve static assets with SPA routing
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      // Try serving static asset directly from Vite build output
      let response = await env.ASSETS.fetch(request);
      
      // If 404 and not a file asset with extension, fallback to index.html for SPA client-side routing
      if (response.status === 404 && !url.pathname.includes('.')) {
        const indexRequest = new Request(new URL('/', request.url), request);
        response = await env.ASSETS.fetch(indexRequest);
      }
      
      return response;
    } catch (err) {
      return new Response('Asset not found', { status: 404 });
    }
  },
};
