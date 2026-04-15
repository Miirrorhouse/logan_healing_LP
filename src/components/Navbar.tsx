import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmileyBlank } from '@phosphor-icons/react';

const links = ['About', 'Products', 'Service'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onNavy = !scrolled;
  const textColor = onNavy ? 'rgba(255,255,255,0.65)' : 'rgba(13,27,62,0.55)';
  const textHover = onNavy ? '#ffffff' : '#0d1b3e';
  const logoText = onNavy ? '#ffffff' : '#0d1b3e';
  const logoBg = onNavy ? 'rgba(255,255,255,0.15)' : '#0d1b3e';
  const logoIconColor = onNavy ? 'text-white' : 'text-white';
  const hamburgerColor = onNavy ? '#ffffff' : '#0d1b3e';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="mx-auto flex items-center justify-between max-w-[1300px] px-8 py-5"
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500"
              style={{ backgroundColor: logoBg }}
            >
              <SmileyBlank weight="fill" className={`${logoIconColor} w-5 h-5`} />
            </span>
            <span
              className="font-semibold text-[16px] tracking-tight font-sans transition-colors duration-500"
              style={{ color: logoText }}
            >
              Logan
            </span>
          </a>

          {/* Desktop links — centered */}
          <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-[16px] transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] font-sans"
                  style={{ color: textColor }}
                  onMouseEnter={e => (e.currentTarget.style.color = textHover)}
                  onMouseLeave={e => (e.currentTarget.style.color = textColor)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#get-started"
                className="inline-flex items-center rounded-full border px-5 py-2 text-[15px] font-medium font-sans transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                style={
                  onNavy
                    ? { borderColor: 'rgba(255,255,255,0.35)', color: '#ffffff' }
                    : { borderColor: 'rgba(13,27,62,0.3)', color: '#0d1b3e' }
                }
              >
                Book a Session
              </a>
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="block w-5 h-[1.5px] rounded-full transition-colors duration-500"
                style={{ backgroundColor: hamburgerColor }}
              />
              <motion.span
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="block w-5 h-[1.5px] rounded-full transition-colors duration-500"
                style={{ backgroundColor: hamburgerColor }}
              />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: 'rgba(13,27,62,0.96)', backdropFilter: 'blur(24px)' }}
          >
            {[...links, 'Book a Session'].map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.32, 0.72, 0, 1] }}
                className="text-3xl font-medium tracking-tight font-sans text-white"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
