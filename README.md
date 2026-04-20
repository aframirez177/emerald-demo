# emerald.co

Luxury fine jewelry brand website — Colombian emerald heritage.
**Phase:** sales demo / portfolio piece. Not a real client (yet).
**Quality band:** $10k+ CAD full-custom, shipped in a 5-day sprint.
**Languages:** FR-CA primary, EN-CA peer.
**Stack:** Vanilla HTML/CSS/JS + Tailwind CDN + Lenis + GSAP + Three.js (hero only) → Cloudflare Pages.

Single source of truth: [`CLAUDE.md`](./CLAUDE.md). Read it before touching anything.

## Dev

```bash
npm install
node serve.mjs
```

Serves `src/` at `http://localhost:5173`.

## Deploy

Cloudflare Pages, connected to this repo, build output `src/` (or `public/` if a build step is added).

## Structure

- `CLAUDE.md` — project orchestrator
- `docs/` — copy sources of truth (FR/EN) + product catalog
- `src/` — site source (bilingual `/fr/`, `/en/`, shared `/assets/`)
- `public/` — build output if needed
- `serve.mjs` — local dev server
