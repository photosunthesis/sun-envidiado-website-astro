<div align="center">
  <img src="public/android-chrome-512x512.png" alt="Site Icon" width="200">
</div>

A simple website I built with Astro, inspired by vim and terminal interfaces.

---

### Tech stack 🛠️

- Astro — static site generator
- `pnpm` — package management
- SCSS — small, focused styles (see `src/styles/main.scss`)

### Quick start ⚡️

1. Install dependencies

```bash
pnpm install
```

2. Run dev server (local preview)

```bash
pnpm run dev
# open http://localhost:4321
```

3. Build for production

```bash
pnpm build
pnpm preview
```

### Project structure 🏗️

```
src/
├─ components/          # reusable UI components
├─ layouts/
│   └─ BaseLayout.astro # all pages use this
├─ pages/
│   ├─ index.astro      # homepage
│   ├─ blog/            # blog posts
│   └─ ...              # other pages (about, etc.)
└─ styles/              # SCSS styles
└─ utils/               # utility functions
```

### License & Credits 🪪

This project is licensed under the [MIT License](LICENSE). Feel free to use this as inspiration for your own projects. Font used is Toshiba Satellite 8x14 from [The Oldschool PC Font Pack](https://int10h.org/oldschool-pc-fonts/) by VileR, licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
