/* emerald.co — contact-form.js
   Handles the inquiry form on /fr/contact/ and /en/contact/.
   - Pre-selects piece from ?piece= query param
   - Honeypot + client-side validation
   - Submits to Web3Forms (static-site friendly; no backend required).
     Swap WEB3FORMS_ACCESS_KEY below when the production key arrives.
*/

const WEB3FORMS_ACCESS_KEY = "faadb13b-8229-4303-b46f-241fd6ffad48";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export function initContactForm(selector = "[data-contact-form]") {
  const form = document.querySelector(selector);
  if (!form) return null;

  prefillPiece(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    // Honeypot: if the hidden "botcheck" field is filled, silently swallow.
    const botcheck = form.querySelector('input[name="botcheck"]');
    if (botcheck && botcheck.value) return;

    const submit = form.querySelector('[type="submit"]');
    if (submit) {
      submit.disabled = true;
      submit.dataset.originalLabel ||= submit.textContent;
      submit.textContent = form.dataset.submittingLabel || "…";
    }

    hideError();

    try {
      const payload = new FormData(form);
      payload.set("access_key", WEB3FORMS_ACCESS_KEY);
      const name = (payload.get("name") || "").toString().trim();
      payload.set("subject", `Emerald — new inquiry from ${name || "website"}`);
      payload.set("from_name", "Emerald website");

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        showThanks(form);
      } else {
        throw new Error(data.message || `Request failed (${res.status})`);
      }
    } catch (err) {
      console.error("[contact-form] submit failed:", err);
      showError();
      if (submit) {
        submit.disabled = false;
        submit.textContent = submit.dataset.originalLabel || submit.textContent;
      }
    }
  });

  return { reset: () => form.reset() };
}

function showThanks(form) {
  const thanks = document.querySelector("[data-contact-thanks]");
  if (!thanks) return;
  form.hidden = true;
  thanks.hidden = false;
  thanks.setAttribute("tabindex", "-1");
  thanks.focus();
  thanks.scrollIntoView({ behavior: "smooth", block: "center" });
}

function showError() {
  const err = document.querySelector("[data-contact-error]");
  if (!err) return;
  err.hidden = false;
  err.setAttribute("role", "alert");
  err.scrollIntoView({ behavior: "smooth", block: "center" });
}

function hideError() {
  const err = document.querySelector("[data-contact-error]");
  if (err) err.hidden = true;
}

function prefillPiece(form) {
  const params = new URLSearchParams(window.location.search);
  const piece = (params.get("piece") || "").toLowerCase().trim();
  if (!piece) return;
  const select = form.querySelector("[name='piece']");
  if (!select) return;

  const match = Array.from(select.options).find(
    (opt) => opt.value.toLowerCase() === piece
  );
  if (match) select.value = match.value;
}
