import { motion } from 'framer-motion';
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

export default function OptionsSection() {
  return (
    <section
      id="discover"
      className="relative bg-white text-zinc-900 py-24 md:py-32 px-6 sm:px-8"
      aria-labelledby="options-heading"
    >
      <div className="max-w-[1300px] mx-auto">
        <motion.div
          className="flex flex-col items-center text-center mb-8 md:mb-10"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
        >
          <span className="mb-5 inline-block rounded-full bg-zinc-100 px-4 py-1.5 font-sans text-[16px] font-medium text-zinc-500">
            Our options
          </span>
          <h2
            id="options-heading"
            className="font-serif font-normal text-zinc-800 text-[clamp(2.5rem,5.5vw,3.75rem)] leading-[1.08] tracking-[-0.02em] max-w-2xl"
          >
            Where your deepest work takes root
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-20 md:mb-28">
          {offerings.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-[8px] aspect-[640/463] flex flex-col justify-start p-8 md:p-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-[0.99] transition-transform duration-200"
              style={{ background: item.gradient }}
              aria-label={item.ariaLabel}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.12 + i * 0.08 }}
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

              {/* Square grid overlay — fades out on hover */}
              <span className="absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <PastelSquareGridBackground className="absolute inset-0 h-full w-full pointer-events-none mix-blend-screen opacity-60" />
              </span>

              {/* Top row: eyebrow + title */}
              <div className="relative z-10 flex flex-col gap-1">
                <span className={`font-mono text-[12px] md:text-[13px] tracking-wide uppercase ${item.tagClass}`}>
                  {item.tag}
                </span>
                <h3 className="font-serif font-normal text-white text-[clamp(1.3rem,2.5vw,1.875rem)] leading-tight max-w-[18ch]">
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

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              className={`relative px-2 sm:px-4 lg:px-8 text-center lg:text-left ${
                i > 0 ? 'lg:border-l lg:border-zinc-200' : ''
              }`}
            >
              <div className="flex flex-row items-center gap-3 justify-center lg:justify-start mb-4">
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
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-900"
                  aria-hidden="true"
                >
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" weight="bold" />
                  ) : (
                    <ArrowDown className="w-4 h-4" weight="bold" />
                  )}
                </span>
              </div>
              <p className="font-sans text-[16px] leading-relaxed text-zinc-500 max-w-[260px] mx-auto lg:mx-0">
                {stat.copy}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 md:mt-24 flex justify-center"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
        >
          <span
            className="block h-0.5 w-12 rounded-full bg-[#2563eb]"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
