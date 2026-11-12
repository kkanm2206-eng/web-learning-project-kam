import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

interface FooterProps {
  onContactClick?: () => void;
}

const HLS_STREAM_URL =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export const Footer: React.FC<FooterProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Background HLS Video (flipped vertically)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: Hls | null = null;

    if (Hls.isSupported()) {
      hlsInstance = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsInstance.loadSource(HLS_STREAM_URL);
      hlsInstance.attachMedia(video);
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_STREAM_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, []);

  // GSAP Marquee animation: xPercent: -50, duration 40, ease "none", repeat -1
  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.marquee-inner', {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const marqueeText = 'Congratulations! You have successfully completed your learning! WoW!!!! • '.repeat(6);



  return (
    <footer
      id="contact"
      className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden border-t border-stroke/50"
    >
      {/* Background Video: Flipped vertically with scale-y-[-1] & Heavier overlay: bg-black/60 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-70 contrast-125"
        />
        {/* Dark overlay: bg-black/60 */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* GSAP Marquee */}
        <div
          ref={marqueeRef}
          className="w-full overflow-hidden whitespace-nowrap py-4 mb-16 md:mb-24 select-none opacity-85"
        >
          <div className="marquee-inner inline-flex text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic tracking-wider text-text-primary/70">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto px-6 text-center mb-20 md:mb-28">
          <p className="text-xs text-muted tracking-[0.2em] font-medium mb-4 font-['Prompt',sans-serif]">
            You เรียนจบแล้ว
          </p>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-text-primary/95 tracking-wide mb-8 font-['FC_Retrofit','FCRetrofit','FC-Retrofit','Chakra_Petch','Inter',sans-serif] leading-relaxed flex flex-col gap-4">
            <span>
              If you have read and fully understood all the content on this website, and you believe that you have mastered the knowledge and skills, then congratulations!
            </span>
            <span className="text-muted/90 text-sm sm:text-base md:text-lg">
              It&apos;s time to leave the classroom, put your knowledge into practice, resign from your studies, and go out into the real world to find a job!
            </span>
            <span className="font-display italic text-xl sm:text-2xl md:text-3xl text-text-primary mt-1">
              Good luck with your future career!
            </span>
          </h2>


        </div>

        {/* Footer Bar */}
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 text-xs text-muted bg-transparent">
          {/* Availability Status */}
          <div className="flex items-center gap-2.5 bg-transparent">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block shrink-0" />
            <span className="text-text-primary/90 font-medium bg-transparent">Available for projects</span>
            <span className="text-muted/60 font-mono hidden sm:inline bg-transparent">· Q1 / Q2 2026</span>
          </div>

          {/* Credits */}
          <div className="text-xs text-text-primary/95 font-['Prompt',sans-serif] tracking-wide font-normal flex items-center gap-2 flex-wrap bg-transparent">
            <span className="text-text-primary/95 bg-transparent">จัดทำโดย</span>
            <span className="font-['Researcher',sans-serif] text-[13px] text-text-primary/95 tracking-widest font-normal bg-transparent">
              Miss Phimchanok Suksanguan &amp; Mr. Kunanon Mokhom
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
