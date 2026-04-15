import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const ease = [0.32, 0.72, 0, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, delay, ease },
});

const H1_BEFORE = 'Finally meet ';
const H1_YOU    = 'You';
const H1_AFTER  = ',';
const H1_LINE2  = 'Beyond the Programming.';

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
      style={{ display: 'inline-block', position: 'relative', cursor: 'default', marginRight: mr }}
    >
      {/* Base letter */}
      <span style={{
        display: 'block',
        color: hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.14)',
        WebkitTextStroke: hovered ? '0.5px rgba(147,197,253,0.95)' : '0.5px rgba(147,197,253,0.6)',
        filter: hovered
          ? 'drop-shadow(0 0 2px rgba(147,197,253,1)) drop-shadow(0 0 12px rgba(147,197,253,0.65))'
          : 'drop-shadow(0 0 1px rgba(147,197,253,0.85)) drop-shadow(0 0 20px rgba(147,197,253,0.4))',
        transition: 'color 0.3s ease, filter 0.3s ease, -webkit-text-stroke-color 0.3s ease',
      }}>
        {char}
      </span>
      {/* Gradient-from-bottom overlay */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          background: 'linear-gradient(to top, rgba(147,197,253,0.65) 0%, rgba(147,197,253,0.2) 35%, transparent 50%)',
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

// Line 1 word splits (H1_BEFORE = 'Finally meet ', 13 chars)
const W1_A = 'Finally '; // chars 0–7
const W1_B = 'meet ';   // chars 8–12
// H1_YOU = 'You' starts at index 13, H1_AFTER = ',' at 16

// Line 2 word splits (H1_LINE2 = 'Beyond the Programming.', 23 chars)
const W2_A = 'Beyond ';       // chars 0–6
const W2_B = 'the ';          // chars 7–10
const W2_C = 'Programming.';  // chars 11–22

function H1RandomReveal({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
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
    <h1 className="font-serif font-normal text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05] tracking-[-0.01em] text-white max-w-3xl text-center">
      {/* Line 1 */}
      <WordExit scrollYProgress={scrollYProgress} start={0.00}>
        <RandomChars text={W1_A} delays={delays1} offset={0} />
      </WordExit>
      <WordExit scrollYProgress={scrollYProgress} start={0.03}>
        <RandomChars text={W1_B} delays={delays1} offset={8} />
      </WordExit>
      <WordExit scrollYProgress={scrollYProgress} start={0.01}>
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
      </WordExit>

      <br />

      {/* Line 2 */}
      <WordExit scrollYProgress={scrollYProgress} start={0.04}>
        <RandomChars text={W2_A} delays={delays2} offset={0} />
      </WordExit>
      <WordExit scrollYProgress={scrollYProgress} start={0.02}>
        <RandomChars text={W2_B} delays={delays2} offset={7} />
      </WordExit>
      <WordExit scrollYProgress={scrollYProgress} start={0.05}>
        <RandomChars text={W2_C} delays={delays2} offset={11} />
      </WordExit>
    </h1>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };
    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, []);
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
        <video
          ref={heroVideoRef}
          src="/videos/healing_hero_vid.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
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
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center gap-10 px-8 pt-32 pb-16 w-full max-w-[1300px] mx-auto">
        <motion.div style={{ y: h1Y, willChange: 'transform' }}>
          <H1RandomReveal scrollYProgress={scrollYProgress} />
        </motion.div>

        <motion.div {...fadeUp(1.8)}>
          <a
            href="#discover"
            className="group inline-flex items-center gap-2 rounded-full active:scale-[0.98] px-5 py-2.5 text-[16px] font-medium font-sans transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{ backgroundColor: '#f0ebe0', color: '#0d1b3e' }}
          >
            Lets Discover You
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105"
              style={{ backgroundColor: 'rgba(13,27,62,0.12)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="#0d1b3e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
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
