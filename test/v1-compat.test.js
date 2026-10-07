import { encodeGiftToHash, decodeGiftFromHash } from '../src/utils/codec.js';
import LZString from 'lz-string';

// Test V1 backward compatibility
const legacyV1Payload = {
  v: 1,
  r: 'Emma',
  s: 'Lucas',
  e: 'anniversary',
  b: 'purple',
  rb: 'ruby',
  c: 'stars',
  snd: 1,
  sndT: 'fanfare',
  m: 'Happy Anniversary Emma!',
  img: 'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoFAAUAPxF8slSvKSWjAAwBQCcJZwAA/v3qAAAAAA==',
  t: 1600000000000,
};

const v1Hash = '#data=' + LZString.compressToEncodedURIComponent(JSON.stringify(legacyV1Payload));
const decodedV1 = decodeGiftFromHash(v1Hash);

if (!decodedV1) throw new Error('V1 decode returned null');
if (decodedV1.recipientName !== 'Emma') throw new Error('V1 recipient failed');
if (decodedV1.eventType !== 'anniversary') throw new Error('V1 eventType failed');
if (decodedV1.boxColor !== 'purple') throw new Error('V1 boxColor failed');
if (decodedV1.ribbonColor !== 'ruby') throw new Error('V1 ribbonColor failed');
if (decodedV1.confettiStyle !== 'stars') throw new Error('V1 confettiStyle failed');
if (decodedV1.soundTune !== 'fanfare') throw new Error('V1 soundTune failed');

console.log(' V1 backward compatibility test passed!');
