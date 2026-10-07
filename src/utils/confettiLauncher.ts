import confetti from 'canvas-confetti';
import type { ConfettiStyle } from '../types/gift';

export function launchConfetti(style: ConfettiStyle = 'confetti') {
  if (typeof window === 'undefined') return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  switch (style) {
    case 'confetti': {
      // Classic dual-cannon explosion
      confetti({
        ...defaults,
        particleCount: 80,
        spread: 60,
        angle: 60,
        origin: { x: 0.2, y: 0.65 },
        colors: ['#287A74', '#55A9A0', '#AEEED3', '#FFF8B0', '#FF6B6B', '#4D96FF'],
      });
      confetti({
        ...defaults,
        particleCount: 80,
        spread: 60,
        angle: 120,
        origin: { x: 0.8, y: 0.65 },
        colors: ['#287A74', '#55A9A0', '#AEEED3', '#FFF8B0', '#FF6B6B', '#4D96FF'],
      });
      setTimeout(() => {
        confetti({
          ...defaults,
          particleCount: 100,
          spread: 100,
          origin: { x: 0.5, y: 0.6 },
          colors: ['#AEEED3', '#FFF8B0', '#FFD166', '#06D6A0'],
        });
      }, 250);
      break;
    }

    case 'stars': {
      // Golden star shapes
      try {
        const star = confetti.shapeFromPath({
          path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        });
        confetti({
          ...defaults,
          particleCount: 60,
          shapes: [star, 'circle'],
          spread: 90,
          scalar: 1.3,
          colors: ['#FFE169', '#FFD166', '#F4A261', '#E76F51', '#FFF8B0'],
        });
        setTimeout(() => {
          confetti({
            ...defaults,
            particleCount: 50,
            shapes: [star],
            spread: 120,
            scalar: 1.5,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#FFF8B0', '#FFD166', '#FFFFFF'],
          });
        }, 300);
      } catch {
        // Fallback to standard
        confetti({
          ...defaults,
          particleCount: 120,
          spread: 80,
          colors: ['#FFE169', '#FFD166', '#FFF8B0'],
        });
      }
      break;
    }

    case 'balloons': {
      // Floating circular festive particles rising like balloons
      confetti({
        ...defaults,
        particleCount: 70,
        spread: 80,
        scalar: 2,
        shapes: ['circle'],
        gravity: 0.4,
        drift: 0.2,
        ticks: 350,
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#FF9F1C', '#AEEED3'],
      });
      setTimeout(() => {
        confetti({
          ...defaults,
          particleCount: 60,
          spread: 100,
          scalar: 2.2,
          shapes: ['circle'],
          gravity: 0.3,
          drift: -0.2,
          ticks: 350,
          origin: { x: 0.6, y: 0.7 },
          colors: ['#FF6B6B', '#AEEED3', '#FFF8B0', '#6A0572'],
        });
      }, 200);
      break;
    }

    case 'fireworks': {
      // Multiple fireworks bursts
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;

      const interval: ReturnType<typeof setInterval> = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.4 + 0.2 },
          spread: 360,
          ticks: 120,
          gravity: 0.6,
          colors: ['#287A74', '#55A9A0', '#AEEED3', '#FFF8B0', '#E76F51', '#F4A261'],
        });
      }, 350);
      break;
    }
  }
}
