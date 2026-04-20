/* emerald.co — reveals.js
   GSAP scroll-driven reveals across the home page sections.
   All animations respect prefers-reduced-motion. */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initReveals() {
  if (reduced) {
    // With reduced-motion: make sure nothing is left hidden.
    document.querySelectorAll("[data-reveal-hidden]").forEach((el) => {
      el.removeAttribute("data-reveal-hidden");
      gsap.set(el, { clearProps: "all" });
    });
    return;
  }

  heroReveal();
  authorityReveal();
  triptychReveal();
  furaTenaReveal();
  ctaReveal();
}

/* ---- Hero: word-split stagger on the H1 + eyebrow + body + CTAs ---- */
function heroReveal() {
  const heroTitle = document.querySelector("[data-hero-title]");
  if (heroTitle) splitIntoWordSpans(heroTitle);

  const targets = [
    "[data-hero-eyebrow]",
    "[data-hero-title] .word",
    "[data-hero-body]",
    "[data-hero-cta]",
  ];

  gsap.set(targets, { y: 40, opacity: 0 });
  gsap.to(targets, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    stagger: 0.06,
    delay: 0.15,
  });

  // Subtle float for the scroll hint at bottom of hero
  gsap.fromTo(
    "[data-hero-scroll-hint]",
    { y: 12, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, delay: 1.2, ease: "power2.out" }
  );
}

function splitIntoWordSpans(el) {
  const html = el.innerHTML;
  // Preserve <br> by splitting on whitespace but keeping breaks.
  const fragment = html
    .split(/(<br\s*\/?>)/i)
    .map((chunk) => {
      if (/^<br/i.test(chunk)) return chunk;
      return chunk
        .split(/(\s+)/)
        .map((piece) =>
          piece.trim().length
            ? `<span class="word" style="display:inline-block;">${piece}</span>`
            : piece
        )
        .join("");
    })
    .join("");
  el.innerHTML = fragment;
}

/* ---- Authority section: number counters + body fade-up -------------- */
function authorityReveal() {
  document.querySelectorAll("[data-counter]").forEach((el) => {
    const target = parseFloat(el.dataset.counter);
    const decimals = parseInt(el.dataset.counterDecimals || "0", 10);
    const obj = { v: 0 };

    gsap.to(obj, {
      v: target,
      duration: 2.2,
      ease: "power1.out",
      onUpdate() {
        el.textContent = obj.v.toFixed(decimals);
      },
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reset",
      },
    });
  });

  gsap.utils.toArray("[data-reveal='fade-up']").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );
  });
}

/* ---- Triptych (Muzo / Chivor / Coscuez): stagger from below --------- */
function triptychReveal() {
  const cards = document.querySelectorAll("[data-triptych] > article");
  if (!cards.length) return;

  gsap.fromTo(
    cards,
    { y: 70, opacity: 0, scale: 0.98 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      stagger: 0.14,
      scrollTrigger: {
        trigger: "[data-triptych]",
        start: "top 75%",
        toggleActions: "play none none reset",
      },
    }
  );
}

/* ---- Fura y Tena: paragraph reveal (per line via clip-path) --------- */
function furaTenaReveal() {
  const narrative = document.querySelector("[data-narrative]");
  if (!narrative) return;

  const pieces = narrative.querySelectorAll(".narrative-line");

  if (!pieces.length) {
    // Fallback: animate the paragraph as one block if splitting isn't applied
    gsap.fromTo(
      narrative,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: narrative,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      }
    );
    return;
  }

  gsap.fromTo(
    pieces,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: narrative,
        start: "top 80%",
        toggleActions: "play none none reset",
      },
    }
  );
}

/* ---- Final CTA: scale up with glow --------------------------------- */
function ctaReveal() {
  const cta = document.querySelector("[data-cta-final]");
  if (!cta) return;

  gsap.fromTo(
    cta.querySelectorAll("[data-reveal-child]"),
    { y: 50, opacity: 0, scale: 0.96 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: cta,
        start: "top 70%",
        toggleActions: "play none none reset",
      },
    }
  );
}
