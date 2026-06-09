"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { quotes } from "@/data/memories";
import Image from "next/image";

interface RevealWordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function RevealWord({ word, progress, range }: RevealWordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <motion.span 
      style={{ opacity, y }} 
      className="inline-block mr-[0.25em] transition-all duration-300"
    >
      {word}
    </motion.span>
  );
}

export default function QuoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: isMounted ? sectionRef : undefined,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // We will display the first quote with scroll-linked reveal
  const quote = quotes[0];
  const words = `${quote.text} ${quote.highlight}`.split(" ");

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Parallax masked background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 opacity-[0.03] select-none pointer-events-none scale-110"
      >
        <Image
          src="/images/gallery3.jpg"
          alt="Parallax background"
          fill
          className="object-cover grayscale"
        />
      </motion.div>

      {/* Quote Content */}
      <div className="relative z-10 max-w-4xl px-6 md:px-12 text-center flex flex-col items-center">
        <span className="text-[8px] font-accent uppercase text-neutral-500 font-light mb-8">
          A Moment of Reflection
        </span>

        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-serif leading-normal tracking-wide text-neutral-100 text-glow">
          {words.map((word, i) => {
            // Distribute word reveals across the middle 50% of the scroll
            const start = 0.25 + (i / words.length) * 0.4;
            const end = start + 0.08;
            return (
              <RevealWord 
                key={i} 
                word={word} 
                progress={scrollYProgress} 
                range={[start, end]} 
              />
            );
          })}
        </h3>

        <motion.div 
          style={{
            opacity: useTransform(scrollYProgress, [0.65, 0.75], [0, 0.5])
          }}
          className="mt-8 flex items-center gap-3"
        >
          <span className="h-[1px] w-8 bg-neutral-750" />
          <span className="text-[8px] font-accent uppercase text-neutral-500 font-light">
            {quote.author}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
