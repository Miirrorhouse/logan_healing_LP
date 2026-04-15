import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

const ease = [0.32, 0.72, 0, 1] as const;

const feelings = [
  {
    label: 'Anxious',
    heading: 'Your nervous system has been holding so much.',
    body: 'Anxiety is often the body\'s signal that something deeper needs tending. Through Aura Clearing and Energetic Emotional Clearing, we release the charge stored in your field — so your system can finally exhale.',
    service: 'Aura Clearing',
  },
  {
    label: 'Not Enough',
    heading: 'That voice isn\'t yours — and it can be returned.',
    body: 'The "not enough" story is one of the most common imprints we carry from others. Soul Retrieval helps reclaim the parts of you that went quiet to survive. What comes back is steadier, fuller, yours.',
    service: 'Soul Retrieval',
  },
  {
    label: 'Nervous',
    heading: 'Nervousness is energy without a home.',
    body: 'When your chakras are misaligned, even small moments can feel overwhelming. Chakra Awakening brings your energy centers back into coherence — so you move through life with ground beneath you.',
    service: 'Chakra Awakening',
  },
  {
    label: 'Self-Critical',
    heading: 'The inner critic is a cord — and it can be cut.',
    body: 'That relentless internal voice is often not even your own. Cord Cutting severs the energetic ties that feed self-criticism and self-doubt, returning you to a quieter, kinder relationship with yourself.',
    service: 'Cord Cutting',
  },
  {
    label: 'Low Self-Worth',
    heading: 'Your worth was never something you lost.',
    body: 'Low self-worth usually traces back to early imprints, not truth. The Tree of Life Awakening reconnects you to your original nature — the self that exists before the conditioning told you otherwise.',
    service: 'Tree of Life Awakening',
  },
  {
    label: 'Disconnected',
    heading: 'Feeling distant from yourself is more common than you know.',
    body: 'Disconnection often means a part of you stepped away to cope. The Full Life Activation brings you back into contact with your own presence — body, spirit, and sense of direction included.',
    service: 'Full Life Activation',
  },
];

export default function FeelingsSection() {
  const [active, setActive] = useState(0);
  const pillsRef = useRef<HTMLDivElement>(null);
  const pillsInView = useInView(pillsRef, { once: false, margin: '-35% 0px -35% 0px' });

  return (
    <section
      className="relative w-full px-6 sm:px-8 py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Radial gradient — pulses in when pills reach viewport center */}
      <motion.div
        aria-hidden="true"
        animate={pillsInView
          ? { opacity: [0, 0.18, 0.11], scale: [0.9, 1.06, 1] }
          : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 3.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 55% at 50% 58%, rgba(147,197,253,1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-[720px] mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease }}
          className="mb-10 md:mb-12 text-center"
        >
          <h2 className="font-serif font-normal text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.08] tracking-[-0.02em] mb-3" style={{ color: '#f0ebe0' }}>
            What brings you here today?
          </h2>
          <p className="font-sans text-[16px] leading-relaxed" style={{ color: 'rgba(240,235,224,0.5)' }}>
            Choose what resonates. Every feeling is a doorway.
          </p>
        </motion.div>

        {/* Pills */}
        <motion.div
          ref={pillsRef}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.1, ease }}
          className="flex flex-col items-center gap-2.5 mb-8 md:mb-10"
        >
          {[feelings.slice(0, 3), feelings.slice(3)].map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-2.5">
              {row.map((f, i) => {
                const idx = rowIdx * 3 + i;
                return (
                  <button
                    key={f.label}
                    onClick={() => setActive(idx)}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-[15px] font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
                    style={
                      active === idx
                        ? { backgroundColor: '#f0ebe0', color: '#0d1b3e' }
                        : { backgroundColor: 'rgba(240,235,224,0.1)', color: 'rgba(240,235,224,0.6)' }
                    }
                  >
                    <span
                      className="text-[13px]"
                      style={{ color: active === idx ? 'rgba(13,27,62,0.4)' : 'rgba(240,235,224,0.35)' }}
                    >
                      +
                    </span>
                    {f.label}
                  </button>
                );
              })}
            </div>
          ))}
        </motion.div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-[16px]" style={{ backgroundColor: '#f0ebe0', minHeight: '180px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="flex flex-col sm:flex-row items-start gap-6 p-7 md:p-9"
            >
              {/* Accent bar */}
              <div
                className="hidden sm:block shrink-0 w-1 self-stretch rounded-full"
                style={{ backgroundColor: '#0d1b3e', opacity: 0.15 }}
              />

              {/* Text */}
              <div className="flex flex-col gap-3 flex-1">
                <div className="inline-flex">
                  <span
                    className="font-mono text-[11px] tracking-widest uppercase rounded-full px-3 py-1"
                    style={{ backgroundColor: 'rgba(13,27,62,0.07)', color: 'rgba(13,27,62,0.5)' }}
                  >
                    {feelings[active].service}
                  </span>
                </div>
                <h3 className="font-serif font-normal text-[clamp(1.2rem,2.2vw,1.6rem)] leading-[1.2] tracking-[-0.01em]" style={{ color: '#0d1b3e' }}>
                  {feelings[active].heading}
                </h3>
                <p className="font-sans text-[15px] leading-relaxed max-w-2xl" style={{ color: 'rgba(13,27,62,0.55)' }}>
                  {feelings[active].body}
                </p>
                <a
                  href="#service"
                  className="inline-flex items-center gap-1.5 font-sans text-[14px] font-medium mt-1 transition-opacity duration-300 hover:opacity-70"
                  style={{ color: '#0d1b3e' }}
                >
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5" weight="regular" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
