import { motion } from 'framer-motion';

const ease = [0.32, 0.72, 0, 1] as const;

// Palette — faithful to the attached energy-healing "Services" section
const CREAM = '#f5f0e6';
const NAVY = '#0d1b3e';
const INK = '#12182e';
const GOLD = '#bf9b4f';
const ICON = '#4e5a82';
const BODY = 'rgba(18,24,46,0.62)';

// Sacred geometry SVG icons — one per service
const SeedOfLife = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <circle cx="24" cy="24" r="8" />
    <circle cx="24" cy="16" r="8" />
    <circle cx="24" cy="32" r="8" />
    <circle cx="17.07" cy="20" r="8" />
    <circle cx="30.93" cy="20" r="8" />
    <circle cx="17.07" cy="28" r="8" />
    <circle cx="30.93" cy="28" r="8" />
  </svg>
);

const FlowerOfLife = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <circle cx="24" cy="24" r="9" />
    <circle cx="24" cy="15" r="9" />
    <circle cx="24" cy="33" r="9" />
    <circle cx="16.2" cy="19.5" r="9" />
    <circle cx="31.8" cy="19.5" r="9" />
    <circle cx="16.2" cy="28.5" r="9" />
    <circle cx="31.8" cy="28.5" r="9" />
    <circle cx="24" cy="24" r="19" />
  </svg>
);

const Merkaba = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <polygon points="24,4 43,38 5,38" />
    <polygon points="24,44 5,10 43,10" />
    <circle cx="24" cy="24" r="7" />
  </svg>
);

const SriYantra = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <polygon points="24,5 43,37 5,37" />
    <polygon points="24,43 5,11 43,11" />
    <polygon points="24,11 40,35 8,35" />
    <polygon points="24,37 8,13 40,13" />
    <circle cx="24" cy="24" r="3.5" />
    <circle cx="24" cy="24" r="19" />
  </svg>
);

const Vesica = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <circle cx="18" cy="24" r="12" />
    <circle cx="30" cy="24" r="12" />
    <circle cx="24" cy="24" r="19" />
  </svg>
);

const Torus = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <ellipse cx="24" cy="24" rx="19" ry="9" />
    <ellipse cx="24" cy="24" rx="19" ry="19" />
    <ellipse cx="24" cy="24" rx="7" ry="3.5" />
    <line x1="24" y1="5" x2="24" y2="43" />
    <line x1="5" y1="24" x2="43" y2="24" />
  </svg>
);

const Metatron = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <circle cx="24" cy="24" r="19" />
    <circle cx="24" cy="24" r="9" />
    <polygon points="24,5 42,33 6,33" />
    <polygon points="24,43 6,15 42,15" />
    <line x1="24" y1="5" x2="24" y2="43" />
    <line x1="6" y1="15" x2="42" y2="33" />
    <line x1="42" y1="15" x2="6" y2="33" />
  </svg>
);

const GoldenSpiral = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <circle cx="24" cy="24" r="19" />
    <path d="M24,24 Q24,6 42,6 Q42,42 6,42 Q6,16 24,16 Q33,16 33,24 Q33,33 24,33 Q19,33 19,28 Q19,24 23,24" />
  </svg>
);

const Octahedron = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <polygon points="24,4 43,24 24,44 5,24" />
    <line x1="5" y1="24" x2="43" y2="24" />
    <line x1="24" y1="4" x2="24" y2="44" />
    <ellipse cx="24" cy="24" rx="19" ry="7" />
    <circle cx="24" cy="24" r="3.5" />
  </svg>
);

interface Service {
  Icon: ({ className }: { className?: string }) => JSX.Element;
  name: string;
  duration: string;
  format: string;
  price: string;
  description: string;
}

const services: Service[] = [
  {
    Icon: SeedOfLife,
    name: 'Life Activation',
    duration: '90–120 min',
    format: 'In-person',
    price: '$300',
    description:
      'A foundational activation that awakens your dormant DNA and amplifies your connection to your higher self. This session clears energetic debris, strengthens your aura, and ignites a deeper sense of purpose, clarity, and vitality. Many clients experience a profound shift in how they feel in their own body and life. Often the first step on the deeper energetic healing path.',
  },
  {
    Icon: FlowerOfLife,
    name: 'Full Spirit Activation',
    duration: '60–90 min',
    format: 'In-person',
    price: '$250',
    description:
      "A deeper activation that works with the full spectrum of your spiritual anatomy. Building on the Life Activation, this session integrates your higher spiritual bodies with your physical self, supporting greater coherence, expanded awareness, and a stronger embodiment of your soul's true nature. Best experienced after Life Activation.",
  },
  {
    Icon: Merkaba,
    name: 'Soul Retrieval',
    duration: '90 min',
    format: 'In-person',
    price: '$250',
    description:
      'Trauma, loss, and intense experiences can cause parts of the soul to fragment and withdraw. This session calls those pieces home, restoring wholeness, presence, and vitality. Clients often report feeling more complete, more grounded, and more fully themselves. Especially helpful after trauma, grief, or burnout.',
  },
  {
    Icon: SriYantra,
    name: 'Shamanic Aura Clearing',
    duration: '60–75 min',
    format: 'In-person',
    price: '$200',
    description:
      'Your aura holds the residue of past experiences, emotional wounds, and external influences. This clearing removes energetic debris, seals tears and leaks in the field, and restores the natural luminosity and protective integrity of your energy body. Ideal if you frequently feel drained after social interactions or emotional exchanges.',
  },
  {
    Icon: Vesica,
    name: 'Spark of Life Healing',
    duration: '60–90 min',
    format: 'Remote',
    price: '$250',
    description:
      'A powerful remote healing session that works directly with the life force at the core of your being. Distance is no barrier to energy. This session reignites your inner spark, clears stagnation, and supports you in returning to flow, wherever you are in the world. Rest and receive — no effort required during the session.',
  },
  {
    Icon: Torus,
    name: '11th Codon Reading',
    duration: '90–120 min',
    format: 'In-person',
    price: '$500',
    description:
      'A sacred reading that maps the blueprint of your soul, revealing your gifts, life purpose, karmic patterns, and spiritual contracts. This session offers profound clarity about the deeper architecture of your journey and why you are here. You will walk away with a clearer compass for the path ahead.',
  },
  {
    Icon: Metatron,
    name: 'Chakra Awakening',
    duration: '60–75 min',
    format: 'In-person',
    price: '$150',
    description:
      'More than a standard chakra balance, this session awakens and harmonizes your entire energy system from the inside out. We clear blockages, align the subtle body, and strengthen the energetic spine so your physical, emotional, and spiritual layers move with greater coherence and vitality. For those ready to feel something different.',
  },
  {
    Icon: GoldenSpiral,
    name: 'Tree of Life Awakening',
    duration: '60–75 min',
    format: 'In-person',
    price: '$150',
    description:
      'This session activates the energetic Tree of Life within your subtle body, the architecture through which you manifest, create, and live from purpose. We remove structural blocks, strengthen the connection between your higher self and daily reality, and support you in generating from your essence. For those ready to move beyond fixing into becoming.',
  },
  {
    Icon: Octahedron,
    name: 'Crystal Gridding',
    duration: 'Varies by space',
    format: 'In-person',
    price: 'Contact for pricing',
    description:
      "Your home or sacred space is an extension of your energy field. This session uses sacred geometric crystal grids to clear old imprints, activate the space's natural energetic design, and align your environment with your intentions. Aftercare guidance is included on maintaining the grid. Your space becomes an active ally in your healing and growth.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 px-6 sm:px-8" style={{ backgroundColor: CREAM }}>
      <div className="max-w-[1300px] mx-auto">
        {/* Section header */}
        <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-16">
          <p
            className="font-sans text-[12px] font-semibold uppercase tracking-[0.3em] mb-3"
            style={{ color: ICON }}
          >
            What I Offer
          </p>
          <h2
            className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ color: INK }}
          >
            Healing Services
          </h2>
          <div className="w-20 h-px mx-auto mb-6" style={{ backgroundColor: GOLD }} />
          <p className="font-sans font-light max-w-2xl mx-auto leading-relaxed" style={{ color: BODY }}>
            Each session is tailored to your unique needs and intentions, meeting you exactly where
            you are on your journey.
          </p>
        </motion.div>

        {/* Services grid — equal-height cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ gridAutoRows: '1fr' }}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
        >
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={cardVariants}
              className="flex flex-col bg-white rounded-sm p-7 shadow-sm transition-all duration-500 hover:shadow-md hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(18,24,46,0.10)' }}
            >
              {/* Sacred geometry icon */}
              <div className="mb-5 opacity-80" style={{ color: ICON }}>
                <service.Icon />
              </div>

              {/* Name */}
              <h3 className="font-serif font-semibold text-xl mb-3 leading-snug" style={{ color: INK }}>
                {service.name}
              </h3>

              {/* Gold rule */}
              <div className="w-8 h-px mb-4" style={{ backgroundColor: GOLD }} />

              {/* Description */}
              <p
                className="font-sans font-light text-sm leading-relaxed flex-1 mb-5"
                style={{ color: BODY }}
              >
                {service.description}
              </p>

              {/* Price + meta badges + booking button */}
              <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(18,24,46,0.08)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif font-semibold text-lg" style={{ color: INK }}>
                    {service.price}
                  </span>
                  <div className="flex gap-2">
                    <span
                      className="text-[0.55rem] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm"
                      style={{ color: ICON, backgroundColor: 'rgba(78,90,130,0.10)' }}
                    >
                      {service.duration}
                    </span>
                    <span
                      className="text-[0.55rem] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm"
                      style={
                        service.format === 'Remote'
                          ? { color: GOLD, backgroundColor: 'rgba(191,155,79,0.15)' }
                          : { color: ICON, backgroundColor: 'rgba(78,90,130,0.10)' }
                      }
                    >
                      {service.format}
                    </span>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="flex items-center justify-center w-full py-2.5 rounded-sm text-[0.6rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: NAVY, color: CREAM }}
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
