import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Declaring YT types for window
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YOUTUBE_VIDEO_ID = 'qt3rAummHGg';
const YOUTUBE_URL = `https://youtu.be/${YOUTUBE_VIDEO_ID}`;

interface MusicPlayerProps {
  autoStart?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoStart = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  const playerRef = useRef<any>(null);
  const timeIntervalRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Master ON / OFF toggle
  const togglePower = () => {
    if (!playerRef.current) return;
    if (isPlaying && !isMuted) {
      // Turn OFF
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      // Turn ON
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      }
      if (volume === 0) {
        setVolume(80);
        playerRef.current.setVolume(80);
      }
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  // Trigger auto-start when requested or ready (if autoPlayEnabled is true)
  useEffect(() => {
    if (autoStart && autoPlayEnabled && playerRef.current && isReady && !isPlaying) {
      try {
        playerRef.current.playVideo();
      } catch (_) {}
    }
  }, [autoStart, autoPlayEnabled, isReady, isPlaying]);

  // Initialize YouTube Iframe API
  useEffect(() => {
    // If API script is not already present, inject it
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      try {
        if (!window.YT || !window.YT.Player) return;
        playerRef.current = new window.YT.Player('yt-bg-player', {
          height: '100%',
          width: '100%',
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event: any) => {
              setIsReady(true);
              event.target.setVolume(volume || 80);
              const dur = event.target.getDuration();
              if (dur) setDuration(dur);
              
              // Auto-start playback immediately
              try {
                event.target.playVideo();
              } catch (_) {}

              // Setup one-time user interaction listener if browser policy blocks initial autoplay
              const startOnInteraction = () => {
                try {
                  if (event.target && event.target.playVideo) {
                    event.target.playVideo();
                  }
                } catch (_) {}
                cleanupListeners();
              };

              const cleanupListeners = () => {
                window.removeEventListener('click', startOnInteraction);
                window.removeEventListener('keydown', startOnInteraction);
                window.removeEventListener('touchstart', startOnInteraction);
                window.removeEventListener('scroll', startOnInteraction);
              };

              window.addEventListener('click', startOnInteraction, { once: true, passive: true });
              window.addEventListener('keydown', startOnInteraction, { once: true, passive: true });
              window.addEventListener('touchstart', startOnInteraction, { once: true, passive: true });
              window.addEventListener('scroll', startOnInteraction, { once: true, passive: true });
            },
            onStateChange: (event: any) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false);
                if (event.data === 0) {
                  // Loop video when ended
                  event.target.seekTo(0);
                  event.target.playVideo();
                }
              }
            },
          },
        });
      } catch (err) {
        console.warn('YouTube player initialization note:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (_) {}
      }
    };
  }, []);

  // Update current time on interval when playing
  useEffect(() => {
    if (isPlaying) {
      timeIntervalRef.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          const curr = playerRef.current.getCurrentTime() || 0;
          setCurrentTime(curr);
          const dur = playerRef.current.getDuration() || 0;
          if (dur && dur !== duration) setDuration(dur);
        }
      }, 500);
    } else {
      if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
    }

    return () => {
      if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
    };
  }, [isPlaying, duration]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(newTime, true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseInt(e.target.value, 10);
    setVolume(newVol);
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(newVol);
      if (newVol === 0) {
        setIsMuted(true);
        playerRef.current.mute();
      } else if (isMuted) {
        setIsMuted(false);
        playerRef.current.unMute();
      }
    }
  };

  const increaseVolume = () => {
    const newVol = Math.min(100, (isMuted ? 0 : volume) + 10);
    setVolume(newVol);
    if (isMuted) {
      setIsMuted(false);
      if (playerRef.current && playerRef.current.unMute) {
        playerRef.current.unMute();
      }
    }
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(newVol);
    }
  };

  const decreaseVolume = () => {
    const newVol = Math.max(0, (isMuted ? 0 : volume) - 10);
    setVolume(newVol);
    if (newVol === 0) {
      setIsMuted(true);
      if (playerRef.current && playerRef.current.mute) {
        playerRef.current.mute();
      }
    } else {
      if (playerRef.current && playerRef.current.setVolume) {
        playerRef.current.setVolume(newVol);
      }
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume || 80);
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const skipSeconds = (seconds: number) => {
    if (!playerRef.current || !playerRef.current.getCurrentTime) return;
    const current = playerRef.current.getCurrentTime() || 0;
    const target = Math.max(0, Math.min(duration || 99999, current + seconds));
    playerRef.current.seekTo(target, true);
    setCurrentTime(target);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-6 z-40 select-none flex flex-col items-start"
    >
      {/* Hidden YouTube Iframe mount point (remains active in DOM to stream audio) */}
      <div
        className={`transition-all duration-300 overflow-hidden rounded-xl border border-white/10 mb-3 shadow-2xl bg-black ${
          showVideo && isExpanded
            ? 'w-72 sm:w-80 h-44 opacity-100'
            : 'w-px h-px opacity-0 pointer-events-none absolute -left-[9999px]'
        }`}
      >
        <div id="yt-bg-player" className="w-full h-full" />
      </div>

      {/* Expanded Mini-Player Modal / Card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-72 sm:w-80 bg-surface/95 border border-stroke rounded-2xl p-5 shadow-2xl backdrop-blur-xl mb-3 relative overflow-hidden"
          >
            {/* Ambient accent backlight glow */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#4E85BF]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top header bar with Auto-Play ON/OFF Toggle */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-muted">
                  Atmospheric Audio
                </span>
              </div>

              {/* Auto-Play Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase font-mono tracking-wider text-muted/70">
                  Auto:
                </span>
                <button
                  type="button"
                  onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
                  className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 focus:outline-none ${
                    autoPlayEnabled ? 'bg-[#4E85BF]' : 'bg-stroke/60'
                  }`}
                  role="switch"
                  aria-checked={autoPlayEnabled}
                  title={autoPlayEnabled ? 'Auto-Start: ON' : 'Auto-Start: OFF'}
                >
                  <span
                    className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 ${
                      autoPlayEnabled ? 'translate-x-3' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-[10px] font-mono text-[#89AACC] mr-1">
                  {autoPlayEnabled ? 'ON' : 'OFF'}
                </span>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-6 h-6 rounded-full bg-stroke/50 hover:bg-stroke text-muted hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer text-xs ml-1"
                  title="Minimize player"
                  aria-label="Minimize player"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Track Info with Spinning Vinyl Thumbnail */}
            <div className="flex items-center gap-4 mb-4">
              {/* Spinning Vinyl */}
              <div
                onClick={togglePlay}
                className="relative w-14 h-14 rounded-full flex items-center justify-center p-0.5 shrink-0 cursor-pointer group"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isPlaying
                      ? 'accent-gradient animate-gradient-shift'
                      : 'border border-stroke'
                  }`}
                />
                <div className="relative w-full h-full rounded-full bg-bg flex items-center justify-center overflow-hidden p-1">
                  <img
                    src="/assets/aistudio/vinyl_9693ff02.png"
                    alt="Vinyl Player"
                    className={`w-full h-full object-contain invert contrast-125 transition-transform duration-500 ${
                      isPlaying ? 'animate-[spin_4s_linear_infinite]' : 'opacity-80'
                    }`}
                  />
                </div>
              </div>

              {/* Title & Artist with Custom Mascot Icon */}
              <div className="overflow-hidden flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <h4 className="text-base font-display italic text-text-primary truncate font-normal">
                      Hollowness.
                    </h4>
                    <a
                      href={YOUTUBE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-text-primary text-xs shrink-0"
                      title="Open on YouTube"
                    >
                      ↗
                    </a>
                  </div>

                  {/* Headphone Mascot Icon */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    className={`w-8 h-8 rounded-full flex items-center justify-center p-1 border transition-all cursor-pointer shrink-0 ${
                      isPlaying
                        ? 'border-[#89AACC] bg-[#89AACC]/20 shadow-[0_0_10px_rgba(137,170,204,0.3)] animate-[pulse_2s_infinite]'
                        : 'border-stroke bg-stroke/30 hover:border-white/20 opacity-70'
                    }`}
                    title={isPlaying ? 'กำลังฟังเพลง / Listening' : 'คลิกเพื่อฟังเพลง / Click to listen'}
                  >
                    <img
                      src="/assets/aistudio/middle-finger_8e7dbcc2.png"
                      alt="Headphone Mascot Icon"
                      className={`w-full h-full object-contain invert contrast-125 transition-transform ${
                        isPlaying ? 'animate-bounce' : ''
                      }`}
                    />
                  </button>
                </div>
                <p className="text-[11px] text-muted truncate">
                  Dark Souls Focus & Ambient
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-[#89AACC] font-mono flex items-center gap-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-muted/40'
                      }`}
                    />
                    {isPlaying ? 'Now Streaming' : isReady ? 'Ready to play' : 'Connecting...'}
                  </span>
                </div>
              </div>
            </div>

            {/* Scrubber Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-stroke/60 rounded-lg appearance-none cursor-pointer accent-[#89AACC]"
              />
              <div className="flex justify-between text-[10px] text-muted font-mono mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{duration ? formatTime(duration) : 'Live / Stream'}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              {/* Skip back 10s */}
              <button
                onClick={() => skipSeconds(-10)}
                className="w-8 h-8 rounded-full bg-stroke/30 hover:bg-stroke/60 text-muted hover:text-text-primary flex items-center justify-center transition-colors text-xs font-mono cursor-pointer"
                title="Rewind 10 seconds"
              >
                -10
              </button>

              {/* Main Play / Pause Button with Accent Gradient */}
              <div className="relative group rounded-full">
                <span
                  className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  aria-hidden="true"
                />
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-text-primary text-bg hover:bg-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-lg"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <span className="text-sm font-bold tracking-tighter">❚❚</span>
                  ) : (
                    <span className="text-base font-bold ml-0.5">▶</span>
                  )}
                </button>
              </div>

              {/* Skip forward 10s */}
              <button
                onClick={() => skipSeconds(10)}
                className="w-8 h-8 rounded-full bg-stroke/30 hover:bg-stroke/60 text-muted hover:text-text-primary flex items-center justify-center transition-colors text-xs font-mono cursor-pointer"
                title="Forward 10 seconds"
              >
                +10
              </button>
            </div>

            {/* Volume & Power Bar with Custom Icons (Fingerprint, Smiley=ลดเสียง, Like=เพิ่มเสียง) */}
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-stroke/40 text-xs">
              {/* Master Power with Fingerprint Icon */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={togglePower}
                  className={`w-7 h-7 rounded-full flex items-center justify-center p-1 border transition-all cursor-pointer ${
                    isPlaying && !isMuted
                      ? 'border-[#89AACC] bg-[#89AACC]/20 shadow-[0_0_8px_rgba(137,170,204,0.4)]'
                      : 'border-stroke bg-stroke/30 hover:border-white/20'
                  }`}
                  role="switch"
                  aria-checked={isPlaying && !isMuted}
                  title={isPlaying && !isMuted ? 'แตะลายนิ้วมือเพื่อปิดเสียง (Turn OFF)' : 'แตะลายนิ้วมือเพื่อเปิดเสียง (Turn ON)'}
                >
                  <img
                    src="/assets/aistudio/fingerprint_cf7d0de4.png"
                    alt="Power Touch"
                    className={`w-full h-full object-contain invert ${
                      isPlaying && !isMuted ? 'opacity-100' : 'opacity-40'
                    }`}
                  />
                </button>
                <span className="text-[10px] font-mono font-medium">
                  {isPlaying && !isMuted ? (
                    <span className="text-[#89AACC]">ON</span>
                  ) : (
                    <span className="text-muted/60">OFF</span>
                  )}
                </span>
              </div>

              {/* Volume Controls: Smiley (ลดเสียง) | Slider | Like (เพิ่มเสียง) */}
              <div className="flex items-center gap-1.5 flex-1 justify-center">
                {/* Smiley: ลดเสียง (Decrease Volume) */}
                <button
                  type="button"
                  onClick={decreaseVolume}
                  className="w-7 h-7 rounded-full bg-stroke/30 hover:bg-stroke/70 border border-stroke/60 hover:border-white/20 flex items-center justify-center p-1 transition-all hover:scale-110 active:scale-90 cursor-pointer shrink-0"
                  title="ลดเสียง (Smiley -10%)"
                >
                  <img
                    src="/assets/aistudio/smiley_5633b6ac.png"
                    alt="ลดเสียง"
                    className="w-full h-full object-contain"
                  />
                </button>

                {/* Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 sm:w-16 h-1 bg-stroke/60 rounded-lg appearance-none cursor-pointer accent-[#89AACC]"
                  title={`ระดับเสียง: ${isMuted ? 0 : volume}%`}
                />

                {/* Like: เพิ่มเสียง (Increase Volume) */}
                <button
                  type="button"
                  onClick={increaseVolume}
                  className="w-7 h-7 rounded-full bg-stroke/30 hover:bg-stroke/70 border border-stroke/60 hover:border-white/20 flex items-center justify-center p-1 transition-all hover:scale-110 active:scale-90 cursor-pointer shrink-0"
                  title="เพิ่มเสียง (Like +10%)"
                >
                  <img
                    src="/assets/aistudio/like_64a82e16.png"
                    alt="เพิ่มเสียง"
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>

              {/* Video Preview Toggle */}
              <button
                type="button"
                onClick={() => setShowVideo(!showVideo)}
                className={`text-[10px] px-2 py-0.5 rounded-full border transition-all cursor-pointer font-mono shrink-0 ${
                  showVideo
                    ? 'border-[#89AACC] text-[#89AACC] bg-[#89AACC]/10'
                    : 'border-stroke text-muted hover:text-text-primary'
                }`}
                title={showVideo ? 'ซ่อนวิดีโอ' : 'ดูวิดีโอ'}
              >
                {showVideo ? 'Hide' : 'Video'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill / Collapsed Audio Icon (Always accessible at bottom-left) */}
      <div
        className={`inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-surface/90 border border-white/10 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-white/20 hover:bg-surface group cursor-pointer ${
          isPlaying ? 'border-[#89AACC]/40 shadow-[#4E85BF]/10' : ''
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Spinning Vinyl Record Icon */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="relative w-9 h-9 rounded-full flex items-center justify-center p-[1px] shrink-0"
          title={isPlaying ? 'Pause' : 'Play music'}
        >
          {/* Gradient Ring when active */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-300 ${
              isPlaying ? 'accent-gradient animate-gradient-shift' : 'border border-stroke'
            }`}
          />
          {/* Vinyl Image */}
          <div className="relative w-full h-full rounded-full bg-bg flex items-center justify-center overflow-hidden p-1">
            <img
              src="/assets/aistudio/vinyl_9693ff02.png"
              alt="Music Vinyl"
              className={`w-full h-full object-contain invert contrast-125 transition-transform duration-300 ${
                isPlaying ? 'animate-[spin_4s_linear_infinite]' : 'opacity-80'
              }`}
            />
          </div>
        </div>

        {/* Text & Visualizer */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-text-primary group-hover:text-white transition-colors">
              Hollowness.
            </span>
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3 ml-1">
                <span className="w-0.5 h-3 bg-[#89AACC] animate-[bounce_0.8s_infinite] rounded-full" />
                <span className="w-0.5 h-2 bg-[#89AACC] animate-[bounce_1.1s_infinite] rounded-full" />
                <span className="w-0.5 h-3.5 bg-[#4E85BF] animate-[bounce_0.9s_infinite] rounded-full" />
                <span className="w-0.5 h-1.5 bg-[#4E85BF] animate-[bounce_1.3s_infinite] rounded-full" />
              </div>
            )}
          </div>
          <span className="text-[10px] text-muted font-mono leading-none mt-0.5">
            {isPlaying ? 'Atmospheric Ambience' : 'Click to play audio'}
          </span>
        </div>

        {/* Quick ON / OFF Switch Badge */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePower();
          }}
          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border transition-all cursor-pointer flex items-center gap-1 shrink-0 ml-1 ${
            isPlaying && !isMuted
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
              : 'bg-stroke/40 text-muted/70 border-stroke hover:text-text-primary hover:border-white/20'
          }`}
          title={isPlaying && !isMuted ? 'คลิกเพื่อปิดเสียง (Turn OFF)' : 'คลิกเพื่อเปิดเสียง (Turn ON)'}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isPlaying && !isMuted ? 'bg-emerald-400 animate-pulse' : 'bg-stroke'
            }`}
          />
          <span>{isPlaying && !isMuted ? 'ON' : 'OFF'}</span>
        </button>

        {/* Small expand / play indicator */}
        <div className="ml-0.5 text-muted group-hover:text-text-primary text-xs transition-colors">
          {isExpanded ? '▾' : '▴'}
        </div>
      </div>
    </div>
  );
};
