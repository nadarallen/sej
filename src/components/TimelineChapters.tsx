"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { chapters, traits } from "@/data/memories";

// -------------------------------------------------------------
// CHAPTER 1 COMPONENT
// -------------------------------------------------------------
export function ChapterOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkSize();
    setIsMounted(true);
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.05, 1.12]);
  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Adjust offsets responsively to prevent mobile clipping
  const displacement1 = isMobile ? -50 : -120;
  const displacement2 = isMobile ? 60 : 140;

  const chapterData = chapters[0];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-between py-24 px-6 md:px-16 lg:px-24 bg-black overflow-hidden border-b border-neutral-900"
    >
      {/* Left Text Content */}
      <motion.div 
        style={{ y: textY }}
        className="w-full md:w-1/2 z-10 flex flex-col justify-center mb-16 md:mb-0 text-left"
      >
        <span className="text-[9px] font-accent uppercase text-neutral-500 font-light mb-4">
          Chapter 01
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-100 font-serif leading-tight mb-6">
          {chapterData.title}
        </h2>
        <h3 className="text-base sm:text-lg font-medium text-neutral-400 font-serif mb-6 italic">
          {chapterData.subtitle}
        </h3>
        <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed max-w-md">
          {chapterData.description}
        </p>
      </motion.div>

      {/* Right Image Collage */}
      <div className="w-full md:w-1/2 relative flex justify-center items-center h-[350px] sm:h-[450px] md:h-[600px] mt-4 md:mt-0">
        {/* Main large image */}
        <motion.div
          style={{ scale: imgScale, y: imgY }}
          className="relative w-[220px] h-[280px] sm:w-[280px] sm:h-[380px] md:w-[360px] md:h-[480px] rounded-lg overflow-hidden border border-neutral-800 shadow-2xl z-10 bg-neutral-950"
        >
          <Image
            src={chapterData.image}
            alt={chapterData.title}
            fill
            sizes="(max-width: 768px) 220px, 360px"
            className="object-cover grayscale"
            priority
          />
        </motion.div>

        {/* Small floating overlap image 1 */}
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [30, -70]),
            x: displacement1,
            rotate: -8,
          }}
          className="absolute w-[100px] h-[130px] sm:w-[140px] sm:h-[190px] md:w-[180px] md:h-[240px] rounded border border-neutral-800 shadow-xl overflow-hidden z-20 bg-neutral-900"
        >
          <Image
            src="/images/gallery1.jpg"
            alt="collage 1"
            fill
            sizes="(max-width: 768px) 100px, 180px"
            className="object-cover grayscale"
          />
        </motion.div>

        {/* Small floating overlap image 2 */}
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [-60, 60]),
            x: displacement2,
            rotate: 12,
          }}
          className="absolute w-[90px] h-[120px] sm:w-[130px] sm:h-[170px] md:w-[160px] md:h-[220px] rounded border border-neutral-800 shadow-xl overflow-hidden z-0 bg-neutral-900"
        >
          <Image
            src="/images/gallery4.jpg"
            alt="collage 2"
            fill
            sizes="(max-width: 768px) 90px, 160px"
            className="object-cover grayscale"
          />
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// CHAPTER 2 COMPONENT
// -------------------------------------------------------------
export function ChapterTwo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkSize();
    setIsMounted(true);
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const p1Y = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const p1Rotate = useTransform(scrollYProgress, [0, 1], [-12, -4]);
  const p2Y = useTransform(scrollYProgress, [0, 1], [140, -10]);
  const p2Rotate = useTransform(scrollYProgress, [0, 1], [15, 4]);

  const displacement1 = isMobile ? -45 : -70;
  const displacement2 = isMobile ? 45 : 70;

  const chapterData = chapters[1];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col md:flex-row-reverse items-center justify-between py-24 px-6 md:px-16 lg:px-24 bg-neutral-950 overflow-hidden border-b border-neutral-900"
    >
      {/* Right Text Content (Reverse Flow) */}
      <motion.div 
        style={{ y: textY }}
        className="w-full md:w-1/2 z-10 flex flex-col justify-center mb-16 md:mb-0 text-left"
      >
        <span className="text-[9px] font-accent uppercase text-neutral-500 font-light mb-4">
          Chapter 02
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-100 font-serif leading-tight mb-6">
          {chapterData.title}
        </h2>
        <h3 className="text-base sm:text-lg font-medium text-neutral-400 font-serif mb-6 italic">
          {chapterData.subtitle}
        </h3>
        <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed max-w-md">
          {chapterData.description}
        </p>
      </motion.div>

      {/* Left Polaroid Layouts */}
      <div className="w-full md:w-1/2 relative flex justify-center items-center h-[400px] sm:h-[500px] md:h-[600px] mt-4 md:mt-0">
        {/* Polaroid 1 (Left background) */}
        <motion.div
          style={{ y: p1Y, rotate: p1Rotate, x: displacement1 }}
          className="absolute w-[160px] sm:w-[190px] md:w-[210px] pb-4 pt-3 px-3 bg-neutral-900 border border-neutral-850 shadow-2xl rounded z-10 flex flex-col items-center"
        >
          <div className="relative w-full h-[180px] sm:h-[210px] md:h-[230px] bg-neutral-950 rounded-sm overflow-hidden mb-3">
            <Image
              src={chapterData.image}
              alt="Polaroid 1"
              fill
              sizes="200px"
              className="object-cover grayscale"
            />
          </div>
          <span className="font-serif text-[9px] sm:text-[10px] text-neutral-400 italic tracking-wider">
            Moments like these.
          </span>
        </motion.div>

        {/* Polaroid 2 (Right overlapping foreground) */}
        <motion.div
          style={{ y: p2Y, rotate: p2Rotate, x: displacement2 }}
          className="absolute w-[170px] sm:w-[200px] md:w-[220px] pb-4 pt-3 px-3 bg-neutral-900 border border-neutral-850 shadow-3xl rounded z-20 flex flex-col items-center"
        >
          <div className="relative w-full h-[190px] sm:h-[220px] md:h-[250px] bg-neutral-950 rounded-sm overflow-hidden mb-3">
            <Image
              src="/images/gallery3.jpg"
              alt="Polaroid 2"
              fill
              sizes="220px"
              className="object-cover grayscale"
            />
          </div>
          <span className="font-serif text-[10px] sm:text-xs text-neutral-300 tracking-wider">
            Warm Memories
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// CHAPTER 4 COMPONENT (WHAT MAKES SEJAL SPECIAL)
// -------------------------------------------------------------
function TraitRow({ trait, index }: { trait: typeof traits[0]; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: false, amount: 0.5 });

  return (
    <div
      ref={rowRef}
      className="relative py-10 md:py-14 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 overflow-hidden transition-all duration-700"
    >
      {/* Self-drawing bottom border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-800/80 origin-left"
      />

      <div className="flex flex-col gap-2">
        {/* Index superscript */}
        <span className="text-xs font-serif italic text-neutral-500 font-light block tracking-wider">
          0{index + 1}.
        </span>
        
        {/* Trait Word */}
        <motion.h3
          animate={{
            color: isInView ? "#ffffff" : "#333333",
            x: isInView ? 10 : 0,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-4xl md:text-5xl lg:text-6xl font-light font-serif tracking-wide origin-left cursor-default"
        >
          {trait.word}
        </motion.h3>
      </div>

      {/* Description block */}
      <motion.p
        animate={{
          opacity: isInView ? 1 : 0.15,
          y: isInView ? 0 : 8,
        }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        className="text-sm md:text-base text-neutral-400 font-light max-w-sm sm:text-right leading-relaxed sm:self-end sm:mb-2"
      >
        {trait.description}
      </motion.p>
    </div>
  );
}

export function ChapterFour() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full py-28 px-6 md:px-16 lg:px-24 bg-black border-b border-neutral-900"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 relative">
        {/* Left Column - Sticky Title Box */}
        <div className="w-full md:w-[35%] md:sticky md:top-32 md:h-fit flex flex-col items-start">
          <span className="text-[8px] font-accent uppercase text-neutral-500 font-light mb-4 block">
            Chapter 04
          </span>
          <h2 className="text-4xl sm:text-5xl font-light text-neutral-100 font-serif tracking-wide leading-tight mb-6 text-glow">
            What makes Sejal special.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-xs mb-8">
            An exploration of the details, traits, and qualities that make your presence so unforgettable to the lives you touch.
          </p>
          <div className="w-12 h-[1px] bg-neutral-800" />
        </div>

        {/* Right Column - Interactive Traits List */}
        <div className="w-full md:w-[65%] relative md:pl-12">
          {/* Vertical divider line that draws itself on scroll */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="absolute left-0 top-0 bottom-0 w-[1px] bg-neutral-900 origin-top hidden md:block"
          />

          <div className="flex flex-col">
            {traits.map((trait, index) => (
              <TraitRow key={trait.word} trait={trait} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
