import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number; y: number;   // current position (CSS px)
  ox: number; oy: number; // origin position (CSS px)
  vx: number; vy: number; // velocity (CSS px / ms)
  opacity: number;
  fadeRate: number;       // opacity lost per ms
  r: number; g: number; b: number;
}

type AnimState = 'static' | 'vaporizing' | 'fadingIn';

interface VapourTextProps {
  text: string;
  color?: string;
  spread?: number;   // max scatter distance (CSS px)
  density?: number;  // sample every N physical pixels
}

const WAVE_DURATION = 650;  // ms for wave to cross full width
const FADE_IN_DURATION = 900; // ms for full fade-in

export default function VapourText({
  text,
  color = '#ffffff',
  spread = 55,
  density = 5,
}: VapourTextProps) {
  const wrapperRef   = useRef<HTMLSpanElement>(null);
  const textSpanRef  = useRef<HTMLSpanElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const stateRef     = useRef<AnimState>('static');
  const hoveredRef   = useRef(false);
  const rafRef       = useRef<number>(0);
  const lastTimeRef  = useRef<number>(-1);
  const waveFrontRef = useRef(0);   // current wave x (CSS px)
  const fadeTimerRef = useRef(0);   // elapsed ms in fadingIn phase

  // ─── Build particle array from canvas pixel data ───────────────────────
  const buildParticles = useCallback(async () => {
    const textSpan = textSpanRef.current;
    const canvas   = canvasRef.current;
    if (!textSpan || !canvas) return;

    await document.fonts.ready;

    const dpr  = window.devicePixelRatio || 1;
    const rect = textSpan.getBoundingClientRect();
    const cs   = window.getComputedStyle(textSpan);
    const W    = rect.width;
    const H    = rect.height;

    canvas.style.width  = `${W}px`;
    canvas.style.height = `${H}px`;
    canvas.width  = Math.ceil(W * dpr);
    canvas.height = Math.ceil(H * dpr);

    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const fontStr = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    ctx.font        = fontStr;
    ctx.fillStyle   = color;
    ctx.textBaseline = 'middle';

    ctx.clearRect(0, 0, W, H);
    ctx.fillText(text, 0, H / 2);

    const phW = Math.ceil(W * dpr);
    const phH = Math.ceil(H * dpr);
    const img = ctx.getImageData(0, 0, phW, phH);
    const particles: Particle[] = [];

    for (let py = 0; py < phH; py += density) {
      for (let px = 0; px < phW; px += density) {
        const i = (py * phW + px) * 4;
        if (img.data[i + 3] > 60) {
          const cssx = px / dpr;
          const cssy = py / dpr;
          particles.push({
            x: cssx, y: cssy,
            ox: cssx, oy: cssy,
            vx: 0, vy: 0,
            opacity: 1,
            fadeRate: 0.0008 + Math.random() * 0.0014,
            r: img.data[i], g: img.data[i + 1], b: img.data[i + 2],
          });
        }
      }
    }

    particlesRef.current = particles;
  }, [text, color, density]);

  // ─── Trigger helpers ───────────────────────────────────────────────────
  const startVaporize = useCallback(() => {
    stateRef.current   = 'vaporizing';
    waveFrontRef.current = 0;
    lastTimeRef.current  = -1;
    // Reset particles to origin ready for scatter
    particlesRef.current.forEach(p => {
      p.x = p.ox; p.y = p.oy;
      p.vx = 0; p.vy = 0;
      p.opacity = 1;
    });
  }, []);

  const startFadeIn = useCallback(() => {
    stateRef.current  = 'fadingIn';
    fadeTimerRef.current = 0;
    lastTimeRef.current  = -1;
    particlesRef.current.forEach(p => { p.opacity = 0; });
  }, []);

  // ─── Main RAF loop ─────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const loop = (time: number) => {
      rafRef.current = requestAnimationFrame(loop);

      const ctx = canvas.getContext('2d');
      if (!ctx || particlesRef.current.length === 0) return;

      if (lastTimeRef.current < 0) lastTimeRef.current = time;
      const dt = Math.min(time - lastTimeRef.current, 32); // cap at ~30fps equiv
      lastTimeRef.current = time;

      const dpr = window.devicePixelRatio || 1;
      const W   = canvas.width / dpr;
      const H   = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const particles = particlesRef.current;
      const state     = stateRef.current;

      if (state === 'static') {
        particles.forEach(p => {
          ctx.globalAlpha = 1;
          ctx.fillStyle   = `rgb(${p.r},${p.g},${p.b})`;
          ctx.fillRect(p.ox, p.oy, 1.2, 1.2);
        });

      } else if (state === 'vaporizing') {
        waveFrontRef.current += (W / WAVE_DURATION) * dt;
        let doneCount = 0;

        particles.forEach(p => {
          if (p.ox <= waveFrontRef.current) {
            // Launch particle if just hit by wave
            if (p.vx === 0 && p.vy === 0 && p.opacity === 1) {
              const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 1.2;
              const speed = (0.04 + Math.random() * 0.08) * spread;
              p.vx = Math.cos(angle) * speed;
              p.vy = Math.sin(angle) * speed;
            }
            // Physics + fade
            p.vx *= Math.pow(0.94, dt / 16);
            p.vy *= Math.pow(0.94, dt / 16);
            p.x  += p.vx * dt;
            p.y  += p.vy * dt;
            p.opacity = Math.max(0, p.opacity - p.fadeRate * dt);

            if (p.opacity <= 0) { doneCount++; return; }
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle   = `rgb(${p.r},${p.g},${p.b})`;
            ctx.fillRect(p.x, p.y, 1.2, 1.2);
          } else {
            // Wave hasn't reached yet — show at origin
            ctx.globalAlpha = 1;
            ctx.fillStyle   = `rgb(${p.r},${p.g},${p.b})`;
            ctx.fillRect(p.ox, p.oy, 1.2, 1.2);
          }
        });

        // Switch phase once wave has passed and all particles faded
        if (waveFrontRef.current >= W && doneCount === particles.length) {
          hoveredRef.current ? startFadeIn() : (() => { stateRef.current = 'static'; })();
        }

      } else if (state === 'fadingIn') {
        fadeTimerRef.current += dt;
        const progress = Math.min(1, fadeTimerRef.current / FADE_IN_DURATION);

        particles.forEach(p => {
          // Exponential ease back to origin
          const ease = 1 - Math.exp(-progress * 5);
          p.x = p.x + (p.ox - p.x) * (0.08 * dt / 16);
          p.y = p.y + (p.oy - p.y) * (0.08 * dt / 16);
          p.opacity = Math.min(1, ease);

          ctx.globalAlpha = p.opacity;
          ctx.fillStyle   = `rgb(${p.r},${p.g},${p.b})`;
          ctx.fillRect(p.x, p.y, 1.2, 1.2);
        });

        if (progress >= 1) {
          particles.forEach(p => { p.x = p.ox; p.y = p.oy; p.opacity = 1; });
          hoveredRef.current ? startVaporize() : (() => { stateRef.current = 'static'; })();
        }
      }
    };

    buildParticles().then(() => {
      rafRef.current = requestAnimationFrame(loop);
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, [buildParticles, startVaporize, startFadeIn]);

  return (
    <span
      ref={wrapperRef}
      onMouseEnter={() => { hoveredRef.current = true;  if (stateRef.current === 'static') startVaporize(); }}
      onMouseLeave={() => { hoveredRef.current = false; }}
      style={{ position: 'relative', display: 'inline-block', cursor: 'default' }}
      aria-label={text}
    >
      {/* Hidden text holds space + drives font metrics */}
      <span
        ref={textSpanRef}
        style={{ visibility: 'hidden', display: 'block', whiteSpace: 'nowrap' }}
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Canvas renders particle effect */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      />
    </span>
  );
}
