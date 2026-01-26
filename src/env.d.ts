/// <reference path="../.astro/types.d.ts" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {
    // Add other local properties here if needed
  }
}

interface Env {
  RESEND_API_KEY: string;
  JWT_SECRET: string;
  PUBLIC_SITE_URL: string;
  BLOG_SEGMENT_ID: string;
}
