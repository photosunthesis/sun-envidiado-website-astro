---
layout: ../../layouts/BaseLayout.astro
title: "How I rebuilt my personal site with Astro"
pubDate: "2025-09-19"
description: "A Flutter developer's journey through React's complexity to building a fast, content-focused personal site with Astro."
tags: ["astro", "webdev", "content-site", "flutter-to-web", "personal-site"]
---
I originally built my website with Flutter. Just a simple home page, about, and contact — nothing fancy. I had plans to add a blog section but never got around to it.

Flutter's great for mobile apps, but on the web it has some rough edges: packages that don't support web, `dart:io` compatibility issues, weird image rendering quirks, and SEO that's more trouble than it's worth. For a simple content site, these friction points added up. Time to go back to actual web development.

## Why I tried React first

When you think "web development," you think React. It's everywhere, every job posting wants it, every tutorial assumes you're using it. I actually did web development years ago before switching to Flutter, so coming back to it seemed like a natural next step.

Holy shit, what a mess the web has become.

React itself? Honestly, I think it sucks. Though to be fair, I'm a Dart/Flutter dev, so my opinion on JavaScript frameworks is probably about as valid as asking a cat about dog food. But seriously, the mental model is weird to me. You're constantly thinking about renders, dependencies, when effects run, what causes what to update. For something as simple as "show some text on a page," you're managing state and lifecycle hooks.

And that's before you get to the ecosystem, which is completely different from the web I remember. The number of decisions you have to make before writing any actual code is insane: bundler, framework, router, state management, TypeScript config, linting, formatting. Each has multiple "right" answers depending on who you ask.

I spent weeks reading about the "correct" way to structure a React app instead of just building a website. Back when I did web dev, you just... made a website. Now there are meta-frameworks for frameworks and build tools for build tools.

## Finding Astro

After giving up on React, I saw someone mention Astro in a random comment. The pitch was dead simple: write HTML and CSS, but with modern tooling. Ship HTML pages instead of JavaScript apps that render HTML.

I figured I'd give it a weekend.

Three days later, I had a working site with the blog section I never got around to building in Flutter.

## What I ended up with

The structure is straightforward — here's a compact directory example:

```text
src/
├─ pages/
│   ├─ index.astro      # homepage
│   └─ blog/            # blog posts
│       └─ my-post.md 
│       ...             # other pages (about, contact, etc.)
├─ layouts/
│   └─ BaseLayout.astro # project-wide layout (all pages use this)
├─ components/          # reusable UI components
│   └─ CommandBar.astro
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

That top YAML block (the lines between the `---` markers) is called "frontmatter." It stores metadata — title, date, description, tags, and any other fields your templates or build tools might need. Astro reads those values automatically so your layout can display the title, sort posts by date, or filter by tags without extra code.

Pages use `layouts/BaseLayout.astro`. Styles are in styles — `_base.scss` for core rules, `main.scss` for imports and color variables, and page partials such as `_index.scss` and `_blog.scss`. Complex pages get their own SCSS files; simple pages reuse shared partials to keep CSS small.

Astro automatically generates pages from these Markdown files, treats the frontmatter as metadata, and exposes those fields to layouts and collection queries — which makes writing and publishing posts fast and low-friction.

## Why it works for my specific needs

Astro happened to match exactly what I was trying to build: a simple personal site with a blog. Since I'm not building a complex app, the HTML-first approach made sense. Pages load as actual HTML and CSS, with JavaScript only where I explicitly add it.

The content collections feature is designed specifically for sites like mine — blogs, portfolios, documentation. I can define a schema for my posts, get TypeScript autocompletion, and Astro handles all the page generation automatically.

For my particular situation — coming back to web dev after years in Flutter land and getting overwhelmed by React's ecosystem — having fewer decisions to make was exactly what I needed. I could focus on writing content and building pages instead of configuring build tools.

The development experience is also smooth for content sites. Hot reload works properly, builds are fast, and I'm not fighting the framework to do basic things like adding a new blog post or tweaking a layout.

## Final thoughts

Astro worked for my specific use case: simple personal site with a blog that loads fast. It's not some revolutionary framework, just happened to fit exactly what I was trying to do.

If you're building a complex interactive app, React or Vue or whatever probably makes more sense. If you're deep in the JavaScript ecosystem already, this might not be relevant. But if you're trying to build a content-focused site and getting overwhelmed by framework complexity, maybe worth a look.

The code for this project is on <a href="https://github.com/photosunthesis/sun-envidiado-website-astro" target="_blank" rel="noopener noreferrer" title="View the sun-envidiado-website-astro project on GitHub">GitHub</a> if you're curious.