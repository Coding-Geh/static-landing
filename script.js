// Theme toggle with localStorage
(function setupTheme() {
  const root = document.documentElement;
  const key = "theme-preference";
  const saved = localStorage.getItem(key);
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  }
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", current);
      localStorage.setItem(key, current);
    });
  }
})();

// Simple i18n: auto-detect, store choice, and apply
(function setupI18n() {
  const key = "lang-preference";
  const supported = ["en", "id"];
  const dict = {
    en: {
      brand: "CodingGeh",
      nav: { features: "Features", pricing: "Pricing", faq: "FAQ", contact: "Contact" },
      hero: {
        title: "Lightning-fast static website. Deploy in minutes.",
        lead_html: "No build tools, no hassle. Just open <code>index.html</code> — responsive, fast, and production-ready.",
        cta: { features: "See Features", pricing: "View Pricing" },
        trust: { noFramework: "No framework", fastAccess: "Fast access", darkMode: "Dark mode" }
      },
      features: {
        title: "Everything you need",
        cards: {
          noBuild: { title: "Zero Build", body: "Run with pure HTML, CSS, and JS. Perfect for quick launches." },
          responsive: { title: "Responsive", body: "Flexible grid for phone, tablet, and desktop." },
          darkMode: { title: "Dark Mode", body: "One-click theme toggle with saved preference." },
          modular: { title: "Modular", body_html: "Clear structure: <code>index.html</code>, <code>styles.css</code>, <code>script.js</code>." }
        }
      },
      pricing: {
        title: "Simple pricing",
        free: { title: "Free", subtitle: "Just clone & deploy", features: { 1: "Responsive landing", 2: "Dark mode", 3: "Zero dependencies" }, cta: "Get it now" },
        pro: { title: "Pro", subtitle: "Customization & support", features: { 1: "Extra sections", 2: "Ready-to-use copy", 3: "Form integrations" }, cta: "Contact" }
      },
      faq: {
        title: "Frequently asked questions",
        q1: { title: "Do I need Node.js or build tools?", body: "No. Just open <code>index.html</code> in your browser." },
        q2: { title: "Can I deploy to static hosting?", body: "Yes. Upload this folder to Netlify, Vercel Static, GitHub Pages, or Nginx." },
        q3: { title: "How do I change colors/brand?", body_html: "Edit CSS variables under <code>:root</code> in <code>styles.css</code>." }
      },
      contact: {
        title: "Contact",
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send",
        error: { required: "Required", email: "Invalid email" },
        status: { check: "Please check your inputs.", sending: "Sending...", sent: "Sent! (demo)" }
      },
      footer: { rights: "All rights reserved.", backtotop: "↑ Back to top" }
    },
    id: {
      brand: "CodingGeh",
      nav: { features: "Fitur", pricing: "Harga", faq: "FAQ", contact: "Kontak" },
      hero: {
        title: "Website statis kilat. Deploy dalam menit.",
        lead_html: "Tanpa build tools. Buka <code>index.html</code> — responsif, cepat, siap produksi.",
        cta: { features: "Lihat Fitur", pricing: "Cek Harga" },
        trust: { noFramework: "Tanpa framework", fastAccess: "Akses cepat", darkMode: "Mode gelap" }
      },
      features: {
        title: "Fitur yang kamu butuhin",
        cards: {
          noBuild: { title: "Tanpa Build", body: "Jalan pakai HTML, CSS, dan JS murni. Cocok untuk peluncuran cepat." },
          responsive: { title: "Responsif", body: "Grid fleksibel untuk ponsel, tablet, dan desktop." },
          darkMode: { title: "Mode Gelap", body: "Toggle tema sekali klik, preferensi tersimpan." },
          modular: { title: "Modular", body_html: "Struktur jelas: <code>index.html</code>, <code>styles.css</code>, <code>script.js</code>." }
        }
      },
      pricing: {
        title: "Harga sederhana",
        free: { title: "Gratis", subtitle: "Cukup clone & deploy", features: { 1: "Landing responsif", 2: "Mode gelap", 3: "0 dependensi" }, cta: "Ambil sekarang" },
        pro: { title: "Pro", subtitle: "Kustomisasi & dukungan", features: { 1: "Section tambahan", 2: "Copy siap pakai", 3: "Integrasi form" }, cta: "Hubungi" }
      },
      faq: {
        title: "Pertanyaan umum",
        q1: { title: "Perlu Node.js atau build tools?", body: "Enggak. Buka <code>index.html</code> di browser." },
        q2: { title: "Bisa ke hosting statis?", body: "Bisa. Upload folder ini ke Netlify, Vercel Static, GitHub Pages, atau Nginx." },
        q3: { title: "Gimana ganti warna/brand?", body_html: "Edit variabel CSS di <code>:root</code> dalam <code>styles.css</code>." }
      },
      contact: {
        title: "Kontak",
        name: "Nama",
        email: "Email",
        message: "Pesan",
        submit: "Kirim",
        error: { required: "Wajib diisi", email: "Email tidak valid" },
        status: { check: "Cek lagi input kamu.", sending: "Mengirim...", sent: "Terkirim! (demo)" }
      },
      footer: { rights: "All rights reserved.", backtotop: "↑ Ke atas" }
    }
  };

  function detectLanguage() {
    // 1) URL query override (?lang=en|id)
    const qs = new URLSearchParams(window.location.search);
    const qp = (qs.get("lang") || "").toLowerCase();
    if (supported.includes(qp)) {
      localStorage.setItem(key, qp);
      return qp;
    }
    // 2) saved preference
    const saved = localStorage.getItem(key);
    if (saved && supported.includes(saved)) return saved;
    const nav = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language || "en";
    const base = String(nav).toLowerCase().split("-")[0];
    return supported.includes(base) ? base : "en";
  }

  function applyTranslations(lang) {
    const d = dict[lang] || dict.en;
    // data-i18n innerText
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const path = el.getAttribute("data-i18n");
      const val = get(d, path);
      if (typeof val === "string") el.textContent = val;
    });
    // data-i18n-html innerHTML
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const path = el.getAttribute("data-i18n-html");
      const val = get(d, path);
      if (typeof val === "string") el.innerHTML = val;
    });
    // Update lang button label
    const lb = document.getElementById("langToggle");
    if (lb) lb.textContent = lang.toUpperCase();
    // Update <html lang>
    document.documentElement.lang = lang;
  }

  function get(obj, path) {
    return path.split(".").reduce((o, k) => (o && o[k] != null ? o[k] : undefined), obj);
  }

  // expose minimal helpers for other modules
  window.__i18n_get = function (lang, path) {
    const d = dict[lang] || dict.en;
    return get(d, path);
  };
  window.__i18n_apply = applyTranslations;

  const lang = detectLanguage();
  applyTranslations(lang);

  const btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = document.documentElement.lang || lang;
      const next = current === "en" ? "id" : "en";
      localStorage.setItem(key, next);
      applyTranslations(next);
    });
  }
})();

// Smooth scroll for internal nav links
(function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();

// Mobile drawer menu
(function mobileMenu() {
  const menuBtn = document.getElementById("menuToggle");
  const drawer = document.getElementById("navDrawer");
  const backdrop = document.getElementById("backdrop");
  const closeBtn = document.getElementById("drawerClose");
  if (!menuBtn || !drawer || !backdrop) return;
  const open = () => {
    drawer.classList.add("show");
    backdrop.classList.add("show");
    backdrop.hidden = false;
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    // focus first link for accessibility
    const firstLink = drawer.querySelector('a[href^="#"]');
    if (firstLink) firstLink.focus({ preventScroll: true });
  };
  const close = () => {
    drawer.classList.remove("show");
    backdrop.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    setTimeout(() => { backdrop.hidden = true; }, 250);
    // return focus to menu button
    menuBtn.focus({ preventScroll: true });
  };
  menuBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("show");
    isOpen ? close() : open();
  });
  backdrop.addEventListener("click", close);
  if (closeBtn) closeBtn.addEventListener("click", close);
  drawer.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener("click", close));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
})();

// Reveal on scroll
(function revealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach((el) => el.classList.add('show'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.15 });
  els.forEach((el) => io.observe(el));
})();

// Scrollspy for nav links (desktop & drawer)
(function scrollSpy() {
  const sections = ["#features", "#pricing", "#faq", "#contact"].map((s) => document.querySelector(s)).filter(Boolean);
  const links = Array.from(document.querySelectorAll('.nav a, #navDrawer a')).filter((a) => a.getAttribute('href')?.startsWith('#'));
  if (sections.length === 0 || links.length === 0) return;
  const setActive = (id) => {
    links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === id));
  };
  const obs = new IntersectionObserver((entries) => {
    const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible[0]) setActive('#' + visible[0].target.id);
  }, { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.6] });
  sections.forEach((sec) => obs.observe(sec));
})();

// Focus trap inside drawer when open
(function focusTrapDrawer() {
  const drawer = document.getElementById('navDrawer');
  const btn = document.getElementById('menuToggle');
  if (!drawer || !btn) return;
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    if (!drawer.classList.contains('show')) return;
    const focusables = drawer.querySelectorAll('a, button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
// Contact form validation (client-only demo)
(function contactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const setInvalid = (field, invalid) => field.classList.toggle("invalid", invalid);
  const isEmail = (val) => /.+@.+\..+/.test(val);

  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const nameField = form.querySelector('input[name="name"]').closest('.field');
    const emailField = form.querySelector('input[name="email"]').closest('.field');
    const msgField = form.querySelector('textarea[name="message"]').closest('.field');

    const invalidName = name.length === 0;
    const invalidEmail = !isEmail(email);
    const invalidMsg = message.length === 0;

    setInvalid(nameField, invalidName);
    setInvalid(emailField, invalidEmail);
    setInvalid(msgField, invalidMsg);

    if (invalidName || invalidEmail || invalidMsg) {
      status.textContent = i18nText("contact.status.check");
      return;
    }

    // Demo only: pretend to send
    status.textContent = i18nText("contact.status.sending");
    setTimeout(() => {
      status.textContent = i18nText("contact.status.sent");
      form.reset();
    }, 800);
  });
})();

// Footer year
document.getElementById("year").textContent = String(new Date().getFullYear());

// Helper to read current i18n text
function i18nText(path) {
  const lang = document.documentElement.lang || "en";
  const map = window.__i18n_cache || {};
  // Rebuild minimal dict per call from dataset on DOM (cheap for short page)
  // In this page we already have translations in setupI18n scope; expose them once
  if (!map.dict) {
    // no-op; setupI18n attaches resolver to window
  }
  if (typeof window.__i18n_get === "function") return window.__i18n_get(lang, path);
  return path; // fallback
}

// SEO runtime hydration for canonical and og:url and JSON-LD URLs
(function hydrateSEO() {
  try {
    const url = window.location.origin + window.location.pathname.replace(/index\.html$/, "");
    const canonical = document.getElementById("canonical");
    const ogUrl = document.getElementById("ogUrl");
    if (canonical) canonical.setAttribute("href", url);
    if (ogUrl) ogUrl.setAttribute("content", url);
    const altEn = document.getElementById("alt-en");
    const altId = document.getElementById("alt-id");
    if (altEn) altEn.setAttribute("href", url + "?lang=en");
    if (altId) altId.setAttribute("href", url + "?lang=id");
    const ld1 = document.getElementById("ld-json");
    const ld2 = document.getElementById("ld-website");
    if (ld1) {
      const data = JSON.parse(ld1.textContent || "{}");
      data.url = url;
      ld1.textContent = JSON.stringify(data);
    }
    if (ld2) {
      const data = JSON.parse(ld2.textContent || "{}");
      data.url = url;
      ld2.textContent = JSON.stringify(data);
    }
  } catch (_) {}
})();


