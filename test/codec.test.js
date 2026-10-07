import { encodeGiftToHash, decodeGiftFromHash } from '../src/utils/codec.js';

// Sample test data
const sampleGift = {
  recipientName: 'Alice',
  senderName: 'Bob',
  eventType: 'birthday',
  boxColor: 'teal',
  ribbonColor: 'gold',
  confettiStyle: 'balloons',
  soundEnabled: true,
  soundTune: 'birthday',
  message: 'Happy Birthday Alice! Wishing you wonderful joy and happiness today and always!',
  photoUrl: 'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoFAAUAPxF8slSvKSWjAAwBQCcJZwAA/v3qAAAAAA==',
  createdAt: 1700000000000,
};

console.log('--- Testing encodeGiftToHash ---');
const hash = encodeGiftToHash(sampleGift);
console.log('Encoded Hash Length:', hash.length);
console.log('Encoded Hash Preview:', hash.slice(0, 50) + '...');

console.log('--- Testing decodeGiftFromHash ---');
const decoded = decodeGiftFromHash(hash);
console.log('Decoded:', decoded);

// Assertions
if (!decoded) {
  throw new Error('Decoding failed: returned null');
}

if (decoded.recipientName !== sampleGift.recipientName) {
  throw new Error(`Recipient mismatch: expected ${sampleGift.recipientName}, got ${decoded.recipientName}`);
}

if (decoded.senderName !== sampleGift.senderName) {
  throw new Error(`Sender mismatch: expected ${sampleGift.senderName}, got ${decoded.senderName}`);
}

if (decoded.eventType !== sampleGift.eventType) {
  throw new Error(`Event mismatch: expected ${sampleGift.eventType}, got ${decoded.eventType}`);
}

if (decoded.boxColor !== sampleGift.boxColor) {
  throw new Error(`Box color mismatch: expected ${sampleGift.boxColor}, got ${decoded.boxColor}`);
}

if (decoded.ribbonColor !== sampleGift.ribbonColor) {
  throw new Error(`Ribbon color mismatch: expected ${sampleGift.ribbonColor}, got ${decoded.ribbonColor}`);
}

if (decoded.confettiStyle !== sampleGift.confettiStyle) {
  throw new Error(`Confetti mismatch: expected ${sampleGift.confettiStyle}, got ${decoded.confettiStyle}`);
}

if (decoded.soundEnabled !== sampleGift.soundEnabled) {
  throw new Error(`Sound enabled mismatch: expected ${sampleGift.soundEnabled}, got ${decoded.soundEnabled}`);
}

if (decoded.soundTune !== sampleGift.soundTune) {
  throw new Error(`Sound tune mismatch: expected ${sampleGift.soundTune}, got ${decoded.soundTune}`);
}

if (decoded.message !== sampleGift.message) {
  throw new Error(`Message mismatch: expected ${sampleGift.message}, got ${decoded.message}`);
}

if (decoded.photoUrl !== sampleGift.photoUrl) {
  throw new Error(`Photo mismatch: expected ${sampleGift.photoUrl}, got ${decoded.photoUrl}`);
}

// Test URL format: full URL
const fullUrl = `https://digital-gift.github.io/${hash}`;
const decodedFromFull = decodeGiftFromHash(fullUrl);
if (!decodedFromFull || decodedFromFull.recipientName !== 'Alice') {
  throw new Error('Decoding from full URL failed');
}

// Test invalid hash handling
const invalidResult = decodeGiftFromHash('#data=INVALID_CORRUPT_PAYLOAD');
console.log('Invalid hash handled safely:', invalidResult === null);

console.log(' All codec tests passed successfully!');
