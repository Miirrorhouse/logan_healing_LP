import { motion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';

const ease = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const steps = [
  {
    number: '01',
    title: 'Free Consultation',
    body: 'Your first conversation is complimentary — a warm, unhurried space to explore whether energy healing is right for you at this moment in your life. No obligation, no pressure.',
  },
  {
    number: '02',
    title: 'Personalized Session Plan',
    body: 'Together we identify where you are, what is calling to be released, and which modalities will best support your unique journey. Every path is different.',
  },
  {
    number: '03',
    title: 'The Session',
    body: 'Sessions are conducted in person or remotely with the same depth and presence. You arrive, you are held, and the work moves through you at exactly the pace it needs to.',
  },
  {
    number: '04',
    title: 'Integration & Support',
    body: 'Healing continues between sessions. You will receive guidance for integration practices and I remain available for questions as the shifts settle into your daily life.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 md:py-32 px-6 sm:px-8" style={{ backgroundColor: '#0d1b3e' }}>
      <div className="max-w-[1300px] mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-24 mb-20 md:mb-28">

          {/* Left — heading block */}
          <div className="lg:max-w-sm lg:sticky lg:top-28">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, ease }}
              className="inline-block rounded-full px-4 py-1.5 mb-5"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <span className="font-sans text-[16px] font-medium" style={{ color: 'rgba(240,235,224,0.55)' }}>
                How It Works
              </span>
            </motion.div>

            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.65, ease, delay: 0.05 }}
              className="font-serif font-normal text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em] mb-6"
              style={{ color: '#f0ebe0' }}
            >
              A gentle, guided path from first contact to lasting transformation.
            </motion.h2>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.55, ease, delay: 0.1 }}
              className="font-sans text-[17px] leading-relaxed mb-8"
              style={{ color: 'rgba(240,235,224,0.55)' }}
            >
              The mind can only reach so far. Beneath it, something older waits — patient, precise, and ready when you are.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, ease, delay: 0.15 }}
              className="rounded-[8px] p-5"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="font-sans text-[14px] font-medium mb-1" style={{ color: '#f0ebe0' }}>
                Your first consultation is complimentary
              </p>
              <p className="font-sans text-[14px] leading-relaxed mb-4" style={{ color: 'rgba(240,235,224,0.5)' }}>
                A warm, unhurried conversation with no obligation — simply an exploration of whether this work is right for you.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[15px] font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                style={{ backgroundColor: '#f0ebe0', color: '#0d1b3e' }}
              >
                Schedule Free Consultation
                <ArrowUpRight weight="regular" className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right — steps */}
          <div className="flex-1 space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease, delay: i * 0.08 }}
                className="flex gap-6 py-8 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <span
                  className="font-mono text-[13px] shrink-0 pt-1 w-8"
                  style={{ color: 'rgba(240,235,224,0.25)' }}
                >
                  {step.number}
                </span>
                <div>
                  <h3
                    className="font-sans text-[20px] font-medium mb-2 leading-tight"
                    style={{ color: '#f0ebe0' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-sans text-[16px] leading-relaxed"
                    style={{ color: 'rgba(240,235,224,0.55)' }}
                  >
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
