---
layout: ../../layouts/BlogLayout.astro
title: "How I rebuilt my personal site with Astro"
pubDate: "2025-09-19"
description: "Why I chose Astro, how I set this site up, tips and small examples — written from the perspective of someone coming from Flutter."
tags: ["astro", "guide", "webdev", "migration", "react", "flutter"]
slug: rebuilt-my-site-with-astro
---

# How I rebuilt my personal site with Astro

I originally built my website with Flutter. It worked fine, but after a while I thought — hey, maybe it's time I go back to proper web development. Big mistake... or so I thought.

## The React nightmare

First, I tried React. Holy shit, has that ecosystem gotten complicated since I last touched web development years ago. Coming from Flutter land, I figured web dev would be familiar territory again. Wrong.

`useEffect`, `useState`, tRPC, React Router — my head was spinning trying to catch up with all the new patterns and "best practices." What used to be simple suddenly felt like I needed a PhD in JavaScript frameworks just to render a page.

But wait, it gets worse. Apparently React Router is old news now? There's TanStack Router. Or maybe I should use Next.js? But then everyone's talking about Remix. Or wait, should I go with Vite? What about server components? Client components? 

A framework... for a framework. Let that sink in. I know React calls itself a UI library and whatever, not an actual framework, but still damn — it has frameworks built on top of it. Like, frameworks within the React ecosystem. Next.js for full-stack. Remix for web standards. Gatsby for static sites (but that's apparently dead now?). Vite for build tooling. TanStack for routing and state management.

Look, I know this website is relatively small for React — it's not like I'm building the next Facebook. But I thought it would still work fine. I spent weeks fighting with hooks, dependency arrays, and trying to understand why my components were re-rendering 47 times. Then I'd finally fix that, only to discover I needed to choose between a dozen different state management solutions. Redux? Zustand? Jotai? Context? Just `useState` everywhere? 

And don't get me started on the build tooling rabbit hole. Webpack? Vite? Turbopack? ESBuild? The JavaScript fatigue is real. I just wanted to build a simple website, not architect a microservices platform for NASA.

It was exhausting. Every tutorial assumed I knew the latest meta-framework du jour, and every solution introduced three new problems I didn't know I had.

Look, I'm sure React devs are going to hate me for this take, but I think my frustration is totally valid. When did building a simple website become this complicated? I shouldn't need to make 47 architectural decisions just to display some text and images.

## Then I found Astro

After getting frustrated with React's complexity, I stumbled across Astro. The promise was simple: write less JavaScript, ship faster sites. I was skeptical, but desperate enough to try anything.

Honestly? I was shocked. I had a working site in just a few days. Not weeks of configuration hell — *days*.

## What actually worked

Here's what I did, in a sentence: followed the Astro docs, organized my content into Markdown files, and built simple layouts. That's it.

## How this thing is organized

Looking at my project structure, here's what made sense:

- **`src/pages/`** — Every `.astro` or `.md` file here becomes a route automatically. No router config needed.
- **`src/layouts/`** — Site shells like `BlogLayout.astro` and `BaseLayout.astro` that wrap my content.
- **`src/components/`** — Small UI pieces (`CommandBar.astro`, `SpinningSunAsciiArt.astro`, etc.).
- **`public/`** — Static files (favicons, fonts) that get served as-is.

The markdown frontmatter + layouts combo is *chef's kiss*. I write posts in markdown, add some metadata at the top, and the layout handles the rest. No more wrestling with component state for static content.

## Why Astro clicked for me

- **Zero JavaScript by default** — Pages are static HTML unless I explicitly add interactivity.
- **Islands architecture** — I can sprinkle in interactive components only where needed.
- **Markdown-first** — Perfect for content sites. No fighting with MDX or complex setups.
- **Fast dev experience** — Hot reload that actually works, builds that don't take forever.

## My takeaways

Coming from Flutter and then bouncing off React, Astro felt like a breath of fresh air. It's not trying to be everything to everyone — it's focused on making content sites fast and easy to build.

If you're tired of JavaScript framework fatigue and just want to ship something that works, give Astro a shot. The learning curve is refreshingly gentle.

Quick tips that helped me:
- Think in terms of pages + layouts, not a giant single-page app
- Put static assets in `public/` and reference them with absolute paths like `/fonts/...`
- Only use `client:*` directives when you actually need JavaScript

The repo for this site is on GitHub if you want to see the actual code: <a href="https://github.com/photosunthesis/sun-envidiado-website-astro" target="_blank" rel="noopener noreferrer">photosunthesis/sun-envidiado-website-astro</a>

That's it — sometimes the best tools are the ones that get out of your way and let you focus on what you're actually building.