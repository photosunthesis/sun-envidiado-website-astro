<div align="center">
  <img src="public/android-chrome-512x512.png" alt="Site Icon" width="200">
</div>

A simple website I built with Astro, inspired by vim and terminal interfaces. Here, I share short notes about code, games, and whatever else is on my mind.

---

### Tech stack 🛠️

- Astro — static site generator
- `pnpm` — package management
- Plain CSS — small, focused styles (see `src/styles/global.css`)

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
/
├─ public/
│  ├─ fonts/          # pixel-style font used site-wide
│  └─ ...             # static assets (icons, manifest)
├─ src/
│  ├─ assets/         # images and site assets
│  ├─ components/     # small reusable UI pieces
│  ├─ layouts/        # layout components
│  ├─ pages/          # top-level pages
│  └─ styles/
│     └─ global.css   # global styles including the retro font
└─ ...
```

### License 🪪

See the [`LICENSE`](LICENSE) file for licensing details.
