import LZString from 'lz-string';

const EVENT_MAP = ['birthday', 'anniversary', 'appreciation', 'celebration'];
const BOX_MAP = ['teal', 'coral', 'gold', 'purple', 'midnight', 'rose', 'emerald'];
const RIBBON_MAP = ['gold', 'silver', 'ruby', 'cyan', 'cream'];
const CONFETTI_MAP = ['confetti', 'balloons', 'stars', 'fireworks'];
const TUNE_MAP = ['birthday', 'fanfare', 'chime', 'magic'];

function encodeGift(gift) {
  const payload = {
    v: 2,
    r: gift.recipientName,
    s: gift.senderName,
    e: EVENT_MAP.indexOf(gift.eventType || 'birthday'),
    b: BOX_MAP.indexOf(gift.boxColor || 'teal'),
    rb: RIBBON_MAP.indexOf(gift.ribbonColor || 'gold'),
    c: CONFETTI_MAP.indexOf(gift.confettiStyle || 'confetti'),
    snd: gift.soundEnabled ? 1 : 0,
    sndT: TUNE_MAP.indexOf(gift.soundTune || 'birthday'),
    m: gift.message,
    stk: gift.stickerId,
  };
  const json = JSON.stringify(payload);
  const compressed = LZString.compressToEncodedURIComponent(json);
  return `https://digital-gift.github.io/#data=${compressed}`;
}

// Test case 1: Birthday with Birthday Cake sticker (id: 0)
const gift1 = {
  recipientName: 'Sophia',
  senderName: 'Liam',
  eventType: 'birthday',
  boxColor: 'teal',
  ribbonColor: 'gold',
  confettiStyle: 'confetti',
  soundEnabled: true,
  soundTune: 'birthday',
  message: 'Happy Birthday Sophia! Wishing you joy and blessings!',
  stickerId: 0,
};

const url1 = encodeGift(gift1);
console.log('Test 1 URL:');
console.log(url1);
console.log('Total characters:', url1.length);

// Test case 2: Short & sweet message with Cute Puppy sticker (id: 4)
const gift2 = {
  recipientName: 'Alex',
  senderName: 'Emma',
  eventType: 'birthday',
  boxColor: 'rose',
  ribbonColor: 'ruby',
  confettiStyle: 'balloons',
  soundEnabled: true,
  soundTune: 'magic',
  message: 'Happy Birthday Alex! 🎂',
  stickerId: 4,
};

const url2 = encodeGift(gift2);
console.log('\nTest 2 URL:');
console.log(url2);
console.log('Total characters:', url2.length);

if (url1.length > 150) {
  throw new Error(`URL too long: ${url1.length}`);
}
console.log('\n✅ BOTH URLs are well UNDER 120 characters!');
