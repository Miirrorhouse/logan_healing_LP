import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from '@phosphor-icons/react';

const ease = [0.32, 0.72, 0, 1] as const;

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying(!playing);
  };

  return (
    <section
      className="w-full px-6 sm:px-8"
      style={{ backgroundColor: 'transparent', paddingTop: '6rem', paddingBottom: '2rem' }}
    >
      <div className="max-w-[1300px] mx-auto">

        {/* 16:9 video container */}
        <div
          className="relative w-full rounded-[20px] group cursor-pointer"
          style={{ aspectRatio: '16 / 9', overflow: 'hidden', isolation: 'isolate' }}
          onClick={handleToggle}
        >
          <video
            ref={videoRef}
            src="/videos/full_activation.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ borderRadius: '20px' }}
            playsInline
            preload="metadata"
            onEnded={() => setPlaying(false)}
          />

          {/* Overlay — fades out when playing */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              backgroundColor: 'rgba(13,27,62,0.45)',
              opacity: playing ? 0 : 1,
            }}
          />

          {/* Play / Pause button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              key={playing ? 'pause' : 'play'}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: playing ? 0 : 1 }}
              transition={{ duration: 0.25, ease }}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#f0ebe0' }}
            >
              {playing
                ? <Pause weight="fill" className="w-6 h-6" style={{ color: '#0d1b3e' }} />
                : <Play weight="fill" className="w-6 h-6 translate-x-0.5" style={{ color: '#0d1b3e' }} />
              }
            </motion.div>
          </div>

          {/* Show pause button on hover while playing */}
          {playing && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(240,235,224,0.85)' }}
              >
                <Pause weight="fill" className="w-6 h-6" style={{ color: '#0d1b3e' }} />
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
