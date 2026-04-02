import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmileyBlank } from '@phosphor-icons/react';
import { gradientStore } from '../stores/gradientStore';

const links = ['About', 'Products', 'Service'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [gradientOn, setGradientOn] = useState(gradientStore.get());

  const handleToggle = () => {
    const next = !gradientOn;
    setGradientOn(next);
    gradientStore.set(next);
  };

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
            <span className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center">
              <SmileyBlank weight="fill" className="text-white w-5 h-5" />
            </span>
            <span className="font-semibold text-zinc-900 text-[16px] tracking-tight font-sans">
              Logan
            </span>
          </a>

          {/* Desktop links — centered */}
          <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-[16px] text-zinc-500 hover:text-zinc-900 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] font-sans"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              {/* Gradient toggle */}
              <button
                onClick={handleToggle}
                aria-label="Toggle gradient background"
                className="flex items-center gap-1.5 group"
              >
                <span className="text-[11px] font-sans text-zinc-400 group-hover:text-zinc-600 transition-colors duration-300 select-none">
                  gradient
                </span>
                <span
                  className="relative inline-block w-8 h-4 rounded-full transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ backgroundColor: gradientOn ? '#a5b4fc' : '#d4d4d8' }}
                >
                  <motion.span
                    animate={{ x: gradientOn ? 16 : 2 }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute top-[2px] w-3 h-3 rounded-full bg-white shadow-sm"
                    style={{ left: 0 }}
                  />
                </span>
              </button>

              <a
                href="#get-started"
                className="inline-flex items-center rounded-full bg-white px-5 py-2 text-[16px] font-medium text-zinc-900 font-sans transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-zinc-100 active:scale-[0.98]"
              >
                Get Started
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
                className="block w-5 h-[1.5px] bg-zinc-800 rounded-full"
              />
              <motion.span
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="block w-5 h-[1.5px] bg-zinc-800 rounded-full"
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
