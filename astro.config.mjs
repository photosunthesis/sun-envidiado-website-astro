// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://sun-envidiado.com',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  integrations: [sitemap(), mdx()],
});