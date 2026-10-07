import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#122B28"/>
      <stop offset="50%" stop-color="#18433F"/>
      <stop offset="100%" stop-color="#287A74"/>
    </linearGradient>
    <linearGradient id="boxFront" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#55A9A0"/>
      <stop offset="60%" stop-color="#287A74"/>
      <stop offset="100%" stop-color="#144642"/>
    </linearGradient>
    <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF0A8"/>
      <stop offset="50%" stop-color="#FFD166"/>
      <stop offset="100%" stop-color="#D4A02A"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Ambient festive glow orbs -->
  <circle cx="200" cy="150" r="180" fill="#FFF8B0" opacity="0.08"/>
  <circle cx="1050" cy="480" r="220" fill="#AEEED3" opacity="0.08"/>
  <circle cx="900" cy="180" r="140" fill="#FFD166" opacity="0.1"/>

  <!-- Left Content Column -->
  <g transform="translate(100, 120)">
    <!-- Brand Badge -->
    <rect x="0" y="0" width="230" height="42" rx="21" fill="#FFF8B0" fill-opacity="0.2" stroke="#FFF8B0" stroke-width="1.5"/>
    <text x="30" y="27" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFF8B0" letter-spacing="1">100% CLIENT-SIDE &amp; FREE</text>

    <!-- Main Title -->
    <text x="0" y="110" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="900" fill="#FFFFFF" letter-spacing="-1">
      Digital<tspan fill="#AEEED3">Gift</tspan>
    </text>

    <!-- Tagline -->
    <text x="0" y="165" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600" fill="#FFF8B0">
      Interactive Virtual Gift Box Maker
    </text>

    <text x="0" y="215" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#E0F2F1">
      Craft animated 3D gift boxes with music, confetti &amp; personal messages.
    </text>
    <text x="0" y="245" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#E0F2F1">
      Encodes instantly into shareable links. Zero servers, 100% privacy-first.
    </text>

    <!-- Pill Badges -->
    <g transform="translate(0, 290)">
      <rect x="0" y="0" width="160" height="36" rx="18" fill="#AEEED3" fill-opacity="0.2"/>
      <text x="20" y="23" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#AEEED3">🎉 3D Unboxing</text>

      <rect x="175" y="0" width="165" height="36" rx="18" fill="#AEEED3" fill-opacity="0.2"/>
      <text x="195" y="23" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#AEEED3">🎵 Web Audio API</text>

      <rect x="355" y="0" width="170" height="36" rx="18" fill="#AEEED3" fill-opacity="0.2"/>
      <text x="375" y="23" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#AEEED3">🔒 Zero-Server Link</text>
    </g>

    <!-- URL link display -->
    <text x="0" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="#55A9A0" letter-spacing="0.5">
      https://digital-gift.github.io
    </text>
  </g>

  <!-- Right Side: Large 3D Gift Box Graphic -->
  <g transform="translate(800, 160)" filter="url(#shadow)">
    <!-- Box Shadow -->
    <ellipse cx="140" cy="300" rx="130" ry="24" fill="#000000" opacity="0.35"/>

    <!-- Box Body -->
    <rect x="40" y="140" width="200" height="150" rx="16" fill="url(#boxFront)" stroke="#144642" stroke-width="3"/>
    <!-- Box Ribbon -->
    <rect x="124" y="140" width="34" height="150" fill="url(#goldRibbon)"/>

    <!-- Lid -->
    <rect x="25" y="105" width="230" height="42" rx="12" fill="#206560" stroke="#144642" stroke-width="3"/>
    <rect x="122" y="105" width="38" height="42" fill="url(#goldRibbon)"/>
    <rect x="25" y="122" width="230" height="12" fill="url(#goldRibbon)" opacity="0.9"/>

    <!-- Bow -->
    <path d="M 140 105 C 100 70 70 85 90 108 C 105 120 130 112 140 108 Z" fill="url(#goldRibbon)" stroke="#D4A02A" stroke-width="2"/>
    <path d="M 140 105 C 180 70 210 85 190 108 C 175 120 150 112 140 108 Z" fill="url(#goldRibbon)" stroke="#D4A02A" stroke-width="2"/>
    <circle cx="140" cy="106" r="14" fill="#FFF0A8" stroke="#D4A02A" stroke-width="2"/>

    <!-- Sparkles -->
    <path d="M 30 70 L 35 80 L 45 85 L 35 90 L 30 100 L 25 90 L 15 85 L 25 80 Z" fill="#FFF8B0"/>
    <path d="M 250 80 L 254 88 L 262 92 L 254 96 L 250 104 L 246 96 L 238 92 L 246 88 Z" fill="#AEEED3"/>
    <path d="M 140 30 L 144 40 L 154 44 L 144 48 L 140 58 L 136 48 L 126 44 L 136 40 Z" fill="#FFD166"/>
  </g>
</svg>
`;

async function run() {
  const outputDir = path.resolve('public');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'og-image.png');
  await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile(outputPath);

  console.log(`Generated og-image.png at: ${outputPath}`);
}

run().catch(console.error);
