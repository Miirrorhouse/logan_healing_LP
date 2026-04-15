import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle } from '@phosphor-icons/react';

const ease = [0.32, 0.72, 0, 1] as const;

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

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputBase =
    'w-full rounded-[6px] px-4 py-3 font-sans text-[15px] outline-none transition-all duration-300 focus:ring-1 focus:ring-blue-400/40 placeholder:opacity-40';

  return (
    <section id="contact" className="py-24 md:py-32 px-6 sm:px-8" style={{ backgroundColor: '#07102b' }}>
      <div className="max-w-[1300px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — intro */}
          <div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, ease }}
              className="inline-block rounded-full px-4 py-1.5 mb-5"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <span className="font-sans text-[16px] font-medium" style={{ color: 'rgba(240,235,224,0.55)' }}>
                Begin Your Journey
              </span>
            </motion.div>

            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.65, ease, delay: 0.05 }}
              className="font-serif font-normal text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em] mb-6"
              style={{ color: '#f0ebe0' }}
            >
              I would be honored to support you on your path to wholeness.
            </motion.h2>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.55, ease, delay: 0.1 }}
              className="font-sans text-[17px] leading-relaxed mb-10"
              style={{ color: 'rgba(240,235,224,0.55)' }}
            >
              Whether you are ready to book or simply curious about whether energy healing is right for you, I welcome your message. Every inquiry is responded to within 24 hours.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, ease, delay: 0.15 }}
              className="space-y-4"
            >
              {[
                'The most profound healing I have ever experienced.',
                'I felt genuinely seen for the first time in years.',
                'Something ancient moved through the room.',
              ].map((quote, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span style={{ color: 'rgba(240,235,224,0.25)' }}>"</span>
                  <p className="font-serif italic text-[15px] leading-snug" style={{ color: 'rgba(240,235,224,0.45)' }}>
                    {quote}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — form or confirmation */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
          >
            {submitted ? (
              <div
                className="rounded-[8px] p-8 md:p-10 flex flex-col items-start gap-5"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <CheckCircle weight="light" className="w-10 h-10" style={{ color: '#86efac' }} />
                <h3 className="font-serif font-normal text-[1.5rem] leading-snug" style={{ color: '#f0ebe0' }}>
                  Your message has been received.
                </h3>
                <p className="font-sans text-[16px] leading-relaxed" style={{ color: 'rgba(240,235,224,0.6)' }}>
                  I will be in touch within 24 hours to confirm your session details. In the meantime, take a deep breath and know that healing has already begun.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-[8px] p-8 md:p-10 space-y-5"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[13px] font-medium mb-2" style={{ color: 'rgba(240,235,224,0.5)' }}>
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className={inputBase}
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#f0ebe0', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[13px] font-medium mb-2" style={{ color: 'rgba(240,235,224,0.5)' }}>
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className={inputBase}
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#f0ebe0', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-[13px] font-medium mb-2" style={{ color: 'rgba(240,235,224,0.5)' }}>
                    Area of Interest
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                    className={inputBase}
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: form.service ? '#f0ebe0' : 'rgba(240,235,224,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <option value="" disabled>Select a service…</option>
                    <option value="life-activation">Life Activation</option>
                    <option value="soul-retrieval">Soul Retrieval</option>
                    <option value="cord-cutting">Cord Cutting</option>
                    <option value="aura-clearing">Aura Clearing</option>
                    <option value="chakra-awakening">Chakra Awakening</option>
                    <option value="spark-of-life">Spark of Life Healing</option>
                    <option value="tree-of-life">Tree of Life Awakening</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="unsure">I\'m not sure yet</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[13px] font-medium mb-2" style={{ color: 'rgba(240,235,224,0.5)' }}>
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Share a little about what brings you here and what you are hoping to explore or release…"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={inputBase + ' resize-none'}
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#f0ebe0', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <p className="font-sans text-[13px]" style={{ color: 'rgba(240,235,224,0.35)' }}>
                    I respond to all inquiries within 24 hours.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[15px] font-medium transition-all duration-300 active:scale-[0.98]"
                    style={{ backgroundColor: '#f0ebe0', color: '#0d1b3e' }}
                  >
                    Send Message
                    <ArrowUpRight weight="regular" className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
