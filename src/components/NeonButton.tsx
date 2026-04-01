import { motion } from 'framer-motion';

interface NeonButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  animate?: boolean;
}

export default function NeonButton({ children, href, onClick, animate = true }: NeonButtonProps) {
  const classes = `
    group relative inline-flex items-center justify-center
    rounded-full px-8 py-3
    bg-blue-500/5 border border-blue-400/25
    text-[16px] font-medium text-white font-sans
    overflow-hidden
    transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
    hover:border-blue-400/60 hover:bg-blue-500/10
    active:scale-[0.98]
  `.trim();

  const inner = (
    <>
      {/* Neon sweep on hover */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(96,165,250,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Bottom neon line */}
      <span className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, transparent, #60a5fa, transparent)',
          boxShadow: '0 0 8px 1px rgba(96,165,250,0.6)',
        }}
      />

      {/* Top neon line */}
      <span className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(96,165,250,0.4), transparent)',
        }}
      />

      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        initial={animate ? { opacity: 0, y: 16, filter: 'blur(6px)' } : false}
        animate={animate ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
        transition={{ duration: 0.9, delay: 0.48, ease: [0.32, 0.72, 0, 1] }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay: 0.48, ease: [0.32, 0.72, 0, 1] }}
    >
      {inner}
    </motion.button>
  );
}
