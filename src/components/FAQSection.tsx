import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from '@phosphor-icons/react';

const ease = [0.32, 0.72, 0, 1] as const;

// Palette — elevated Organic Earth & Luminous Aura
const CREAM = '#f5f0e6';
const NAVY = '#0d1b3e';
const INK = '#12182e';
const GOLD = '#bf9b4f';
const BODY = 'rgba(18,24,46,0.62)';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const faqs = [
  {
    q: 'Do I need to believe in energy healing for it to work?',
    a: "Not at all. Energy healing works with the body's own innate intelligence — your belief is welcome but not required. Many people arrive skeptical and find that their direct experience becomes its own answer. An open curiosity is all that is needed.",
  },
  {
    q: 'What does an energy session actually feel like?',
    a: 'Most people describe a deep sense of relaxation, warmth, or tingling during the session. Some notice emotional waves, vivid imagery, or simply a quiet stillness. Others feel very little in the moment and notice the shifts in the days that follow. Every experience is valid and individual.',
  },
  {
    q: 'How many sessions will I need?',
    a: 'This varies widely depending on your intentions and what you are working through. Some people experience a meaningful shift in a single session. Others choose to work in series over weeks or months. We will explore what feels right together during your consultation.',
  },
  {
    q: 'Is energy healing a replacement for medical treatment?',
    a: "Energy healing is a complementary practice and is not intended to replace conventional medical care. It works beautifully alongside medical treatment, supporting the body's natural healing processes, reducing stress, and strengthening the energetic field that underlies physical health.",
  },
  {
    q: 'How do distance healing sessions work?',
    a: 'Energy is not bound by physical location. Distance sessions are conducted over a scheduled call or in silence at a mutually agreed time. Many clients find remote sessions equally — and sometimes more — powerful than in-person work, as the relaxed setting of home deepens the receptive state.',
  },
  {
    q: 'What should I do to prepare for my session?',
    a: 'Wear comfortable, loose clothing. Avoid heavy meals in the hour before your session. Come with an intention — even a simple one such as "I am open to what needs to shift." Hydrating well beforehand is also encouraged.',
  },
  {
    q: 'What is your cancellation policy?',
    a: "I ask for at least 24 hours' notice for cancellations or rescheduling. This allows me to offer the time to someone else who may need it. Life happens — please reach out as soon as you know and we will find a solution together.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
      className="border-b"
      style={{ borderColor: 'rgba(18,24,46,0.12)' }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="group w-full flex items-start justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf9b4f]/60 focus-visible:ring-offset-2"
        aria-expanded={open}
      >
        <span
          className="font-serif text-base md:text-lg leading-snug transition-colors duration-300"
          style={{ color: INK }}
        >
          {q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-300"
          style={{ backgroundColor: 'rgba(13,27,62,0.08)' }}
        >
          {open ? (
            <Minus size={13} weight="bold" style={{ color: NAVY }} />
          ) : (
            <Plus size={13} weight="bold" style={{ color: NAVY }} />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-sans font-light text-sm leading-relaxed" style={{ color: BODY }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-32 px-6 sm:px-8" style={{ backgroundColor: CREAM }}>
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-14">
          <p
            className="font-sans text-[12px] font-semibold uppercase tracking-[0.3em] mb-4"
            style={{ color: GOLD }}
          >
            Common Questions
          </p>
          <h2
            className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ color: INK }}
          >
            Frequently Asked
          </h2>
          <p className="font-serif italic text-lg max-w-xl mx-auto" style={{ color: NAVY }}>
            Everything you need to know before beginning your healing journey
          </p>
          <div
            className="w-20 h-px mx-auto mt-6"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(191,155,79,0.6), transparent)',
            }}
          />
        </motion.div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((item, i) => (
            <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="font-sans font-light mb-4" style={{ color: BODY }}>
            Still have questions?
          </p>
          <a
            href="#contact"
            className="font-serif italic text-lg underline underline-offset-4 transition-colors duration-300 hover:opacity-70"
            style={{ color: NAVY }}
          >
            Send me a message
          </a>
        </motion.div>
      </div>
    </section>
  );
}
