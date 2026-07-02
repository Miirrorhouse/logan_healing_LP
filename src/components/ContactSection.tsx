import { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperPlaneTilt, CheckCircle } from '@phosphor-icons/react';

const ease = [0.32, 0.72, 0, 1] as const;

// Palette — elevated Organic Earth & Luminous Aura
const CREAM = '#f5f0e6';
const NAVY = '#0d1b3e';
const INK = '#12182e';
const GOLD = '#bf9b4f';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

interface FormState {
  name: string;
  email: string;
  service: string;
  message: string;
}

const labelStyle: React.CSSProperties = {
  color: GOLD,
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputBase =
    'w-full rounded-lg px-4 py-3 font-sans text-sm outline-none transition-colors duration-300 placeholder:opacity-40';
  const inputStyle: React.CSSProperties = {
    backgroundColor: 'rgba(245,240,230,0.08)',
    color: CREAM,
    border: '1px solid rgba(245,240,230,0.2)',
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-32 px-6 sm:px-8"
      style={{ backgroundColor: NAVY }}
    >
      {/* Orbs */}
      <div
        className="absolute top-10 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(191,155,79,0.06)' }}
      />
      <div
        className="absolute bottom-10 right-10 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(196,160,160,0.08)' }}
      />

      <div className="relative max-w-[1300px] mx-auto">
        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.7, ease }} className="text-center mb-14">
          <p
            className="font-sans text-[12px] font-semibold uppercase tracking-[0.3em] mb-4"
            style={{ color: GOLD }}
          >
            Begin Your Journey
          </p>
          <h2
            className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ color: CREAM }}
          >
            Book a Session
          </h2>
          <p
            className="font-serif italic text-lg max-w-xl mx-auto"
            style={{ color: 'rgba(245,240,230,0.7)' }}
          >
            I would be honored to support you on your path to wholeness
          </p>
          <div
            className="w-20 h-px mx-auto mt-6"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(191,155,79,0.6), transparent)',
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left — intro */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="font-serif text-2xl mb-6" style={{ color: CREAM }}>
              Get in Touch
            </h3>
            <p
              className="font-sans font-light text-sm leading-relaxed mb-8"
              style={{ color: 'rgba(245,240,230,0.7)' }}
            >
              Whether you are ready to book or simply curious about whether energy healing is right
              for you, I welcome your message. Every inquiry is responded to within 24 hours.
            </p>

            {/* Social proof */}
            <div
              className="p-5 rounded-xl"
              style={{
                backgroundColor: 'rgba(245,240,230,0.07)',
                border: '1px solid rgba(245,240,230,0.12)',
              }}
            >
              <p
                className="font-serif italic text-sm leading-relaxed"
                style={{ color: 'rgba(245,240,230,0.85)' }}
              >
                "The most profound healing I have ever experienced. Logan's presence alone is
                transformative."
              </p>
              <p
                className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] mt-3"
                style={{ color: GOLD }}
              >
                — Verified Client
              </p>
            </div>
          </motion.div>

          {/* Right — form or confirmation */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div
                className="rounded-2xl p-10 text-center"
                style={{
                  backgroundColor: 'rgba(245,240,230,0.08)',
                  border: '1px solid rgba(245,240,230,0.15)',
                }}
              >
                <CheckCircle size={48} weight="light" className="mx-auto mb-4" style={{ color: GOLD }} />
                <h3 className="font-serif text-2xl mb-3" style={{ color: CREAM }}>
                  Thank you, {form.name || 'dear one'}
                </h3>
                <p
                  className="font-sans font-light text-sm leading-relaxed"
                  style={{ color: 'rgba(245,240,230,0.7)' }}
                >
                  Your message has been received. I will be in touch within 24 hours to confirm your
                  session details. In the meantime, take a deep breath and know that healing has
                  already begun.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="backdrop-blur-sm rounded-2xl p-7 md:p-9 space-y-5"
                style={{
                  backgroundColor: 'rgba(245,240,230,0.06)',
                  border: '1px solid rgba(245,240,230,0.12)',
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] mb-2"
                      style={labelStyle}
                    >
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className={inputBase}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      className="block font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] mb-2"
                      style={labelStyle}
                    >
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className={inputBase}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] mb-2"
                    style={labelStyle}
                  >
                    Service of Interest
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                    className={inputBase}
                    style={{
                      ...inputStyle,
                      backgroundColor: NAVY,
                      color: form.service ? CREAM : 'rgba(245,240,230,0.4)',
                    }}
                  >
                    <option value="" disabled>
                      Select a service…
                    </option>
                    <option value="life-activation">Life Activation</option>
                    <option value="full-spirit-activation">Full Spirit Activation</option>
                    <option value="soul-retrieval">Soul Retrieval</option>
                    <option value="aura-clearing">Shamanic Aura Clearing</option>
                    <option value="spark-of-life">Spark of Life Healing</option>
                    <option value="codon-reading">11th Codon Reading</option>
                    <option value="chakra-awakening">Chakra Awakening</option>
                    <option value="tree-of-life">Tree of Life Awakening</option>
                    <option value="crystal-gridding">Crystal Gridding</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="unsure">I'm not sure yet</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block font-sans text-[0.55rem] font-semibold uppercase tracking-[0.2em] mb-2"
                    style={labelStyle}
                  >
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Share a little about what brings you here and what you are hoping to explore or release…"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={inputBase + ' resize-none'}
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans text-[12px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: GOLD, color: INK }}
                >
                  <PaperPlaneTilt size={14} weight="fill" />
                  Send Message
                </button>

                <p
                  className="font-sans font-light text-xs text-center"
                  style={{ color: 'rgba(245,240,230,0.5)' }}
                >
                  I respond to all inquiries within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
