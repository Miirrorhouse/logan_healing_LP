import { useRef, useEffect, useMemo } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

const LINE1 = 'Your Mind Is A';
const LINE2 = 'Garden';

function randomThresholds(count: number, min: number, max: number): number[] {
  return Array.from({ length: count }, () => min + Math.random() * (max - min));
}

export default function GardenSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  const line1Refs = useRef<(HTMLSpanElement | null)[]>([]);
  const line2Refs = useRef<(HTMLSpanElement | null)[]>([]);

  const thresholds1 = useMemo(() => randomThresholds(LINE1.length, 0, 0.55), []);
  const thresholds2 = useMemo(() => randomThresholds(LINE2.length, 0.62, 1.0), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();

    const seek = (t: number) => {
      if ('fastSeek' in video) {
        (video as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(t);
      } else {
        video.currentTime = t;
      }
    };

    const tick = () => {
      if (video.readyState >= 2 && video.duration) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.001) seek(video.currentTime + diff * 0.18);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const video = videoRef.current;
    if (video?.duration) targetTimeRef.current = progress * video.duration;

    line1Refs.current.forEach((span, i) => {
      if (!span) return;
      const visible = progress >= thresholds1[i];
      span.style.opacity = visible ? '1' : '0';
      span.style.filter = visible ? 'blur(0px)' : 'blur(16px)';
    });

    line2Refs.current.forEach((span, i) => {
      if (!span) return;
      const visible = progress >= thresholds2[i];
      span.style.opacity = visible ? '1' : '0';
      span.style.filter = visible ? 'blur(0px)' : 'blur(16px)';
    });
  });

  return (
    <div ref={containerRef} style={{ height: '300vh' }}>
      <div className="sticky top-0 min-h-[100svh] w-full overflow-hidden flex items-center justify-center">

        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/garden.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-[1300px] mx-auto px-8 gap-2">

          {/* Line 1 */}
          <div
            className="font-serif font-normal leading-[1.08] tracking-[-0.01em] text-white"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
            aria-label={LINE1}
          >
            {LINE1.split('').map((char, i) => (
              <span
                key={i}
                ref={(el) => { line1Refs.current[i] = el; }}
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  filter: 'blur(16px)',
                  transition: 'opacity 0.4s ease, filter 0.4s ease',
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Line 2 */}
          <div
            className="font-serif font-normal leading-[1.08] tracking-[-0.01em] text-white"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
            aria-label={LINE2}
          >
            {LINE2.split('').map((char, i) => (
              <span
                key={i}
                ref={(el) => { line2Refs.current[i] = el; }}
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  filter: 'blur(16px)',
                  transition: 'opacity 0.4s ease, filter 0.4s ease',
                }}
              >
                {char}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
