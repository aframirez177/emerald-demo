/* emerald.co — i18n.js
   FR·EN toggle that preserves the current path within the site and
   flips only the first segment (/fr/... <-> /en/...). Persists choice
   in localStorage so a returning visitor lands on their preference. */

const SUPPORTED = ["fr", "en"];
const STORAGE_KEY = "emerald.lang";

export function initLangToggle() {
  const toggle = document.querySelector(".lang-toggle");
  if (!toggle) return;

  const currentLang = detectCurrentLang();
  setActiveState(toggle, currentLang);

  toggle.addEventListener("click", (e) => {
    const target = e.target.closest("[data-lang]");
    if (!target) return;
    e.preventDefault();
    const targetLang = target.dataset.lang;
    if (!SUPPORTED.includes(targetLang) || targetLang === currentLang) return;
    const nextPath = swapLangSegment(window.location.pathname, targetLang);
    try { localStorage.setItem(STORAGE_KEY, targetLang); } catch {}
    window.location.assign(nextPath);
  });
}

export function detectCurrentLang() {
  const first = window.location.pathname.split("/").filter(Boolean)[0];
  return SUPPORTED.includes(first) ? first : "fr";
}

function setActiveState(toggle, lang) {
  toggle.querySelectorAll("[data-lang]").forEach((el) => {
    el.setAttribute("aria-current", el.dataset.lang === lang ? "true" : "false");
  });
}

function swapLangSegment(path, targetLang) {
  const parts = path.split("/").filter(Boolean);
  if (SUPPORTED.includes(parts[0])) {
    parts[0] = targetLang;
  } else {
    parts.unshift(targetLang);
  }
  return "/" + parts.join("/") + (path.endsWith("/") ? "/" : "");
}

/* Root splash: redirect based on Accept-Language (via navigator.language)
   + previous visit. Called inline from src/index.html. */
export function redirectFromSplash() {
  let preferred = null;
  try { preferred = localStorage.getItem(STORAGE_KEY); } catch {}

  if (!SUPPORTED.includes(preferred)) {
    const nav = (navigator.language || "fr").toLowerCase();
    preferred = nav.startsWith("en") ? "en" : "fr";
  }

  window.location.replace(`/${preferred}/`);
}
