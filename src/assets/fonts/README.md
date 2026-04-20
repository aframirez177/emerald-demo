# Fonts — drop `.woff2` files here

This directory is where **Pangram Pangram** font files live. They are self-hosted (not served from Google Fonts) for three reasons: Law 25 privacy, perf, and Quebec anchoring.

Until you drop the files, the site falls back to `Fraunces → EB Garamond → Georgia → serif` (display) and `Inter Tight → system-ui` (body). That fallback is *fine* for local dev. For the final demo deploy, use the real Pangram Pangram files.

## Files to download

Go to **https://pangrampangram.com** and download:

| Expected filename here                     | Source family at Pangram Pangram |
|--------------------------------------------|-----------------------------------|
| `PPEditorialNew-Regular.woff2`             | PP Editorial New — Regular        |
| `PPEditorialNew-Italic.woff2`              | PP Editorial New — Italic         |
| `PPNeueMontreal-Book.woff2`                | PP Neue Montreal — Book           |
| `PPNeueMontreal-Medium.woff2`              | PP Neue Montreal — Medium         |

The `@font-face` declarations in `src/assets/css/base.css` point at those exact filenames — rename what Pangram Pangram ships with to match.

## License

Pangram Pangram is free for commercial use as of 2024/2025 per their site. Confirm the specific license before shipping a real client engagement — licensing terms have been generous but can change. For this demo, free commercial use applies.

## Why not a variable font?

Two static weights + italic keep the payload small (~160 KB total after subsetting) and the typographic intention crisp. Variable fonts are great for systems; editorial luxury reads better when the foundry's exact cuts land as intended.

## Optional: subset to Latin + French accents

Once the final files are here, subset them with [`fonttools pyftsubset`](https://fonttools.readthedocs.io/en/latest/subset/) or [Wakamai Fondue](https://wakamaifondue.com/) to Latin + Latin Extended (French diacritics like é à ê ç œ). Typical savings: 40-60%.

Example:
```bash
pyftsubset PPEditorialNew-Regular.woff2 \
  --output-file=PPEditorialNew-Regular.woff2 \
  --unicodes=U+0020-007E,U+00A0-017F,U+2000-206F \
  --flavor=woff2
```
