/* ============================================================
   BREAKEVENFX — app.js
   Preloader · reveals · counters · tilt · magnetic buttons ·
   cursor · carousel · nav · form
   (the morphing particle background lives in scene.js)
   ============================================================ */

(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  /* ---------------- Preloader ---------------- */
  function initPreloader() {
    const pre = document.getElementById("preloader");
    const fill = document.getElementById("preloaderFill");
    const pct = document.getElementById("preloaderPct");
    const DURATION = prefersReduced ? 50 : 1400;
    const start = performance.now();

    function tick(now) {
      const p = clamp((now - start) / DURATION, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(eased * 100);
      fill.style.width = value + "%";
      pct.textContent = value + "%";
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        pre.classList.add("done");
        document.body.classList.add("loaded");
      }
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- Split hero headline into words ---------------- */
  function initSplitText() {
    document.querySelectorAll("[data-split]").forEach((line, lineIdx) => {
      // Gradient lines animate as one block: background-clip:text doesn't
      // paint into transformed descendant spans, so the gradient must live
      // on the transformed span itself.
      if (line.classList.contains("gradient-text")) {
        const text = line.textContent.trim();
        line.textContent = "";
        line.classList.remove("gradient-text");
        const wrap = document.createElement("span");
        wrap.className = "word";
        const inner = document.createElement("span");
        inner.className = "word-inner gradient-text";
        inner.textContent = text;
        inner.style.transitionDelay = 0.25 + lineIdx * 0.18 + "s";
        wrap.appendChild(inner);
        line.appendChild(wrap);
        return;
      }
      const words = line.textContent.trim().split(/\s+/);
      line.textContent = "";
      words.forEach((word, i) => {
        const wrap = document.createElement("span");
        wrap.className = "word";
        const inner = document.createElement("span");
        inner.className = "word-inner";
        inner.textContent = word;
        inner.style.transitionDelay = 0.25 + lineIdx * 0.18 + i * 0.06 + "s";
        wrap.appendChild(inner);
        line.appendChild(wrap);
        if (i < words.length - 1) line.appendChild(document.createTextNode(" "));
      });
    });
  }

  /* ---------------- Custom cursor ---------------- */
  function initCursor() {
    if (isTouch) return;
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    let mx = -100, my = -100, rx = -100, ry = -100;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    (function follow() {
      rx = lerp(rx, mx, 0.16);
      ry = lerp(ry, my, 0.16);
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(follow);
    })();

    document.querySelectorAll("a, button, [data-tilt], input").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hovering"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hovering"));
    });
  }

  /* ---------------- Nav: glass + hide on scroll down ---------------- */
  function initNav() {
    const nav = document.getElementById("nav");
    const burger = document.getElementById("navBurger");
    const menu = document.getElementById("mobileMenu");
    let lastY = window.scrollY;

    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 40);
      if (y > lastY && y > 320 && !menu.classList.contains("open")) {
        nav.classList.add("hidden");
      } else {
        nav.classList.remove("hidden");
      }
      lastY = y;
    }, { passive: true });

    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      menu.classList.toggle("open");
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        burger.classList.remove("open");
        menu.classList.remove("open");
      })
    );

    // active link highlight
    const links = Array.from(document.querySelectorAll(".nav-links a"));
    const sections = links
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((a) =>
              a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
            );
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------------- Scroll progress + timeline fill ---------------- */
  function initScrollProgress() {
    const bar = document.getElementById("scrollProgress");
    const timelineFill = document.getElementById("timelineFill");
    const timeline = document.querySelector(".timeline");

    window.addEventListener("scroll", () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;

      if (timeline && timelineFill) {
        const rect = timeline.getBoundingClientRect();
        const progress = clamp(
          (window.innerHeight * 0.75 - rect.top) / rect.height, 0, 1
        );
        timelineFill.style.height = progress * 100 + "%";
      }
    }, { passive: true });
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveals() {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            el.style.transitionDelay = delay + "ms";
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.18 }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------------- Animated counters ---------------- */
  function initCounters() {
    const els = document.querySelectorAll("[data-count]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    els.forEach((el) => io.observe(el));

    function animate(el) {
      const target = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const DURATION = prefersReduced ? 1 : 2200;
      const start = performance.now();

      function tick(now) {
        const p = clamp((now - start) / DURATION, 0, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = prefix + Math.round(target * eased).toLocaleString("en-US") + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  }

  /* ---------------- 3D tilt cards ---------------- */
  function initTilt() {
    if (isTouch || prefersReduced) return;
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.transform =
          `perspective(900px) rotateX(${(0.5 - py) * 9}deg) rotateY(${(px - 0.5) * 11}deg) translateY(-5px)`;
        card.style.setProperty("--gx", px * 100 + "%");
        card.style.setProperty("--gy", py * 100 + "%");
      });
      card.addEventListener("mouseleave", () => {
        card.style.transition = "transform 0.6s cubic-bezier(0.22, 0.68, 0.12, 1)";
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
        setTimeout(() => (card.style.transition = ""), 600);
      });
    });
  }

  /* ---------------- Magnetic buttons ---------------- */
  function initMagnetic() {
    if (isTouch || prefersReduced) return;
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transition = "transform 0.5s cubic-bezier(0.22, 0.68, 0.12, 1)";
        el.style.transform = "translate(0, 0)";
        setTimeout(() => (el.style.transition = ""), 500);
      });
    });
  }

  /* ---------------- Testimonial carousel ---------------- */
  function initCarousel() {
    const slides = Array.from(document.querySelectorAll(".slide"));
    const dotsWrap = document.getElementById("carouselDots");
    if (!slides.length || !dotsWrap) return;
    let current = 0;
    let timer;

    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.setAttribute("aria-label", "Slide " + (i + 1));
      if (i === 0) b.classList.add("active");
      b.addEventListener("click", () => { go(i); restart(); });
      dotsWrap.appendChild(b);
    });
    const dots = Array.from(dotsWrap.children);

    function go(i) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = (i + slides.length) % slides.length;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
    }
    function restart() {
      clearInterval(timer);
      if (!prefersReduced) timer = setInterval(() => go(current + 1), 5500);
    }
    const carousel = document.querySelector(".carousel");
    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener("mouseleave", restart);
    restart();
  }

  /* ---------------- Join form (front-end only) ---------------- */
  function initForm() {
    const form = document.getElementById("joinForm");
    const name = document.getElementById("joinName");
    const email = document.getElementById("joinEmail");
    const success = document.getElementById("joinSuccess");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      [name, email].forEach((input) => {
        const valid = input.value.trim().length > 1;
        input.classList.toggle("error", !valid);
        if (!valid) ok = false;
      });
      if (!ok) return;
      form.style.display = "none";
      success.classList.add("show");
    });
    [name, email].forEach((input) =>
      input.addEventListener("input", () => input.classList.remove("error"))
    );
  }

  /* ---------------- Boot ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initSplitText();
    initPreloader();
    initCursor();
    initNav();
    initScrollProgress();
    initReveals();
    initCounters();
    initTilt();
    initMagnetic();
    initCarousel();
    initForm();
  });
})();
