import React from 'react';
import type { BoxColor, RibbonColor } from '../types/gift';

interface GiftBoxProps {
  boxColor: BoxColor;
  ribbonColor: RibbonColor;
  isOpen?: boolean;
  onOpen?: () => void;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BOX_PALETTES: Record<BoxColor, { base: string; lid: string; dark: string; light: string; border: string }> = {
  teal: {
    base: '#287A74',
    lid: '#206560',
    dark: '#144642',
    light: '#419E96',
    border: '#144642',
  },
  coral: {
    base: '#E76F51',
    lid: '#CF593C',
    dark: '#9E3C24',
    light: '#F48C71',
    border: '#9E3C24',
  },
  gold: {
    base: '#D4AF37',
    lid: '#BD9A29',
    dark: '#8C6F12',
    light: '#F0CE62',
    border: '#8C6F12',
  },
  purple: {
    base: '#7B2CBF',
    lid: '#641F9F',
    dark: '#450F70',
    light: '#9D4EDD',
    border: '#450F70',
  },
  midnight: {
    base: '#1D3557',
    lid: '#14253E',
    dark: '#0B1524',
    light: '#31588E',
    border: '#0B1524',
  },
  rose: {
    base: '#D85A7F',
    lid: '#C0466A',
    dark: '#8A2744',
    light: '#ED7A9B',
    border: '#8A2744',
  },
  emerald: {
    base: '#2A9D8F',
    lid: '#1F7E73',
    dark: '#13544C',
    light: '#48BDB0',
    border: '#13544C',
  },
};

const RIBBON_PALETTES: Record<RibbonColor, { base: string; dark: string; light: string }> = {
  gold: {
    base: '#FFD166',
    dark: '#D4A02A',
    light: '#FFF0A8',
  },
  silver: {
    base: '#E2E8F0',
    dark: '#94A3B8',
    light: '#FFFFFF',
  },
  ruby: {
    base: '#E63946',
    dark: '#A61622',
    light: '#FF7582',
  },
  cyan: {
    base: '#38BDF8',
    dark: '#0284C7',
    light: '#BAE6FD',
  },
  cream: {
    base: '#FFF8B0',
    dark: '#D6CB62',
    light: '#FFFFE0',
  },
};

export const GiftBox3D: React.FC<GiftBoxProps> = ({
  boxColor,
  ribbonColor,
  isOpen = false,
  onOpen,
  interactive = true,
  size = 'lg',
}) => {
  const box = BOX_PALETTES[boxColor] || BOX_PALETTES.teal;
  const ribbon = RIBBON_PALETTES[ribbonColor] || RIBBON_PALETTES.gold;

  const sizeClasses = {
    sm: 'w-36 h-36 sm:w-44 sm:h-44',
    md: 'w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60',
    lg: 'w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80',
  }[size];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && onOpen && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={isOpen ? 'Open Gift Box' : 'Sealed Gift Box. Click to unwrap'}
      onClick={interactive ? onOpen : undefined}
      onKeyDown={handleKeyDown}
      className={`relative select-none flex items-center justify-center ${sizeClasses} ${
        interactive ? 'cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-mint/50 rounded-3xl' : ''
      }`}
    >
      {/* Dynamic ambient shadow */}
      <div
        className={`absolute bottom-4 w-3/4 h-8 bg-black/25 dark:bg-black/60 rounded-full blur-md transition-all duration-700 ease-out ${
          isOpen ? 'scale-75 opacity-20' : 'scale-100 opacity-60'
        }`}
      />

      <div
        className={`relative w-full h-full flex flex-col items-center justify-center transition-transform duration-300 ${
          !isOpen && interactive ? 'animate-wobble hover:scale-105 active:scale-95' : ''
        }`}
      >
        {/* SVG Detailed 3D-Look Gift Box */}
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full overflow-visible drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Box Body Gradients */}
            <linearGradient id={`box-front-${boxColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={box.light} />
              <stop offset="60%" stopColor={box.base} />
              <stop offset="100%" stopColor={box.dark} />
            </linearGradient>

            <linearGradient id={`box-lid-${boxColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={box.light} />
              <stop offset="50%" stopColor={box.lid} />
              <stop offset="100%" stopColor={box.dark} />
            </linearGradient>

            {/* Ribbon Gradients */}
            <linearGradient id={`ribbon-grad-${ribbonColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={ribbon.light} />
              <stop offset="45%" stopColor={ribbon.base} />
              <stop offset="100%" stopColor={ribbon.dark} />
            </linearGradient>

            <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BOX BODY GROUP */}
          <g id="box-body" className="transition-transform duration-500">
            {/* Main Box Cube */}
            <rect
              x="55"
              y="140"
              width="210"
              height="150"
              rx="18"
              fill={`url(#box-front-${boxColor})`}
              stroke={box.border}
              strokeWidth="3"
            />

            {/* Box Front Face Shadow / Bevel */}
            <path
              d="M 57 270 Q 160 295 263 270 L 263 274 Q 160 300 57 274 Z"
              fill={box.dark}
              opacity="0.6"
            />

            {/* Vertical Ribbon on Box Body */}
            <rect
              x="142"
              y="140"
              width="36"
              height="150"
              fill={`url(#ribbon-grad-${ribbonColor})`}
            />

            {/* Subtle Ribbon highlight line */}
            <line
              x1="147"
              y1="140"
              x2="147"
              y2="290"
              stroke={ribbon.light}
              strokeWidth="2"
              opacity="0.8"
            />

            {/* Inner box depth when open */}
            {isOpen && (
              <ellipse
                cx="160"
                cy="140"
                rx="95"
                ry="18"
                fill="#000000"
                opacity="0.45"
              />
            )}
          </g>

          {/* LID & BOW GROUP (Animated on Open) */}
          <g
            id="box-lid-group"
            style={{
              transformOrigin: '240px 100px',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isOpen ? 'translateY(-120px) rotate(-28deg) scale(0.95)' : 'none',
              opacity: isOpen ? 0.2 : 1,
            }}
          >
            {/* Lid Drop Shadow over Box Body */}
            <ellipse
              cx="160"
              cy="142"
              rx="115"
              ry="10"
              fill="#000000"
              opacity="0.35"
            />

            {/* Lid Main Plate */}
            <rect
              x="42"
              y="105"
              width="236"
              height="40"
              rx="12"
              fill={`url(#box-lid-${boxColor})`}
              stroke={box.border}
              strokeWidth="3"
            />

            {/* Lid Vertical Ribbon */}
            <rect
              x="140"
              y="105"
              width="40"
              height="40"
              fill={`url(#ribbon-grad-${ribbonColor})`}
            />

            {/* Horizontal Ribbon on Lid Rim */}
            <rect
              x="42"
              y="120"
              width="236"
              height="12"
              fill={`url(#ribbon-grad-${ribbonColor})`}
              opacity="0.9"
            />

            {/* 3D BOW / KNOT on top of Lid */}
            <g id="ribbon-bow">
              {/* Left Bow Loop */}
              <path
                d="M 160 105 C 120 70 85 85 105 108 C 120 120 148 112 160 108 Z"
                fill={`url(#ribbon-grad-${ribbonColor})`}
                stroke={ribbon.dark}
                strokeWidth="2"
              />
              {/* Left Loop Depth */}
              <path
                d="M 125 96 C 110 88 100 95 110 104 Z"
                fill={ribbon.dark}
                opacity="0.5"
              />

              {/* Right Bow Loop */}
              <path
                d="M 160 105 C 200 70 235 85 215 108 C 200 120 172 112 160 108 Z"
                fill={`url(#ribbon-grad-${ribbonColor})`}
                stroke={ribbon.dark}
                strokeWidth="2"
              />
              {/* Right Loop Depth */}
              <path
                d="M 195 96 C 210 88 220 95 210 104 Z"
                fill={ribbon.dark}
                opacity="0.5"
              />

              {/* Left Ribbon Tail */}
              <path
                d="M 152 108 Q 130 135 118 148 L 130 146 L 140 156 Q 146 135 155 112 Z"
                fill={`url(#ribbon-grad-${ribbonColor})`}
                opacity="0.9"
              />

              {/* Right Ribbon Tail */}
              <path
                d="M 168 108 Q 190 135 202 148 L 190 146 L 180 156 Q 174 135 165 112 Z"
                fill={`url(#ribbon-grad-${ribbonColor})`}
                opacity="0.9"
              />

              {/* Center Bow Knot */}
              <ellipse
                cx="160"
                cy="106"
                rx="14"
                ry="12"
                fill={ribbon.light}
                stroke={ribbon.dark}
                strokeWidth="2"
              />
            </g>
          </g>

          {/* Sparkles / Magic Stars around the box */}
          {!isOpen && (
            <g className="animate-sparkle pointer-events-none">
              <path
                d="M 60 90 L 64 98 L 72 102 L 64 106 L 60 114 L 56 106 L 48 102 L 56 98 Z"
                fill="#FFF8B0"
                opacity="0.8"
              />
              <path
                d="M 270 95 L 273 101 L 279 104 L 273 107 L 270 113 L 267 107 L 261 104 L 267 101 Z"
                fill="#AEEED3"
                opacity="0.9"
              />
              <path
                d="M 160 40 L 163 47 L 170 50 L 163 53 L 160 60 L 157 53 L 150 50 L 157 47 Z"
                fill="#FFD166"
                opacity="0.85"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
