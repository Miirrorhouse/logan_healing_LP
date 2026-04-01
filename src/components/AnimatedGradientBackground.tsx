import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedGradientBackgroundProps {
  startingGap?: number;
  breathing?: boolean;
  gradientColors?: string[];
  gradientStops?: number[];
  animationSpeed?: number;
  breathingRange?: number;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  topOffset?: number;
  // Live color override — mutate this ref externally to drive scroll-based color shifts
  liveColorsRef?: React.RefObject<string[]>;
  // Live gap override — increase to constrict black center, decrease to expand it
  liveGapRef?: React.RefObject<number>;
}

export default function AnimatedGradientBackground({
  startingGap = 120,
  breathing = true,
  gradientColors = ['#000000', '#0a0818', '#16124a', '#2a2070', '#5b9fd4'],
  gradientStops = [0, 25, 50, 75, 100],
  animationSpeed = 0.015,
  breathingRange = 8,
  containerStyle = {},
  containerClassName = '',
  topOffset = 0,
  liveColorsRef,
  liveGapRef,
}: AnimatedGradientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationFrame: number;
    let width = startingGap;
    let direction = 1;

    const animate = () => {
      // Base gap from live ref (scroll-driven) or static prop
      const baseGap = liveGapRef?.current ?? startingGap;
      if (width >= baseGap + breathingRange) direction = -1;
      if (width <= baseGap - breathingRange) direction = 1;
      if (!breathing) direction = 0;
      width += direction * animationSpeed;
      // Clamp to follow the live base
      width = Math.max(baseGap - breathingRange, Math.min(baseGap + breathingRange, width));

      // Use live colors if provided, else fall back to defaults
      const colors = liveColorsRef?.current ?? gradientColors;
      const stops = gradientStops.map((stop, i) => `${colors[i]} ${stop}%`).join(', ');

      if (containerRef.current) {
        containerRef.current.style.background =
          `radial-gradient(${width}% ${width + topOffset}% at 50% 100%, ${stops})`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [startingGap, breathing, gradientStops, animationSpeed, breathingRange, topOffset]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={`absolute inset-0 overflow-hidden ${containerClassName}`}
    >
      <div ref={containerRef} style={containerStyle} className="absolute inset-0" />
    </motion.div>
  );
}
