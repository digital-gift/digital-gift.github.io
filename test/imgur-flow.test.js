import { encodeGiftToHash, decodeGiftFromHash } from '../src/utils/codec.js';

// Test with 7-character Imgur ID and full Imgur URL
const giftWithImgur = {
  recipientName: 'Sophia',
  senderName: 'Liam',
  eventType: 'birthday',
  boxColor: 'coral',
  ribbonColor: 'ruby',
  confettiStyle: 'fireworks',
  soundEnabled: true,
  soundTune: 'magic',
  message: 'Have the best birthday ever Sophia!',
  photoUrl: 'https://i.imgur.com/CkCRdry.jpg', // Full Imgur URL
};

const hash = encodeGiftToHash(giftWithImgur);
console.log('Imgur Gift Hash Length:', hash.length);
console.log('Full URL Length:', `https://digital-gift.github.io/${hash}`.length);

const decoded = decodeGiftFromHash(hash);
if (!decoded) throw new Error('Failed to decode Imgur gift');
if (decoded.recipientName !== 'Sophia') throw new Error('Recipient name mismatch');
if (decoded.photoUrl !== 'https://i.imgur.com/CkCRdry.jpg') {
  throw new Error(`Photo URL expected https://i.imgur.com/CkCRdry.jpg, got ${decoded.photoUrl}`);
}

console.log('✅ Imgur direct ID encode/decode roundtrip passed with URL length:', `https://digital-gift.github.io/${hash}`.length);
