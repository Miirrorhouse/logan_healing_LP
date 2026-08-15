import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from './Hero';
import FeelingsSection from './FeelingsSection';

export default function HeroContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vh, setVh] = useState(0);

  useEffect(() => {
    setVh(window.innerHeight);
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const gemVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = gemVideoRef.current;
    if (!video) return;
    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };
    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['end 1.4', 'end 1.05'],
  });
  const bg = useTransform(scrollYProgress, [0, 1], ['#0d1b3e', '#0d1b3e']);

  const { scrollY } = useScroll();

  // Gem starts at hero bottom (w-16=64px, pb-10=40px → top = vh - 104)
  // Ends above "What brings you here today" when heading reaches viewport center
  const targetScrollY   = vh ? vh * 0.5 + 96 : 500;
  const gemStartTop     = vh ? vh - 104 : 700;
  const gemEndTop       = vh ? vh * 0.5 - 40 : 360;

  // Using position:absolute inside HeroContainer (which starts at page y:0).
  // abs_top = scrollY + viewport_position during tracking phase.
  // This means the gem appears fixed during fly-in, then naturally scrolls
  // with the content once it reaches the stuck position.
  //
  // abs_top values:
  //   scrollY=0            → gemStartTop          (gem at hero bottom, viewport correct)
  //   scrollY=targetScrollY → targetScrollY+gemEndTop (stuck page position)
  //   scrollY>targetScrollY → same constant         (scrolls with content)
  const BIG      = 99999;
  const gemAbsTop = useTransform(
    scrollY,
    [0, targetScrollY, BIG],
    [gemStartTop, targetScrollY + gemEndTop, targetScrollY + gemEndTop],
  );
  const gemScale = useTransform(scrollY, [0, targetScrollY, BIG], [1, 1.8, 1.8]);

  return (
    <motion.div ref={containerRef} style={{ backgroundColor: bg, position: 'relative' }}>
      <Hero />
      <FeelingsSection />

      {/* Gem: absolute so it tracks viewport during fly-in, then sticks with content */}
      {/* The gem clip has no alpha channel — it is a bright crystal matted on pure
          black. Screen-blending drops the black to nothing so it composites over
          the hero footage instead of showing a box. */}
      {vh > 0 && (
        <motion.div
          style={{
            position: 'absolute',
            top: gemAbsTop,
            left: '50%',
            x: '-50%',
            scale: gemScale,
            zIndex: 50,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
        >
          <div className="relative flex items-center justify-center">
            <video
              ref={gemVideoRef}
              src="/videos/gem_video_3.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="relative w-16 h-16 object-contain"
              aria-hidden="true"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
