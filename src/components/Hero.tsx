import { useRef, useMemo, useState, useEffect, useSyncExternalStore } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { GlobeHemisphereWest } from '@phosphor-icons/react';
import AnimatedGradientBackground from './AnimatedGradientBackground';
import { gradientStore } from '../stores/gradientStore';
import PastelSquareGridBackground from './PastelSquareGridBackground';
import NeonButton from './NeonButton';

const ease = [0.32, 0.72, 0, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, delay, ease },
});

// Navy → Sunset palette (light mode: center → outer edge)
const DUSK   = ['#ffffff', '#edeafb', '#ddd6f7', '#c8bef3', '#a5b4fc'];
const SUNSET = ['#ffffff', '#fef3e8', '#fde8d0', '#fdd0a8', '#fbbf24'];

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function lerpColor(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}

const H1_BEFORE = 'Finally meet ';
const H1_YOU    = 'You';
const H1_AFTER  = ',';
const H1_LINE2  = 'Beyond the Programming.';

function RandomChars({ text, delays, offset = 0, cls = '' }: {
  text: string; delays: number[]; offset?: number; cls?: string;
}) {
  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span
          key={i + offset}
          className={cls || undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delays[i + offset], ease: [0.32, 0.72, 0, 1] }}
          style={{ display: 'inline', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}

function GlowChar({ char, delay, cls = '', autoHoverDelay, mr = '-1px' }: {
  char: string; delay: number; cls?: string; autoHoverDelay?: number; mr?: string;
}) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (autoHoverDelay === undefined) return;
    const PERIOD = 6000;
    let intervalId: ReturnType<typeof setInterval>;
    let offId: ReturnType<typeof setTimeout>;

    const pulse = () => {
      setHovered(true);
      offId = setTimeout(() => setHovered(false), 450);
    };

    const initialId = setTimeout(() => {
      pulse();
      intervalId = setInterval(pulse, PERIOD);
    }, autoHoverDelay);

    return () => {
      clearTimeout(initialId);
      clearTimeout(offId);
      clearInterval(intervalId);
    };
  }, [autoHoverDelay]);

  return (
    <motion.span
      className={cls || undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'inline-block', position: 'relative', cursor: 'default', marginRight: mr }}
    >
      {/* Base letter */}
      <span style={{
        display: 'block',
        color: hovered ? 'rgba(96,165,250,0.15)' : 'rgba(96,165,250,0.12)',
        WebkitTextStroke: hovered ? '0.5px rgba(96,165,250,0.9)' : '0.5px rgba(96,165,250,0.5)',
        filter: hovered
          ? 'drop-shadow(0 0 1px rgba(96,165,250,0.95)) drop-shadow(0 0 10px rgba(147,197,253,0.55))'
          : 'drop-shadow(0 0 1px rgba(96,165,250,0.8)) drop-shadow(0 0 18px rgba(147,197,253,0.35))',
        transition: 'color 0.3s ease, filter 0.3s ease, -webkit-text-stroke-color 0.3s ease',
      }}>
        {char}
      </span>
      {/* Gradient-from-bottom overlay, clipped to the letter shape */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          background: 'linear-gradient(to top, rgba(96,165,250,0.55) 0%, rgba(96,165,250,0.15) 35%, transparent 50%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {char}
      </span>
    </motion.span>
  );
}

function H1RandomReveal() {
  const totalLine1 = H1_BEFORE.length + H1_YOU.length + H1_AFTER.length;

  const delays1 = useMemo(
    () => Array.from({ length: totalLine1 }, () => 0.1 + Math.random() * 0.9),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const delays2 = useMemo(
    () => Array.from({ length: H1_LINE2.length }, () => 0.1 + Math.random() * 0.9),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const youStart = H1_BEFORE.length;

  return (
    <h1 className="font-serif font-normal text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05] tracking-[-0.01em] text-zinc-900 max-w-3xl text-center">
      {/* Line 1 */}
      <RandomChars text={H1_BEFORE} delays={delays1} offset={0} />

      {/* "You" — glowing letters with hover gradient sweep + one-time wave */}
      {H1_YOU.split('').map((char, i) => (
        <GlowChar
          key={i}
          char={char}
          delay={delays1[youStart + i]}
          cls="font-sans font-bold"
          autoHoverDelay={1800 + i * 150}
          mr={i === 0 ? '-3px' : '0px'}
        />
      ))}

      <RandomChars text={H1_AFTER} delays={delays1} offset={youStart + H1_YOU.length} />

      <br />

      {/* Line 2 */}
      <RandomChars text={H1_LINE2} delays={delays2} offset={0} />
    </h1>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const gradientVisible = useSyncExternalStore(gradientStore.subscribe, gradientStore.get, gradientStore.get);

  // Shared refs read by the gradient's RAF loop each frame — no re-renders
  const liveColorsRef = useRef<string[]>([...DUSK]);
  const liveGapRef = useRef<number>(200);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    // Colors: dusk → sunset
    liveColorsRef.current = DUSK.map((dusk, i) =>
      lerpColor(dusk, SUNSET[i], progress)
    );
    // Gap: 200 → 60 — white center shrinks inward as colors close in
    liveGapRef.current = 200 - progress * 140;
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-between overflow-hidden"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Animated gradient — scroll-driven, toggleable */}
      {gradientVisible && (
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <AnimatedGradientBackground liveColorsRef={liveColorsRef} liveGapRef={liveGapRef} />
        </div>
      )}

      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
        <PastelSquareGridBackground />
      </div>

      {/* ── Center block ── */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center flex-1 px-8 text-center gap-16 pt-32 pb-16">

        {/* H1 — random per-letter fade in */}
        <H1RandomReveal />

        {/* CTA — delayed until H1 letters finish */}
        <motion.div {...fadeUp(1.8)}>
          <a
            href="#discover"
            className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98] px-5 py-2.5 text-[16px] font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] font-sans"
          >
            Lets Discover You
            <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Bottom black fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }}
        aria-hidden="true"
      />

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.75, ease }}
        className="relative z-10 flex flex-col items-center gap-2 pb-10"
      >
        <span className="text-[16px] text-zinc-400 font-sans">
          Scroll Down to Explore
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <GlobeHemisphereWest weight="light" className="w-5 h-5 text-zinc-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
