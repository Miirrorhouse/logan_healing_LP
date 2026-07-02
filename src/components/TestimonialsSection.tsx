import { motion } from 'framer-motion';
import { Quotes } from '@phosphor-icons/react';

const ease = [0.32, 0.72, 0, 1] as const;

// Palette — elevated Organic Earth & Luminous Aura
const CREAM = '#f5f0e6';
const NAVY = '#0d1b3e';
const GOLD = '#bf9b4f';

const testimonials = [
  {
    name: 'Maya R.',
    location: 'San Francisco, CA',
    service: 'Life Activation',
    quote:
      "I came to Logan carrying years of grief I didn't know how to release. After just three sessions, I felt a lightness I hadn't experienced in a decade. He holds space with such depth and wisdom, I always leave feeling genuinely renewed.",
  },
  {
    name: 'James T.',
    location: 'Portland, OR',
    service: 'Chakra Awakening',
    quote:
      "As a skeptic, I wasn't sure what to expect. But the results were undeniable. My chronic shoulder tension dissolved in one session, and I slept deeply for the first time in months. Logan's intuition is remarkable.",
  },
  {
    name: 'Priya K.',
    location: 'New York, NY',
    service: 'Spark of Life Healing',
    quote:
      "The Spark of Life remote session was just as powerful as being in the room. Logan's ability to tune into what I needed, even across thousands of miles, was extraordinary. I felt the energy shift in real time.",
  },
  {
    name: 'Elena M.',
    location: 'Austin, TX',
    service: 'Full Spirit Activation',
    quote:
      'The sessions were transformative. Each one built on the last, and by the end I felt like a completely different person, more grounded, more present, more myself. I cannot recommend Logan highly enough.',
  },
  {
    name: 'David L.',
    location: 'Seattle, WA',
    service: 'Tree of Life Awakening',
    quote:
      "The Tree of Life Awakening was unlike anything I've experienced. It reached places that no therapy ever had. I left feeling profoundly peaceful, deeply rested, and more myself than I've felt in years.",
  },
  {
    name: 'Amara N.',
    location: 'Chicago, IL',
    service: 'Soul Retrieval',
    quote:
      "After my Soul Retrieval session, I noticed a significant shift in my anxiety levels. Old patterns that had plagued me for years began to loosen. Logan's skill and compassion are evident in every moment of the work.",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-sm" style={{ color: GOLD }}>
          ★
        </span>
      ))}
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 md:py-32 px-6 sm:px-8"
      style={{ backgroundColor: NAVY }}
    >
      {/* Orbs */}
      <div
        className="absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(196,160,160,0.07)' }}
      />
      <div
        className="absolute bottom-40 right-10 w-56 h-56 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(191,155,79,0.08)' }}
      />

      <div className="relative max-w-[1300px] mx-auto">
        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-14">
          <p
            className="font-sans text-[12px] font-semibold uppercase tracking-[0.3em] mb-4"
            style={{ color: GOLD }}
          >
            Client Stories
          </p>
          <h2
            className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ color: CREAM }}
          >
            Voices of Transformation
          </h2>
          <p
            className="font-serif italic text-lg max-w-xl mx-auto"
            style={{ color: 'rgba(245,240,230,0.7)' }}
          >
            Real experiences from those who have walked this path
          </p>
          <div
            className="w-20 h-px mx-auto mt-6"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(191,155,79,0.6), transparent)',
            }}
          />
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease, delay: i * 0.08 }}
              className="backdrop-blur-sm rounded-2xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(245,240,230,0.07)',
                border: '1px solid rgba(245,240,230,0.12)',
              }}
            >
              {/* Quote icon */}
              <Quotes size={28} weight="fill" className="mb-4" style={{ color: 'rgba(191,155,79,0.5)' }} />

              {/* Stars */}
              <StarRating />

              {/* Quote text */}
              <p
                className="font-serif italic text-base leading-relaxed my-4"
                style={{ color: 'rgba(245,240,230,0.88)' }}
              >
                "{t.quote}"
              </p>

              {/* Attribution */}
              <div className="pt-4" style={{ borderTop: '1px solid rgba(245,240,230,0.15)' }}>
                <p className="font-sans font-semibold text-sm" style={{ color: CREAM }}>
                  {t.name}
                </p>
                <p className="font-sans font-light text-xs" style={{ color: 'rgba(245,240,230,0.55)' }}>
                  {t.location}
                </p>
                <p
                  className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] mt-1"
                  style={{ color: GOLD }}
                >
                  {t.service}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
