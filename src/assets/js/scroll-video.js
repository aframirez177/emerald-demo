/* emerald.co — scroll-video.js
   Generic scroll-driven canvas video renderer. Used for both the hero
   and the §7b mid-scroll piece-orbit section.

   Configuration via data-* attributes on the host element:
     data-frame-count="192"
     data-frame-base="/assets/frames/<dir>/frame_"
     data-frame-pad="4"
     data-frame-ext="webp"
     data-section-vh="120"               (scroll range for frame binding)

   Usage:
     initScrollVideo({
       hostSelector: "[data-hero-video]",
       canvasSelector: ".hero__video-canvas",
       textSelector: "[data-hero-text]",     (optional; fades out)
       textFadeProgress: 0.3,                 (fraction of section scroll)
       fadeEdges: false,                      (true = fade canvas in/out at edges)
     });
*/

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const IMAGE_SCALE = 1.0;     // pure cover — video fills canvas, no padded border
const FRAME_SPEED = 3.0;     // frames complete at ~33% of section scroll

export function initScrollVideo({
  hostSelector,
  canvasSelector,
  textSelector = null,
  textFadeProgress = null,
  fadeEdges = false,
} = {}) {
  const host = document.querySelector(hostSelector);
  if (!host) return null;

  const config = {
    frameCount: parseInt(host.dataset.frameCount || "0", 10),
    frameBase: host.dataset.frameBase || "",
    framePad: parseInt(host.dataset.framePad || "4", 10),
    frameExt: host.dataset.frameExt || "webp",
    sectionVh: parseFloat(
      host.dataset.sectionVh || host.dataset.heroScrollVh || "150"
    ),
  };

  if (!config.frameCount || !config.frameBase) {
    host.dataset.scrollVideoState = "no-frames";
    return null;
  }

  const canvas = host.querySelector(canvasSelector) || document.querySelector(canvasSelector);
  if (!canvas) {
    host.dataset.scrollVideoState = "no-canvas";
    return null;
  }

  const ctx = canvas.getContext("2d", { alpha: true });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.innerWidth < 700;

  const frames = new Array(config.frameCount);
  const frameUrl = (i) =>
    `${config.frameBase}${String(i + 1).padStart(config.framePad, "0")}.${config.frameExt}`;

  let currentFrame = -1;
  let bgColor = "#FFFFFF";

  const resize = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const { clientWidth: w, clientHeight: h } = canvas;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawFrame(currentFrame >= 0 ? currentFrame : 0);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  const sampleBgColor = (img) => {
    try {
      const s = document.createElement("canvas");
      s.width = 4; s.height = 4;
      s.getContext("2d").drawImage(img, 0, 0, 4, 4);
      const d = s.getContext("2d").getImageData(0, 0, 4, 4).data;
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i+1]; b += d[i+2]; }
      const n = d.length / 4;
      bgColor = `rgb(${Math.round(r/n)}, ${Math.round(g/n)}, ${Math.round(b/n)})`;
    } catch {}
  };

  const drawFrame = (index) => {
    const img = frames[index];
    if (!img || !img.complete) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    const scale = Math.max(w / iw, h / ih) * IMAGE_SCALE;
    const dw = iw * scale, dh = ih * scale;
    const dx = (w - dw) / 2, dy = (h - dh) / 2;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, dx, dy, dw, dh);
    currentFrame = index;
  };

  const loadFrame = (i) =>
    new Promise((resolve) => {
      if (frames[i]) return resolve(frames[i]);
      const img = new Image();
      img.decoding = "async";
      img.onload = () => { frames[i] = img; resolve(img); };
      img.onerror = () => resolve(null);
      img.src = frameUrl(i);
    });

  const preloadFirst = async () => {
    const blockingCount = Math.min(8, config.frameCount);
    const first = [];
    for (let i = 0; i < blockingCount; i++) first.push(loadFrame(i));
    await Promise.all(first);
    if (frames[0]) sampleBgColor(frames[0]);
    drawFrame(0);
    host.dataset.scrollVideoState = "first-frame";

    for (let i = blockingCount; i < config.frameCount; i++) {
      loadFrame(i);
    }
  };

  const bindScroll = () => {
    if (reduced || narrow) {
      host.dataset.scrollVideoState = "static";
      return;
    }
    host.dataset.scrollVideoState = "scroll-bound";

    const sectionPx = config.sectionVh * 0.01 * window.innerHeight;

    // Frame-to-scroll binding across the configured section range.
    ScrollTrigger.create({
      trigger: host,
      start: "top top",
      end: `+=${sectionPx}px`,
      scrub: true,
      onUpdate: (self) => {
        const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
        const idx = Math.min(
          Math.floor(accelerated * config.frameCount),
          config.frameCount - 1
        );
        if (idx !== currentFrame) {
          requestAnimationFrame(() => drawFrame(idx));
        }
      },
    });

    // Text fade-out within the same section (optional).
    if (textSelector && textFadeProgress != null) {
      const textEl = host.querySelector(textSelector);
      if (textEl) {
        gsap.to(textEl, {
          opacity: 0,
          y: -40,
          ease: "power2.in",
          scrollTrigger: {
            trigger: host,
            start: "top top",
            end: `+=${sectionPx * textFadeProgress}px`,
            scrub: true,
          },
        });
      }
    }

    // Fade canvas in/out at section edges (for mid-scroll sections that
    // shouldn't be visible outside their range). Fade-in starts early —
    // while the previous section is still in view — so the animation
    // begins to appear instead of popping in on arrival.
    if (fadeEdges) {
      gsap.set(canvas, { opacity: 0 });

      // Fade IN — begins half a viewport before the section enters.
      ScrollTrigger.create({
        trigger: host,
        start: "top bottom+=50%",   // 50vh below the viewport bottom
        end: "top 40%",              // ~40% from the top of viewport
        scrub: true,
        onUpdate: (self) => {
          canvas.style.opacity = self.progress.toFixed(3);
        },
      });

      // Fade OUT — released as the section bottom leaves the viewport top.
      ScrollTrigger.create({
        trigger: host,
        start: "bottom center",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          canvas.style.opacity = (1 - self.progress).toFixed(3);
        },
      });
    }
  };

  resize();
  preloadFirst().then(bindScroll);

  return {
    dispose() {
      resizeObserver.disconnect();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === host) st.kill();
      });
    },
  };
}

// Convenience wrappers ------------------------------------------------

export function initHeroVideo() {
  return initScrollVideo({
    hostSelector: "[data-hero-video]",
    canvasSelector: ".hero__video-canvas",
    textSelector: "[data-hero-text]",
    textFadeProgress: 0.3,
    fadeEdges: false,
  });
}

export function initPieceOrbit() {
  return initScrollVideo({
    hostSelector: "[data-piece-orbit]",
    canvasSelector: ".piece-orbit__canvas",
    textSelector: null,
    textFadeProgress: null,
    fadeEdges: true,
  });
}
