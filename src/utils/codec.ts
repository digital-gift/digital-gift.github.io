import LZString from 'lz-string';
import type { GiftData, EventType, BoxColor, RibbonColor, ConfettiStyle, SoundTune } from '../types/gift';
import { resolveSupabaseUrl } from './supabaseUploader';

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
  stk?: number;    // sticker ID (0..15)
  img?: string;    // raw base64 or legacy CDN ID
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

  // Extract compact ID or strip data:image/... header
  let rawImg = gift.photoUrl;
  if (rawImg) {
    if (rawImg.startsWith('sb:')) {
      // Already a Supabase short ID
    } else if (rawImg.includes('supabase.co/storage/v1/object/public/')) {
      const match = rawImg.match(/https?:\/\/([^.]+)\.supabase\.co\/storage\/v1\/object\/public\/[^/]+\/(.+)$/);
      if (match && match[1] && match[2]) {
        rawImg = `sb:${match[1]}:${match[2]}`;
      } else {
        const parts = rawImg.split('/');
        rawImg = `sb:${parts[parts.length - 1]}`;
      }
    } else {
      const imgurMatch = rawImg.match(/imgur\.com\/([a-zA-Z0-9_-]{5,12})/);
      if (imgurMatch && imgurMatch[1]) {
        rawImg = imgurMatch[1];
      } else if (rawImg.includes(',')) {
        rawImg = rawImg.split(',')[1];
      }
    }
  }

  // Ultra-compact array payload:
  // [version (2), recipient, sender, eventIdx, boxIdx, ribbonIdx, confettiIdx, sound, tuneIdx, message, stickerId, legacyImg?]
  const arrPayload: (string | number)[] = [
    2,
    gift.recipientName.trim(),
    gift.senderName?.trim() || '',
    eIdx,
    bIdx,
    rbIdx,
    cIdx,
    gift.soundEnabled ? 1 : 0,
    sndTIdx,
    gift.message.trim(),
    typeof gift.stickerId === 'number' ? gift.stickerId : -1,
  ];

  if (rawImg) {
    arrPayload.push(rawImg);
  }

  const json = JSON.stringify(arrPayload);
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

    // Ultra-compact Array Format:
    // [version, recipient, sender, eventIdx, boxIdx, ribbonIdx, confettiIdx, sound, tuneIdx, message, stickerId, legacyImg?]
    if (Array.isArray(parsed)) {
      const [_v, r, s, e, b, rb, c, snd, sndT, m, stk, img] = parsed;
      if (!r) return null;

      let photoUrl: string | undefined = undefined;
      if (img && typeof img === 'string') {
        if (img.startsWith('sb:')) {
          photoUrl = resolveSupabaseUrl(img);
        } else if (/^[a-zA-Z0-9_-]{5,12}$/.test(img)) {
          photoUrl = `https://i.imgur.com/${img}.jpg`;
        } else if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
          photoUrl = img;
        } else {
          photoUrl = `data:image/webp;base64,${img}`;
        }
      }

      const eventType = typeof e === 'number' && EVENT_MAP[e] ? EVENT_MAP[e] : DEFAULT_EVENT;
      const boxColor = typeof b === 'number' && BOX_MAP[b] ? BOX_MAP[b] : DEFAULT_BOX;
      const ribbonColor = typeof rb === 'number' && RIBBON_MAP[rb] ? RIBBON_MAP[rb] : DEFAULT_RIBBON;
      const confettiStyle = typeof c === 'number' && CONFETTI_MAP[c] ? CONFETTI_MAP[c] : DEFAULT_CONFETTI;
      const soundTune = typeof sndT === 'number' && TUNE_MAP[sndT] ? TUNE_MAP[sndT] : DEFAULT_TUNE;

      return {
        recipientName: String(r || 'Friend'),
        senderName: s ? String(s) : undefined,
        eventType,
        boxColor,
        ribbonColor,
        confettiStyle,
        soundEnabled: snd === 1,
        soundTune,
        message: String(m || ''),
        stickerId: typeof stk === 'number' && stk >= 0 ? stk : undefined,
        photoUrl,
      };
    }

    // Object Format (Legacy V1 and V2):
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

    // Resolve image (Supabase ID, Imgur ID, full HTTP URL, or raw base64)
    let photoUrl: string | undefined = undefined;
    if (parsed.img) {
      if (parsed.img.startsWith('sb:')) {
        photoUrl = resolveSupabaseUrl(parsed.img);
      } else if (/^[a-zA-Z0-9_-]{5,12}$/.test(parsed.img)) {
        // Direct anonymous Imgur ID (7 characters)
        photoUrl = `https://i.imgur.com/${parsed.img}.jpg`;
      } else if (parsed.img.startsWith('http://') || parsed.img.startsWith('https://')) {
        photoUrl = parsed.img;
      } else if (parsed.img.startsWith('data:')) {
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
      stickerId: typeof parsed.stk === 'number' ? parsed.stk : undefined,
      photoUrl,
      createdAt: parsed.t,
    };

    return giftData;
  } catch (err) {
    console.error('Failed to decode gift payload:', err);
    return null;
  }
}
