# Emerald — Case study blurb

Sales-deck copy for pitching the jewelry-luxury tier. Both languages below, ~120 words each. Swap `[Lighthouse XX]` and `[LCP X.Xs]` with real numbers once Álvaro runs the audit on production.

---

## English (Canadian)

**Emerald — Colombian emerald jewelry, Quebec market**

The brief: build a sales piece that reads like a $15k engagement and ships in five days. No client brief, no pre-built template — just the sector, the geography, and a quality bar set against Immersive Garden and 14islands.

We shipped a bilingual FR/EN luxury storefront with a scroll-driven canvas hero (192 WebP frames, reduced-motion fallback, no Three.js overhead), editorial typography, Quebec Law 25 compliance, and a full GEO/AEO entity graph for AI crawlers. Stack: vanilla HTML/CSS/JS on GitHub Pages — zero build step, zero framework weight, Lighthouse [XX/XX/100/100], LCP [X.Xs].

Five days from empty repo to live demo. Cost to reproduce for a real client: $3k CAD.

**Live:** aframirez177.github.io/emerald-demo · **Source:** github.com/aframirez177/emerald-demo

---

## Français (Canadien)

**Emerald — joaillerie en émeraude colombienne, marché québécois**

Le mandat : livrer une pièce de vente qui se lit comme un engagement à 15 k$ et qui se déploie en cinq jours. Pas de brief client, pas de gabarit pré-construit — seulement le secteur, la géographie, et un seuil de qualité calé sur Immersive Garden et 14islands.

Livré : vitrine luxe bilingue FR/EN avec section héro scroll-driven en canvas (192 images WebP, repli pour mouvement réduit, aucune surcharge Three.js), typographie éditoriale, conformité à la Loi 25 du Québec, et un graphe d'entités GEO/AEO complet pour les robots d'indexation IA. Stack : HTML/CSS/JS vanille sur GitHub Pages — aucune compilation, aucun poids de framework, Lighthouse [XX/XX/100/100], LCP [X,X s].

Cinq jours d'un dépôt vide au démo en ligne. Coût de reproduction pour un client réel : 3 k$ CAD.

**En ligne :** aframirez177.github.io/emerald-demo · **Source :** github.com/aframirez177/emerald-demo

---

## Metrics to capture post-deploy

Run these manually and replace the placeholders above:

```bash
# Lighthouse (desktop)
npx lighthouse https://aframirez177.github.io/emerald-demo/en/ \
  --preset=desktop --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless" --output=json --output-path=./lh-desktop.json

# Mobile
npx lighthouse https://aframirez177.github.io/emerald-demo/en/ \
  --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless" --output=json --output-path=./lh-mobile.json
```

Target: Perf 90+, A11y 95+, BP 100, SEO 100, LCP under 2.5s mobile.
