import LZString from 'lz-string';
import type { GiftData, EncodedGiftPayload, EventType, BoxColor, RibbonColor, ConfettiStyle, SoundTune } from '../types/gift';

const DEFAULT_EVENT: EventType = 'birthday';
const DEFAULT_BOX: BoxColor = 'teal';
const DEFAULT_RIBBON: RibbonColor = 'gold';
const DEFAULT_CONFETTI: ConfettiStyle = 'confetti';
const DEFAULT_TUNE: SoundTune = 'birthday';

/**
 * Serializes and compresses a GiftData object into a URL-safe hash string.
 * Format returned: #data=<compressed_string>
 */
export function encodeGiftToHash(gift: GiftData): string {
  const payload: EncodedGiftPayload = {
    v: 1,
    r: gift.recipientName.trim(),
    s: gift.senderName?.trim() || undefined,
    e: gift.eventType || DEFAULT_EVENT,
    b: gift.boxColor || DEFAULT_BOX,
    rb: gift.ribbonColor || DEFAULT_RIBBON,
    c: gift.confettiStyle || DEFAULT_CONFETTI,
    snd: gift.soundEnabled ? 1 : 0,
    sndT: gift.soundTune || DEFAULT_TUNE,
    m: gift.message.trim(),
    img: gift.photoUrl || undefined,
    t: gift.createdAt || Date.now(),
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

    const parsed: Partial<EncodedGiftPayload> = JSON.parse(json);

    // Validate minimum required fields
    if (!parsed || typeof parsed !== 'object' || !parsed.r) {
      return null;
    }

    const giftData: GiftData = {
      recipientName: String(parsed.r || 'Friend'),
      senderName: parsed.s ? String(parsed.s) : undefined,
      eventType: (['birthday', 'anniversary', 'appreciation', 'celebration'].includes(parsed.e as string)
        ? (parsed.e as EventType)
        : DEFAULT_EVENT),
      boxColor: (['teal', 'coral', 'gold', 'purple', 'midnight', 'rose', 'emerald'].includes(parsed.b as string)
        ? (parsed.b as BoxColor)
        : DEFAULT_BOX),
      ribbonColor: (['gold', 'silver', 'ruby', 'cyan', 'cream'].includes(parsed.rb as string)
        ? (parsed.rb as RibbonColor)
        : DEFAULT_RIBBON),
      confettiStyle: (['confetti', 'balloons', 'stars', 'fireworks'].includes(parsed.c as string)
        ? (parsed.c as ConfettiStyle)
        : DEFAULT_CONFETTI),
      soundEnabled: parsed.snd === 1,
      soundTune: (['chime', 'birthday', 'fanfare', 'magic'].includes(parsed.sndT as string)
        ? (parsed.sndT as SoundTune)
        : DEFAULT_TUNE),
      message: String(parsed.m || ''),
      photoUrl: parsed.img ? String(parsed.img) : undefined,
      createdAt: parsed.t,
    };

    return giftData;
  } catch (err) {
    console.error('Failed to decode gift payload:', err);
    return null;
  }
}
