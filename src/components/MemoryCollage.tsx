"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { collagePhotos, MemoryPhoto } from "@/data/memories";

interface CollagePhotoCardProps {
  photo: MemoryPhoto;
  index: number;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
}

function CollagePhotoCard({ photo, index, scrollYProgress, isMobile }: CollagePhotoCardProps) {
  // Adjust scroll transformations differently for each photo to create depth
  const directionY = index % 2 === 0 ? 1 : -1;
  const speed = (index + 1) * (isMobile ? 18 : 35); // slower drift on mobile
  
  // Coordinate transitions: start displaced and move to their final layout positions
  const yVal = useTransform(scrollYProgress, [0, 0.6, 1], [directionY * speed * 2, 0, directionY * speed * -1]);
  const xVal = useTransform(scrollYProgress, [0, 0.6, 1], [directionY * speed * -0.5, 0, directionY * speed * 0.5]);
  const opacityVal = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  const isPortrait = photo.aspectRatio === "portrait";
  // Responsive card sizes
  const dimensions = isPortrait 
    ? "w-[120px] sm:w-[220px] h-[160px] sm:h-[300px]" 
    : photo.aspectRatio === "landscape"
    ? "w-[160px] sm:w-[280px] h-[120px] sm:h-[200px]"
    : "w-[140px] sm:w-[240px] h-[140px] sm:h-[240px]";

  // Clamp horizontal positions on mobile to keep items on-screen
  const getResponsiveLeft = (leftStr: string | undefined) => {
    if (!leftStr) return "0%";
    if (!isMobile) return leftStr;
    const val = parseFloat(leftStr);
    // Compress coordinates from [0, 100] to [15, 85]
    const clampedVal = 15 + (val * 0.7);
    return `${clampedVal}%`;
  };

  return (
    <motion.div
      style={{
        top: photo.top,
        left: getResponsiveLeft(photo.left),
        y: yVal,
        x: xVal,
        opacity: opacityVal,
        zIndex: photo.zIndex || 10,
      }}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing ${dimensions}`}
    >
      {/* Inner animated component for hover effects */}
      <motion.div
        initial={{ rotate: photo.rotation || 0 }}
        whileHover={{ 
          scale: 1.05, 
          rotate: (photo.rotation || 0) * 0.4, 
          zIndex: 50,
          boxShadow: "0 20px 40px rgba(255,255,255,0.05)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full h-full p-2 bg-neutral-900 border border-neutral-800 shadow-xl rounded flex flex-col justify-between group"
      >
        <div className="relative w-full h-[82%] bg-neutral-950 rounded-sm overflow-hidden">
          <Image
            src={photo.url}
            alt={photo.title}
            fill
            sizes="(max-width: 640px) 120px, 280px"
            className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-102"
          />
        </div>
        
        {/* Micro Polaroid caption */}
        <div className="flex justify-between items-center px-1 mt-1">
          <span className="font-serif text-[8px] sm:text-[10px] text-neutral-200 tracking-wider font-light">
            {photo.title}
          </span>
          <span className="text-[7px] font-accent text-neutral-500">
            0{photo.id}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MemoryCollage() {
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
  
  // Track scroll position of the collage section
  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start end", "end start"],
  });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] w-full bg-black py-24 overflow-hidden border-y border-neutral-900"
    >
      {/* Background Heading */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 px-6">
        <h2 className="text-8xl sm:text-9xl md:text-[12rem] font-light text-neutral-900 font-serif leading-none text-center opacity-40">
          Stories
        </h2>
        <p className="text-[8px] sm:text-[9px] font-accent uppercase text-neutral-700 font-light mt-4">
          Scatter wall of memories
        </p>
      </div>

      {/* Scattered Photo Wall */}
      <div className="relative w-full h-full max-w-7xl mx-auto min-h-[100vh]">
        {collagePhotos.map((photo, index) => (
          <CollagePhotoCard 
            key={photo.id} 
            photo={photo} 
            index={index} 
            scrollYProgress={scrollYProgress}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
}
