---
layout: ../../layouts/BlogLayout.astro
title: "How I rebuilt my personal site with Astro"
pubDate: "2025-09-19"
description: "Why I chose Astro, how I set this site up, tips and small examples — written from the perspective of someone coming from Flutter."
tags: ["astro", "guide", "webdev", "migration", "react", "flutter"]
slug: rebuilt-my-site-with-astro
---

# How I rebuilt my personal site with Astro

I originally built my website with Flutter. And look, Flutter is great for mobile apps — I genuinely love it for that. On the web, performance can actually be fine for many pages, but there are practical snags: a lot of packages don't target web, code that relies on `dart:io` needs separate handling or replacement, rendering simple images sometimes behaves oddly, and markdown workflows feel awkward compared to the web ecosystem. SEO in particular is still a real pain. Those practical limits made maintaining a content-focused site more work than I wanted.

So I decided it was time to do this properly and go back to actual web development. How hard could it be, right?

## The React reality check

Since I was coming from Flutter, I figured I'd try React. I mean, everyone uses it, the job market loves it, seemed like the obvious choice.

Big mistake. 

Maybe this is just a "me" problem, but holy hell, has the React ecosystem gotten overwhelming. I spent more time researching what I should use than actually building anything. When you're coming from a different framework or language - especially something as opinionated as Flutter - the sheer number of decisions you have to make is paralyzing.react

First I have to pick a builder like Vite or esbuild, then a framework like Next.js, Remix, or TanStack. Then there are routing libraries (React Router vs TanStack Router), API patterns (tRPC vs REST vs GraphQL), React Server Components and client/server component models, state managers and data-fetching patterns, TypeScript configs, and a dozen linters/formatters. Add JavaScript/TypeScript quirks and tooling footguns, and the decisions stack up before I’ve written a single line of markup. On top of that, React’s hooks model — `useState`, `useEffect`, dependency arrays and rerenders — has its own learning curve. Ensuring effects run correctly, avoiding stale closures, and preventing unnecessary re-renders is extra cognitive overhead for tiny interactive bits.

Coming from Flutter — which tends to have a recommended way and a coherent toolchain — all of that felt needlessly fragmented for a simple personal site.

Look, I'm sure React is powerful. I'm sure once you know the ecosystem inside and out, it's great. But for someone just trying to rebuild their personal site? The learning curve felt unnecessarily steep.

## Enter Astro

After getting frustrated with React's complexity (and my Flutter web site continuing to load like it's 2003), I stumbled across Astro through a random Hacker News thread.

The pitch was simple: write HTML and CSS like it's 2010, but with modern tooling. Less JavaScript, faster sites. Ship actual HTML instead of a JavaScript app that renders HTML.

I was skeptical - I've been burned by "simple" frameworks before. But I was also desperate to get off Flutter web, so I gave it a shot.

Honestly? I had a working site in three days. Not three weeks of figuring out the "right" way to structure a React app. Three actual days.

## What I actually built

My setup ended up being stupidly simple:

- **`src/pages/`** - Every `.astro` or `.md` file becomes a page automatically. No routing configuration, no file-based routing setup, just files.
- **`src/layouts/`** - Basic templates like `BlogLayout.astro` that wrap my content
- **`src/components/`** - Small reusable pieces when I need them
- **`public/`** - Static assets that get served directly

The killer feature for me was being able to write blog posts in actual Markdown. No JSX, no components for every paragraph, just markdown with a bit of frontmatter at the top. The layout handles everything else automatically.

```markdown
---
title: "My Post"
date: "2025-09-19"
---

# This is just markdown

And it works exactly like you'd expect.
```

That's it. No wrestling with MDX, no figuring out how to parse markdown in React, no complex build steps.

## Why Astro worked for me

The main thing is that Astro doesn't try to be everything. It's specifically designed for content sites, which is exactly what I needed.

- **Starts with static HTML** - My pages load instantly because they're just HTML and CSS
- **JavaScript only when needed** - I can add interactive components only where it makes sense
- **Markdown just works** - No plugins, no configuration, just write markdown
- **Fast development** - Hot reload actually works, builds are quick

The "islands architecture" thing sounds fancy, but really it just means I can add a React component here and there if I need something interactive, without turning my entire site into a JavaScript app.

## The honest truth

Coming from Flutter and bouncing off React, Astro felt like someone finally built a web framework for people who just want to build websites, not JavaScript applications that happen to run in browsers.

Is it perfect? No. Is it the right choice for every project? Definitely not. But for a personal site with some blog posts and maybe a few interactive elements? It's exactly what I needed.

If you're also frustrated with Flutter web (seriously, why is the bundle size so huge??) or getting overwhelmed by the React ecosystem, maybe give Astro a try. The worst that happens is you waste a weekend, but you might end up with a site that actually loads fast.

The code for this site is on GitHub if you want to see how simple it really is: [photosunthesis/sun-envidiado-website-astro](https://github.com/photosunthesis/sun-envidiado-website-astro)

Sometimes the best tool is the one that just gets out of your way.