import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

interface HeroProps {
  onSeeWorksClick: () => void;
  onReachOutClick?: () => void;
}

const projectTopics = ['Modern Frontend', 'HTML5 & CSS3', 'Web Development', 'Interactive Media'];
const HLS_STREAM_URL =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export const Hero: React.FC<HeroProps> = ({ onSeeWorksClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [topicIndex, setTopicIndex] = useState(0);

  // Cycle project topics every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTopicIndex((prev) => (prev + 1) % projectTopics.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // HLS Video Stream Setup
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
        video.play().catch(() => {
          // Auto-play was prevented; video will remain muted
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native iOS / Safari HLS support
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

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
        0.3
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-bg text-text-primary px-6"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 brightness-75 contrast-125"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero Content (centered, z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center pt-24 pb-16">
        {/* Eyebrow */}
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 font-medium">
          PROJECT
        </p>

        {/* Title */}
        <h1 className="name-reveal text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic leading-[1.05] tracking-tight text-text-primary mb-6 select-none max-w-4xl">
          Introduction to Website Creation
        </h1>

        {/* Project line */}
        <div className="blur-in text-base md:text-xl text-muted font-light mb-4 flex items-center justify-center gap-2 flex-wrap">
          <span>An Educational Web Project for</span>
          <span
            key={topicIndex}
            className="font-display italic text-text-primary text-xl md:text-2xl animate-role-fade-in inline-block font-normal"
          >
            {projectTopics[topicIndex]}
          </span>
          <span>Learning &amp; Practice.</span>
        </div>

        {/* Description */}
        <p className="blur-in text-base md:text-lg text-muted/90 max-w-2xl mb-12 leading-relaxed font-light">
          Project on the Development of an Educational Website for an Introductory Web Design Course
        </p>

        {/* CTA Button */}
        <div className="blur-in inline-flex items-center justify-center">
          {/* "Course Content": Solid button */}
          <div className="relative group rounded-full">
            <span
              className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 pointer-events-none"
              aria-hidden="true"
            />
            <button
              onClick={onSeeWorksClick}
              className="rounded-full text-sm font-medium px-8 py-3.5 bg-text-primary text-bg transition-all duration-300 group-hover:bg-bg group-hover:text-text-primary hover:scale-105 cursor-pointer whitespace-nowrap shadow-lg shadow-black/20"
            >
              Course Content
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
        <span className="text-xs text-muted uppercase tracking-[0.2em] mb-2 font-medium">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-1/2 accent-gradient animate-scroll-down absolute inset-x-0" />
        </div>
      </div>
    </section>
  );
};
