import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const ease = [0.32, 0.72, 0, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, delay, ease },
});

const H1_BEFORE = 'The ';
const H1_GLOW   = 'Sacred';
const H1_LINE2  = 'Self';

// ease-in-out: slow start, fast middle, slow end
const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

function WordExit({ children, scrollYProgress, start = 0 }: {
  children: React.ReactNode;
  scrollYProgress: MotionValue<number>;
  start?: number;
}) {
  const end = start + 0.38;

  const opacity = useTransform(scrollYProgress, (p: number) => {
    if (p <= start) return 1;
    if (p >= end) return 0;
    return 1 - easeInOut((p - start) / (end - start));
  });

  const y = useTransform(scrollYProgress, (p: number) => {
    if (p <= start) return 0;
    if (p >= end) return -1000;
    return -1000 * easeInOut((p - start) / (end - start));
  });

  return (
    <motion.span style={{ opacity, y, display: 'inline-block', willChange: 'transform, opacity' }}>
      {children}
    </motion.span>
  );
}

function RandomChars({ text, delays, offset = 0 }: {
  text: string; delays: number[]; offset?: number;
}) {
  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span
          key={i + offset}
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
      style={{
        display: 'inline-block',
        cursor: 'default',
        marginRight: mr,
        WebkitTextStroke: hovered ? '0.5px rgba(191,155,79,1)' : '0.5px rgba(191,155,79,0.85)',
        backgroundImage: hovered
          ? 'linear-gradient(to top, rgba(191,155,79,1) 0%, rgba(191,155,79,0.85) 40%, rgba(255,255,255,0.5) 100%)'
          : 'linear-gradient(to top, rgba(191,155,79,0.85) 0%, rgba(191,155,79,0.5) 40%, rgba(255,255,255,0.35) 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        transition: 'background-image 0.3s ease, -webkit-text-stroke-color 0.3s ease',
      }}
    >
      {char}
    </motion.span>
  );
}

// Line 1: H1_BEFORE = 'The ' (chars 0–3), H1_GLOW = 'Sacred' starts at index 4
// Line 2: H1_LINE2 = 'Self' — italic serif, per reference

function H1RandomReveal({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const totalLine1 = H1_BEFORE.length + H1_GLOW.length;

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

  const glowStart = H1_BEFORE.length;

  return (
    <h1 className="font-serif font-normal text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05] tracking-[-0.01em] text-white max-w-3xl text-center">
      {/* Line 1 */}
      <WordExit scrollYProgress={scrollYProgress} start={0.00}>
        <RandomChars text={H1_BEFORE} delays={delays1} offset={0} />
      </WordExit>
      <WordExit scrollYProgress={scrollYProgress} start={0.01}>
        {H1_GLOW.split('').map((char, i) => (
          <GlowChar
            key={i}
            char={char}
            delay={delays1[glowStart + i]}
            cls="font-sans font-bold"
            autoHoverDelay={1800 + i * 150}
            mr={i === 0 ? '-3px' : '0px'}
          />
        ))}
      </WordExit>

      <br />

      {/* Line 2 */}
      <WordExit scrollYProgress={scrollYProgress} start={0.03}>
        <span className="italic">
          <RandomChars text={H1_LINE2} delays={delays2} offset={0} />
        </span>
      </WordExit>
    </h1>
  );
}

const HERO_VIDEO_LANDSCAPE = '/videos/hero_landscape.mp4';
const HERO_VIDEO_PORTRAIT  = '/videos/hero_portrait.mp4';

// Resolves after mount so only the matching cut is ever downloaded.
// Components are client:only, so there is no SSR pass to mismatch.
function useHeroVideoSrc() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)');
    const apply = () => setSrc(mq.matches ? HERO_VIDEO_PORTRAIT : HERO_VIDEO_LANDSCAPE);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return src;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroVideoSrc = useHeroVideoSrc();

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };
    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [heroVideoSrc]);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Video moves up slower than scroll (pulls back = deeper parallax)
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  // H1 moves up faster than the video, creating separation
  const h1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-between overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Background video with edge-fade mask — parallax layer */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          y: videoY,
          maskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 40%, transparent 100%)',
          zIndex: 0,
          willChange: 'transform',
        }}
      >
        {heroVideoSrc && (
          <video
            key={heroVideoSrc}
            ref={heroVideoRef}
            src={heroVideoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
        )}
      </motion.div>
      {/* Blue overlay with bottom gradient blend */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(13,27,62,0.55) 0%, rgba(13,27,62,0.45) 60%, #0d1b3e 100%)',
        }}
        aria-hidden="true"
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center gap-8 px-8 pt-32 pb-16 w-full max-w-[1300px] mx-auto">
        <motion.div style={{ y: h1Y, willChange: 'transform' }} className="flex flex-col items-center gap-6">
          <motion.p
            {...fadeUp(0.15)}
            className="font-sans text-[13px] font-medium uppercase tracking-[0.35em]"
            style={{ color: 'rgba(240,235,224,0.75)' }}
          >
            Welcome to
          </motion.p>
          <H1RandomReveal scrollYProgress={scrollYProgress} />
        </motion.div>

        <motion.p
          {...fadeUp(1.3)}
          className="font-sans text-[17px] md:text-[19px] leading-relaxed max-w-xl"
          style={{ color: 'rgba(255,255,255,0.8)' }}
        >
          Reconnect to your light and restore balance, peace and harmony by releasing what no longer serves you.
        </motion.p>

        <motion.div {...fadeUp(1.8)} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: '#bf9b4f', color: '#12182e' }}
          >
            Book Your Session
          </a>
          <a
            href="#services"
            className="inline-flex items-center rounded-full border px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/10 active:scale-[0.98]"
            style={{ borderColor: 'rgba(245,240,230,0.5)', color: '#f5f0e6' }}
          >
            Explore Services
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.75, ease }}
        className="relative z-10 flex flex-col items-center gap-0 pb-10 mb-[60px]"
      >
        <span className="text-[15px] font-sans" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Scroll Down to Explore
        </span>
      </motion.div>
    </section>
  );
}
