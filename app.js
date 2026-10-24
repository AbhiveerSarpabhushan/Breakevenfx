(() => {
  "use strict";
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-nav");
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    menu.hidden = true;
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute(
      "aria-label",
      open ? "Open navigation" : "Close navigation",
    );
    menu.hidden = open;
  });
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header") && !menu.hidden) closeMenu();
  });
  window
    .matchMedia("(min-width: 901px)")
    .addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  const answers = document.querySelectorAll(".faq-list details");
  answers.forEach((answer) =>
    answer.addEventListener("toggle", () => {
      if (answer.open)
        answers.forEach((other) => {
          if (other !== answer) other.open = false;
        });
    }),
  );
  const email = "abhiveer.sarpabhushan@gmail.com";
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = String(data.get("interest")) + " — BreakevenFX";
    const name = [data.get("firstName"), data.get("lastName")]
      .filter(Boolean)
      .join(" ");
    const body = `Hi BreakevenFX,\n\n${data.get("message")}\n\n${name}\n${data.get("email")}`;
    const draft = document.getElementById("draft-link");
    draft.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.getElementById("form-status").hidden = false;
    draft.click();
  });
  document.querySelector(".copy-email").addEventListener("click", async () => {
    const status = document.getElementById("contact-status");
    try {
      await navigator.clipboard.writeText(email);
      status.textContent = "Email address copied.";
    } catch {
      status.textContent = "Email us at " + email;
    }
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();
