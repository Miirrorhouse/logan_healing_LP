import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import loganHeadshot from '../assets/img/logan-headshot_4a01f551.png';

const ease = [0.32, 0.72, 0, 1] as const;

const credentials = [
  'Life Activation Practitioner, Modern Mystery School',
  'Second-Step Ritual Master, Lineage of King Solomon',
  'Trained in Metaphysics & Light Work',
];

const colContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animate = inView ? 'visible' : 'hidden';

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 sm:px-8"
      style={{ backgroundColor: '#0d1b3e' }}
    >
      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 max-w-[1100px] mx-auto">

          {/* Left column — its own stagger container */}
          <motion.div
            className="flex flex-col gap-3 lg:w-1/2 lg:self-stretch"
            variants={colContainer}
            initial="hidden"
            animate={animate}
          >
            {/* Image */}
            <motion.div
              variants={child}
              className="overflow-hidden rounded-[8px] w-4/5"
              style={{ aspectRatio: '1/1' }}
            >
              <img
                src={loganHeadshot.src}
                alt="Logan Lepper, Energy Healer"
                className="w-full h-full object-cover object-top"
              />
            </motion.div>

            {/* Credential cards */}
            {credentials.map((cred) => (
              <motion.div
                key={cred}
                variants={child}
                className="flex items-start gap-4 rounded-[8px] px-5 py-4 w-fit"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  aria-hidden="true"
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l2.5 2.5L9 1" stroke="#f0ebe0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="font-sans text-[15px] leading-snug" style={{ color: '#f0ebe0' }}>
                  {cred}
                </span>
              </motion.div>
            ))}

            {/* School badge */}
            <motion.div
              variants={child}
              className="inline-flex items-center gap-3 rounded-[8px] px-5 py-4 self-start"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#f0ebe0" strokeWidth="1.2" />
                  <circle cx="7" cy="7" r="2" fill="#f0ebe0" />
                </svg>
              </div>
              <div>
                <p className="font-sans text-[13px] font-medium" style={{ color: '#f0ebe0' }}>Modern Mystery School</p>
                <p className="font-sans text-[12px]" style={{ color: 'rgba(240,235,224,0.5)' }}>Lineage of King Solomon</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — its own stagger container, delayed so left goes first */}
          <motion.div
            className="flex-1"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
            initial="hidden"
            animate={animate}
          >
            <motion.div
              variants={child}
              className="inline-block rounded-full px-4 py-1.5 mb-5"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <span className="font-sans text-[16px] font-medium" style={{ color: 'rgba(240,235,224,0.55)' }}>
                About the Teacher
              </span>
            </motion.div>

            <motion.h2
              variants={child}
              className="font-serif font-normal text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em] mb-8"
              style={{ color: '#f0ebe0' }}
            >
              Life Activation Practitioner, Healer and Second Step Ritual Master
            </motion.h2>

            <motion.p
              variants={child}
              className="font-sans text-[17px] leading-relaxed mb-5"
              style={{ color: 'rgba(240,235,224,0.65)' }}
            >
              No amount of logic could touch what lived deeper in my body — what was buried in my subconscious, held in my energy, and stored in my spirit. I wouldn't have believed it was possible to shift those layers until I experienced it myself.
            </motion.p>

            <motion.p
              variants={child}
              className="font-sans text-[17px] leading-relaxed mb-5"
              style={{ color: 'rgba(240,235,224,0.65)' }}
            >
              This is when I stepped into the unknown: an ancient spiritual path, thousands of years old, in the lineage of King Solomon and through the Modern Mystery School. The exploration didn't begin comfortably. To call it uncomfortable at first is an understatement — but slowly something began to shift.
            </motion.p>

            <motion.p
              variants={child}
              className="font-sans text-[17px] leading-relaxed"
              style={{ color: 'rgba(240,235,224,0.65)' }}
            >
              At the time I didn't have the words for what was changing. Only that I felt lighter. More myself. As if parts of me that had been held under pressure for years were finally allowed to breathe.
            </motion.p>

            <motion.p
              variants={child}
              className="mt-8 font-sans text-[15px] font-medium tracking-wide"
              style={{ color: 'rgba(240,235,224,0.35)' }}
            >
              — Logan Lepper, Energy Healer
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
