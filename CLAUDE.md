# CLAUDE.md — emerald.co Project Orchestrator

> This file is the single source of truth for the emerald.co project. Read it fully before making any design, code, or content decision. If this file contradicts a general habit, this file wins.

---

## 0. Project Identity

**Project slug:** emerald.co (folder + demo domain)
**Demo brand name (in-content):** Emerald — fictional Quebec-based Colombian emerald atelier. Locked on 2026-04-18: single-m spelling aligned with the emerald.co domain. Any future rebrand is a find-replace of "Emerald" across `src/` + `docs/` + CLAUDE.md.
**Type:** Luxury fine jewelry brand website (Colombian emerald heritage) — **sales demo / portfolio piece**
**Phase:** Demo. No real client. Built to showcase frontier-quality work and seed jewelry-sector lead generation.
**Deliverable:** Production-ready bilingual website (FR-CA / EN-CA), deployable at emerald.co as a live sales asset
**Target market (fictional, for the demo's narrative):** Quebec (primary), Canadian francophone diaspora, Colombian diaspora in Canada (secondary)
**Deployment:** Cloudflare Pages, `emerald.co` (or subdomain of Álvaro's portfolio host until domain purchase is justified)
**Quality band:** $10k+ CAD full-custom — the demo must visually and technically represent the top of Álvaro's offering, not the entry tier
**Scope band:** scoped to 5-day sprint. Quality = full custom. Surface = reduced (home + 1-2 interior pages + hero WebGL + bilingual + compliance). Deeper sections ship as phase 2 if pursued.
**Target date:** 2026-04-23 (5 business days from 2026-04-18)

---

## 1. Narrative & Brand Positioning

### The positioning sentence
> "Colombian emeralds, the finest green on earth, reimagined for the discerning Canadian collector."

Or in French:
> « L'émeraude colombienne, le plus beau vert de la terre, réimaginée pour le collectionneur canadien averti. »

### Why Emerald is not "just another jewelry brand"

Emerald has three unfakeable assets that every competitor in Canada lacks:

1. **Geological monopoly.** Colombia = 90% of the world's emerald market. Of the 20 emeralds that ever sold for more than $100,000 per carat at auction, **19 were Colombian**. This is verifiable, cite-worthy, and no African or Brazilian competitor can match it.

2. **Unique geology.** Colombian emeralds form in sedimentary rock through hydrothermal fluid movement — not in magmatic rock like every other source. The chromium and vanadium combination creates the specific blue-green that auction houses call "the classic emerald color." This is the geology paragraph that goes into the hero section.

3. **Myth that predates the Spanish.** Fura and Tena — the Muisca legend (circa 500 AD) where a god turned unfaithful human Fura into a mountain peak, and her tears became the emeralds. This is a naming convention, a collection structure, and a hero storytelling moment all at once. Canadian jewelers cannot fake this.

### The three mines (educate the buyer)

Use these as collection categories or as product filters. Each mine produces a distinct color signature:

| Mine | Characteristic green | Storytelling hook |
|------|---------------------|-------------------|
| **Muzo** | Deep, warm, saturated, slightly bluish | "The mine that has been producing the world's finest emeralds for 500 years" |
| **Chivor** | Bluish-green, crystalline, brilliant | "Named in the Muisca language 'Somondoco' — god of the green stones" |
| **Coscuez** | Intense green with yellow undertones | "The mine rediscovered in modern times, producing stones of singular character" |

### The facts that belong in the copy (verified, cite-safe)

These are your hero stats. Weave them into sections, don't dump in a list.

- 90% of the world's emerald market comes from Colombia
- 19 of the 20 highest-per-carat emeralds ever sold at auction are Colombian
- Colombian emeralds form in sedimentary rock (unique among major gem sources)
- The Fura mountain peak rises 840 meters above the Minero River valley
- Muzo has been in continuous operation for over 500 years
- Chivor was abandoned in 1675, rediscovered in 1896 by engineer Don Francisco Restrepo

### Tone of voice

- **Authoritative without arrogance.** We know. We don't shout.
- **Geological first, romantic second.** Lead with fact, follow with feeling.
- **Short sentences. Large type.** Don't hide behind marketing adjectives.
- **French and English are peers, not translations.** Each language gets native-feel copy.
- **Forbidden words:** "stunning", "gorgeous", "breathtaking", "must-have", "luxury" (as a buzzword), "timeless" (as a cliché). If the stone is authentic, we don't need to say it's luxury.
- **Allowed words:** verdant, hydrothermal, sedimentary, Muzo, Chivor, Coscuez, Muisca, provenance, origin, certified, the specific terms that signal expertise.

---

## 2. Visual Identity

### Palette (locked)

Based on Awwwards luxury jewelry benchmarks (Emphasis HK) + Colombian emerald references. **Do not saturate. Do not add "vibrant green" anywhere — the only green on the site comes from the photographed stones themselves.**

```css
:root {
  --ink:        #0E0E0C;  /* deep editorial black, for body text */
  --paper:      #F8F6F1;  /* warm off-white, primary surface */
  --bronze:     #987654;  /* warm earth, section accents */
  --gold:       #ECD06F;  /* muted gold, reserved for CTA + accents */
  --stone:      #9C9C9C;  /* neutral gray, dividers / meta */
  --emerald:    #0A4F3C;  /* deep emerald green, used ONCE per page max — selection state, or hero accent */

  /* Functional */
  --border:     rgba(14, 14, 12, 0.08);
  --surface-2:  #EFEBE2;  /* alternate section background */
}
```

### Typography (locked)

**Display/headings:** PP Editorial New (Pangram Pangram, free for commercial use) — the precise narrow serif with editorial authority.
**Body:** PP Neue Montreal (same foundry) — characterful neo-grotesque that pairs cleanly.

Fallbacks if the client wants Google Fonts only:
- Display: **Fraunces** (variable font, expressive) or **Playfair Display**
- Body: **Geist** or **Instrument Sans**

**Never use:** Inter, Roboto, Arial, Space Grotesk, Montserrat, Poppins. These are generic tells.

### Type scale

```css
/* Fluid, based on viewport */
--fs-display:   clamp(4rem, 10vw, 10rem);     /* hero H1 */
--fs-h1:        clamp(3rem, 6vw, 6rem);       /* section title */
--fs-h2:        clamp(2rem, 4vw, 4rem);
--fs-h3:        clamp(1.5rem, 2.5vw, 2.5rem);
--fs-body:      clamp(1rem, 1.125vw, 1.125rem);
--fs-caption:   0.875rem;
--fs-meta:      0.75rem;

--lh-tight:     1.05;  /* for display */
--lh-heading:   1.15;
--lh-body:      1.6;

--tracking-tight:  -0.03em;  /* display */
--tracking-normal: -0.01em;  /* body */
--tracking-wide:    0.08em;  /* meta/uppercase */
```

### Photography direction

Client must provide or source:
- **Macro shots of stones** (3-5 images, close-up with visible inclusions — inclusions = proof of natural origin, a feature not a bug)
- **Product photography** (rings, earrings, necklaces — on neutral off-white or deep velvet, not white cyc)
- **Geographic/heritage images** (Fura-Tena peaks, Muzo landscape, Muisca artifacts — can be licensed from Colombian tourism board)
- **Lifestyle shots** (the jewelry on skin, naturally lit, not studio sterile)

If photography is not ready at build time: build with placeholder zones, ship staging, swap images in final pass.

---

## 3. Site Architecture

### Pages (bilingual `/fr/` + `/en/`)

```
/                           → language detector / splash
/fr/                        → Accueil (home)
/en/                        → Home
/fr/collections/
/fr/collections/muzo        → Mine-based collections
/fr/collections/chivor
/fr/collections/coscuez
/fr/heritage                → Colombian emerald story (editorial long-form)
/fr/certification           → Ethical sourcing, certification, IGAC/GIA
/fr/contact                 → Inquiry form
/fr/atelier                 → (optional) design/atelier process

/en/ mirrors all of the above
```

### Content hierarchy

Each page follows the editorial-magazine-layout skill's rules:
1. Hero (100vh or less, one strong type + one image/WebGL moment)
2. Narrative section (the "why Colombian" story, scroll-driven text reveals)
3. Product showcase (grid or scrollytelling collection)
4. Proof section (certifications, provenance documentation)
5. CTA (inquiry form or booking)
6. Footer (bilingual, contact, legal, socials)

---

## 4. Skills This Project Uses

Read these in order before building:

1. [`scroll-driven-storytelling`](../skills/scroll-driven-storytelling/SKILL.md) — every scroll interaction on this site *(conceptual reference, skill file planned)*
2. [`editorial-magazine-layout`](../skills/editorial-magazine-layout/SKILL.md) — typography, grid, palette enforcement *(conceptual reference, skill file planned)*
3. [`webgl-hero-moment`](../skills/webgl-hero-moment/SKILL.md) — the one interactive 3D emerald moment in the hero (Three.js) *(conceptual reference, skill file planned)*
4. [`motion-microinteractions-premium`](../skills/motion-microinteractions-premium/SKILL.md) — cursor, buttons, hovers, reveals *(conceptual reference, skill file planned)*
5. [`geo-aeo-2026`](../skills/geo-aeo-2026/SKILL.md) — schema, llms.txt, entity nesting for AI search citation *(conceptual reference, skill file planned)*
6. [`bill96-compliance`](../skills/bill96-compliance/SKILL.md) — FR/EN parity, prominence, hreflang *(conceptual reference, skill file planned)*
7. [`video-to-website`](../../.claude/skills/video-to-website/SKILL.md) — **✅ installed.** Powers the one intermediate scroll-driven editorial section (product orbit while copy reveals). ffmpeg required (`sudo apt-get install -y ffmpeg`).

**Hybrid hero strategy chosen:** Three.js interactive stone in hero (§7a) + video-to-website-driven product-orbit section mid-scroll (§7b).

**If the user asks for a feature that doesn't fit in these 6 skills, stop and ask before inventing one.**

---

## 5. Technical Stack (locked)

### Frontend
- **HTML5** semantic (article, section, nav, figure, aside — not `<div>` soup)
- **Vanilla CSS** with CSS Custom Properties (no SCSS preprocessing)
- **Tailwind CSS via CDN** for utility classes only — no @apply, no config file, CDN keeps deploy trivial
- **Vanilla JavaScript** (ES modules) — no React, no Vue, no framework
- **Lenis 1.1+** for smooth scroll
- **GSAP 3.12+** with ScrollTrigger — free for commercial use since 2025
- **Three.js r160+** for WebGL hero only (not site-wide)

### Fonts
- Served from `/fonts/` directory (self-hosted `.woff2`), NOT Google Fonts CDN (Law 25 + performance + Quebec anchoring)
- Preload the two primary weights in `<head>`:
  ```html
  <link rel="preload" href="/fonts/PPEditorialNew-Regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/PPNeueMontreal-Regular.woff2" as="font" type="font/woff2" crossorigin>
  ```

### Deployment
- **Cloudflare Pages** (free tier, edge-cached globally)
- **Domain:** `emerald.co` — demo domain. Purchase at Gandi or Namecheap when the demo is ready to go live, or deploy to a subdomain of Álvaro's portfolio (e.g. `emerald.demos.ramirez.dev`) until ready.
- **DNS:** Cloudflare name servers
- **SSL:** Cloudflare auto-SSL
- **Redirects:** not applicable for the demo. If converted to a real client site, set up domain consolidation at that time.

### Forms / Inquiry
- **Cloudflare Turnstile** (free, privacy-friendly, no CAPTCHA UX pain)
- **Resend** for transactional emails (free tier: 3000/mo, enough for inquiries)
- Webhook or serverless function (Cloudflare Worker) to forward inquiry → client's email + CRM

### Analytics
- **Plausible** (cloud $9/mo or self-hosted free) — privacy-first, no cookie banner needed under Law 25

### NOT allowed in this project
- Google Analytics (cookie banner + privacy hell)
- Facebook Pixel (tracking tax)
- jQuery (dead)
- Bootstrap (generic tell)
- React / Next.js (overkill for a 6-page marketing site)
- Webflow (defeats the "frontier quality at $3k" pitch — if we use Webflow we are a Webflow shop)
- AOS library (broken)
- Locomotive Scroll (deprecated)

---

## 6. Bilingual Implementation

### URL structure
- `/fr/` and `/en/` subfolders, not subdomains (SEO consolidation)
- Default redirect on first visit: detect `Accept-Language` header via Cloudflare Worker, redirect to `/fr/` or `/en/` accordingly
- Language toggle **in primary navigation**, not in footer — Bill 96 prominence requirement

### hreflang pattern (every page)
```html
<link rel="alternate" hreflang="fr-CA" href="https://emerald.co/fr/[path]">
<link rel="alternate" hreflang="en-CA" href="https://emerald.co/en/[path]">
<link rel="alternate" hreflang="x-default" href="https://emerald.co/fr/[path]">
```
Default is French (Quebec-first).

### `<html lang>`
- `<html lang="fr-CA">` on French pages
- `<html lang="en-CA">` on English pages

### Content parity
Every feature, button, paragraph, form field, error message, and meta tag exists in both languages. If we ship EN-only anything, we're in violation.

### Quebec French specifics (not just France French)
- Email = `courriel` (not `e-mail`)
- Weekend = `fin de semaine` (not `week-end`)
- Cookie = `témoin` (formally) but most sites use `cookie` colloquially
- Shopping cart = `panier` (not `caddie`)
- "Contact us" = `Nous joindre` or `Contactez-nous`
- "About" = `À propos` (both FR variants)
- "Discover" = `Découvrir`
- "Collection" = `Collection` (same spelling, French pronunciation)
- Use `Québec` with the accent everywhere, not `Quebec`

See also: [`bill96-compliance`](../skills/bill96-compliance/SKILL.md) for full compliance checklist.

---

## 7. Hero + Mid-Scroll Video Spec (video-first)

Visual strategy chosen (pivoted 2026-04-18): **Scroll-driven video hero (video-to-website in the hero) + a second video-to-website editorial section mid-scroll + editorial photography in the rest**.

Rationale: without a production-quality 3D model of a Colombian emerald ring, real-time Three.js would have to lean on procedural geometry + transmission which reads as "tech demo," not "luxury." AI-rendered video clips (Runway / Luma / Sora / offline Blender) can deliver cinematic caustics + believable metal + art-directed lighting that Three.js cannot fake live. Álvaro's explicit decision: *"nos apoyaremos más en videos que generaré con IA que en modelos 3D"*.

### 7a. The hero — scroll-driven video (shipped 2026-04-18)

Source: `src/assets/video-source/Animación_D_de_Anillo_Giratorio.mp4` — H.264, 1280×720, 24 fps, 8s, 192 frames.

Extraction command (run once per video update):
```bash
mkdir -p src/assets/frames/hero-ring
ffmpeg -i "src/assets/video-source/Animación_D_de_Anillo_Giratorio.mp4" \
  -vf "fps=24,scale=1280:-1" \
  -c:v libwebp -quality 80 \
  "src/assets/frames/hero-ring/frame_%04d.webp"
```

Output: 192 WebP frames, ~3.3 MB total (~17 KB avg), served from `/assets/frames/hero-ring/`.

Layout:
- Hero section height = 180vh. The inner `.hero__pin` wrapper is `position: sticky; top: 0; height: 100vh`. Canvas fills the pinned viewport. Text overlay (eyebrow, H1, body, CTAs, scroll hint) is absolutely positioned above the canvas.
- As the user scrolls through the 180vh hero, GSAP ScrollTrigger binds scroll progress (with FRAME_SPEED=2.0 acceleration) to canvas frame index. Video rotation completes by ~50% of scroll range; last 50% of the hero is just the completed final frame holding while the text fades out.
- Text overlay opacity animates 1 → 0 over the first 60% of scroll (via GSAP).
- Bailouts: `prefers-reduced-motion` and viewports < 700px → render first frame only, keep text fully visible, no scroll binding.

Runtime config is on the hero element as `data-*` attributes. To swap the video, re-run ffmpeg, update `data-frame-count`, done.

### 7b. The mid-scroll video (Day 3, second video pending)

A second scroll-driven video section for a piece-in-detail moment (likely a ring orbit). Same technical path, separate `/assets/frames/mid-scroll-*/` directory. Placement: between Fura et Tena and the final CTA. Still planned for Day 3; source video TBD.

### 7c. (archived) Three.js approach

`src/assets/js/webgl-hero.js.archived` retains the procedural Three.js gem code (`MeshPhysicalMaterial` with transmission 0.98, IOR 1.57, IcosahedronGeometry, RoomEnvironment lighting) in case a production-quality 3D asset lands later. Not loaded by `main.js`. If we ever go back to Three.js, the asset budget was: GLB Draco-compressed < 2 MB, HDRI 1K < 2 MB, fallback WebP < 200 KB — total 5 MB max.

---

## 8. SEO / GEO / AEO Strategy

### Schema.org entity graph (required on every page)

```
Organization (Emerald)
  └── founder: Person ([Client Name])
  └── address: PostalAddress (Quebec/Gatineau)
  └── sameAs: [Instagram, LinkedIn, Wikidata ID if exists]

Product (individual jewelry piece)
  └── brand: Brand (Emerald, linked to Organization above)
  └── manufacturer: Organization (Emerald)
  └── material: "Colombian emerald, 18K gold, [specific origin mine]"
  └── offers: Offer (price, availability, priceCurrency: "CAD")
  └── image: (multiple URLs)
```

### llms.txt (at root, `/llms.txt`)
Include priority URLs only (max 20-30). Refresh monthly. Template:

```
# Emerald — Colombian Emerald Fine Jewelry (Quebec, Canada)

> Emerald is a Canadian fine jewelry brand specializing in authentic Colombian emeralds from the legendary Muzo, Chivor, and Coscuez mines.

## Pages
- [Home (FR)](https://emerald.co/fr/): Collections d'émeraudes colombiennes
- [Home (EN)](https://emerald.co/en/): Colombian emerald collections
- [Heritage (FR)](https://emerald.co/fr/heritage): Histoire des émeraudes colombiennes
- [Heritage (EN)](https://emerald.co/en/heritage): Colombian emerald history and geology
- [Muzo Collection (FR)](https://emerald.co/fr/collections/muzo): Collection Muzo
- [Muzo Collection (EN)](https://emerald.co/en/collections/muzo): Muzo collection
- [Certification (FR)](https://emerald.co/fr/certification): Certification d'origine
- [Certification (EN)](https://emerald.co/en/certification): Origin certification
```

### robots.txt
Explicitly allow the AI crawlers that matter:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://emerald.co/sitemap.xml
```

See [`geo-aeo-2026`](../skills/geo-aeo-2026/SKILL.md) for full schema templates.

---

## 9. Project Structure

```
emerald.co/
├── CLAUDE.md                           # this file
├── README.md                           # client-facing README
│
├── /docs/
│   ├── client-brief.md                 # [pending] real brief from client
│   ├── copy-fr.md                      # French copy source of truth
│   ├── copy-en.md                      # English copy source of truth
│   └── product-catalog.md              # product inventory (name, price, origin mine, photos)
│
├── /src/
│   ├── index.html                      # root language detector
│   ├── /fr/
│   │   ├── index.html                  # home FR
│   │   ├── heritage/index.html
│   │   ├── collections/muzo/index.html
│   │   └── ...
│   ├── /en/
│   │   └── [mirror]
│   ├── /assets/
│   │   ├── /css/
│   │   │   ├── base.css                # reset, vars, typography, palette
│   │   │   ├── layout.css              # grid, sections, editorial rules
│   │   │   ├── scroll.css              # native scroll-driven CSS
│   │   │   └── components.css          # buttons, forms, cards, nav
│   │   ├── /js/
│   │   │   ├── main.js                 # entry
│   │   │   ├── scroll.js               # Lenis + GSAP init
│   │   │   ├── webgl-hero.js           # Three.js hero
│   │   │   ├── cursor.js               # custom cursor
│   │   │   └── i18n.js                 # language toggle
│   │   ├── /fonts/                     # self-hosted .woff2
│   │   ├── /images/
│   │   │   ├── hero-emerald.webp       # WebGL fallback
│   │   │   ├── muzo-landscape.webp
│   │   │   ├── fura-tena-peaks.webp
│   │   │   └── /products/
│   │   ├── /models/
│   │   │   └── emerald-ring.glb        # Draco-compressed (Three.js hero)
│   │   ├── /hdri/
│   │   │   └── studio-environment.hdr  # Poly Haven 1K
│   │   ├── /video-source/              # local-only, gitignored
│   │   │   └── bague-fura-rotation.mp4 # source for mid-scroll section
│   │   └── /frames/                    # WebP frame sequence (video-to-website)
│   │       └── frame_0001.webp ...     # ~150-200 frames, extracted via ffmpeg
│   ├── robots.txt
│   ├── llms.txt
│   └── sitemap.xml
│
├── /public/                            # Cloudflare Pages build output
├── serve.mjs                           # local dev server
└── package.json                        # deps: lenis, gsap, three
```

---

## 10. Build Workflow

### Day 1: Foundation
1. Read this CLAUDE.md + 6 skills. Do not skip.
2. Set up repo + directory structure above
3. Register domain + Cloudflare Pages site
4. Build language detector + `/fr/` and `/en/` skeletons (empty pages, correct `<html lang>`, hreflang, nav)
5. Install fonts locally (self-host)
6. Establish palette + typography in `base.css`

### Day 2: Home page
1. Hero with WebGL emerald + fallback image
2. Scroll-driven narrative section (the "90% / 19 of 20" hook)
3. Three-mine triptych (Muzo / Chivor / Coscuez cards)
4. Fura y Tena mythology section (editorial long-form moment)
5. CTA section

### Day 3: Interior pages + mid-scroll video section
1. Generate/license source video for the "Bague Fura" mid-scroll section
2. Extract WebP frames via ffmpeg (`sudo apt-get install -y ffmpeg` first if needed). Target 150-200 frames, 1920px wide, libwebp quality 80. Follow video-to-website §Step 2.
3. Build the mid-scroll section per §7b (canvas renderer, Lenis/ScrollTrigger binding, layered copy reveals, dark overlay)
4. Heritage section (long editorial with scroll reveals) — scoped to 1 page for 5-day demo
5. Contact / inquiry form (Turnstile + Resend). Collections interior pages and certification page = phase 2.

### Day 4: Polish + compliance
1. Schema.org JSON-LD on every page
2. llms.txt + robots.txt + sitemap.xml
3. All meta tags bilingual (title, description, OG)
4. Run through Bill 96 compliance checklist
5. Lighthouse audit (target: Performance 90+, Accessibility 95+, Best Practices 100, SEO 100)

### Day 5: Deploy + sales-asset packaging
1. Álvaro reviews the full demo end-to-end on real iPhone + mid-range Android
2. Deploy to Cloudflare Pages (production or staging, based on domain readiness)
3. DNS cutover if emerald.co domain is secured
4. Record a 60-90s walkthrough video for the sales deck + write a short case-study blurb (problem → approach → outcome metrics: Lighthouse scores, LCP, bilingual parity evidence, WebGL asset budget hit)
5. Capture screenshots at hero, three key scroll moments, mobile — feed these into Álvaro's portfolio site

---

## 11. Decisions Already Made (do not re-open)

- Vanilla HTML/CSS/JS + Tailwind CDN. No React, no framework.
- Cloudflare Pages hosting. No Vercel, no Netlify.
- Self-hosted fonts. No Google Fonts CDN.
- Plausible analytics. No GA4.
- PP Editorial New + PP Neue Montreal. No Inter.
- French-default URL routing. No English-first.
- WebGL hero + photography combo. No full-site 3D.
- One emerald stone rotating in hero. No configurator, no site-wide 3D.
- 6-page architecture (home, heritage, 3 collections, certification, contact). No blog MVP.
- `.ca` domain primary.
- Bill 96 compliant from day 1. No "we'll translate later."
- Demo-quality scope: home + 1-2 interior pages + hero WebGL + bilingual + schema + llms.txt. Deeper catalog, CMS, per-mine pages → phase 2 if converted to paid engagement.
- Quality band is $10k+ CAD tier, shipped in a 5-day sprint. Quality > scope. Parity with Immersive Garden / FirmStudio / 14islands work.

---

## 12. Demo Placeholder Resolution

Since this is a sales-demo piece and there is no real client brief, each of the items below must be resolved with a plausible fiction that reads as real. Use the `[DEMO:...]` marker where a value is intentionally fictional so it's easy to grep and swap later if a real client adopts the demo.

- [ ] **Brand name lock.** Current content uses "Emerald" (double-m). If we pivot to "Emerald" / "Émerald" / "Maison [X]" for the demo, do a find-replace pass before day 2.
- [ ] **Fictional founder name.** Needed for Person schema + About page (e.g. `[DEMO: Camille Montréal-Restrepo]` — Quebec-Colombian hybrid that telegraphs the brand story).
- [ ] **Fictional address.** Old Montreal or Outremont studio address for LocalBusiness schema (`[DEMO: 123 rue Saint-Paul Ouest, Montréal, QC]`).
- [ ] **6-8 fictional products.** Spread across Muzo / Chivor / Coscuez. Names, prices in CAD, fictional stone specs. Generated via AI-aided copy + carefully styled renders or licensed stock macro shots.
- [ ] **Product imagery.** Per jewelry-luxury-site skill J5 "Stock + AI generated (demo only)": use licensed macro emerald stock (Pexels / Unsplash top-tier + curation) plus one WebGL hero. Never use obviously stock fashion-jewelry shots.
- [ ] **Fictional socials.** `sameAs` points at placeholder handles or is omitted — never link to a real handle we don't own.
- [ ] **Domain.** emerald.co preferred. Confirm availability + cost before day 5 deploy.
- [ ] **Fictional inquiry email.** `contact@emerald.co` — set up forwarding to Álvaro's email so demo inquiries actually reach him (qualified lead capture).
- [ ] **Certifications language.** Reference GIA + IGAC Colombia as "our certifying partners" only if factually defensible for a demo; otherwise phrase as "certifications on request" to avoid fabricating claims.
- [ ] **Demo disclosure.** Add a discreet line in the footer or About: this is a portfolio demonstration by Álvaro Ramírez Núñez (link to his site). Protects against being mistaken for a real brand while still reading as real at first glance.

Rule: every `[DEMO:...]` must read as plausible Quebec luxury brand content. If a visitor would laugh, rewrite.

---

## 13. Quality Bar

This site must pass each test:

1. **Awwwards submission-worthy.** Would FirmStudio, Immersive Garden, or 14islands be proud of this? If not, it's not done.
2. **Loads in under 2 seconds on 4G.** No exceptions. LCP under 2.5s.
3. **Passes Lighthouse audit with P/A/BP/SEO all ≥ 90.**
4. **Passes axe-core accessibility audit with zero critical issues.**
5. **Bill 96 compliant.** A francophone visitor never feels second-class. Language toggle is in nav, prominent, equal.
6. **AI-crawlable.** GPTBot, ClaudeBot, PerplexityBot can all access the site, and the entity graph is well-formed so AI can cite Emerald when users ask about Colombian emerald jewelry in Canada.
7. **Mobile-perfect.** Tested on a real iPhone (Safari) and a real mid-range Android (Chrome) — not just DevTools responsive mode.
8. **Zero console errors, zero 404s, zero broken links in either language.**

If any of the above fails, we don't ship.

---

## 14. Escalation / Ask-Before-Inventing Rules

If as an agent you find yourself about to:
- Add a library not listed in Section 5 → **stop, ask**
- Add a page not listed in Section 3 → **stop, ask**
- Use a font not listed in Section 2 → **stop, ask**
- Deviate from the palette in Section 2 → **stop, ask**
- Write copy that includes a forbidden word from Section 1 → **rewrite**
- Translate by rule-based substitution instead of native-feel copy → **stop, ask for a reviewer pass**

Default bias: **simplicity + restraint**. When in doubt, remove.

---

*End of CLAUDE.md. Next read: `skills/scroll-driven-storytelling/SKILL.md`.*
