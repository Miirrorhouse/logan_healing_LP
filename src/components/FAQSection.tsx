import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from '@phosphor-icons/react';

const ease = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const faqs = [
  {
    q: 'Do I need to believe in energy healing for it to work?',
    a: 'Not at all. Energy healing works with the body\'s own innate intelligence — your belief is welcome but not required. Many people arrive skeptical and find that their direct experience becomes its own answer. An open curiosity is all that is needed.',
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
    a: 'Energy healing is a complementary practice and is not intended to replace conventional medical care. It works beautifully alongside medical treatment, supporting the body\'s natural healing processes, reducing stress, and strengthening the energetic field that underlies physical health.',
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
    a: 'I ask for at least 24 hours\' notice for cancellations or rescheduling. This allows me to offer the time to someone else who may need it. Life happens — please reach out as soon as you know and we will find a solution together.',
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
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        aria-expanded={open}
      >
        <span className="font-sans text-[17px] font-medium leading-snug" style={{ color: '#f0ebe0' }}>
          {q}
        </span>
        <span className="shrink-0 mt-0.5" style={{ color: 'rgba(240,235,224,0.45)' }}>
          {open ? <Minus weight="regular" className="w-5 h-5" /> : <Plus weight="regular" className="w-5 h-5" />}
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
            <p className="pb-6 font-sans text-[16px] leading-relaxed max-w-2xl" style={{ color: 'rgba(240,235,224,0.6)' }}>
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
    <section className="py-24 md:py-32 px-6 sm:px-8" style={{ backgroundColor: '#0d1b3e' }}>
      <div className="max-w-[1300px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">

          {/* Left — heading */}
          <div className="lg:sticky lg:top-28 self-start">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, ease }}
              className="inline-block rounded-full px-4 py-1.5 mb-5"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <span className="font-sans text-[16px] font-medium" style={{ color: 'rgba(240,235,224,0.55)' }}>
                FAQ
              </span>
            </motion.div>

            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.65, ease, delay: 0.05 }}
              className="font-serif font-normal text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em] mb-6"
              style={{ color: '#f0ebe0' }}
            >
              Everything you need to know before beginning your healing journey.
            </motion.h2>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.55, ease, delay: 0.1 }}
              className="font-sans text-[16px] leading-relaxed"
              style={{ color: 'rgba(240,235,224,0.5)' }}
            >
              Still have questions? I would love to hear from you — reach out and I will respond within 24 hours.
            </motion.p>
          </div>

          {/* Right — accordion */}
          <div>
            {faqs.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
