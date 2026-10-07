import type { SoundTune } from '../types/gift';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;

  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

interface NoteDef {
  freq: number;
  time: number;
  duration: number;
}

// Frequencies (Hz)
const NOTE_FREQS = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.00,
  B5: 987.77,
  C6: 1046.50,
  D6: 1174.66,
  E6: 1318.51,
  G6: 1567.98,
};

function scheduleNote(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainPeak: number = 0.25
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  // Soft envelope
  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.exponentialRampToValueAtTime(gainPeak, startTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

export function playCelebrationSound(tune: SoundTune = 'birthday', enabled: boolean = true): void {
  if (!enabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + 0.05;

  switch (tune) {
    case 'birthday': {
      // "Happy Birthday to You" opening motif
      const notes: NoteDef[] = [
        { freq: NOTE_FREQS.C4, time: 0, duration: 0.28 },
        { freq: NOTE_FREQS.C4, time: 0.32, duration: 0.2 },
        { freq: NOTE_FREQS.D4, time: 0.55, duration: 0.45 },
        { freq: NOTE_FREQS.C4, time: 1.05, duration: 0.45 },
        { freq: NOTE_FREQS.F4, time: 1.55, duration: 0.45 },
        { freq: NOTE_FREQS.E4, time: 2.05, duration: 0.8 },
      ];

      notes.forEach((n) => {
        scheduleNote(ctx, n.freq, now + n.time, n.duration, 'triangle', 0.28);
        // Add a gentle harmonic chime
        scheduleNote(ctx, n.freq * 2, now + n.time, n.duration * 0.6, 'sine', 0.1);
      });
      break;
    }

    case 'fanfare': {
      // Triumphant fanfare
      const notes: NoteDef[] = [
        { freq: NOTE_FREQS.C4, time: 0, duration: 0.18 },
        { freq: NOTE_FREQS.E4, time: 0.2, duration: 0.18 },
        { freq: NOTE_FREQS.G4, time: 0.4, duration: 0.22 },
        { freq: NOTE_FREQS.C5, time: 0.65, duration: 0.5 },
        // Final chord burst
        { freq: NOTE_FREQS.E5, time: 1.2, duration: 0.8 },
        { freq: NOTE_FREQS.G5, time: 1.2, duration: 0.8 },
        { freq: NOTE_FREQS.C6, time: 1.2, duration: 0.9 },
      ];

      notes.forEach((n) => {
        scheduleNote(ctx, n.freq, now + n.time, n.duration, 'sine', 0.25);
      });
      break;
    }

    case 'chime': {
      // Sparkling wind chimes / glockenspiel ascending
      const chimes = [
        NOTE_FREQS.E5,
        NOTE_FREQS.G5,
        NOTE_FREQS.A5,
        NOTE_FREQS.C6,
        NOTE_FREQS.D6,
        NOTE_FREQS.E6,
        NOTE_FREQS.G6,
      ];
      chimes.forEach((freq, idx) => {
        scheduleNote(ctx, freq, now + idx * 0.1, 0.65, 'sine', 0.22);
      });
      break;
    }

    case 'magic': {
      // Shimmering harp / sparkle cascade
      const magicPitches = [
        NOTE_FREQS.C5,
        NOTE_FREQS.E5,
        NOTE_FREQS.G5,
        NOTE_FREQS.B5,
        NOTE_FREQS.C6,
        NOTE_FREQS.E6,
        NOTE_FREQS.G6,
      ];
      magicPitches.forEach((freq, idx) => {
        scheduleNote(ctx, freq, now + idx * 0.08, 0.7, 'triangle', 0.2);
        scheduleNote(ctx, freq * 1.5, now + idx * 0.08 + 0.02, 0.4, 'sine', 0.08);
      });
      break;
    }
  }
}
