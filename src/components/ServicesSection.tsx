import { motion } from 'framer-motion';
import { ArrowUpRight, Plug } from '@phosphor-icons/react';

const ease = [0.32, 0.72, 0, 1] as const;

const services = [
  { name: 'Soul Retrieval', color: '#c8bef3', pulseDuration: 4.2 },
  { name: 'Cord Cutting', color: '#a5b4fc', pulseDuration: 5.7 },
  { name: 'Aura Clearing', color: '#93c5fd', pulseDuration: 3.9 },
  { name: 'Energetic Emotional Clearing', color: '#b8c6f7', pulseDuration: 6.1 },
  { name: 'Tree of Life Awakening', color: '#c4bef5', pulseDuration: 4.8 },
  { name: 'Chakra Awakening', color: '#a8c4fb', pulseDuration: 5.3 },
  { name: 'Shamanic Aura Clearing', color: '#9ec8fd', pulseDuration: 3.6 },
  { name: '11th Codon Reading', color: '#ddd6f7', pulseDuration: 6.7 },
];

const blobs = [
  '#a5b4fc', '#2a2466', '#3f3f46', '#bae6fd',
  '#4338ca', '#6366f1', '#38bdf8', '#1e3a5f',
];

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-60px' },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] },
  },
};

export default function ServicesSection() {
  return (
    <section className="bg-white py-24 md:py-32 px-6 sm:px-8">
      <div className="max-w-[1300px] mx-auto">

        {/* Eyebrow */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.5, ease }}
          className="inline-block rounded-full bg-zinc-100 px-4 py-1.5 mb-5"
        >
          <span className="font-sans text-[16px] font-medium text-zinc-500">
            Total Transformation
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          {...fadeIn}
          transition={{ duration: 0.65, ease }}
          className="font-serif font-normal text-zinc-900 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em] max-w-lg mb-12 md:mb-16"
        >
          Everything you need to begin your transformation.
        </motion.h2>

        {/* Service cards */}
        <motion.div
          className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 md:mb-28"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-180px' }}
        >
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={cardVariants}
              className="group flex flex-col rounded-[8px] overflow-hidden cursor-pointer"
            >
              {/* Card top — placeholder icon area */}
              <motion.div
                className="flex items-center justify-center aspect-square"
                style={{ backgroundColor: service.color }}
                animate={{ filter: ['brightness(1)', 'brightness(1.08)', 'brightness(0.94)', 'brightness(1)'] }}
                transition={{
                  duration: service.pulseDuration,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 border border-white/30">
                  <Plug weight="light" className="w-7 h-7 text-white" />
                </div>
              </motion.div>

              {/* Card footer */}
              <div className="flex items-center justify-between bg-zinc-900 px-4 py-3.5">
                <span className="font-sans text-[15px] font-medium text-white">
                  {service.name}
                </span>
                <ArrowUpRight
                  weight="regular"
                  className="w-4 h-4 text-white/60 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom — connections */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.65, ease }}
        >
          <h3 className="font-serif font-normal text-zinc-900 text-[clamp(1.4rem,2.8vw,2.1rem)] leading-[1.15] tracking-[-0.01em] max-w-md mb-8">
            Connections that support every part of your journey.
          </h3>

          {/* Blob row */}
          <div className="flex flex-wrap gap-3 mb-8">
            {blobs.map((color, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ duration: 0.4, delay: i * 0.04, ease }}
                className="w-12 h-12 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* CTA */}
          <a
            href="#service"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 font-sans text-[15px] font-medium text-zinc-800 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.98]"
          >
            Explore Services
            <ArrowUpRight weight="regular" className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
