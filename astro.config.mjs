// @ts-check
import { defineConfig } from 'astro/config';


// https://astro.build/config
export default defineConfig({
  // Preferred canonical site origin. Astro uses this when resolving absolute
  // URLs for RSS, sitemap, and any APIs that need the site origin.
  site: "https://sun-envidiado.com",
  // No integrations required for this site; React integration removed.
  integrations: []
});