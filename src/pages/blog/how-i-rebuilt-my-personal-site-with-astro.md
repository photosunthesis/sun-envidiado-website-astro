---
layout: ../../layouts/BaseLayout.astro
title: "How I rebuilt my personal site with Astro"
pubDate: "2025-09-19"
description: "A Flutter developer's journey through React's complexity to building a fast, content-focused personal site with Astro."
tags: ["astro", "webdev", "content-site", "flutter-to-web", "personal-site"]
---

I originally built my website with Flutter. Just a simple home page, about, and contact. Nothing fancy. I had plans to add a blog section but never got around to it.

Flutter's great for mobile apps, but on the web it has some rough edges: packages that don't support web, `dart:io` compatibility issues, weird image rendering quirks, and SEO that's more trouble than it's worth. For a simple content site, these friction points added up. Time to rebuild it with actual web technologies.

## Trying React

So naturally, React came to mind first. When you think "web development," you think React. It's everywhere, every job posting wants it, every tutorial assumes you're using it. Back when I did web dev, I worked with Vue.js and did a bunch of PHP/Laravel stuff, but React still felt like the obvious first choice. Everyone's using it, so I figured I might be missing out on something.

Turns out it's way more complex than I expected.

React has this mental model where you're constantly thinking about renders, dependencies, when effects run, what causes what to update. For something as simple as "show some text on a page," you're managing state and lifecycle hooks. Coming from Flutter, I knew there'd be a learning curve, but damn, the conceptual overhead was heavier than I thought.

And that's before you even get to the ecosystem. The number of decisions you have to make before writing any actual code caught me off guard: bundler, framework, router, state management, TypeScript config, linting, formatting. Each one has like five "right" answers depending on who you ask.

I ended up spending days reading about the "correct" way to structure a React app instead of just building a website. Back when I did web dev, you just... made a website. The modern tooling is powerful for sure, but man, there's a lot of upfront complexity.

## Finding Astro

So I gave up on React and started looking for alternatives. I found Astro mentioned in some random Reddit comment, someone describing it as "just write HTML and CSS with modern tooling." The pitch was simple: ship actual HTML pages instead of JavaScript apps that render HTML.

Sounded almost too simple, but I figured I'd give it a shot.

A weekend later, I had a working site with the blog section I'd been putting off for months.

## What I ended up with

The project structure is straightforward — here's a compact directory example:

```text
src/
├─ pages/
│   ├─ index.astro      # homepage
│   ├─ blog/            # blog posts
│   │   └─ my-post.md 
│   └─ ...              # other pages (about, etc.)
├─ layouts/
│   └─ BaseLayout.astro # all pages use this
├─ components/          # reusable UI components
└─ styles/              # SCSS styles
```

The killer feature for me: blog posts are just markdown files with frontmatter. No JSX, no components for paragraphs, no complex setup.

```markdown
---
title: "My Post"
date: "2025-09-19"
description: "Just a regular blog post"
tags: ["web", "astro"]
---

# This is just markdown

And it works exactly like you'd expect.
```

That top YAML block (the lines between the `---` markers) is called "frontmatter." It stores metadata like title, date, description, tags, and any other fields your templates or build tools might need. Astro reads those values automatically so your layout can display the title, sort posts by date, or filter by tags without extra code.

Pages use `layouts/BaseLayout.astro`. Styles are in the styles directory. `_base.scss` for core rules, `main.scss` for imports and color variables, and page partials such as `_index.scss` and `_blog.scss`. Complex pages get their own SCSS files; simple pages reuse shared partials to keep CSS small.

Astro automatically generates pages from these Markdown files, treats the frontmatter as metadata, and exposes those fields to layouts and collection queries, which makes writing and publishing posts fast and low-friction.

## Why it works for my specific needs

Astro just happened to match what I was actually trying to build: a simple personal site with a blog. I'm not building some complex app with tons of interactivity, so the HTML-first approach made way more sense. Pages load as actual HTML and CSS, with JavaScript only where I explicitly add it.

The content collections feature is basically designed for sites like this. Blogs, portfolios, documentation, and the like. I can define a schema for my posts, get TypeScript autocompletion, and Astro handles all the page generation automatically.

Coming back to web dev after years in Flutter land and getting overwhelmed by React's ecosystem, having fewer decisions to make was exactly what I needed. I could actually focus on writing content and building pages instead of spending days configuring build tools.

The dev experience is also just smooth for content sites. Hot reload works properly, builds are fast, and I'm not fighting the framework to do basic stuff like adding a new blog post or tweaking a layout.

## Final thoughts

Going into this, I thought React would just... work. That I'd pick it up quickly and have a site running in no time. Turns out that's not really how it goes.

But here's the thing. React isn't bad. It's just that maybe we shouldn't default to "React first" for every web project. The right tool depends on what you're actually building:

- Building a big interactive app with complex state? Use React (or Vue, Svelte, whatever).
- Building a blog or portfolio site like this one? Use Astro.
- Building for Flutter web? Honestly, I don't know who actually uses Flutter web. Maybe if you really hate JavaScript? It works, it's just... really not great honestly.

Astro worked for what I needed: simple personal site with a blog that loads fast. It's not some revolutionary framework, just happened to fit what I was trying to do.

The code for this project is on <a href="https://github.com/photosunthesis/sun-envidiado-website-astro" target="_blank" rel="noopener noreferrer" title="View the sun-envidiado-website-astro project on GitHub">GitHub</a> if you're curious.