import React from 'react';

export interface StickerMeta {
  id: number;
  name: string;
  emoji: string;
  category: 'celebration' | 'cute' | 'love' | 'party';
  description: string;
}

export const STICKERS_CATALOG: StickerMeta[] = [
  { id: 0, name: 'Birthday Cake', emoji: '🎂', category: 'celebration', description: 'Candles & sweet frosting' },
  { id: 1, name: 'Party Emoji', emoji: '🥳', category: 'party', description: 'Party blower & confetti' },
  { id: 2, name: 'Sweet Cupcake', emoji: '🧁', category: 'celebration', description: 'Glittering sparkler candle' },
  { id: 3, name: 'Party Kitty', emoji: '🐱', category: 'cute', description: 'Winking kitten with party hat' },
  { id: 4, name: 'Celebration Pup', emoji: '🐶', category: 'cute', description: 'Happy puppy with balloon' },
  { id: 5, name: 'Teddy Bear', emoji: '🧸', category: 'cute', description: 'Hugging surprise gift box' },
  { id: 6, name: 'Sparkle Heart', emoji: '💖', category: 'love', description: 'Beating 3D heart with starlight' },
  { id: 7, name: 'Royal Crown', emoji: '👑', category: 'celebration', description: 'Golden shimmering crown' },
  { id: 8, name: 'Superstar Trophy', emoji: '🌟', category: 'celebration', description: 'Golden radiating star' },
  { id: 9, name: 'Party Rocket', emoji: '🚀', category: 'party', description: 'Blasting celebration rocket' },
  { id: 10, name: 'Magic Unicorn', emoji: '🦄', category: 'cute', description: 'Pastel rainbow horn' },
  { id: 11, name: 'Cheering Toast', emoji: '🥂', category: 'party', description: 'Clinking champagne bubbles' },
  { id: 12, name: 'Happy Panda', emoji: '🐼', category: 'cute', description: 'Joyful waving panda' },
  { id: 13, name: 'Flower Bouquet', emoji: '💐', category: 'love', description: 'Blooming spring blossoms' },
  { id: 14, name: 'Balloon Trio', emoji: '🎈', category: 'party', description: 'Glossy floating balloons' },
  { id: 15, name: 'Magic Wand', emoji: '✨', category: 'party', description: 'Spinning starlight sparkler' },
];

interface AnimatedStickerProps {
  id: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

const SIZE_MAP = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-28 h-28 sm:w-36 sm:h-36',
  xl: 'w-40 h-40 sm:w-48 sm:h-48',
};

export const AnimatedSticker: React.FC<AnimatedStickerProps> = ({
  id,
  size = 'md',
  className = '',
  animate = true,
}) => {
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;

  // Render individual animated SVG sticker by ID
  switch (id) {
    case 0:
      // Birthday Cake with flickering candles and frosting swirls
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="cakeBase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF9EAA" />
                <stop offset="100%" stopColor="#FF6B8B" />
              </linearGradient>
              <linearGradient id="frosting" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF8B0" />
                <stop offset="100%" stopColor="#FFE066" />
              </linearGradient>
              <linearGradient id="plate" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
            </defs>
            {/* Plate */}
            <ellipse cx="60" cy="104" rx="48" ry="8" fill="url(#plate)" />
            {/* Bottom tier */}
            <rect x="22" y="70" width="76" height="30" rx="6" fill="url(#cakeBase)" />
            {/* Bottom frosting drops */}
            <path d="M 22 76 Q 31 84 40 76 Q 49 84 58 76 Q 67 84 76 76 Q 85 84 94 76 Q 98 84 98 76 L 98 70 L 22 70 Z" fill="url(#frosting)" />
            {/* Top tier */}
            <rect x="34" y="46" width="52" height="26" rx="5" fill="#55A9A0" />
            <path d="M 34 52 Q 42 58 50 52 Q 58 58 66 52 Q 74 58 82 52 Q 86 58 86 52 L 86 46 L 34 46 Z" fill="#AEEED3" />
            {/* Candles */}
            <rect x="42" y="30" width="4" height="16" rx="2" fill="#FFD166" />
            <rect x="58" y="26" width="4" height="20" rx="2" fill="#FF6B6B" />
            <rect x="74" y="30" width="4" height="16" rx="2" fill="#4CC9F0" />
            {/* Candle Flames with flicker animation */}
            <g className={animate ? 'animate-bounce' : ''} style={{ animationDuration: '0.8s' }}>
              <ellipse cx="44" cy="24" rx="3.5" ry="5.5" fill="#FF9F1C" />
              <ellipse cx="44" cy="24" rx="1.8" ry="3" fill="#FFF8B0" />
            </g>
            <g className={animate ? 'animate-bounce' : ''} style={{ animationDuration: '0.6s' }}>
              <ellipse cx="60" cy="20" rx="4" ry="6" fill="#FF9F1C" />
              <ellipse cx="60" cy="20" rx="2" ry="3.5" fill="#FFF8B0" />
            </g>
            <g className={animate ? 'animate-bounce' : ''} style={{ animationDuration: '0.9s' }}>
              <ellipse cx="76" cy="24" rx="3.5" ry="5.5" fill="#FF9F1C" />
              <ellipse cx="76" cy="24" rx="1.8" ry="3" fill="#FFF8B0" />
            </g>
            {/* Floating sparkle stars */}
            <circle cx="20" cy="35" r="2.5" fill="#FFD166" className={animate ? 'animate-ping' : ''} style={{ animationDuration: '1.5s' }} />
            <circle cx="100" cy="40" r="2" fill="#AEEED3" className={animate ? 'animate-ping' : ''} style={{ animationDuration: '1.8s' }} />
          </svg>
        </div>
      );

    case 1:
      // Party Horn Emoji
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            {/* Face */}
            <circle cx="60" cy="65" r="42" fill="url(#faceGrad)" />
            {/* Party Hat */}
            <polygon points="60,6 38,40 82,40" fill="#E63946" className={animate ? 'origin-bottom animate-wiggle' : ''} />
            <circle cx="60" cy="6" r="5" fill="#FFF8B0" />
            <path d="M 42 32 L 78 32" stroke="#FFD166" strokeWidth="3" />
            <path d="M 46 22 L 74 22" stroke="#AEEED3" strokeWidth="3" />
            {/* Eyes */}
            <ellipse cx="45" cy="60" rx="4" ry="6" fill="#1E293B" />
            <ellipse cx="75" cy="60" rx="4" ry="6" fill="#1E293B" />
            {/* Cheeks */}
            <ellipse cx="38" cy="72" rx="6" ry="4" fill="#FF6B8B" opacity="0.6" />
            <ellipse cx="82" cy="72" rx="6" ry="4" fill="#FF6B8B" opacity="0.6" />
            {/* Party Horn */}
            <g className={animate ? 'animate-pulse' : ''}>
              <polygon points="60,76 96,88 94,96 58,82" fill="#38BDF8" />
              <ellipse cx="95" cy="92" rx="4" ry="6" fill="#FFD166" />
            </g>
            {/* Confetti bits */}
            <circle cx="106" cy="85" r="3" fill="#E63946" className={animate ? 'animate-ping' : ''} />
            <circle cx="112" cy="94" r="2.5" fill="#AEEED3" />
            <circle cx="104" cy="102" r="2.5" fill="#FFD166" />
          </svg>
        </div>
      );

    case 2:
      // Sweet Cupcake
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="cupBase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#55A9A0" />
                <stop offset="100%" stopColor="#287A74" />
              </linearGradient>
              <linearGradient id="frostingSwirl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFC6FF" />
                <stop offset="100%" stopColor="#FF70A6" />
              </linearGradient>
            </defs>
            {/* Cup */}
            <polygon points="34,70 42,106 78,106 86,70" fill="url(#cupBase)" />
            <line x1="48" y1="70" x2="52" y2="106" stroke="#287A74" strokeWidth="2" opacity="0.5" />
            <line x1="60" y1="70" x2="60" y2="106" stroke="#287A74" strokeWidth="2" opacity="0.5" />
            <line x1="72" y1="70" x2="68" y2="106" stroke="#287A74" strokeWidth="2" opacity="0.5" />
            {/* Frosting layers */}
            <ellipse cx="60" cy="70" rx="34" ry="14" fill="url(#frostingSwirl)" />
            <ellipse cx="60" cy="56" rx="26" ry="11" fill="#FFC6FF" />
            <ellipse cx="60" cy="44" rx="18" ry="8" fill="#FFF8B0" />
            {/* Sparkler Candle */}
            <line x1="60" y1="40" x2="60" y2="22" stroke="#FFD166" strokeWidth="3" strokeLinecap="round" />
            {/* Sparkle fire */}
            <g className={animate ? 'animate-spin' : ''} style={{ transformOrigin: '60px 18px', animationDuration: '3s' }}>
              <polygon points="60,10 63,16 70,18 63,20 60,26 57,20 50,18 57,16" fill="#FF9F1C" />
              <circle cx="60" cy="18" r="2.5" fill="#FFFFFF" />
            </g>
            {/* Colorful Sprinkles */}
            <circle cx="48" cy="62" r="1.8" fill="#38BDF8" />
            <circle cx="70" cy="60" r="1.8" fill="#AEEED3" />
            <circle cx="56" cy="50" r="1.8" fill="#E63946" />
            <circle cx="66" cy="48" r="1.8" fill="#FFD166" />
          </svg>
        </div>
      );

    case 3:
      // Party Kitty Cat
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            {/* Cat Ears */}
            <polygon points="34,44 26,18 50,32" fill="#FDA4AF" />
            <polygon points="34,40 30,24 46,33" fill="#FB7185" />
            <polygon points="86,44 94,18 70,32" fill="#FDA4AF" />
            <polygon points="86,40 90,24 74,33" fill="#FB7185" />
            {/* Party Hat */}
            <polygon points="60,12 48,38 72,38" fill="#AEEED3" className={animate ? 'animate-bounce' : ''} style={{ animationDuration: '1.2s' }} />
            <circle cx="60" cy="12" r="4" fill="#FFD166" />
            {/* Cat Head */}
            <ellipse cx="60" cy="64" rx="40" ry="34" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
            {/* Eyes */}
            <ellipse cx="46" cy="60" rx="4.5" ry="6" fill="#1E293B" />
            <ellipse cx="74" cy="60" rx="4.5" ry="6" fill="#1E293B" />
            <circle cx="48" cy="58" r="1.5" fill="#FFFFFF" />
            <circle cx="76" cy="58" r="1.5" fill="#FFFFFF" />
            {/* Blushing cheeks */}
            <ellipse cx="36" cy="70" rx="5" ry="3.5" fill="#FDA4AF" />
            <ellipse cx="84" cy="70" rx="5" ry="3.5" fill="#FDA4AF" />
            {/* Nose & Mouth */}
            <polygon points="57,68 63,68 60,72" fill="#F43F5E" />
            <path d="M 54 75 Q 60 78 60 72 Q 60 78 66 75" stroke="#64748B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Whiskers */}
            <line x1="28" y1="64" x2="40" y2="66" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="28" y1="72" x2="40" y2="70" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="92" y1="64" x2="80" y2="66" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="92" y1="72" x2="80" y2="70" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Floating heart */}
            <path d="M 98 32 C 98 28, 92 24, 88 28 C 84 24, 78 28, 78 32 C 78 40, 88 44, 88 44 C 88 44, 98 40, 98 32 Z" fill="#F43F5E" className={animate ? 'animate-pulse' : ''} transform="scale(0.5) translate(80, 20)" />
          </svg>
        </div>
      );

    case 4:
      // Celebration Pup (Doggo)
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            {/* Floppy Ears */}
            <ellipse cx="28" cy="56" rx="12" ry="22" fill="#D97706" transform="rotate(-15 28 56)" />
            <ellipse cx="92" cy="56" rx="12" ry="22" fill="#D97706" transform="rotate(15 92 56)" />
            {/* Dog Head */}
            <circle cx="60" cy="62" r="36" fill="#FDE68A" />
            {/* Snout */}
            <ellipse cx="60" cy="74" rx="16" ry="12" fill="#FFFFFF" />
            <ellipse cx="60" cy="68" rx="6" ry="4.5" fill="#451A03" />
            {/* Eyes */}
            <ellipse cx="48" cy="54" rx="4" ry="5.5" fill="#1E293B" />
            <ellipse cx="72" cy="54" rx="4" ry="5.5" fill="#1E293B" />
            <circle cx="49" cy="52" r="1.5" fill="#FFFFFF" />
            <circle cx="73" cy="52" r="1.5" fill="#FFFFFF" />
            {/* Happy tongue */}
            <path d="M 57 78 C 57 86, 63 86, 63 78" fill="#F43F5E" className={animate ? 'animate-bounce' : ''} />
            {/* Party balloon floating beside */}
            <g className={animate ? 'animate-bounce' : ''} style={{ animationDuration: '2s' }}>
              <ellipse cx="96" cy="24" rx="12" ry="15" fill="#EF4444" />
              <polygon points="96,39 94,42 98,42" fill="#EF4444" />
              <path d="M 96 42 Q 92 54 94 66" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
              <ellipse cx="92" cy="18" rx="2" ry="4" fill="#FFFFFF" opacity="0.6" />
            </g>
          </svg>
        </div>
      );

    case 5:
      // Teddy Bear with Gift Box
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            {/* Bear Ears */}
            <circle cx="34" cy="30" r="13" fill="#B45309" />
            <circle cx="34" cy="30" r="7" fill="#FDE68A" />
            <circle cx="86" cy="30" r="13" fill="#B45309" />
            <circle cx="86" cy="30" r="7" fill="#FDE68A" />
            {/* Bear Head */}
            <circle cx="60" cy="52" r="32" fill="#D97706" />
            {/* Snout */}
            <ellipse cx="60" cy="58" rx="14" ry="10" fill="#FEF3C7" />
            <ellipse cx="60" cy="54" rx="5" ry="3.5" fill="#1E293B" />
            {/* Eyes */}
            <circle cx="48" cy="46" r="3.5" fill="#1E293B" />
            <circle cx="72" cy="46" r="3.5" fill="#1E293B" />
            {/* Surprise Gift Box in Paws */}
            <rect x="42" y="78" width="36" height="32" rx="4" fill="#287A74" />
            <rect x="38" y="74" width="44" height="8" rx="2" fill="#55A9A0" />
            {/* Ribbon */}
            <rect x="57" y="74" width="6" height="36" fill="#FFD166" />
            <ellipse cx="54" cy="70" rx="5" ry="3" fill="#FFD166" />
            <ellipse cx="66" cy="70" rx="5" ry="3" fill="#FFD166" />
            {/* Bear Paws holding the box */}
            <circle cx="38" cy="84" r="8" fill="#B45309" />
            <circle cx="82" cy="84" r="8" fill="#B45309" />
          </svg>
        </div>
      );

    case 6:
      // Sparkle 3D Heart (Love & Romance)
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4D6D" />
                <stop offset="50%" stopColor="#C9184A" />
                <stop offset="100%" stopColor="#800F2F" />
              </linearGradient>
            </defs>
            <g className={animate ? 'animate-pulse' : ''} style={{ animationDuration: '1.4s' }}>
              <path
                d="M 60 102 C 60 102, 16 76, 16 44 C 16 26, 32 16, 46 16 C 54 16, 60 22, 60 22 C 60 22, 66 16, 74 16 C 88 16, 104 26, 104 44 C 104 76, 60 102, 60 102 Z"
                fill="url(#heartGrad)"
              />
              {/* Glossy 3D Highlight */}
              <ellipse cx="40" cy="34" rx="14" ry="7" fill="#FFFFFF" opacity="0.4" transform="rotate(-30 40 34)" />
            </g>
            {/* Orbiting Starlight Sparkles */}
            <circle cx="20" cy="28" r="3" fill="#FFF8B0" className={animate ? 'animate-ping' : ''} style={{ animationDuration: '2s' }} />
            <circle cx="100" cy="36" r="3" fill="#FFF8B0" className={animate ? 'animate-ping' : ''} style={{ animationDuration: '1.6s' }} />
            <circle cx="88" cy="88" r="2.5" fill="#FFC6FF" className={animate ? 'animate-ping' : ''} style={{ animationDuration: '2.4s' }} />
          </svg>
        </div>
      );

    case 7:
      // Royal Shimmering Crown
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="goldCrown" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="60%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
            {/* Crown Base */}
            <polygon points="18,84 26,38 46,62 60,26 74,62 94,38 102,84" fill="url(#goldCrown)" />
            <rect x="18" y="84" width="84" height="14" rx="4" fill="#D97706" />
            {/* Crown Jewels */}
            <circle cx="26" cy="36" r="5" fill="#38BDF8" className={animate ? 'animate-ping' : ''} style={{ animationDuration: '2s' }} />
            <circle cx="60" cy="24" r="6" fill="#F43F5E" className={animate ? 'animate-ping' : ''} style={{ animationDuration: '1.5s' }} />
            <circle cx="94" cy="36" r="5" fill="#38BDF8" className={animate ? 'animate-ping' : ''} style={{ animationDuration: '2.2s' }} />
            {/* Band Gems */}
            <circle cx="34" cy="91" r="3" fill="#AEEED3" />
            <circle cx="60" cy="91" r="3.5" fill="#FFF8B0" />
            <circle cx="86" cy="91" r="3" fill="#AEEED3" />
          </svg>
        </div>
      );

    case 8:
      // Superstar Trophy (Celebration & Appreciation)
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF8B0" />
                <stop offset="40%" stopColor="#FFD166" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            {/* Radiating beams */}
            <g className={animate ? 'animate-spin' : ''} style={{ transformOrigin: '60px 60px', animationDuration: '10s' }} opacity="0.3">
              <line x1="60" y1="10" x2="60" y2="110" stroke="#FFD166" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="10" y1="60" x2="110" y2="60" stroke="#FFD166" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="25" y1="25" x2="95" y2="95" stroke="#FFD166" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="25" y1="95" x2="95" y2="25" stroke="#FFD166" strokeWidth="2" strokeDasharray="4 4" />
            </g>
            {/* Golden Star */}
            <polygon
              points="60,18 72,45 102,48 78,68 86,98 60,82 34,98 42,68 18,48 48,45"
              fill="url(#starGrad)"
              className={animate ? 'animate-pulse' : ''}
              style={{ animationDuration: '1.8s' }}
            />
            {/* Sparkle glints */}
            <circle cx="60" cy="55" r="4" fill="#FFFFFF" opacity="0.8" />
          </svg>
        </div>
      );

    case 9:
      // Party Rocket (Blasting Celebration)
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            {/* Smoke / Stars behind */}
            <circle cx="40" cy="98" r="6" fill="#CBD5E1" opacity="0.6" />
            <circle cx="48" cy="104" r="8" fill="#CBD5E1" opacity="0.7" />
            {/* Rocket Exhaust Flames */}
            <polygon points="46,84 34,106 58,94" fill="#FF9F1C" className={animate ? 'animate-pulse' : ''} />
            <polygon points="48,86 40,102 54,92" fill="#FFE066" />
            {/* Rocket Body rotated 45 deg */}
            <g transform="rotate(45 60 60)">
              {/* Fins */}
              <polygon points="40,82 24,96 46,90" fill="#EF4444" />
              <polygon points="80,82 96,96 74,90" fill="#EF4444" />
              {/* Main Fuselage */}
              <ellipse cx="60" cy="56" rx="18" ry="32" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
              {/* Rocket Nose */}
              <path d="M 44 42 Q 60 16 76 42 Z" fill="#EF4444" />
              {/* Porthole Window */}
              <circle cx="60" cy="52" r="8" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
              <circle cx="58" cy="50" r="2.5" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
      );

    case 10:
      // Magic Rainbow Unicorn
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            {/* Rainbow Mane */}
            <path d="M 46 36 Q 30 52 34 82" stroke="#FF758F" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 40 40 Q 24 56 28 86" stroke="#FFD166" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 34 44 Q 18 60 22 90" stroke="#38BDF8" strokeWidth="6" fill="none" strokeLinecap="round" />
            {/* Unicorn Head */}
            <path d="M 50 36 L 82 48 L 86 64 L 62 78 L 48 64 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
            {/* Golden Spiral Horn */}
            <polygon points="56,36 78,8 66,32" fill="#FFD166" className={animate ? 'animate-pulse' : ''} />
            <line x1="62" y1="28" x2="70" y2="24" stroke="#D97706" strokeWidth="1.5" />
            <line x1="68" y1="18" x2="74" y2="16" stroke="#D97706" strokeWidth="1.5" />
            {/* Eye */}
            <circle cx="68" cy="52" r="3.5" fill="#1E293B" />
            <circle cx="69" cy="51" r="1.2" fill="#FFFFFF" />
            {/* Cheeks */}
            <circle cx="76" cy="62" r="4" fill="#FDA4AF" />
          </svg>
        </div>
      );

    case 11:
      // Cheering Toast (Champagne Glasses)
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            {/* Left Glass tilted right */}
            <g transform="rotate(15 48 64)">
              <polygon points="40,30 56,30 50,60 46,60" fill="#E2E8F0" opacity="0.6" stroke="#94A3B8" strokeWidth="1.5" />
              <polygon points="42,38 54,38 49,56 47,56" fill="#FDE047" opacity="0.8" />
              <line x1="48" y1="60" x2="48" y2="86" stroke="#94A3B8" strokeWidth="2.5" />
              <ellipse cx="48" cy="86" rx="10" ry="3" fill="#94A3B8" />
            </g>
            {/* Right Glass tilted left */}
            <g transform="rotate(-15 72 64)">
              <polygon points="64,30 80,30 74,60 70,60" fill="#E2E8F0" opacity="0.6" stroke="#94A3B8" strokeWidth="1.5" />
              <polygon points="66,38 78,38 73,56 71,56" fill="#FDE047" opacity="0.8" />
              <line x1="72" y1="60" x2="72" y2="86" stroke="#94A3B8" strokeWidth="2.5" />
              <ellipse cx="72" cy="86" rx="10" ry="3" fill="#94A3B8" />
            </g>
            {/* Clink Sparkle at intersection */}
            <polygon points="60,28 62,34 68,36 62,38 60,44 58,38 52,36 58,34" fill="#FFD166" className={animate ? 'animate-ping' : ''} style={{ animationDuration: '1.2s' }} />
            {/* Rising Bubbles */}
            <circle cx="58" cy="20" r="2" fill="#FDE047" className={animate ? 'animate-bounce' : ''} />
            <circle cx="63" cy="14" r="1.5" fill="#FDE047" />
          </svg>
        </div>
      );

    case 12:
      // Happy Panda Bear
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            {/* Panda Ears */}
            <circle cx="34" cy="34" r="12" fill="#1E293B" />
            <circle cx="86" cy="34" r="12" fill="#1E293B" />
            {/* Panda Head */}
            <circle cx="60" cy="60" r="34" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
            {/* Eye Patches */}
            <ellipse cx="46" cy="54" rx="8" ry="11" fill="#1E293B" transform="rotate(-15 46 54)" />
            <ellipse cx="74" cy="54" rx="8" ry="11" fill="#1E293B" transform="rotate(15 74 54)" />
            {/* White Eyes */}
            <circle cx="47" cy="53" r="3" fill="#FFFFFF" />
            <circle cx="73" cy="53" r="3" fill="#FFFFFF" />
            <circle cx="48" cy="53" r="1.5" fill="#1E293B" />
            <circle cx="72" cy="53" r="1.5" fill="#1E293B" />
            {/* Nose & Mouth */}
            <ellipse cx="60" cy="65" rx="4.5" ry="3" fill="#1E293B" />
            <path d="M 56 70 Q 60 74 64 70" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Blushing cheeks */}
            <circle cx="36" cy="66" r="4" fill="#FDA4AF" />
            <circle cx="84" cy="66" r="4" fill="#FDA4AF" />
            {/* Party Bowtie */}
            <polygon points="52,86 68,86 60,92" fill="#EF4444" />
            <polygon points="52,98 68,98 60,92" fill="#EF4444" />
            <circle cx="60" cy="92" r="3" fill="#FBBF24" />
          </svg>
        </div>
      );

    case 13:
      // Flower Bouquet (Anniversary & Celebration)
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            {/* Wrapping Paper Cone */}
            <polygon points="40,66 60,110 80,66" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" />
            {/* Wrap Ribbon */}
            <rect x="52" y="80" width="16" height="4" rx="2" fill="#EF4444" />
            {/* Leaves */}
            <ellipse cx="36" cy="50" rx="10" ry="6" fill="#10B981" transform="rotate(-30 36 50)" />
            <ellipse cx="84" cy="50" rx="10" ry="6" fill="#10B981" transform="rotate(30 84 50)" />
            {/* Flowers */}
            <circle cx="48" cy="42" r="12" fill="#F43F5E" />
            <circle cx="48" cy="42" r="5" fill="#FEF08A" />
            <circle cx="72" cy="42" r="12" fill="#8B5CF6" />
            <circle cx="72" cy="42" r="5" fill="#FEF08A" />
            <circle cx="60" cy="30" r="14" fill="#EC4899" className={animate ? 'animate-pulse' : ''} />
            <circle cx="60" cy="30" r="6" fill="#FEF08A" />
            {/* Sparkles */}
            <circle cx="60" cy="12" r="2.5" fill="#FFD166" className={animate ? 'animate-ping' : ''} />
          </svg>
        </div>
      );

    case 14:
      // Balloon Trio
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            {/* Balloon Strings */}
            <path d="M 42 56 Q 52 82 60 106" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
            <path d="M 78 56 Q 68 82 60 106" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
            <path d="M 60 48 Q 60 76 60 106" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
            {/* Left Cyan Balloon */}
            <g className={animate ? 'animate-bounce' : ''} style={{ animationDuration: '2.4s' }}>
              <ellipse cx="42" cy="40" rx="16" ry="20" fill="#38BDF8" />
              <polygon points="42,60 39,63 45,63" fill="#38BDF8" />
              <ellipse cx="37" cy="32" rx="3" ry="6" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 37 32)" />
            </g>
            {/* Right Yellow Balloon */}
            <g className={animate ? 'animate-bounce' : ''} style={{ animationDuration: '2.8s' }}>
              <ellipse cx="78" cy="42" rx="16" ry="20" fill="#FBBF24" />
              <polygon points="78,62 75,65 81,65" fill="#FBBF24" />
              <ellipse cx="73" cy="34" rx="3" ry="6" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 73 34)" />
            </g>
            {/* Center Coral Balloon */}
            <g className={animate ? 'animate-bounce' : ''} style={{ animationDuration: '2s' }}>
              <ellipse cx="60" cy="30" rx="18" ry="22" fill="#F43F5E" />
              <polygon points="60,52 57,55 63,55" fill="#F43F5E" />
              <ellipse cx="54" cy="22" rx="3.5" ry="7" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 54 22)" />
            </g>
          </svg>
        </div>
      );

    case 15:
    default:
      // Magic Wand / Sparkler
      return (
        <div className={`relative inline-flex items-center justify-center ${sizeClass} ${className}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            {/* Wand shaft */}
            <line x1="30" y1="90" x2="68" y2="52" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
            <line x1="30" y1="90" x2="42" y2="78" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
            {/* Star tip */}
            <g className={animate ? 'animate-spin' : ''} style={{ transformOrigin: '76px 44px', animationDuration: '4s' }}>
              <polygon points="76,28 80,38 90,44 80,50 76,60 72,50 62,44 72,38" fill="#FFD166" />
              <circle cx="76" cy="44" r="4" fill="#FFFFFF" />
            </g>
            {/* Shooting starlight bursts */}
            <circle cx="96" cy="30" r="3" fill="#AEEED3" className={animate ? 'animate-ping' : ''} style={{ animationDuration: '1.5s' }} />
            <circle cx="86" cy="70" r="2.5" fill="#F43F5E" className={animate ? 'animate-ping' : ''} style={{ animationDuration: '1.8s' }} />
            <circle cx="56" cy="24" r="2.5" fill="#38BDF8" className={animate ? 'animate-ping' : ''} style={{ animationDuration: '2.1s' }} />
          </svg>
        </div>
      );
  }
};
