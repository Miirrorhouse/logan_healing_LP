import { motion } from 'framer-motion';
import { Star, Sparkle, BookOpen, Heart } from '@phosphor-icons/react';
import loganHeadshot from '../assets/img/logan-headshot_4a01f551.png';

const ease = [0.32, 0.72, 0, 1] as const;

// Palette — elevated Organic Earth & Luminous Aura
const CREAM = '#f5f0e6';
const NAVY = '#0d1b3e';
const INK = '#12182e';
const GOLD = '#bf9b4f';
const BODY = 'rgba(18,24,46,0.68)';

const credentials = [
  { Icon: Star, text: 'Life Activation Practitioner' },
  { Icon: Sparkle, text: 'Healer' },
  { Icon: BookOpen, text: 'Second-Step Ritual Master' },
  { Icon: Heart, text: 'Student of Metaphysics and Kabbalah' },
];

const bioParagraphs = [
  "I used to think healing was something you could figure out. Go to therapy, discover your patterns, have the insights, grow in self awareness and heal old wounds. And for awhile this worked, until it didn't. I eventually reached a point where I understood everything but still felt like I was hitting a glass ceiling or a plateau.",
  "No amount of logic could touch what lived deeper in my body, what was buried in my subconscious, held in my energy and stored in my spirit. I wouldn't say that I went searching, but I knew something was missing. That something was the light.",
  "This is when I stepped into the unknown, an ancient spiritual path, thousands of years old in the lineage of King Solomon and through the Modern Mystery School. The exploration didn't start because I understood it, but because I could feel my soul calling for something beyond what the mind could comprehend.",
  "To call it uncomfortable at first is an understatement, but slowly something began to shift. At the time I didn't have the words for it, but now I know it to be a shift in frequency and energy that restored my light, joy, presence and peace.",
  'Now, I work as a Life Activation Practitioner, Healer and Second Step Ritual Master in the lineage of King Solomon. I continue to train in metaphysics through the Modern Mystery School and carry tools of light work to help others remember who they are beyond the limitations of the mind.',
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 sm:px-8" style={{ backgroundColor: CREAM }}>
      <div className="max-w-[1300px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            className="relative"
          >
            {/* Decorative background shapes */}
            <div
              className="absolute -top-6 -left-6 w-full h-full rounded-2xl -z-10"
              style={{ backgroundColor: 'rgba(13,27,62,0.08)' }}
            />
            <div
              className="absolute -bottom-4 -right-4 w-3/4 h-3/4 rounded-2xl -z-10"
              style={{ backgroundColor: 'rgba(191,155,79,0.12)' }}
            />

            <img
              src={loganHeadshot.src}
              alt="Logan Lepper, Energy Healer"
              className="w-full max-w-sm mx-auto md:mx-0 rounded-2xl object-cover object-top shadow-2xl"
              style={{ aspectRatio: '3/4' }}
            />

            {/* Floating credential badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease, delay: 0.35 }}
              className="absolute -bottom-6 -right-4 md:-right-8 rounded-xl px-5 py-4 shadow-xl max-w-[220px]"
              style={{ backgroundColor: NAVY }}
            >
              <p
                className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] mb-1"
                style={{ color: GOLD }}
              >
                Initiate in the Lineage of King Solomon
              </p>
              <p className="font-serif text-sm font-semibold leading-snug" style={{ color: CREAM }}>
                Modern Mystery School
              </p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          >
            <h2
              className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] mb-6"
              style={{ color: INK }}
            >
              Meet Logan Lepper
            </h2>

            <div
              className="w-16 h-px mb-6"
              style={{
                background: 'linear-gradient(to right, rgba(191,155,79,0.6), transparent)',
              }}
            />

            <div className="flex flex-col gap-4 mb-8">
              {bioParagraphs.map((para, i) => (
                <p key={i} className="font-sans font-light text-base leading-relaxed" style={{ color: BODY }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Closing pull-quote */}
            <blockquote className="pl-5 mb-8" style={{ borderLeft: `2px solid ${GOLD}` }}>
              <p className="font-serif italic text-lg leading-relaxed" style={{ color: NAVY }}>
                "You don't have to do it alone. If you're ready to come home to yourself, I'm here to
                walk with you."
              </p>
            </blockquote>

            {/* Credentials */}
            <div className="flex flex-col gap-3">
              {credentials.map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(13,27,62,0.1)' }}
                  >
                    <Icon size={14} weight="light" style={{ color: NAVY }} />
                  </div>
                  <span className="font-sans text-sm" style={{ color: 'rgba(18,24,46,0.8)' }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
