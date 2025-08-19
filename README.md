# 🌐 CodingGeh Static Landing

<div align="center">
  <img src="og-image.svg" width="200" alt="Project Preview">
  <br>
  <strong>Modern Static Website — Pure HTML, CSS, JS</strong>
  <br>
  <em>Built with ❤️ by CodingGeh</em>
</div>

## 🎬 Demo

<div align="center">
  <a href="https://coding-geh.github.io/static-landing/">
    <img src="https://img.shields.io/badge/Live-Demo-6c5ce7?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Demo">
  </a>
  <a href="https://github.com/Coding-Geh/static-landing/stargazers">
    <img src="https://img.shields.io/github/stars/Coding-Geh/static-landing?style=for-the-badge&logo=github" alt="GitHub Stars">
  </a>
  <a href="https://github.com/Coding-Geh/static-landing/network">
    <img src="https://img.shields.io/github/forks/Coding-Geh/static-landing?style=for-the-badge&logo=github" alt="GitHub Forks">
  </a>
</div>

<div align="center">
  <a href="#about">About</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deploy">Deploy</a>
</div>

---

<div align="center">
  <img src="https://img.shields.io/badge/HTML-5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML">
  <img src="https://img.shields.io/badge/CSS-3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">
</div>

## 🎯 Project Goal & Learning Journey

This project demonstrates how far you can go with a static stack — no frameworks, no build tools — while still shipping a polished, responsive, multi-language, SEO-ready landing page suitable for GitHub Pages.

## 📋 About

This is a **DEMONSTRATION PROJECT** by [CodingGeh](https://github.com/Coding-Geh) showcasing:

- Static web development with modern UI/UX
- Internationalization without libraries (EN/ID)
- SEO best practices (Open Graph, Twitter Card, JSON-LD)
- Responsive layout and accessible navigation

## ✨ Features

- 🎯 **Zero Dependencies** — Pure HTML, CSS, JS
- 📱 **Responsive Layout** — Mobile-first grid, polished on desktop
- 🌓 **Dark Mode** — Theme toggle with persistence
- 🌐 **i18n EN/ID** — Auto-detect, URL override `?lang=en|id`, header toggle
- 🔎 **SEO Ready** — Canonical, OG/Twitter meta, JSON-LD (Organization, WebSite), `robots.txt`, `sitemap.xml`
- ♿ **Accessibility** — Skip link, focus trap, keyboard navigation, ARIA
- 🎞️ **Animations** — Orbs background, hover elevation, reveal-on-scroll

## 🛠️ Tech Stack

- HTML5
- CSS3 (custom properties, media queries)
- JavaScript (ES6+)
- GitHub Pages (static hosting)

## 🏗️ Architecture

```
static-landing/
├── index.html       # Markup + SEO + i18n hooks
├── styles.css       # Theme, layout, animations
├── script.js        # i18n, theme, nav, scrollspy, SEO hydration
├── og-image.svg     # Social preview
├── robots.txt       # Allow all, sitemap link
└── sitemap.xml      # Sitemap anchors
```

## 🚀 Getting Started

```bash
# Serve locally
python3 -m http.server 8080 --directory static-landing
# Open http://localhost:8080
```

## 🌍 Internationalization

- Default follows device language (EN/ID)
- Force language via `?lang=en` or `?lang=id`
- Edit dictionary in `script.js`

## 🔎 SEO

- Canonical, og:url, and hreflang → `https://coding-geh.github.io/static-landing/`
- JSON-LD hydrated at runtime to match final domain
- Update `sitemap.xml` if anchors change

## 🚢 Deploy (GitHub Pages)

```bash
git init
git remote add origin https://github.com/Coding-Geh/static-landing.git
git add .
git commit -m "feat: initial static landing (SEO + i18n + dark mode)"
git branch -M main
git push -u origin main
```

Then: GitHub → Settings → Pages → Source: Deploy from a branch → Branch: `main` → Folder: `/root`.

## 📄 License

MIT © CodingGeh

---

<div align="center">
  <strong>Made with ❤️ by CodingGeh</strong>
  <br>
  <em>Building the future, one site at a time</em>
</div>


