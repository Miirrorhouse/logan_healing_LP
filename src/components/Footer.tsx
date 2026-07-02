import { motion } from 'framer-motion';

const ease = [0.32, 0.72, 0, 1] as const;

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer
      className="px-6 sm:px-8 pt-16 pb-10"
      style={{ backgroundColor: '#081228', borderTop: '1px solid rgba(191,155,79,0.15)' }}
    >
      <div className="max-w-[1300px] mx-auto">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-16">

          {/* Brand + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="max-w-xs"
          >
            <p className="font-sans text-[14px] font-medium tracking-widest uppercase mb-4" style={{ color: '#bf9b4f' }}>
              Logan Lepper
            </p>
            <p className="font-serif italic text-[1.1rem] leading-relaxed" style={{ color: 'rgba(240,235,224,0.55)' }}>
              "Restoring balance. Releasing what no longer serves. Reconnecting you with your inner light."
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.08 }}
            aria-label="Footer navigation"
          >
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-[15px] transition-opacity duration-300 hover:opacity-100"
                    style={{ color: 'rgba(240,235,224,0.45)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

        </div>

        {/* Divider quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
          className="pt-8 mb-8"
          style={{
            borderTop: '1px solid transparent',
            borderImage:
              'linear-gradient(to right, transparent, rgba(191,155,79,0.5), transparent) 1',
          }}
        >
          <p className="font-serif italic text-center text-[1rem]" style={{ color: 'rgba(191,155,79,0.6)' }}>
            "Healing is not fixing — it is remembering wholeness."
          </p>
        </motion.div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-sans text-[13px]" style={{ color: 'rgba(240,235,224,0.2)' }}>
            © {new Date().getFullYear()} Logan Lepper. All rights reserved.
          </p>
          <p className="font-sans text-[13px]" style={{ color: 'rgba(240,235,224,0.2)' }}>
            Modern Mystery School · Lineage of King Solomon
          </p>
        </div>

      </div>
    </footer>
  );
}
