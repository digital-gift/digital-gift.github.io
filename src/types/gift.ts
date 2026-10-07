export type EventType = 'birthday' | 'anniversary' | 'appreciation' | 'celebration';

export type BoxColor = 'teal' | 'coral' | 'gold' | 'purple' | 'midnight' | 'rose' | 'emerald';

export type RibbonColor = 'gold' | 'silver' | 'ruby' | 'cyan' | 'cream';

export type ConfettiStyle = 'confetti' | 'balloons' | 'stars' | 'fireworks';

export type SoundTune = 'chime' | 'birthday' | 'fanfare' | 'magic';

export type SupportedLocale = 'en' | 'es' | 'fr' | 'pt' | 'ja';

export interface GiftData {
  recipientName: string;
  senderName?: string;
  eventType: EventType;
  boxColor: BoxColor;
  ribbonColor: RibbonColor;
  confettiStyle: ConfettiStyle;
  soundEnabled: boolean;
  soundTune: SoundTune;
  message: string;
  stickerId?: number; // 0..15 curated animated sticker / 3D avatar ID
  photoUrl?: string;  // Legacy Base64 or CDN URL (backwards compatible)
  createdAt?: number;
}

export interface EncodedGiftPayload {
  r: string;         // recipientName
  s?: string;        // senderName
  e: EventType;      // eventType
  b: BoxColor;       // boxColor
  rb: RibbonColor;   // ribbonColor
  c: ConfettiStyle;  // confettiStyle
  snd: number;       // 1 if soundEnabled else 0
  sndT: SoundTune;   // soundTune
  m: string;         // message
  stk?: number;      // stickerId (0..15)
  img?: string;      // legacy photoUrl
  v: number;         // version (1 or 2)
  t?: number;        // timestamp
}
