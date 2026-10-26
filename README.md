# ExploreVista — Premium Tourism Guide Website

> A visually stunning, accessible, and fully responsive static tourism guide website showcasing six of India's most iconic travel destinations: **Kashmir, Goa, Manali, Jaipur, Kerala, and Ladakh**. Built with semantic HTML5, custom CSS3, Bootstrap 5.3.3, and vanilla JavaScript.

![ExploreVista Banner](https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80&auto=format&fit=crop)

---

## Overview

**ExploreVista** is an editorial-grade, static travel guide website created as a premier college web design project and frontend portfolio showcase. It demonstrates modern UI/UX design, modular CSS architecture, responsive layout design across all viewports, full keyboard accessibility (WCAG 2.1 AA), and interactive vanilla JavaScript without requiring any backend, database, npm packages, or build systems.

- **GitHub Repository:** [https://github.com/KushalJasti/explorevista-tourism-guide](https://github.com/KushalJasti/explorevista-tourism-guide) *(Pending user approval)*
- **Live Vercel Deployment:** *(To be configured upon Vercel link)*
- **Local Preview Server:** `http://127.0.0.1:4200/`

---

## The Five Web Pages

| Page | File | Purpose & Key Features |
|---|---|---|
| **Homepage** | [`index.html`](index.html) | Brand introduction, full-bleed hero banner, quick search routing, animated statistics counter, featured destinations, category browser, about section, CSS travel map placeholder, traveller reviews, and call-to-action band. |
| **Destinations** | [`destinations.html`](destinations.html) | Comprehensive travel catalog covering Kashmir, Goa, Manali, Jaipur, Kerala, and Ladakh with instant live search, category filter pills, empty-state feedback, seasonal info, and accommodation links. |
| **Gallery** | [`gallery.html`](gallery.html) | Photojournalistic 12-image grid with destination filter tabs, hover overlays, and an accessible full-screen modal lightbox supporting keyboard navigation (`Enter`, `Space`, `Escape`, `ArrowLeft`, `ArrowRight`). |
| **Hotels & Stays** | [`hotels.html`](hotels.html) | Curated accommodation catalog across luxury, beachfront, mountain, heritage, and eco categories, featuring star ratings, amenity tags, baseline-aligned buttons, destination filters, and prominent demo booking notices. |
| **Contact & FAQ** | [`contact.html`](contact.html) | Direct office contact directory (`tel:`, `mailto:`), interactive contact form with live regex validation, inline alert messages, simulated async submission feedback, and an accessible FAQ accordion. |

---

## Design System & Typography

- **Curated Palette:**
  - **Forest Green (`#1a4731`):** Primary brand identity, headers, navbar, and primary action buttons.
  - **Muted Gold (`#b5891a`):** Accent highlights, focus rings, rating stars, and badges.
  - **Warm White (`#faf8f4`):** Soft, high-readability page background avoiding harsh glare.
  - **Section Neutral (`#f3efe8`):** Harmonious alternating section background.
  - **Dark Charcoal (`#1c1c1c`):** High-contrast body text ensuring WCAG AA readability.
- **Typography:**
  - **Headings:** `'Playfair Display', Georgia, serif` — refined editorial serif.
  - **Body Text:** `'Inter', system-ui, sans-serif` — clean, highly legible screen typography.
  - **Fluid Scaling:** CSS `clamp()` fluid type rules ensuring continuous typographic scaling from mobile to desktop.

---

## Key Features & Interactivity

1. **Sticky & Mobile Navbar:** Seamless scroll-state color transitions with automatic drawer collapse on outside click or menu selection.
2. **Hero Search Routing:** Search bar accepts queries and forwards them to `destinations.html?q={query}`.
3. **Category Deep-Linking:** Homepage category cards navigate with `?cat={category}` to pre-activate that category filter on the destinations page.
4. **Instant Live Filter & Search:** Synchronous client-side filtering matching titles, tags, and descriptive keywords without layout jumps.
5. **Multi-Page Filter Tabs:** Destination filtering on the Destinations directory, Travel Gallery, and Hotels page.
6. **Accessible Modal Lightbox:** Trap-aware modal focus, keyboard accessibility, background scroll locking, and filter-aware next/previous navigation.
7. **Form Validation with Feedback:** Real-time email regex check and non-empty validation with `aria-invalid` states, `role="alert"` messages, and a simulated loading state.
8. **IntersectionObserver Scroll Reveals:** Smooth staggered entrance animations with native `prefers-reduced-motion` bypass.
9. **Animated Stat Counters:** Smooth counting to 50+, 12,000+, 200+, and fixed decimal float counting to 4.9★.

---

## Accessibility Compliance (WCAG 2.1 AA)

- **Semantic Landmarks:** Complete landmark coverage with `<header>`, `<nav>`, `<main id="main-content">`, `<section>`, `<article>`, `<footer>`, and `<address>`.
- **Keyboard Skip-Link:** Visible-on-focus skip link (`<a href="#main-content" class="skip-link">`) on every page.
- **Strict Heading Hierarchy:** Strictly sequential headings (`h1` → `h2` → `h3`) with zero skipped levels.
- **ARIA & Form Accessibility:** Explicit `aria-required`, `aria-describedby`, and dynamic `aria-invalid` on inputs, alongside `role="alert"` for errors.
- **Focus Indicators:** High-contrast 2px gold outline with 3px offset for all `:focus-visible` states.
- **Reduced Motion:** Comprehensive `@media (prefers-reduced-motion: reduce)` support disabling transitions, delays, and parallax effects.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure, landmarks, form attributes, and meta tags |
| **CSS3** | Custom design tokens, Flexbox, CSS Grid, media queries, animations |
| **Bootstrap 5.3.3** (CDN) | Responsive grid scaffolding, mobile navigation collapse, FAQ accordion |
| **Bootstrap Icons 1.11.3** (CDN) | SVG iconography |
| **Google Fonts** | Playfair Display & Inter web fonts |
| **Vanilla JavaScript** (ES2020+) | DOM manipulation, IntersectionObserver, live search, lightbox modal |
| **Unsplash** | Freely usable high-resolution travel photography |

---

## Project Structure

```
FrontEnd_Project/
├── .gitignore              # Ignores OS, editor, and temporary files
├── README.md               # User documentation & setup guide
├── PROJECT_REPORT.md       # Comprehensive academic/technical report
├── index.html              # Homepage
├── destinations.html       # Destinations guide with live search & filters
├── gallery.html            # 12-image gallery with modal lightbox
├── hotels.html             # Hotel & accommodation directory
├── contact.html            # Contact form with live validation & FAQ accordion
├── css/
│   └── style.css           # Global stylesheet & design system
├── js/
│   └── script.js           # Central JavaScript logic & component handlers
└── assets/
    └── images/             # Directory preserved for local image assets
        └── .gitkeep        # Git tracking keep file
```

---

## Running Locally

Because ExploreVista is built with pure web standards, no compilation or npm dependencies are required.

### Option 1 — Python HTTP Server (Recommended)
```bash
# Navigate to the project directory
cd /path/to/FrontEnd_Project

# Start Python HTTP server on port 4200
python3 -m http.server 4200 --bind 127.0.0.1

# Open in your browser
http://127.0.0.1:4200
```

### Option 2 — VS Code Live Server
1. Open the `FrontEnd_Project` folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and choose **Open with Live Server** (default: `http://127.0.0.1:5500`).

### Option 3 — Node.js serve
```bash
npx serve .
```

### Option 4 — Direct Browser File Open
Double-click `index.html` to open it directly in Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari.

---

## Deployment Guide

### Deploying to GitHub & GitHub Pages
```bash
# 1. Initialize Git inside the project folder
git init

# 2. Add all project files
git add .

# 3. Commit
git commit -m "Initial commit: ExploreVista tourism website"

# 4. Add the GitHub remote (replace with your repository URL)
git remote add origin https://github.com/KushalJasti/explorevista-tourism-guide.git
git branch -M main
git push -u origin main
```
To enable **GitHub Pages**:
1. Open the repository on GitHub.
2. Go to **Settings** → **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. The site will publish at `https://<your-username>.github.io/explorevista-tourism-guide/`.

### Deploying to Vercel
1. Sign in to [vercel.com](https://vercel.com) using your GitHub account.
2. Click **Add New** → **Project**.
3. Select and import the `explorevista-tourism-guide` repository.
4. Leave settings at defaults (Framework: *Other*, Build command: *None*, Output directory: *Root*).
5. Click **Deploy**. Vercel will deploy the static site immediately with a public `.vercel.app` URL.

---

## Important Notices & Limitations

- **Contact Form:** The contact form features full client-side validation and simulated sending states, but is for frontend demonstration only. No emails are transmitted and no user messages are stored on a server.
- **Hotel Booking:** Rates, availability, and "View Details" buttons are illustrative samples. No live reservation system or payment gateway is implemented.
- **Map Section:** The travel map is a custom CSS visual graphic featuring location markers across India; it is not a dynamic tiled map API (e.g. Google Maps or Mapbox).
- **External CDN Dependency:** Images, Bootstrap styles, and web fonts require an active internet connection to load from their respective CDNs (Unsplash, jsDelivr, Google Fonts).

---

## Academic Role Division

> Capstone assignment roles as defined in the project specification:

| Role | Responsibilities |
|---|---|
| **Member 1** | Primary page design, navigation bar, hero banner, travel categories, and global CSS design system (`index.html`, `css/style.css`). |
| **Member 2** | Page layouts, content writing, photo curation, hotel cards, testimonials, and responsive grid polish (`destinations.html`, `gallery.html`, `hotels.html`). |
| **Member 3** | Form validation, JavaScript component logic, accessibility implementation, documentation, and static deployment (`contact.html`, `js/script.js`, `README.md`, `PROJECT_REPORT.md`). |

---

## Licence

This project is created for educational and portfolio demonstration purposes. Photography is sourced from [Unsplash](https://unsplash.com) under the Unsplash Licence. All other source code is original.
