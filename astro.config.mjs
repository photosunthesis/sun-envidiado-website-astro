// @ts-check
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import purgecss from 'astro-purgecss';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://sun-envidiado.com',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  integrations: [sitemap(), mdx(), purgecss()],
  vite: {
    ssr: {
      external: [
        'node:fs/promises',
        'node:url',
        'node:path',
        'node:fs',
        'node:http2',
        'node:buffer',
        'node:crypto',
        'fs',
        'os',
        'path',
        'child_process',
        'crypto',
        'tty',
        'worker_threads',
        'url',
      ],
    },
  },
});