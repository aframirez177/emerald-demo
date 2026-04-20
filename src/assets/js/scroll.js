/* emerald.co — scroll.js
   Lenis smooth scroll init + GSAP ScrollTrigger bridge.
   Resolved via importmap in the HTML (esm.sh) so no bundler needed. */

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initScroll() {
  if (lenisInstance) return lenisInstance;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  lenisInstance = new Lenis({
    duration: reduced ? 0 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !reduced,
    smoothTouch: false,
  });

  lenisInstance.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}
