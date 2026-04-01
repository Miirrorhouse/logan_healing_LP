import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmileyBlank } from '@phosphor-icons/react';
import NeonButton from './NeonButton';

const links = ['About', 'Products', 'Service'];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="mx-auto flex items-center justify-between max-w-[1300px] px-8 py-6"
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <SmileyBlank weight="fill" className="text-white w-5 h-5" />
            </span>
            <span className="font-semibold text-white text-[16px] tracking-tight font-sans">
              Logan
            </span>
          </a>

          {/* Desktop links — centered */}
          <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-[16px] text-white/50 hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] font-sans"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <NeonButton href="#get-started" animate={false}>Get Started</NeonButton>
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
                className="block w-5 h-[1.5px] bg-white rounded-full"
              />
              <motion.span
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="block w-5 h-[1.5px] bg-white rounded-full"
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
            className="fixed inset-0 z-30 backdrop-blur-3xl bg-white/90 flex flex-col items-center justify-center gap-8"
          >
            {[...links, 'Get Started'].map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.32, 0.72, 0, 1] }}
                className="text-3xl font-medium text-zinc-800 tracking-tight font-sans"
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
