"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Music, ArrowUpRight, RotateCw, Volume2, Play } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  spotifyId: string;
  note: string;
}

const tracks: Track[] = [
  {
    id: 1,
    title: "If You Love Her",
    artist: "Forest Blakk",
    duration: "3:51",
    spotifyId: "727Z2S2mtNH46CbP9EWPwY",
    note: "A gentle reminder of what it means to hold onto love with everything you have."
  },
  {
    id: 2,
    title: "a thousand years",
    artist: "Christina Perri",
    duration: "4:45",
    spotifyId: "6lanRgr6wXibZr8KgzXxBl",
    note: "Some connections feel like they have existed for lifetimes. A promise of forever."
  },
  {
    id: 3,
    title: "Photograph",
    artist: "Ed Sheeran",
    duration: "4:18",
    spotifyId: "1HNkqx9Ahdgi1Ixy2xkKkL",
    note: "We keep these moments in photographs, making time stand still so we never grow apart."
  },
  {
    id: 4,
    title: "Best Friend",
    artist: "Rex Orange County",
    duration: "4:21",
    spotifyId: "3rPtS4nfpy7PsARctAWpzd",
    note: "Because you are, and always will be, my favorite person to share everything with."
  },
  {
    id: 5,
    title: "Raabta",
    artist: "Pritam & Arijit Singh",
    duration: "4:03",
    spotifyId: "6FjbAnaPRPwiP3sciEYctO",
    note: "An unspoken bond, a connection that feels destined and perfectly written."
  },
  {
    id: 6,
    title: "Haan Main Galat",
    artist: "Pritam & Arijit Singh",
    duration: "3:39",
    spotifyId: "068HSvCf5MbQfhV4qqaelg",
    note: "For the playful, chaotic moments where we just laugh and let things be imperfectly perfect."
  },
  {
    id: 7,
    title: "Mundhinam",
    artist: "Harris Jayaraj & Naresh Iyer",
    duration: "5:10",
    spotifyId: "1n5gnI3Wue9WBpYFOIQNh1",
    note: "A sweet, nostalgic melody that brings back the butterflies of the early days."
  },
  {
    id: 8,
    title: "Ayyayo",
    artist: "G.V. Prakash Kumar & S.P. Balasubrahmanyam",
    duration: "5:24",
    spotifyId: "5DYfTyqUNBmOnQtljQjYk2",
    note: "A soulful tune that captures the quiet depth of feeling when words are not enough."
  }
];

export default function SpotifySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll tracking for vinyl reveal parallax
  const { scrollYProgress } = useScroll({
    target: isMounted ? sectionRef : undefined,
    offset: ["start end", "end start"],
  });

  // Parallax shifts for layout balance
  const textY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const deckY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Vinyl slide out: slides out from behind sleeve as section enters viewport
  const recordX = useTransform(scrollYProgress, [0.15, 0.45], [0, 115]);
  // Needle/tonearm rotates onto record as it slides out
  const tonearmRotate = useTransform(scrollYProgress, [0.25, 0.5], [-50, 8]);

  const playlistUrl = "https://open.spotify.com/playlist/0DKAGhhnwKJ6mkoucXqUcd?si=qoSEtPNTSOWSz946hoT2Cw&pi=OAAqniTwTPqWC";
  const embedUrl = "https://open.spotify.com/embed/playlist/0DKAGhhnwKJ6mkoucXqUcd?utm_source=generator&theme=0";

  const activeTrack = tracks[activeTrackIndex];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-black py-24 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden border-b border-neutral-900"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Column - Soundtrack Story and Tracklist */}
        <motion.div
          style={{ y: textY }}
          className="w-full lg:w-[50%] flex flex-col items-start z-10"
        >
          <span className="text-[8px] font-accent uppercase text-neutral-500 tracking-widest font-light mb-4 block">
            Soundtrack // Collection
          </span>
          <h2 className="text-4xl sm:text-5xl font-light text-neutral-100 font-serif tracking-wide leading-tight mb-4 text-glow">
            Songs We Share.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6 max-w-md">
            Every shared moment has a rhythm. These tracks have played in the background of our chapters—reminding us of laughters, quiet evenings, and everything in between.
          </p>

          {/* Interactive Track Booklet */}
          <div className="w-full flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
            {tracks.map((track, index) => {
              const isActive = activeTrackIndex === index;
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrackIndex(index)}
                  className={`group relative w-full flex items-center justify-between text-left p-3.5 rounded-xl border transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "bg-white text-black border-white shadow-lg shadow-white/5"
                      : "bg-neutral-950/45 text-neutral-400 border-neutral-900/80 hover:border-neutral-850 hover:text-neutral-200"
                  }`}
                >
                  <div className="flex items-center gap-4.5 pr-2">
                    <span className={`font-mono text-[9px] tracking-tighter ${isActive ? "text-black" : "text-neutral-600"}`}>
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium tracking-wide font-sans line-clamp-1">
                        {track.title}
                      </span>
                      <span className={`text-[9px] font-light mt-0.5 line-clamp-1 ${isActive ? "text-neutral-700" : "text-neutral-500"}`}>
                        {track.artist}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {isActive ? (
                      // Active mini audio waves visualizer
                      <div className="flex items-end gap-[2px] h-3 w-4.5 pb-[2px]" aria-hidden="true">
                        <div className="w-[2px] h-full bg-black rounded-full animate-sound-wave-bar origin-bottom" style={{ animationDelay: "0.1s" }} />
                        <div className="w-[2px] h-full bg-black rounded-full animate-sound-wave-bar origin-bottom" style={{ animationDelay: "0.3s" }} />
                        <div className="w-[2px] h-full bg-black rounded-full animate-sound-wave-bar origin-bottom" style={{ animationDelay: "0.5s" }} />
                        <div className="w-[2px] h-full bg-black rounded-full animate-sound-wave-bar origin-bottom" style={{ animationDelay: "0.2s" }} />
                      </div>
                    ) : (
                      <>
                        <span className="font-mono text-[9px] text-neutral-500 group-hover:opacity-0 transition-opacity duration-300">
                          {track.duration}
                        </span>
                        <Play size={10} className="absolute right-4.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neutral-300" />
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic Story Note of Selected Track */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrackIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 w-full p-4.5 bg-neutral-950/60 border border-neutral-900 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-neutral-100" />
              <span className="text-[7px] font-accent uppercase text-neutral-500 tracking-widest font-light block mb-2">
                Song Chapter Reflection
              </span>
              <p className="text-xs text-neutral-250 font-light font-serif italic leading-relaxed">
                &ldquo;{activeTrack.note}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Right Column - 3D Vinyl Player Card */}
        <motion.div
          style={{ y: deckY }}
          className="w-full lg:w-[42%] flex justify-center items-center z-10"
        >
          {/* Card Wrapper with Perspective for 3D flip */}
          <div className="relative w-full max-w-[390px] xs:max-w-[420px] h-[390px] perspective-1000">
            <motion.div
              className="w-full h-full preserve-3d relative"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              
              {/* FRONT SIDE (Virtual Turntable Deck) */}
              <div className="absolute inset-0 backface-hidden w-full h-full bg-neutral-900/35 border border-neutral-850 backdrop-blur-md rounded-3xl p-5.5 flex flex-col justify-between shadow-2xl">
                
                {/* Turntable Top bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-md shadow-red-500/50" />
                    <span className="text-[7px] font-accent uppercase text-neutral-400 tracking-wider">
                      Side A // Analog Turntable
                    </span>
                  </div>
                  
                  {/* Flip to Spotify widget */}
                  <button
                    onClick={() => setIsFlipped(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950/80 hover:bg-neutral-100 hover:text-black text-neutral-400 border border-neutral-850 hover:border-white rounded-full text-[7px] font-accent uppercase tracking-wider transition-all duration-300 cursor-pointer"
                  >
                    <RotateCw size={8} />
                    <span>Load Live Player</span>
                  </button>
                </div>

                {/* Main Deck Area with Record & Sleeve */}
                <div className="relative w-full h-56 flex items-center justify-start mt-4 px-2">
                  
                  {/* Vinyl Record (slides out) */}
                  <motion.div
                    className="absolute w-44 h-44 rounded-full shadow-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center animate-spin-slow z-10"
                    style={{
                      x: recordX,
                      background: "repeating-radial-gradient(circle, #000, #000 4px, #181818 5px, #000 6px)"
                    }}
                  >
                    {/* Concentric grooved overlay rings */}
                    <div className="absolute inset-2 border border-neutral-900/40 rounded-full" />
                    <div className="absolute inset-6 border border-neutral-900/30 rounded-full" />
                    <div className="absolute inset-10 border border-neutral-900/20 rounded-full" />
                    
                    {/* Center Vinyl Label */}
                    <div className="w-13 h-13 rounded-full bg-neutral-100 flex flex-col items-center justify-center text-black p-1 relative shadow-inner z-10">
                      <span className="text-[8px] font-bold font-serif tracking-tight leading-none text-center truncate w-full">
                        SEJ
                      </span>
                      <span className="text-[4px] font-accent tracking-widest text-neutral-500 mt-1 leading-none uppercase text-center w-full">
                        Side A
                      </span>
                      <span className="text-[4px] font-light font-mono text-neutral-400 mt-0.5 scale-90">
                        RPM 33
                      </span>
                      {/* Spindle hole */}
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-neutral-800 absolute top-[43%] left-[41%] shadow-inner" />
                    </div>
                  </motion.div>

                  {/* Album Cover Sleeve (static, z-index overlays vinyl) */}
                  <div className="w-44 h-44 rounded-2xl bg-neutral-950 border border-neutral-850 flex flex-col justify-between p-4.5 shadow-2xl relative z-20 overflow-hidden">
                    {/* Matte Paper Texture */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/10 via-transparent to-white/5 pointer-events-none" />
                    
                    <span className="text-[7px] font-accent uppercase text-neutral-500 tracking-widest font-light">
                      LP Record // Volume 01
                    </span>

                    <div className="flex flex-col">
                      <span className="text-3xl font-serif font-light text-neutral-100 tracking-wide">
                        SEJ
                      </span>
                      <span className="text-[6px] font-accent uppercase text-neutral-400 tracking-widest mt-1.5 block">
                        A Soundtrack for Us
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-neutral-900 pt-2 mt-2">
                      <span className="text-[5px] font-mono text-neutral-600">
                        &copy; 2026 CO.
                      </span>
                      <Music size={9} className="text-neutral-600" />
                    </div>
                  </div>

                  {/* Turntable Tonearm / Needle (rotates onto the vinyl) */}
                  <motion.div
                    style={{ rotate: tonearmRotate }}
                    className="absolute top-1 right-8 w-24 h-28 origin-top-right z-30 pointer-events-none"
                    transition={{ type: "spring", stiffness: 40, damping: 12 }}
                  >
                    {/* Metal arm line */}
                    <svg width="100%" height="100%" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Stylus base pivot */}
                      <circle cx="85" cy="15" r="10" fill="#262626" stroke="#404040" strokeWidth="1" />
                      <circle cx="85" cy="15" r="4" fill="#171717" />
                      
                      {/* Main Arm */}
                      <path d="M 85 15 L 45 95 L 35 110" stroke="#737373" strokeWidth="2.5" strokeLinecap="round" />
                      
                      {/* Cartridge headshell */}
                      <rect x="26" y="105" width="14" height="8" rx="1" transform="rotate(-30 26 105)" fill="#171717" stroke="#404040" />
                      {/* Stylus tip highlight */}
                      <circle cx="27" cy="111" r="1" fill="#ef4444" />
                    </svg>
                  </motion.div>
                </div>

                {/* LCD Digital Dashboard screen */}
                <div className="w-full bg-neutral-950/80 border border-neutral-900 rounded-xl p-3.5 font-mono text-[9px] text-neutral-400 flex flex-col gap-1 mt-auto">
                  <div className="flex justify-between border-b border-neutral-900/60 pb-1">
                    <span className="text-neutral-500">SYSTEM STATE:</span>
                    <span className="text-neutral-300 animate-pulse">PLAYING // ONLINE</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-neutral-500">ACTIVE TRACK:</span>
                    <span className="text-neutral-200 uppercase truncate max-w-[190px]">
                      {(activeTrackIndex + 1).toString().padStart(2, "0")} / {activeTrack.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">ARTIST:</span>
                    <span className="text-neutral-300 truncate max-w-[190px]">
                      {activeTrack.artist}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1 pt-1.5 border-t border-neutral-900/60 text-[8px] text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Volume2 size={9} />
                      AUDIO ROUTE: DECK_OUT
                    </span>
                    <span>33 1/3 RPM</span>
                  </div>
                </div>

              </div>

              {/* BACK SIDE (Embedded Spotify Player) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full bg-neutral-900/35 border border-neutral-850 backdrop-blur-md rounded-3xl p-5.5 flex flex-col justify-between shadow-2xl">
                
                {/* Header Back Button */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-850/60 mb-3">
                  <div className="flex items-center gap-2">
                    <Music size={12} className="text-neutral-400 animate-pulse" />
                    <span className="text-[7px] font-accent uppercase text-neutral-400 tracking-wider">
                      Spotify Live Player
                    </span>
                  </div>

                  {/* Flip back button */}
                  <button
                    onClick={() => setIsFlipped(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950/80 hover:bg-neutral-100 hover:text-black text-neutral-400 border border-neutral-850 hover:border-white rounded-full text-[7px] font-accent uppercase tracking-wider transition-all duration-300 cursor-pointer"
                  >
                    <RotateCw size={8} />
                    <span>Return to Deck</span>
                  </button>
                </div>

                {/* Spotify Iframe Embed */}
                <div className="w-full rounded-2xl overflow-hidden bg-neutral-950/50 flex-1 flex items-center justify-center min-h-[260px]">
                  <iframe
                    src={embedUrl}
                    width="100%"
                    height="285"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="opacity-90 hover:opacity-100 transition-opacity duration-500 rounded-xl"
                  />
                </div>

                {/* Footer Link to Spotify App */}
                <div className="flex justify-center mt-3">
                  <a
                    href={playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-neutral-100 text-[8px] font-accent uppercase tracking-wider transition-colors duration-300 group"
                  >
                    <span>Open in Spotify App</span>
                    <ArrowUpRight size={10} className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

              </div>

            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
