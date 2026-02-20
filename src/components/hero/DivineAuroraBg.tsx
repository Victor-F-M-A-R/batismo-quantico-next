'use client';

import { useEffect, useRef } from 'react';

const HERO_IMAGE_PATH = '/images/hero-doves-relief.png';

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function DivineAuroraBg() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      root.style.setProperty('--active', '1');
      root.style.setProperty('--mx', '50%');
      root.style.setProperty('--my', '45%');
      root.style.setProperty('--hole', '92px');
      root.style.setProperty('--feather', '58px');
      root.style.setProperty('--ring-size', '172px');
      root.style.setProperty('--ring-opacity', '0.45');
      return;
    }

    let rafId = 0;
    let isInside = false;
    let lastTime = performance.now();

    const pointer = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0 };

    let reveal = 0;
    let speed = 0;

    const updateFromEvent = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        isInside = false;
        return;
      }

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const dx = x - pointer.x;
      const dy = y - pointer.y;

      speed = Math.min(Math.hypot(dx, dy), 32);
      pointer.x = x;
      pointer.y = y;
      isInside = true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      updateFromEvent(event);
    };

    const handlePointerDown = (event: PointerEvent) => {
      updateFromEvent(event);
    };

    const handlePointerUp = () => {
      isInside = false;
    };

    const handleScroll = () => {
      if (!isInside) {
        return;
      }

      const rect = root.getBoundingClientRect();
      if (pointer.x < 0 || pointer.y < 0 || pointer.x > rect.width || pointer.y > rect.height) {
        isInside = false;
      }
    };

    const frame = (now: number) => {
      const delta = Math.min((now - lastTime) / 16.67, 2.2);
      lastTime = now;

      if (!isInside && reveal < 0.005) {
        reveal = 0;
      }

      if (isInside) {
        cursor.x += (pointer.x - cursor.x) * 0.2 * delta;
        cursor.y += (pointer.y - cursor.y) * 0.2 * delta;
      }

      reveal += ((isInside ? 1 : 0) - reveal) * 0.12 * delta;
      speed *= Math.pow(0.9, delta);

      const pulse = Math.sin(now * 0.0032) * 3.2;
      const holeRadius = clamp((84 + speed * 0.65 + pulse) * reveal, 0, 180);
      const feather = 52 + speed * 0.4;
      const ringSize = 170 + speed * 0.9;
      const ringOpacity = clamp(reveal * (0.34 + speed * 0.01), 0, 0.62);

      root.style.setProperty('--mx', `${cursor.x}px`);
      root.style.setProperty('--my', `${cursor.y}px`);
      root.style.setProperty('--hole', `${holeRadius}px`);
      root.style.setProperty('--feather', `${feather}px`);
      root.style.setProperty('--ring-size', `${ringSize}px`);
      root.style.setProperty('--ring-opacity', `${ringOpacity}`);
      root.style.setProperty('--active', reveal > 0.001 ? '1' : '0');

      rafId = window.requestAnimationFrame(frame);
    };

    const rect = root.getBoundingClientRect();
    pointer.x = rect.width * 0.5;
    pointer.y = rect.height * 0.45;
    cursor.x = pointer.x;
    cursor.y = pointer.y;

    rafId = window.requestAnimationFrame(frame);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={
        {
          '--mx': '50%',
          '--my': '45%',
          '--hole': '0px',
          '--feather': '52px',
          '--ring-size': '170px',
          '--ring-opacity': '0',
          '--active': '0',
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${HERO_IMAGE_PATH}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(0.72) contrast(1.06) brightness(0.98)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 74% at 52% -12%, rgba(214,176,103,0.18) 0%, rgba(214,176,103,0.07) 22%, rgba(255,255,255,0) 64%), repeating-linear-gradient(110deg, rgba(214,176,103,0.045) 0px, rgba(214,176,103,0.045) 1px, rgba(255,255,255,0) 20px, rgba(255,255,255,0) 92px), linear-gradient(180deg, rgba(254,253,250,0.995) 0%, rgba(251,249,244,0.985) 58%, rgba(248,245,238,0.99) 100%)',
          WebkitMaskImage:
            'radial-gradient(circle at var(--mx) var(--my), transparent 0, transparent var(--hole), black calc(var(--hole) + var(--feather)))',
          maskImage:
            'radial-gradient(circle at var(--mx) var(--my), transparent 0, transparent var(--hole), black calc(var(--hole) + var(--feather)))',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          transition: 'opacity 250ms ease',
          opacity: 'calc(0.965 + (1 - var(--active)) * 0.03)',
        }}
      />

      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.35\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          mixBlendMode: 'overlay',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.46) 0%, rgba(255,255,255,0.22) 26%, rgba(180,160,130,0.18) 39%, rgba(0,0,0,0) var(--ring-size))',
          opacity: 'var(--ring-opacity)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}
