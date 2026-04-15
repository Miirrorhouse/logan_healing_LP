import { motion } from 'framer-motion';
import { ArrowUpRight, Plug } from '@phosphor-icons/react';

const ease = [0.32, 0.72, 0, 1] as const;

interface Service {
  name: string;
  description: string;
  price: string;
  duration: string;
  format: string;
  color: string;
  pulseDuration: number;
}

const services: Service[] = [
  {
    name: 'Life Activation',
    description: 'A foundational activation that awakens your dormant DNA and amplifies your connection to your higher self. This session clears energetic debris, strengthens your aura, and ignites a deeper sense of purpose, clarity, and vitality. Often the first step on the deeper energetic healing path.',
    price: '$300',
    duration: '90–120 min',
    format: 'In-Person',
    color: '#1e3a8a',
    pulseDuration: 4.2,
  },
  {
    name: 'Full Spirit Activation',
    description: 'A deeper activation that works with the full spectrum of your spiritual anatomy. Building on the Life Activation, this session integrates your higher spiritual bodies with your physical self, supporting greater coherence, expanded awareness, and a stronger embodiment of your soul\'s true nature.',
    price: '$250',
    duration: '60–90 min',
    format: 'In-Person',
    color: '#172554',
    pulseDuration: 5.7,
  },
  {
    name: 'Soul Retrieval',
    description: 'Trauma, loss, and intense experiences can cause parts of the soul to fragment and withdraw. This session calls those pieces home, restoring wholeness, presence, and vitality. Clients often report feeling more complete, more grounded, and more fully themselves. Especially helpful after trauma, grief, or burnout.',
    price: '$250',
    duration: '90 min',
    format: 'In-Person',
    color: '#1d3d70',
    pulseDuration: 3.9,
  },
  {
    name: 'Shamanic Aura Clearing',
    description: 'Your aura holds the residue of past experiences, emotional wounds, and external influences. This clearing removes energetic debris, seals tears and leaks in the field, and restores the natural luminosity and protective integrity of your energy body.',
    price: '$200',
    duration: '60–75 min',
    format: 'In-Person',
    color: '#1e2d6b',
    pulseDuration: 6.1,
  },
  {
    name: 'Spark of Life Healing',
    description: 'A powerful remote healing session that works directly with the life force at the core of your being. Distance is no barrier to energy. This session reignites your inner spark, clears stagnation, and supports you in returning to flow, wherever you are in the world.',
    price: '$250',
    duration: '60–90 min',
    format: 'Remote',
    color: '#162050',
    pulseDuration: 4.8,
  },
  {
    name: '11th Codon Reading',
    description: 'A sacred reading that maps the blueprint of your soul, revealing your gifts, life purpose, karmic patterns, and spiritual contracts. This session offers profound clarity about the deeper architecture of your journey and why you are here.',
    price: '$500',
    duration: '90–120 min',
    format: 'In-Person',
    color: '#1a3478',
    pulseDuration: 5.3,
  },
  {
    name: 'Chakra Awakening',
    description: 'More than a standard chakra balance, this session awakens and harmonises your entire energy system from the inside out. We clear blockages, align the subtle body, and strengthen the energetic spine so your physical, emotional, and spiritual layers move with greater coherence and vitality.',
    price: '$150',
    duration: '60–75 min',
    format: 'In-Person',
    color: '#0f2460',
    pulseDuration: 3.6,
  },
  {
    name: 'Tree of Life Awakening',
    description: 'This session activates the energetic Tree of Life within your subtle body — the architecture through which you manifest, create, and live from purpose. We remove structural blocks and support you in generating from your essence. For those ready to move beyond fixing into becoming.',
    price: '$150',
    duration: '60–75 min',
    format: 'In-Person',
    color: '#1e3585',
    pulseDuration: 6.7,
  },
  {
    name: 'Crystal Gridding',
    description: 'Your home or sacred space is an extension of your energy field. This session uses sacred geometric crystal grids to clear old imprints, activate the space\'s natural energetic design, and align your environment with your intentions. Aftercare guidance included.',
    price: 'Contact for pricing',
    duration: 'Varies by space',
    format: 'In-Person',
    color: '#1b2d6e',
    pulseDuration: 5.1,
  },
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
    <section className="py-24 md:py-32 px-6 sm:px-8" style={{ backgroundColor: '#0d1b3e' }}>
      <div className="max-w-[1300px] mx-auto">

        {/* Eyebrow */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.5, ease }}
          className="inline-block rounded-full px-4 py-1.5 mb-5"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
        >
          <span className="font-sans text-[16px] font-medium" style={{ color: 'rgba(240,235,224,0.55)' }}>
            Total Transformation
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          {...fadeIn}
          transition={{ duration: 0.65, ease }}
          className="font-serif font-normal text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em] max-w-lg mb-12 md:mb-16"
          style={{ color: '#f0ebe0' }}
        >
          Everything you need to begin your transformation.
        </motion.h2>

        {/* Service cards */}
        <motion.div
          className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-20 md:mb-28"
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
              {/* Colored pulsing top */}
              <motion.div
                className="flex items-center justify-center h-44"
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

              {/* Card body */}
              <div className="flex flex-col flex-1 bg-zinc-900 px-5 pt-5 pb-5">
                {/* Name + arrow */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="font-sans text-[16px] font-semibold leading-snug text-white">
                    {service.name}
                  </span>
                  <ArrowUpRight
                    weight="regular"
                    className="w-4 h-4 shrink-0 mt-0.5 text-white/40 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  />
                </div>

                {/* Description */}
                <p className="font-sans text-[13px] leading-relaxed mb-5" style={{ color: 'rgba(240,235,224,0.45)' }}>
                  {service.description}
                </p>

                {/* Divider */}
                <div className="w-full h-px mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />

                {/* Price + tags */}
                <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
                  <span className="font-sans text-[18px] font-semibold text-white">
                    {service.price}
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="rounded-full px-2.5 py-1 font-sans text-[11px] font-medium tracking-wide" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(240,235,224,0.5)' }}>
                      {service.duration}
                    </span>
                    <span className="rounded-full px-2.5 py-1 font-sans text-[11px] font-medium tracking-wide" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(240,235,224,0.5)' }}>
                      {service.format}
                    </span>
                  </div>
                </div>

                {/* Book button */}
                <a
                  href="#contact"
                  className="flex items-center justify-center w-full rounded-lg py-3 font-sans text-[12px] font-semibold tracking-widest uppercase transition-opacity duration-300 hover:opacity-80 active:scale-[0.98]"
                  style={{ backgroundColor: '#f0ebe0', color: '#0d1b3e' }}
                >
                  Book This Session
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
