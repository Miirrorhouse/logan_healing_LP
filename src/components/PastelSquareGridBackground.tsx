import { useEffect, useRef } from 'react';

/** Derived from Hero gradient: periwinkle → lavender → sky blue */
const PASTELS: ReadonlyArray<readonly [number, number, number]> = [
  [196, 190, 243], // #c4bef3 — soft periwinkle
  [165, 180, 252], // #a5b4fc — indigo-300
  [147, 197, 253], // #93c5fd — blue-300
  [96,  165, 250], // #60a5fa — blue-400
  [221, 214, 247], // #ddd6f7 — light lavender
  [237, 234, 251], // #edeafb — palest lavender
];

/** Wider cell = more air between dots */
const CELL = 72;
const DOT = 6.25;
const FILL_CHANCE = 0.11;
/** Staggered pop-in: random delay (s) + soft fade length (s) */
const APPEAR_SPREAD = 5.5;
const FADE_IN_MIN = 0.22;
const FADE_IN_MAX = 0.75;
/** Opacity swings: long soft dim, quick bright “twinkle” */
const TWINKLE_MIN = 0.04;
const TWINKLE_MAX = 1;
const TWINKLE_SHARPNESS = 1.75;

type Cell = {
  cx: number;
  cy: number;
  rgb: readonly [number, number, number];
  phase: number;
  phase2: number;
  speed: number;
  speedMul: number;
  micro: boolean;
  appearDelay: number;
  fadeIn: number;
};

function smoothstep01(x: number): number {
  const u = Math.min(1, Math.max(0, x));
  return u * u * (3 - 2 * u);
}

function pick<T>(arr: ReadonlyArray<T>): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export default function PastelSquareGridBackground({ className }: { className?: string } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let cells: Cell[] = [];
    let wCss = 0;
    let hCss = 0;
    let dpr = 1;
    let t0 = performance.now();

    const buildCells = () => {
      const next: Cell[] = [];
      const cols = Math.ceil(wCss / CELL) + 1;
      const rows = Math.ceil(hCss / CELL) + 1;
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          if (Math.random() > FILL_CHANCE) continue;
          const cx = col * CELL + CELL / 2;
          const cy = row * CELL + CELL / 2;
          next.push({
            cx,
            cy,
            rgb: pick(PASTELS),
            phase: Math.random() * Math.PI * 2,
            phase2: Math.random() * Math.PI * 2,
            speed: 0.55 + Math.random() * 1.15,
            speedMul: 1.35 + Math.random() * 1.25,
            micro: Math.random() > 0.5,
            appearDelay: Math.random() * APPEAR_SPREAD,
            fadeIn: FADE_IN_MIN + Math.random() * (FADE_IN_MAX - FADE_IN_MIN),
          });
        }
      }
      // Randomize draw / pop order so load-in feels scattered, not scan-line
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j]!, next[i]!];
      }
      cells = next;
    };

    const resize = () => {
      const elParent = canvas.parentElement;
      if (!elParent) return;
      dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      wCss = elParent.clientWidth;
      hCss = elParent.clientHeight;
      canvas.width = Math.floor(wCss * dpr);
      canvas.height = Math.floor(hCss * dpr);
      canvas.style.width = `${wCss}px`;
      canvas.style.height = `${hCss}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildCells();
      t0 = performance.now();
    };

    const parent = canvas.parentElement;
    const ro = new ResizeObserver(resize);
    if (parent) ro.observe(parent);
    resize();

    const drawMicroGrid = (x: number, y: number, alpha: number) => {
      const sub = 5;
      const step = DOT / sub;
      const microA = alpha * 0.35;
      ctx.strokeStyle = `rgba(255,255,255,${microA * 0.45})`;
      ctx.lineWidth = 0.25;
      for (let i = 1; i < sub; i++) {
        const o = i * step;
        ctx.beginPath();
        ctx.moveTo(x + o, y);
        ctx.lineTo(x + o, y + DOT);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y + o);
        ctx.lineTo(x + DOT, y + o);
        ctx.stroke();
      }
    };

    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, wCss, hCss);

      for (const c of cells) {
        const loadT = t - c.appearDelay;
        const loadFactor = reduceMotion
          ? 1
          : smoothstep01(loadT / c.fadeIn);
        if (loadFactor <= 0) continue;

        let a: number;
        if (reduceMotion) {
          a = (TWINKLE_MIN + TWINKLE_MAX) / 2;
        } else {
          const w1 = Math.sin(t * c.speed + c.phase);
          const w2 = Math.sin(t * c.speed * c.speedMul + c.phase2);
          const beat = 0.5 + 0.5 * w1 * (0.58 + 0.42 * w2);
          const twinkle = Math.pow(Math.max(0, beat), TWINKLE_SHARPNESS);
          a = TWINKLE_MIN + (TWINKLE_MAX - TWINKLE_MIN) * twinkle;
        }
        a *= loadFactor;

        const x = c.cx - DOT / 2;
        const y = c.cy - DOT / 2;
        const [r, g, b] = c.rgb;
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.fillRect(x, y, DOT, DOT);
        if (c.micro) drawMicroGrid(x, y, a);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "absolute inset-0 h-full w-full pointer-events-none mix-blend-multiply opacity-100"}
      aria-hidden="true"
    />
  );
}
