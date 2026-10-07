import LZString from 'lz-string';
import type { GiftData, EventType, BoxColor, RibbonColor, ConfettiStyle, SoundTune } from '../types/gift';

const EVENT_MAP: EventType[] = ['birthday', 'anniversary', 'appreciation', 'celebration'];
const BOX_MAP: BoxColor[] = ['teal', 'coral', 'gold', 'purple', 'midnight', 'rose', 'emerald'];
const RIBBON_MAP: RibbonColor[] = ['gold', 'silver', 'ruby', 'cyan', 'cream'];
const CONFETTI_MAP: ConfettiStyle[] = ['confetti', 'balloons', 'stars', 'fireworks'];
const TUNE_MAP: SoundTune[] = ['birthday', 'fanfare', 'chime', 'magic'];

const DEFAULT_EVENT: EventType = 'birthday';
const DEFAULT_BOX: BoxColor = 'teal';
const DEFAULT_RIBBON: RibbonColor = 'gold';
const DEFAULT_CONFETTI: ConfettiStyle = 'confetti';
const DEFAULT_TUNE: SoundTune = 'birthday';

/**
 * Compact V2 Payload for ultra-short WhatsApp URLs.
 */
interface CompactGiftPayload {
  v: number;       // version (2)
  r: string;       // recipient
  s?: string;      // sender
  e: number;       // event index (0..3)
  b: number;       // box index (0..6)
  rb: number;      // ribbon index (0..4)
  c: number;       // confetti index (0..3)
  snd: number;     // sound (1 or 0)
  sndT: number;    // tune index (0..3)
  m: string;       // message
  img?: string;    // raw base64 (without data:image/... prefix)
}

/**
 * Serializes and compresses a GiftData object into an ultra-compact URL-safe hash string.
 * Format returned: #data=<compressed_string>
 */
export function encodeGiftToHash(gift: GiftData): string {
  const eIdx = Math.max(0, EVENT_MAP.indexOf(gift.eventType || DEFAULT_EVENT));
  const bIdx = Math.max(0, BOX_MAP.indexOf(gift.boxColor || DEFAULT_BOX));
  const rbIdx = Math.max(0, RIBBON_MAP.indexOf(gift.ribbonColor || DEFAULT_RIBBON));
  const cIdx = Math.max(0, CONFETTI_MAP.indexOf(gift.confettiStyle || DEFAULT_CONFETTI));
  const sndTIdx = Math.max(0, TUNE_MAP.indexOf(gift.soundTune || DEFAULT_TUNE));

  // Strip data:image/... header from base64 if present to save URL length
  let rawImg = gift.photoUrl;
  if (rawImg && rawImg.includes(',')) {
    rawImg = rawImg.split(',')[1];
  }

  const payload: CompactGiftPayload = {
    v: 2,
    r: gift.recipientName.trim(),
    s: gift.senderName?.trim() || undefined,
    e: eIdx,
    b: bIdx,
    rb: rbIdx,
    c: cIdx,
    snd: gift.soundEnabled ? 1 : 0,
    sndT: sndTIdx,
    m: gift.message.trim(),
    img: rawImg || undefined,
  };

  const json = JSON.stringify(payload);
  const compressed = LZString.compressToEncodedURIComponent(json);
  return `#data=${compressed}`;
}

/**
 * Builds the full shareable URL given gift data and optional base URL.
 */
export function generateGiftUrl(gift: GiftData, baseUrl: string = window.location.origin + window.location.pathname): string {
  const hash = encodeGiftToHash(gift);
  return `${baseUrl}${hash}`;
}

/**
 * Decodes and unpacks a gift payload from either the full URL, a hash string, or the raw compressed string.
 * Handles both V2 (compact integer indices) and V1 (full string names) seamlessly.
 */
export function decodeGiftFromHash(input: string): GiftData | null {
  if (!input) return null;

  try {
    let rawCompressed = '';

    // Handle full URL or hash string containing #data= or ?data=
    if (input.includes('data=')) {
      const match = input.match(/[#&?]data=([^&]+)/);
      if (match && match[1]) {
        rawCompressed = match[1];
      }
    } else if (input.startsWith('#')) {
      rawCompressed = input.slice(1);
    } else {
      rawCompressed = input;
    }

    if (!rawCompressed) return null;

    // Try decompressing using EncodedURIComponent first
    let json = LZString.decompressFromEncodedURIComponent(rawCompressed);

    // Fallback: try decompressFromBase64 if user pasted a Base64 string
    if (!json || json === '') {
      try {
        json = LZString.decompressFromBase64(rawCompressed);
      } catch {
        // ignore
      }
    }

    // Fallback: if input was percent-encoded
    if (!json || json === '') {
      try {
        const unescaped = decodeURIComponent(rawCompressed);
        json = LZString.decompressFromEncodedURIComponent(unescaped);
      } catch {
        // ignore
      }
    }

    if (!json) return null;

    const parsed = JSON.parse(json);

    // Validate minimum required fields
    if (!parsed || typeof parsed !== 'object' || !parsed.r) {
      return null;
    }

    // Resolve event
    let eventType: EventType = DEFAULT_EVENT;
    if (typeof parsed.e === 'number' && EVENT_MAP[parsed.e]) {
      eventType = EVENT_MAP[parsed.e];
    } else if (typeof parsed.e === 'string' && EVENT_MAP.includes(parsed.e as EventType)) {
      eventType = parsed.e as EventType;
    }

    // Resolve box color
    let boxColor: BoxColor = DEFAULT_BOX;
    if (typeof parsed.b === 'number' && BOX_MAP[parsed.b]) {
      boxColor = BOX_MAP[parsed.b];
    } else if (typeof parsed.b === 'string' && BOX_MAP.includes(parsed.b as BoxColor)) {
      boxColor = parsed.b as BoxColor;
    }

    // Resolve ribbon color
    let ribbonColor: RibbonColor = DEFAULT_RIBBON;
    if (typeof parsed.rb === 'number' && RIBBON_MAP[parsed.rb]) {
      ribbonColor = RIBBON_MAP[parsed.rb];
    } else if (typeof parsed.rb === 'string' && RIBBON_MAP.includes(parsed.rb as RibbonColor)) {
      ribbonColor = parsed.rb as RibbonColor;
    }

    // Resolve confetti
    let confettiStyle: ConfettiStyle = DEFAULT_CONFETTI;
    if (typeof parsed.c === 'number' && CONFETTI_MAP[parsed.c]) {
      confettiStyle = CONFETTI_MAP[parsed.c];
    } else if (typeof parsed.c === 'string' && CONFETTI_MAP.includes(parsed.c as ConfettiStyle)) {
      confettiStyle = parsed.c as ConfettiStyle;
    }

    // Resolve sound tune
    let soundTune: SoundTune = DEFAULT_TUNE;
    if (typeof parsed.sndT === 'number' && TUNE_MAP[parsed.sndT]) {
      soundTune = TUNE_MAP[parsed.sndT];
    } else if (typeof parsed.sndT === 'string' && TUNE_MAP.includes(parsed.sndT as SoundTune)) {
      soundTune = parsed.sndT as SoundTune;
    }

    // Resolve image (re-attach data URI if raw base64)
    let photoUrl: string | undefined = undefined;
    if (parsed.img) {
      if (parsed.img.startsWith('data:')) {
        photoUrl = parsed.img;
      } else {
        photoUrl = `data:image/webp;base64,${parsed.img}`;
      }
    }

    const giftData: GiftData = {
      recipientName: String(parsed.r || 'Friend'),
      senderName: parsed.s ? String(parsed.s) : undefined,
      eventType,
      boxColor,
      ribbonColor,
      confettiStyle,
      soundEnabled: parsed.snd === 1,
      soundTune,
      message: String(parsed.m || ''),
      photoUrl,
      createdAt: parsed.t,
    };

    return giftData;
  } catch (err) {
    console.error('Failed to decode gift payload:', err);
    return null;
  }
}
