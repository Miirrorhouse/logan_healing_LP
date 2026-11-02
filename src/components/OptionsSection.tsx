import { motion, useInView } from 'framer-motion';
import { Fragment, useRef, useMemo, useState, useEffect } from 'react';
import { ArrowDown, ArrowUp } from '@phosphor-icons/react';

const ease = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease },
};

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

function RandomRevealHeading({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const delays = useMemo(
    () => text.split('').map(() => 0.05 + Math.random() * 0.7),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  // Group chars by word so lines wrap between words and stay centered
  let charIndex = 0;
  const words = text.split(' ').map((word) => {
    const start = charIndex;
    charIndex += word.length + 1;
    return { word, start };
  });
  return (
    <h2 ref={ref} className={className} style={style}>
      {words.map(({ word, start }, w) => (
        <Fragment key={w}>
          <span className="whitespace-nowrap">
            {word.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: delays[start + i], ease: [0.32, 0.72, 0, 1] }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {w < words.length - 1 && ' '}
        </Fragment>
      ))}
    </h2>
  );
}

const CYCLE_MS = 5000;

function StatArrow({ trend, isActive }: { trend: 'up' | 'down'; isActive: boolean }) {
  return (
    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
      <div className="absolute inset-0 rounded-full" style={{ backgroundColor: 'rgba(13,27,62,0.08)' }} />
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 36 36"
        aria-hidden="true"
      >
        <motion.circle
          key={isActive ? 'active' : 'idle'}
          cx="18" cy="18" r="15"
          fill="none"
          stroke="#bf9b4f"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: isActive ? CYCLE_MS / 1000 : 0, ease: 'linear' }}
        />
      </svg>
      <span className="relative z-10" style={{ color: 'rgba(13,27,62,0.7)' }}>
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
      className="relative py-24 md:py-32 px-6 sm:px-8"
      style={{ backgroundColor: '#f5f0e6' }}
      aria-labelledby="options-heading"
    >
      <div className="max-w-[1300px] mx-auto">
        {/* Why energy healing callout */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mb-20 md:mb-28 rounded-2xl p-10 md:p-14 text-center max-w-4xl mx-auto"
          style={{ backgroundColor: '#0d1b3e' }}
        >
          <h3 className="font-serif text-3xl md:text-4xl mb-6" style={{ color: '#f5f0e6' }}>
            The mind can only reach so far.
          </h3>
          <div className="w-16 h-px mx-auto mb-6" style={{ backgroundColor: '#bf9b4f' }} />
          <p
            className="font-sans font-light max-w-2xl mx-auto leading-relaxed mb-4"
            style={{ color: 'rgba(245,240,230,0.75)' }}
          >
            You're not just a mind. You're energy, spirit, and soul. Some things live in the body, in
            the nervous system, in the soul, and no amount of logic can touch them.
          </p>
          <p
            className="font-sans font-light max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(245,240,230,0.75)' }}
          >
            Energy healing isn't a replacement for the work you've already done. It's what clears what
            the mind can't reach. If you've done all the work and still feel stuck, you're not broken,
            but it is time to break the glass ceiling and transcend the mind.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center text-center mb-12 md:mb-16"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
        >
          <span className="mb-5 inline-block rounded-full px-4 py-1.5 font-sans text-[16px] font-medium" style={{ backgroundColor: 'rgba(13,27,62,0.06)', color: 'rgba(13,27,62,0.55)' }}>
            Our options
          </span>
          <RandomRevealHeading
            text="Reconnect With What's Already Within You"
            className="font-serif font-normal text-[clamp(2.5rem,5.5vw,3.75rem)] leading-[1.08] tracking-[-0.02em] max-w-2xl mb-8 text-center"
            style={{ color: '#12182e' }}
          />

          <p className="font-sans font-normal text-[16px] leading-relaxed max-w-xl" style={{ color: 'rgba(18,24,46,0.6)' }}>
            There's a part of you that exists beyond the fear, doubt, and stories you've collected throughout your life. Healing is about creating the space to reconnect with that part of yourself. To find your center again and begin living from a place of greater awareness, trust, and intention.
          </p>
        </motion.div>

        <motion.div
          className="text-center mt-10 mb-8 md:mt-12 md:mb-10"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
        >
          <p className="font-sans text-[13px] md:text-sm" style={{ color: 'rgba(13,27,62,0.45)' }}>
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
                i > 0 ? 'lg:border-l lg:border-[#0d1b3e]/10' : ''
              }`}
            >
              <div className={`flex flex-row items-center gap-3 justify-center lg:justify-start mb-4 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${activeIndex === i ? 'opacity-100' : 'opacity-40'}`}>
                <div className="flex items-center gap-1">
                  <span className="font-sans font-normal text-[48px] leading-none tracking-tight" style={{ color: '#12182e' }}>
                    {stat.number}
                  </span>
                  {stat.suffix && (
                    <span className="font-sans font-normal text-[24px] leading-none tracking-tight self-center" style={{ color: '#12182e' }}>
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <StatArrow trend={stat.trend} isActive={activeIndex === i} />
              </div>
              <p className={`font-sans text-[16px] leading-relaxed max-w-[260px] mx-auto lg:mx-0 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${activeIndex === i ? 'opacity-100' : 'opacity-40'}`} style={{ color: 'rgba(18,24,46,0.6)' }}>
                {stat.copy}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
