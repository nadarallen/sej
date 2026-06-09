"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useAnimation, Variants } from "framer-motion";
import { heartfeltLetter } from "@/data/memories";
import { X, Heart } from "lucide-react";

export default function InteractiveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const letterBodyRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Setup animations controls
  const sealControls = useAnimation();
  const flapControls = useAnimation();
  const letterControls = useAnimation();

  // Scroll parallax for polaroids inside the letter
  const { scrollYProgress } = useScroll({
    target: (isMounted && isUnfolded && !isClosing) ? letterBodyRef : undefined,
    offset: ["start end", "end start"],
  });

  const polaroidY1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const polaroidY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Handle envelope mouse parallax on hover
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Open Sequence trigger
  const handleOpen = async () => {
    if (isOpen || isClosing) return;
    setIsOpen(true);

    // Soften ambient background audio if present
    const audio = document.querySelector("audio");
    if (audio) {
      audio.volume = 0.1; // soften music for reading focus
    }

    // 1. Break wax seal (split left and right)
    await sealControls.start("broken");
    
    // 2. Unfold top flap
    await flapControls.start("open");

    // 3. Slide folded letter upwards
    await letterControls.start("slidOut");

    // 4. Trigger unfolding
    setIsUnfolded(true);

    // 5. Reveal typewriter lines
    setTimeout(() => {
      setShowText(true);
    }, 800);
  };

  // Close / Fold back sequence
  const handleClose = async () => {
    if (isClosing) return;
    setIsClosing(true);
    setShowText(false);
    setIsUnfolded(false);

    // Restore background audio volume
    const audio = document.querySelector("audio");
    if (audio) {
      audio.volume = 0.4;
    }

    // Reverse unfolding animations
    setTimeout(async () => {
      // 1. Slide letter back inside envelope
      await letterControls.start("initial");

      // 2. Fold top flap closed
      await flapControls.start("closed");

      // 3. Rejoin wax seal
      await sealControls.start("initial");

      setIsFullyClosed(true);

      // Scroll to next section
      setTimeout(() => {
        const nextSection = document.querySelector("section:last-of-type");
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 1500);
    }, 1000);
  };

  // Floating stars/particles around envelope
  useEffect(() => {
    const pContainer = particlesRef.current;
    if (!pContainer) return;

    // Create 15 floating particles
    for (let i = 0; i < 15; i++) {
      const p = document.createElement("span");
      p.className = "absolute w-1 h-1 bg-white/20 rounded-full pointer-events-none";
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.transform = `scale(${Math.random()})`;
      p.style.animation = `floatParticle ${Math.random() * 6 + 4}s linear infinite alternate`;
      pContainer.appendChild(p);
    }
  }, []);

  // Seal variants
  const sealLeftVariants: Variants = {
    initial: { x: 0, opacity: 1 },
    broken: { x: -30, opacity: 0.1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const sealRightVariants: Variants = {
    initial: { x: 0, opacity: 1 },
    broken: { x: 30, opacity: 0.1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Flap variants
  const flapVariants: Variants = {
    closed: { rotateX: 0, zIndex: 10, transition: { duration: 0.6, ease: "easeInOut" } },
    open: { rotateX: 180, zIndex: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  // Letter slider variants
  const letterVariants: Variants = {
    initial: { y: 0, scale: 0.95, zIndex: 1, transition: { duration: 0.6, ease: "easeInOut" } },
    slidOut: { y: -300, scale: 1, zIndex: 25, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-black py-24 px-4 overflow-hidden border-b border-neutral-900"
    >
      {/* Background Blur Overlay when open */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm z-20 transition-opacity duration-1000 pointer-events-none ${
          isOpen ? "opacity-100" : "opacity-0"
        }`} 
      />

      {/* Floating Sparkles Layer */}
      <div ref={particlesRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden" />

      {/* Envelope & Letter Frame */}
      <div className="relative w-full max-w-lg md:max-w-xl flex items-center justify-center min-h-[500px] z-30">
        <AnimatePresence>
          {!isFullyClosed && (
            <motion.div
              style={{
                perspective: 1200,
                x: !isOpen ? mousePos.x * 30 : 0,
                y: !isOpen ? mousePos.y * 30 : 0,
                rotateX: !isOpen ? -mousePos.y * 15 : 0,
                rotateY: !isOpen ? mousePos.x * 15 : 0,
              }}
              animate={isOpen ? { scale: 1.05, y: isUnfolded ? 50 : 0 } : { y: [0, -6, 0] }}
              transition={isOpen ? { duration: 1 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleOpen}
              className={`relative w-full aspect-[4/3] rounded-lg shadow-2xl cursor-pointer ${
                isOpen ? "pointer-events-none" : "hover:shadow-white/5"
              } transition-shadow duration-500`}
            >
              {/* --- ENVELOPE CONTAINER --- */}
              <div className="absolute inset-0 bg-neutral-950 rounded-lg overflow-hidden border border-neutral-850 preserve-3d">
                
                {/* Back Outer Envelope Surface */}
                <div className="absolute inset-0 bg-stone-100/95 shadow-inner rounded-lg" />

                {/* --- THE LETTER SHEET (Slides out) --- */}
                <motion.div
                  variants={letterVariants}
                  initial="initial"
                  animate={letterControls}
                  className="absolute inset-x-4 bottom-4 top-16 bg-stone-50 rounded shadow-md border border-neutral-200/50 preserve-3d overflow-visible"
                >
                  {/* Outer texture noise */}
                  <div 
                    className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                    }}
                  />
                </motion.div>

                {/* Left/Right flaps */}
                <div className="absolute inset-0 z-12 pointer-events-none">
                  <svg className="w-full h-full drop-shadow-md" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="0,0 200,150 0,300" fill="#fcfbf8" stroke="#eae8e4" strokeWidth="0.5" />
                    <polygon points="400,0 200,150 400,300" fill="#fcfbf8" stroke="#eae8e4" strokeWidth="0.5" />
                  </svg>
                </div>

                {/* Bottom flap */}
                <div className="absolute inset-0 z-15 pointer-events-none">
                  <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="0,300 200,135 400,300" fill="#f7f6f2" stroke="#eae8e4" strokeWidth="0.5" />
                  </svg>
                </div>

                {/* Front Text Details (shows when closed) */}
                <AnimatePresence>
                  {!isOpen && (
                    <motion.div 
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6 pointer-events-none"
                    >
                      <h4 className="font-serif italic text-2xl text-neutral-900 tracking-wide">
                        For Sejal
                      </h4>
                      <p className="font-accent text-[8px] text-neutral-400 mt-3 uppercase tracking-[0.2em] flex items-center gap-1.5 animate-pulse">
                        {"Open when you're ready"} <Heart size={8} className="fill-red-500 stroke-red-500" />
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* --- TOP FLAP (Folds up) --- */}
                <motion.div
                  variants={flapVariants}
                  initial="closed"
                  animate={flapControls}
                  style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
                  className="absolute inset-x-0 top-0 h-1/2 z-10"
                >
                  <svg className="w-full h-full drop-shadow-md" viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="0,0 200,150 400,0" fill="#fcfbf8" stroke="#eae8e4" strokeWidth="0.5" />
                  </svg>
                </motion.div>

                {/* --- WAX SEAL (Embossed on center) --- */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex pointer-events-none">
                  {/* Left half */}
                  <motion.div
                    variants={sealLeftVariants}
                    initial="initial"
                    animate={sealControls}
                    className="w-[25px] h-[50px] overflow-hidden"
                  >
                    <div className="w-[50px] h-[50px] bg-red-800 rounded-full border-2 border-red-950 flex items-center justify-center shadow-lg relative">
                      <span className="font-serif font-semibold text-lg text-amber-500 absolute left-[16px]">S</span>
                    </div>
                  </motion.div>

                  {/* Right half */}
                  <motion.div
                    variants={sealRightVariants}
                    initial="initial"
                    animate={sealControls}
                    className="w-[25px] h-[50px] overflow-hidden"
                  >
                    <div className="w-[50px] h-[50px] bg-red-800 rounded-full border-2 border-red-950 flex items-center justify-center shadow-lg relative -left-[25px]">
                      <span className="font-serif font-semibold text-lg text-amber-500 absolute left-[16px]">S</span>
                    </div>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- FULL READING LETTER VIEW --- */}
        <AnimatePresence>
          {isUnfolded && !isClosing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="fixed inset-0 z-40 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
            >
              {/* Close letters icon */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Close letter"
              >
                <X size={24} />
              </button>

              {/* The Paper Sheet */}
              <div 
                ref={letterBodyRef}
                className="relative w-full max-w-2xl bg-[#faf9f6] text-neutral-900 rounded-md p-8 sm:p-12 md:p-16 shadow-2xl border border-stone-250 my-auto min-h-[80vh] flex flex-col justify-between overflow-visible relative"
              >
                {/* Paper imperfections and details */}
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                  }}
                />
                <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#d5cfc4]" />

                {/* Left Margin Polaroid (Attached/Parallax) */}
                <motion.div
                  style={{ y: polaroidY1 }}
                  className="absolute -left-16 sm:-left-24 top-24 w-[80px] sm:w-[130px] p-2 bg-white shadow-xl border border-neutral-100 rounded rotate-[-6deg] hidden xs:block"
                >
                  <div className="relative w-full aspect-square bg-neutral-100 rounded-sm overflow-hidden mb-2">
                    <Image
                      src="/images/gallery2.jpg"
                      alt="Memory 1"
                      fill
                      sizes="130px"
                      className="object-cover grayscale"
                    />
                  </div>
                  <span className="font-serif text-[6px] sm:text-[8px] text-neutral-500 italic block text-center">
                    Chasing the sun
                  </span>
                </motion.div>

                {/* Right Margin Polaroid (Attached/Parallax) */}
                <motion.div
                  style={{ y: polaroidY2 }}
                  className="absolute -right-16 sm:-right-24 bottom-24 w-[80px] sm:w-[130px] p-2 bg-white shadow-xl border border-neutral-100 rounded rotate-[6deg] hidden xs:block"
                >
                  <div className="relative w-full aspect-square bg-neutral-100 rounded-sm overflow-hidden mb-2">
                    <Image
                      src="/images/gallery3.jpg"
                      alt="Memory 2"
                      fill
                      sizes="130px"
                      className="object-cover grayscale"
                    />
                  </div>
                  <span className="font-serif text-[6px] sm:text-[8px] text-neutral-500 italic block text-center">
                    Golden hour glow
                  </span>
                </motion.div>

                {/* Letter Content */}
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="text-[8px] font-accent uppercase text-neutral-400 font-light block mb-8">
                      Dear Sejal
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 tracking-wide mb-8">
                      {heartfeltLetter.salutation}
                    </h3>

                    {/* Paragraph list with typewriter fade reveal */}
                    <div className="flex flex-col gap-6 font-sans text-sm sm:text-base text-neutral-700 leading-relaxed font-light pl-2 border-l border-neutral-200/50">
                      {heartfeltLetter.paragraphs.map((para, i) => (
                        <AnimatePresence key={i}>
                          {showText && (
                            <motion.p
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 1.2, delay: i * 1.5, ease: "easeOut" }}
                            >
                              {para}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      ))}
                    </div>
                  </div>

                  {/* Cursive Signature Section */}
                  <div className="mt-16 self-end text-right sm:text-left flex flex-col items-end pr-2">
                    <p className="text-[9px] font-accent text-neutral-400 uppercase mb-4">
                      {heartfeltLetter.closing}
                    </p>

                    {/* SVG Handwriting drawing animation */}
                    <div className="h-16 w-40 flex items-center justify-end relative">
                      <AnimatePresence>
                        {showText && (
                          <svg viewBox="0 0 200 100" className="w-40 h-16 stroke-neutral-900 fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round relative z-10">
                            {/* Cursive path representing "Allen" */}
                            <motion.path
                              d="M 30,60 C 45,20 50,25 55,40 C 60,55 65,75 70,40 C 75,15 80,30 85,55 C 90,65 95,45 100,40 C 105,35 108,60 112,60 C 115,60 120,48 125,48 C 130,48 135,60 145,60 C 155,60 170,55 180,55"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 2, delay: heartfeltLetter.paragraphs.length * 1.5 + 0.8, ease: "easeInOut" }}
                            />
                          </svg>
                        )}
                      </AnimatePresence>
                    </div>

                    <AnimatePresence>
                      {showText && (
                        <motion.h4
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.2, delay: heartfeltLetter.paragraphs.length * 1.5 + 2.5 }}
                          className="text-sm sm:text-base font-serif font-medium text-neutral-900 tracking-wide mt-2"
                        >
                          {heartfeltLetter.signature}
                        </motion.h4>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global CSS particle styling keyframes */}
      <style jsx global>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 0.1;
          }
          100% {
            transform: translateY(-80px) scale(1.2);
            opacity: 0.6;
          }
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Cinematic closing overlay */}
      <AnimatePresence>
        {isFullyClosed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black text-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-2xl sm:text-3xl font-serif font-light italic text-white tracking-wide leading-relaxed">
                {"\"Some words are meant to stay forever.\""}
              </h3>
              <p className="text-[8px] font-accent text-neutral-500 uppercase mt-8 tracking-[0.3em]">
                Continuing the story...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
