import { motion } from 'framer-motion';

const ease = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const testimonials = [
  {
    quote: 'I came to Logan carrying years of grief I didn\'t know how to put down. By the third session something had genuinely shifted. I felt lighter in a way I can\'t fully explain — like a weight I\'d forgotten I was holding had finally been set down.',
    name: 'Sarah M.',
    detail: 'Soul Retrieval & Aura Clearing',
  },
  {
    quote: 'The Spark of Life remote session was just as powerful as being in the room. Logan\'s presence — even across the miles — created a container of safety and depth I hadn\'t expected. The days following were noticeably different.',
    name: 'James T.',
    detail: 'Spark of Life Healing (Remote)',
  },
  {
    quote: 'The sessions were transformative. Each one built on the last, and by the end I felt like a completely different person — more grounded, more present, more myself. I cannot recommend Logan highly enough.',
    name: 'Rachel K.',
    detail: 'Full Life Activation Series',
  },
  {
    quote: 'The Tree of Life Awakening was unlike anything I\'ve ever experienced. There are no adequate words for what moved through me. I left feeling connected to something ancient and deeply familiar at the same time.',
    name: 'Marcus D.',
    detail: 'Tree of Life Awakening',
  },
  {
    quote: 'After my Soul Retrieval session, I noticed a significant shift in my anxiety levels. Old patterns that had plagued me for years began to loosen. Logan\'s skill and care throughout the process was extraordinary.',
    name: 'Priya N.',
    detail: 'Soul Retrieval',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 px-6 sm:px-8" style={{ backgroundColor: '#f0ebe0' }}>
      <div className="max-w-[1300px] mx-auto">

        {/* Header */}
        <div className="mb-14 md:mb-20">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, ease }}
            className="inline-block rounded-full px-4 py-1.5 mb-5"
            style={{ backgroundColor: '#e4ddd0' }}
          >
            <span className="font-sans text-[16px] font-medium" style={{ color: 'rgba(13,27,62,0.5)' }}>
              Voices of Transformation
            </span>
          </motion.div>

          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.65, ease, delay: 0.05 }}
            className="font-serif font-normal text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em] max-w-xl"
            style={{ color: '#0d1b3e' }}
          >
            Real experiences from those who have walked this path.
          </motion.h2>
        </div>

        {/* Featured large testimonial */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
          className="rounded-[8px] p-8 md:p-12 mb-6"
          style={{ backgroundColor: '#0d1b3e' }}
        >
          <p className="font-serif italic text-[clamp(1.15rem,2.2vw,1.5rem)] leading-relaxed mb-8 max-w-3xl" style={{ color: '#f0ebe0' }}>
            "{testimonials[2].quote}"
          </p>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full flex items-center justify-center text-[13px] font-medium font-sans" style={{ backgroundColor: 'rgba(240,235,224,0.12)', color: '#f0ebe0' }}>
              {testimonials[2].name.charAt(0)}
            </div>
            <div>
              <p className="font-sans text-[15px] font-medium" style={{ color: '#f0ebe0' }}>{testimonials[2].name}</p>
              <p className="font-sans text-[13px]" style={{ color: 'rgba(240,235,224,0.5)' }}>{testimonials[2].detail}</p>
            </div>
          </div>
        </motion.div>

        {/* Grid of remaining testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[testimonials[0], testimonials[1], testimonials[3], testimonials[4]].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease, delay: 0.05 + i * 0.07 }}
              className="rounded-[8px] p-6 md:p-8 flex flex-col justify-between gap-6"
              style={{ backgroundColor: '#e8e1d4' }}
            >
              <p className="font-serif italic text-[1.05rem] leading-relaxed" style={{ color: '#0d1b3e' }}>
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-full flex items-center justify-center text-[12px] font-medium font-sans" style={{ backgroundColor: '#0d1b3e', color: '#f0ebe0' }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-sans text-[14px] font-medium" style={{ color: '#0d1b3e' }}>{t.name}</p>
                  <p className="font-sans text-[13px]" style={{ color: 'rgba(13,27,62,0.45)' }}>{t.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
