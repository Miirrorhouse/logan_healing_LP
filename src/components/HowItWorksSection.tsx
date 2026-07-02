import { motion } from 'framer-motion';
import { ChatCircle, CalendarCheck, Sparkle, Star } from '@phosphor-icons/react';

const ease = [0.32, 0.72, 0, 1] as const;

// Palette — faithful to the attached energy-healing "How It Works" section
const CREAM = '#f5f0e6';
const NAVY = '#0d1b3e';
const INK = '#12182e';
const GOLD = '#bf9b4f';
const BODY = 'rgba(18,24,46,0.62)';

interface Step {
  number: string;
  Icon: typeof ChatCircle;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    Icon: ChatCircle,
    title: 'Free Consultation',
    description:
      'We begin with a complimentary 15-minute call to discuss your intentions, any areas of concern, and which healing modality feels most aligned with your needs. There is no obligation, this is simply a space to connect and feel into the work.',
  },
  {
    number: '02',
    Icon: CalendarCheck,
    title: 'Book Your Session',
    description:
      'Choose a time that works for you and complete a brief intake form. This helps me prepare a session that is fully tailored to your unique energetic landscape. In-person sessions are held in my tranquil studio; distance sessions are conducted via video.',
  },
  {
    number: '03',
    Icon: Sparkle,
    title: 'Your Healing Session',
    description:
      'Arrive as you are. Each session begins with a grounding conversation, followed by the healing work itself. You will rest comfortably while I work with your energy field, using intuition, touch (or distance), and various healing tools to restore balance and flow.',
  },
  {
    number: '04',
    Icon: Star,
    title: 'Integration & Support',
    description:
      'After your session, we take time to share insights and discuss what arose. You will receive personalized aftercare guidance and, if desired, recommendations for continued practice. Ongoing support is available via email between sessions.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

export default function HowItWorksSection() {
  return (
    <section
      id="process"
      className="relative overflow-hidden py-24 md:py-32 px-6 sm:px-8"
      style={{ backgroundColor: CREAM }}
    >
      {/* Decorative blob */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none -translate-y-1/2"
        style={{ backgroundColor: 'rgba(191,155,79,0.08)' }}
      />

      <div className="relative max-w-[1300px] mx-auto">
        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-16">
          <p
            className="font-sans text-[12px] font-semibold uppercase tracking-[0.3em] mb-4"
            style={{ color: GOLD }}
          >
            Your Journey
          </p>
          <h2
            className="font-serif font-normal text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ color: INK }}
          >
            How It Works
          </h2>
          <p className="font-serif italic text-lg max-w-xl mx-auto" style={{ color: NAVY }}>
            A gentle, guided path from first contact to lasting transformation
          </p>
          <div className="w-20 h-px mx-auto mt-6" style={{ backgroundColor: GOLD }} />
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-8 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(191,155,79,0.4), transparent)',
            }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease, delay: i * 0.15 }}
                className="relative"
              >
                {/* Number + icon */}
                <div className="flex flex-col items-center mb-5">
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: NAVY }}
                    >
                      <step.Icon size={22} weight="light" style={{ color: CREAM }} />
                    </div>
                    <span
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: GOLD }}
                    >
                      <span className="font-sans text-[0.6rem] font-bold" style={{ color: INK }}>
                        {i + 1}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="text-center">
                  <p
                    className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] mb-2"
                    style={{ color: GOLD }}
                  >
                    Step {step.number}
                  </p>
                  <h3 className="font-serif text-xl mb-3" style={{ color: INK }}>
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: BODY }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Free consultation highlight */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-16 p-8 md:p-10 rounded-2xl text-center"
          style={{
            backgroundColor: 'rgba(13,27,62,0.05)',
            border: '1px solid rgba(13,27,62,0.15)',
          }}
        >
          <p
            className="font-sans text-[12px] font-semibold uppercase tracking-[0.3em] mb-3"
            style={{ color: GOLD }}
          >
            Begin Today
          </p>
          <h3 className="font-serif text-2xl md:text-3xl mb-3" style={{ color: INK }}>
            Your first consultation is complimentary
          </h3>
          <p className="font-sans max-w-lg mx-auto mb-6 leading-relaxed" style={{ color: BODY }}>
            There is no obligation, simply a warm, unhurried conversation to explore whether energy
            healing is right for you at this moment in your life.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3.5 rounded-full font-sans text-[12px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: NAVY, color: CREAM }}
          >
            Schedule Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
