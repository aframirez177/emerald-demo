/* emerald.co — contact-form.js
   Handles the inquiry form on /fr/contact/ and /en/contact/.
   - Pre-selects piece from ?piece= query param
   - Client-side validation
   - Submit is a demo stub: shows thank-you, does NOT POST
     (Day 5 wires a Cloudflare Worker + Resend for real delivery.)
*/

export function initContactForm(selector = "[data-contact-form]") {
  const form = document.querySelector(selector);
  if (!form) return null;

  prefillPiece(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const submit = form.querySelector('[type="submit"]');
    if (submit) {
      submit.disabled = true;
      submit.dataset.originalLabel = submit.textContent;
      submit.textContent = form.dataset.submittingLabel || "…";
    }

    // Demo stub: fake a short delay, then show thank-you state.
    setTimeout(() => {
      const thanks = document.querySelector("[data-contact-thanks]");
      if (thanks) {
        form.hidden = true;
        thanks.hidden = false;
        thanks.setAttribute("tabindex", "-1");
        thanks.focus();
        thanks.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 450);
  });

  return { reset: () => form.reset() };
}

function prefillPiece(form) {
  const params = new URLSearchParams(window.location.search);
  const piece = (params.get("piece") || "").toLowerCase().trim();
  if (!piece) return;
  const select = form.querySelector("[name='piece']");
  if (!select) return;

  // Accept: muzo | chivor | coscuez | any exact option value from the select
  const match = Array.from(select.options).find(
    (opt) => opt.value.toLowerCase() === piece
  );
  if (match) select.value = match.value;
}
