# DigitalGift | 100% Client-Side Interactive Virtual Gift Maker

> **Live Deployment:** [https://digital-gift.github.io](https://digital-gift.github.io)  
> **Developer Support:** [Buy Me a Coffee](https://buymeacoffee.com/kisharadilz)

A privacy-first, zero-server web application built with **Astro**, **React (Islands Architecture)**, and **Tailwind CSS**. Enables users to craft customized, animated virtual gift boxes with confetti, music, and personal messages. The complete gift state is compressed directly into shareable URL hashes using **LZ-String**, requiring zero databases, zero cookies, and zero backend servers.

---

## ✨ Key Features

- **100% Zero-Server & Privacy-First**: No database, no backend API, no tracking, and no cookies. All gift data is serialized into JSON and compressed with `lz-string` into the URL hash (`#data=...`).
- **Interactive 3D / SVG Gift Box**: Detailed multi-layered gift box with realistic ribbons, bows, wobble physics, and dynamic unboxing animations.
- **Canvas-Confetti Explosions**: 4 celebratory styles (Classic Multicolor Confetti, Floating Balloons, Golden Stars, Sparkling Fireworks).
- **Web Audio API Synthesizer**: Pure client-side audio melodies (Happy Birthday, Triumphant Fanfare, Sparkling Chimes, Enchanted Magic) without external audio files.
- **Client-Side Image Downscaling**: In-browser HTML5 Canvas automatically compresses attached photos to max 160×160px WebP (<10KB) before URL encoding.
- **4-Step Creation Wizard**: Recipient details, box styling & sound, personal message & photo, and 1-click sharing (Clipboard & WhatsApp).
- **Interactive Recipient Unboxing Theater**: Clean stage with wobbling gift box, tap-to-open interaction, confetti explosion, musical fanfare, and revealed greeting card.
- **Viral Share Loop**: Minimal "Create Your Own Free Surprise Gift" call to action.
- **Internationalization (i18n)**: Subpath routing supporting 5 languages:
  - English (`/`)
  - Spanish (`/es/`)
  - French (`/fr/`)
  - Portuguese (`/pt/`)
  - Japanese (`/ja/`)
- **Strictly Responsive Navigation**:
  - **Desktop**: Displays full labels alongside icons.
  - **Mobile & Tablet**: Strictly collapses to **ICONS ONLY** for an uncluttered viewport.
- **SEO & Technical Architecture**:
  - Full Open Graph, Twitter Cards, canonical URLs, and `hreflang` alternate links.
  - JSON-LD `WebApplication` and `SoftwareApplication` structured schemas.

---

## 🎨 Design System & Color Palette

| Token | Hex | Usage |
|---|---|---|
| **Deep Teal** | `#287A74` | Primary CTA buttons, brand badges, high-contrast typography |
| **Muted Teal** | `#55A9A0` | Secondary borders, subtle highlights, icon accents |
| **Mint Green** | `#AEEED3` | Interactive highlights, pill badges, success states |
| **Pale Yellow** | `#FFF8B0` | Soft festive accent backgrounds, banners, ribbon notes |
| **Dark Theme** | `#0B1C1A`, `#122B28` | Slate-teal surfaces for comfortable night viewing |

---

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation)
- **UI Islands**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **State Compression**: [`lz-string`](https://github.com/pieroxy/lz-string)
- **Particles**: [`canvas-confetti`](https://github.com/catdad/canvas-confetti)
- **Icons**: [`lucide-react`](https://lucide.dev/)
- **Audio**: Web Audio API (native browser synthesis)

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+` or `v20+` (tested with v24.19)
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

Visit `http://localhost:4321` in your browser.

### Production Build

```bash
npm run build
```

The output will be generated in the `dist/` directory, ready to deploy to GitHub Pages.

### Preview Build Locally

```bash
npm run preview
```

---

## 📄 License

MIT © DigitalGift
