import LZString from 'lz-string';

const EVENT_MAP = ['birthday', 'anniversary', 'appreciation', 'celebration'];
const BOX_MAP = ['teal', 'coral', 'gold', 'purple', 'midnight', 'rose', 'emerald'];
const RIBBON_MAP = ['gold', 'silver', 'ruby', 'cyan', 'cream'];
const CONFETTI_MAP = ['confetti', 'balloons', 'stars', 'fireworks'];
const TUNE_MAP = ['birthday', 'fanfare', 'chime', 'magic'];

function encodeGift(gift) {
  const eIdx = Math.max(0, EVENT_MAP.indexOf(gift.eventType || 'birthday'));
  const bIdx = Math.max(0, BOX_MAP.indexOf(gift.boxColor || 'teal'));
  const rbIdx = Math.max(0, RIBBON_MAP.indexOf(gift.ribbonColor || 'gold'));
  const cIdx = Math.max(0, CONFETTI_MAP.indexOf(gift.confettiStyle || 'confetti'));
  const sndTIdx = Math.max(0, TUNE_MAP.indexOf(gift.soundTune || 'birthday'));

  const arrPayload = [
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

  const json = JSON.stringify(arrPayload);
  const compressed = LZString.compressToEncodedURIComponent(json);
  return `https://digital-gift.github.io/#data=${compressed}`;
}

function decodeGift(url) {
  const match = url.match(/[#&?]data=([^&]+)/);
  if (!match) return null;
  const json = LZString.decompressFromEncodedURIComponent(match[1]);
  if (!json) return null;
  const parsed = JSON.parse(json);

  if (Array.isArray(parsed)) {
    const [_v, r, s, e, b, rb, c, snd, sndT, m, stk] = parsed;
    return {
      recipientName: r,
      senderName: s || undefined,
      eventType: EVENT_MAP[e],
      boxColor: BOX_MAP[b],
      ribbonColor: RIBBON_MAP[rb],
      confettiStyle: CONFETTI_MAP[c],
      soundEnabled: snd === 1,
      soundTune: TUNE_MAP[sndT],
      message: m,
      stickerId: typeof stk === 'number' && stk >= 0 ? stk : undefined,
    };
  }
  return null;
}

// TEST 1: Typical Birthday with Cake Sticker (id: 0)
const gift1 = {
  recipientName: 'Alex',
  senderName: 'Sam',
  eventType: 'birthday',
  boxColor: 'teal',
  ribbonColor: 'gold',
  confettiStyle: 'confetti',
  soundEnabled: true,
  soundTune: 'birthday',
  message: 'Happy Birthday Alex!',
  stickerId: 0,
};

const url1 = encodeGift(gift1);
console.log('--- TEST 1 ---');
console.log('URL:', url1);
console.log('Length:', url1.length);
if (url1.length > 120) {
  console.warn('URL slightly over 120:', url1.length);
}
const decoded1 = decodeGift(url1);
if (decoded1.recipientName !== 'Alex') throw new Error('Recipient mismatch');
if (decoded1.stickerId !== 0) throw new Error('StickerId mismatch');
console.log('Decoded successfully:', decoded1);

// TEST 2: Celebration Puppy (id: 4)
const gift2 = {
  recipientName: 'Mia',
  senderName: 'Leo',
  eventType: 'celebration',
  boxColor: 'rose',
  ribbonColor: 'ruby',
  confettiStyle: 'fireworks',
  soundEnabled: true,
  soundTune: 'fanfare',
  message: 'Congrats Mia!',
  stickerId: 4,
};

const url2 = encodeGift(gift2);
console.log('\n--- TEST 2 ---');
console.log('URL:', url2);
console.log('Length:', url2.length);
const decoded2 = decodeGift(url2);
if (decoded2.recipientName !== 'Mia') throw new Error('Recipient mismatch');
if (decoded2.stickerId !== 4) throw new Error('StickerId mismatch');
console.log('Decoded successfully:', decoded2);

// TEST 3: No sticker (text only)
const gift3 = {
  recipientName: 'David',
  eventType: 'appreciation',
  boxColor: 'gold',
  ribbonColor: 'silver',
  confettiStyle: 'stars',
  soundEnabled: false,
  soundTune: 'chime',
  message: 'Thank you David for everything!',
  stickerId: undefined,
};

const url3 = encodeGift(gift3);
console.log('\n--- TEST 3 (No Sticker) ---');
console.log('URL:', url3);
console.log('Length:', url3.length);
const decoded3 = decodeGift(url3);
if (decoded3.stickerId !== undefined) throw new Error('StickerId should be undefined');
console.log('Decoded successfully:', decoded3);

console.log('\n🎉 ALL ROUNDTRIP TESTS PASSED CLEANLY!');
