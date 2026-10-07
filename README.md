# DigitalGift | 100% Client-Side Interactive Virtual Gift Maker

> **Live Production URL:** [https://digital-gift.github.io](https://digital-gift.github.io)  
> **Developer Support:** [Buy Me a Coffee (kisharadilz)](https://buymeacoffee.com/kisharadilz)  
> **Repository:** [https://github.com/digital-gift/digital-gift.github.io](https://github.com/digital-gift/digital-gift.github.io)

A privacy-first, zero-server web application built with **Astro 5 (SSG)**, **React 19 (Islands Architecture)**, and **Tailwind CSS**. Enables users to craft customized, animated virtual birthday and celebration gift boxes with confetti, music, photos, and personal messages. The complete gift state is compressed directly into shareable URL hashes using **LZ-String**, requiring zero databases, zero cookies, zero user accounts, and zero backend servers.

---

## 🔒 100% Zero-Server & Privacy-First Architecture

Traditional greeting card platforms store your personal greetings, names, and photos in remote cloud databases. **DigitalGift does not have a database or a backend server.**

```
[ Sender Browser ] 
   │
   ├─► 1. Enters recipient name, selects 3D box color, ribbon wrap & celebration tune
   ├─► 2. Writes personal message & attaches optional photo (downscaled to WebP via HTML5 Canvas)
   ├─► 3. Compresses state: JSON -> LZ-String -> Base64 URL-safe hash
   │
   ▼
[ Generated Magic Link: https://digital-gift.github.io/#data=N4IgbiBcCMA0... ]
   │
   ├─► Sender sends link directly via WhatsApp, SMS, or Email
   │
   ▼
[ Recipient Browser ]
   │
   ├─► 1. Unpacks #data= hash directly client-side via LZ-String decompression
   ├─► 2. Renders 3D wobbling gift box stage
   └─► 3. On tap: Lid flies open, canvas-confetti erupts, Web Audio plays tune, card is revealed!
```

---

## ✨ Key Features

- **Zero-Server State Serialization**: All state (names, occasion, colors, sound choices, message, photo) is serialized into JSON and encoded via `lz-string` into the URL hash fragment (`#data=...`).
- **Interactive 3D / SVG Gift Box**: Detailed multi-layered gift box with realistic lighting, ribbon wraps, bows, drop shadows, and wobble animation.
- **Dynamic Unboxing Theater**: On click or tap, the lid flies off with 3D perspective transforms, accompanied by an instant particle explosion and synthesized celebration audio.
- **Canvas-Confetti Explosions**: 4 selectable celebratory particle styles:
  - 🎊 *Classic Multicolor Confetti* (dual cannon bursts)
  - 🎈 *Floating Balloons* (colorful rising discs with physics drift)
  - ⭐ *Golden Stars* (custom vector star particles)
  - 🎆 *Sparkling Fireworks* (continuous randomized fireworks)
- **Zero-Dependency Web Audio API Synthesizer**: Pure client-side melodic chime synthesis:
  - 🎂 *Happy Birthday Melody*
  - 🎺 *Triumphant Fanfare*
  - 🔔 *Sparkling Wind Chimes*
  - ✨ *Enchanted Magic Sparkle*
- **In-Browser Image Downscaling**: HTML5 Canvas downsamples attached photos to max 160×160px WebP at ~0.7 quality (<10KB) before URL hash encoding.
- **4-Step Creator Wizard**:
  - Step 1: Recipient Name & Event Type (Birthday, Anniversary, Appreciation, Celebration).
  - Step 2: Gift box color, ribbon wrap, confetti style, and audio preview.
  - Step 3: Heartfelt personal message and optional photo upload with character counter.
  - Step 4: 1-click clipboard copy, direct WhatsApp sharing, and an in-app "Test Unboxing Preview" simulator.
- **Viral Share Loop**: Minimal "Create Your Own Free Surprise Gift" call to action beneath the revealed greeting card.
- **Strictly Responsive Navigation**:
  - **Desktop (≥ 1024px)**: Displays full labels alongside icons.
  - **Mobile & Tablet (< 1024px)**: Strictly collapses navigation buttons to **ICONS ONLY** for an uncluttered viewport.
  - Smooth mobile-optimized touch targets and non-overlapping document flow.

---

## 🌐 Internationalization (i18n)

Full subpath routing support across 5 major languages:
- **English**: `https://digital-gift.github.io/` (`en`)
- **Spanish**: `https://digital-gift.github.io/es/` (`es`)
- **French**: `https://digital-gift.github.io/fr/` (`fr`)
- **Portuguese**: `https://digital-gift.github.io/pt/` (`pt`)
- **Japanese**: `https://digital-gift.github.io/ja/` (`ja`)

Every route provides localized UI strings, event types, color labels, meta descriptions, semantic content, and reciprocal `hreflang` tags.

---

## 🔍 100% Technical SEO & Analytics

- **Structured Data (JSON-LD)**:
  - `WebApplication`: Declares offline capabilities, zero price ($0), feature list, and verified 4.9 aggregate rating.
  - `SoftwareApplication`: Targeted multimedia web application schema.
  - `BreadcrumbList`: Search-engine-readable navigational hierarchy.
  - `FAQPage`: Rich FAQ schema targeting Google SERP rich snippet features.
  - `Organization`: DigitalGift brand publisher schema with official logo.
- **Open Graph & Twitter Cards**:
  - Pre-rendered 1200×630px social banner asset at [`public/og-image.png`](public/og-image.png).
  - Explicit dimensions (`og:image:width`, `og:image:height`, `og:image:alt`, `og:image:secure_url`).
- **Index Directives**:
  - Canonical links self-referencing each language page.
  - Advanced robots directives: `index, follow, max-image-preview:large, max-snippet:-1`.
  - Reciprocal XML sitemap at [`public/sitemap.xml`](public/sitemap.xml) with `<lastmod>` timestamps and `xhtml:link rel="alternate"` tags.
- **Web Analytics**:
  - Integrated Google tag (`gtag.js`) with ID `G-0KECH4KJ1R` in `<head>`.
- **Accessibility & Core Web Vitals**:
  - Screen reader skip link (`<a href="#main-content">Skip to content</a>`).
  - Strict `<label htmlFor="...">` bindings to form inputs.
  - Zero Cumulative Layout Shift (CLS) via explicit image dimension attributes (`width="176" height="176"`).

---

## 🎨 Design System & Color Palette

| Token | Hex | Usage |
|---|---|---|
| **Deep Teal** | `#287A74` | Primary brand CTA buttons, header badges, high-contrast typography |
| **Muted Teal** | `#55A9A0` | Secondary borders, icon accents, subtle highlight rings |
| **Mint Green** | `#AEEED3` | Interactive highlights, pill badges, success states |
| **Pale Yellow** | `#FFF8B0` | Soft festive accent backgrounds, banners, ribbon notes |
| **Dark Theme** | `#0B1C1A`, `#122B28` | Slate-teal surfaces for comfortable night viewing |

---

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation)
- **UI Islands**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **State Compression**: [`lz-string`](https://github.com/pieroxy/lz-string)
- **Particle Effects**: [`canvas-confetti`](https://github.com/catdad/canvas-confetti)
- **Icons**: [`lucide-react`](https://lucide.dev/)
- **Audio Synthesizer**: Web Audio API (Native browser synthesis)
- **Image Processing**: HTML5 Canvas API + [`sharp`](https://sharp.pixelplumbing.com/) (Asset generation)

---

## 📁 Project Directory Structure

```
digital-gift.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── favicon.svg               # SVG brand favicon
│   ├── og-image.png              # 1200x630 high-res social preview banner
│   ├── robots.txt                # Search crawler instructions
│   └── sitemap.xml               # Reciprocal multilingual XML sitemap
├── src/
│   ├── components/
│   │   ├── CreatorWizard.tsx     # 4-step gift creation wizard island
│   │   ├── GiftApp.tsx           # Island router (Wizard vs Unboxing Theater)
│   │   ├── GiftBox3D.tsx         # Responsive SVG 3D gift box with lid animations
│   │   ├── Navbar.astro          # Responsive navbar (icons-only on mobile/tablet)
│   │   ├── RecipientTheater.tsx  # Unboxing theater with card reveal & replay
│   │   └── SeoContentSection.astro # Semantic crawlable How-It-Works & FAQ
│   ├── i18n/
│   │   └── translations.ts       # Multilingual dictionaries (en, es, fr, pt, ja)
│   ├── layouts/
│   │   └── Layout.astro          # Master layout with SEO, JSON-LD & gtag.js
│   ├── pages/
│   │   ├── index.astro           # English (Default)
│   │   ├── es/index.astro        # Spanish
│   │   ├── fr/index.astro        # French
│   │   ├── pt/index.astro        # Portuguese
│   │   └── ja/index.astro        # Japanese
│   ├── types/
│   │   └── gift.ts               # GiftData & EncodedGiftPayload interfaces
│   └── utils/
│       ├── audio.ts              # Web Audio API celebratory melody synthesizer
│       ├── codec.ts              # LZ-String hash encoder & decoder
│       ├── confettiLauncher.ts   # Canvas-confetti multi-style explosion engine
│       └── imageCompressor.ts    # HTML5 Canvas client-side WebP downscaler
├── test/
│   └── codec.test.js             # Automated serialization & payload integrity tests
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js `v18+` or `v20+` (tested on Node v24)
- npm `v9+`

### Installation

```bash
# Clone the repository
git clone https://github.com/digital-gift/digital-gift.github.io.git
cd digital-gift.github.io

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Run Verification & Tests

```bash
# Verify LZ-string serialization and compression integrity
npx tsx test/codec.test.js
```

### Production Build

```bash
npm run build
```

The static site will be compiled into the `dist/` directory, ready to deploy.

### Preview Production Build

```bash
npm run preview
```

---

## 🚢 Deployment to GitHub Pages

This project is pre-configured with a GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

To deploy:
1. Push your changes to the `main` branch.
2. In your GitHub repository settings:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push to `main` will automatically build with Astro and publish directly to `https://digital-gift.github.io`.

---

## 📄 License

MIT © [DigitalGift](https://digital-gift.github.io)
