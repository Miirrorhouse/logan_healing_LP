import { motion, useInView } from 'framer-motion';
import { useRef, useMemo, useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, ArrowUp } from '@phosphor-icons/react';
import PastelSquareGridBackground from './PastelSquareGridBackground';

const ease = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease },
};

const offerings = [
  {
    tag: 'Delightful',
    tagClass: 'text-sky-300',
    title: 'Full Life Activation',
    href: '#service',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #38bdf8 100%)',
    video: '/videos/full_activation.mov',
    ariaLabel: 'Full Life Activation — learn more',
  },
  {
    tag: 'Supercharged',
    tagClass: 'text-emerald-300',
    title: 'Spirit Activation',
    href: '#service',
    gradient: 'linear-gradient(135deg, #052e1a 0%, #14532d 50%, #22c55e 100%)',
    video: '/videos/spirit_activation.mov',
    ariaLabel: 'Spirit Activation — learn more',
  },
];

const stats = [
  {
    number: '94', suffix: '%',
    trend: 'up' as const,
    copy: 'Of participants report a clearer sense of self after the opening arc of work together.',
  },
  {
    number: '8', suffix: ' wks',
    trend: 'down' as const,
    copy: 'Typical window before clients notice a steady shift in how they meet each day.',
  },
  {
    number: '1:1', suffix: '',
    trend: 'up' as const,
    copy: 'Tailored sessions—your story leads, not a script or generic workbook path.',
  },
  {
    number: '100', suffix: '%',
    trend: 'down' as const,
    copy: 'Confidential space held for whatever you bring; nothing watered down for optics.',
  },
];

function RandomRevealHeading({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const delays = useMemo(
    () => text.split('').map(() => 0.05 + Math.random() * 0.7),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <h2 ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: delays[i], ease: [0.32, 0.72, 0, 1] }}
          style={{ display: 'inline', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </h2>
  );
}

const CYCLE_MS = 5000;

function StatArrow({ trend, isActive }: { trend: 'up' | 'down'; isActive: boolean }) {
  return (
    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-zinc-100" />
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 36 36"
        aria-hidden="true"
      >
        <motion.circle
          key={isActive ? 'active' : 'idle'}
          cx="18" cy="18" r="15"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: isActive ? CYCLE_MS / 1000 : 0, ease: 'linear' }}
        />
      </svg>
      <span className="relative z-10 text-zinc-900">
        {trend === 'up'
          ? <ArrowUp className="w-4 h-4" weight="bold" />
          : <ArrowDown className="w-4 h-4" weight="bold" />}
      </span>
    </div>
  );
}

export default function OptionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = (fromIndex?: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (fromIndex !== undefined) setActiveIndex(fromIndex);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, CYCLE_MS);
  };

  useEffect(() => {
    startCycle();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section
      id="discover"
      className="relative bg-white text-zinc-900 py-24 md:py-32 px-6 sm:px-8"
      aria-labelledby="options-heading"
    >
      <div className="max-w-[1300px] mx-auto">
        <motion.div
          className="flex flex-col items-center text-center mb-24 md:mb-32"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
        >
          <span className="mb-5 inline-block rounded-full bg-zinc-100 px-4 py-1.5 font-sans text-[16px] font-medium text-zinc-500">
            Our options
          </span>
          <RandomRevealHeading
            text="Where your deepest work takes root"
            className="font-serif font-normal text-zinc-800 text-[clamp(2.5rem,5.5vw,3.75rem)] leading-[1.08] tracking-[-0.02em] max-w-2xl mb-8 text-center"
          />

          <p className="font-sans font-normal text-zinc-500 text-[16px] leading-relaxed max-w-xl">
            Ten kilograms lighter. Breath in the belly. Shoulders that finally let go — and a quiet sense that you're no longer at war with where you are.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-20 md:mb-28">
          {offerings.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-[8px] aspect-[640/463] flex flex-col justify-start p-8 md:p-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-[0.99] transition-transform duration-200"
              style={{ background: item.gradient }}
              aria-label={item.ariaLabel}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.12 + i * 0.08, ease }}
            >
              {item.video && (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={item.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
              )}

              {/* Dark overlay — fades out on hover */}
              <span className="absolute inset-0 bg-black/30 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-0 pointer-events-none" aria-hidden="true" />

              {/* Top gradient — fades in on hover to protect text legibility */}
              <span className="absolute inset-x-0 top-0 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)' }} aria-hidden="true" />

              {/* Square grid overlay — fades out on hover */}
              <span className="absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <PastelSquareGridBackground className="absolute inset-0 h-full w-full pointer-events-none mix-blend-screen opacity-60" />
              </span>

              {/* Top row: eyebrow + title */}
              <div className="relative z-10 flex flex-col gap-1">
                <span className={`font-mono text-[12px] md:text-[13px] tracking-wide uppercase ${item.tagClass}`}>
                  {item.tag}
                </span>
                <h3 className="font-sans font-normal text-white text-[clamp(1.3rem,2.5vw,1.875rem)] leading-tight max-w-[18ch]">
                  {item.title}
                </h3>
              </div>

              {/* Book A Session CTA — appears on hover, bottom left */}
              <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10 z-10">
                <span
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-sans text-[14px] font-medium text-zinc-900 opacity-0 translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100 group-hover:translate-y-0"
                >
                  Book A Session
                  <ArrowRight className="w-3.5 h-3.5" weight="regular" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="text-center mt-10 mb-8 md:mt-12 md:mb-10"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
        >
          <p className="font-sans text-[13px] md:text-sm text-zinc-500">
            Why this works
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease }}
              onClick={() => startCycle(i)}
              onMouseEnter={() => startCycle(i)}
              className={`group relative px-2 sm:px-4 lg:px-8 text-center lg:text-left cursor-pointer ${
                i > 0 ? 'lg:border-l lg:border-zinc-200' : ''
              }`}
            >
              <div className={`flex flex-row items-center gap-3 justify-center lg:justify-start mb-4 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${activeIndex === i ? 'opacity-100' : 'opacity-40'}`}>
                <div className="flex items-center gap-1">
                  <span className="font-sans font-normal text-zinc-800 text-[48px] leading-none tracking-tight">
                    {stat.number}
                  </span>
                  {stat.suffix && (
                    <span className="font-sans font-normal text-zinc-800 text-[24px] leading-none tracking-tight self-center">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <StatArrow trend={stat.trend} isActive={activeIndex === i} />
              </div>
              <p className={`font-sans text-[16px] leading-relaxed text-zinc-500 max-w-[260px] mx-auto lg:mx-0 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${activeIndex === i ? 'opacity-100' : 'opacity-40'}`}>
                {stat.copy}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
