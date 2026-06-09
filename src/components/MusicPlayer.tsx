"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Set initial volume when loaded
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle autoplay on first user interaction
  useEffect(() => {
    const startAudio = () => {
      if (hasInteracted) return;
      
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
            cleanupListeners();
          })
          .catch((err) => {
            console.log("Autoplay blocked, waiting for explicit user interaction.", err);
          });
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("scroll", startAudio);
      window.removeEventListener("touchstart", startAudio);
    };

    window.addEventListener("click", startAudio, { passive: true });
    window.addEventListener("scroll", startAudio, { passive: true });
    window.addEventListener("touchstart", startAudio, { passive: true });

    return () => {
      cleanupListeners();
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(err => console.log("Play failed: ", err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black/75 backdrop-blur-md border border-neutral-800/80 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:shadow-xl group">
      <audio ref={audioRef} src="/music.mp3" loop />
      
      {/* Sound Visualizer Bars */}
      <div className="flex items-end gap-[3px] h-4 w-4 mr-1">
        {[0.6, 1.0, 0.4, 0.8].map((speed, i) => (
          <span
            key={i}
            className={`w-[2px] bg-white rounded-full transition-all duration-300 origin-bottom`}
            style={{
              height: isPlaying ? "100%" : "20%",
              animation: isPlaying ? `soundWave 1.2s ease-in-out infinite alternate` : "none",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      <button
        onClick={togglePlay}
        className="p-1.5 rounded-full hover:bg-neutral-900 text-neutral-100 transition-colors"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
      </button>

      <div className="flex items-center gap-1.5 overflow-hidden w-0 group-hover:w-28 transition-all duration-500 ease-out">
        <button
          onClick={toggleMute}
          className="p-1 hover:bg-neutral-900 text-neutral-300 rounded"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-200 focus:outline-none"
        />
      </div>

      {/* Global CSS Style tag for the keyframe animation of the wave */}
      <style jsx global>{`
        @keyframes soundWave {
          0% {
            transform: scaleY(0.15);
          }
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
}
