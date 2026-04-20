/* emerald.co — main.js
   Entry point. Boots scroll, i18n, and page-scoped modules.
   Imports resolve via the <script type="importmap"> defined in each HTML. */

import { initScroll } from "./scroll.js";
import { initLangToggle } from "./i18n.js";
import { initReveals } from "./reveals.js";
import { initHeroVideo, initPieceOrbit } from "./scroll-video.js";
import { initContactForm } from "./contact-form.js";

// NOTE: hero-video.js has been superseded by scroll-video.js (generic
// renderer shared by the hero and §7b piece-orbit section). Legacy file
// retained at /assets/js/hero-video.js.superseded.
// webgl-hero.js (Three.js approach) is archived at
// /assets/js/webgl-hero.js.archived.

const init = () => {
  initScroll();
  initLangToggle();
  markHeaderOnScroll();
  initReveals();
  initHeroVideo();
  initPieceOrbit();
  initContactForm();
};

function markHeaderOnScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const update = () => {
    header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
