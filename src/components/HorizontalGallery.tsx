"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryPhotos, MemoryPhoto } from "@/data/memories";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollSection = scrollSectionRef.current;
    const container = containerRef.current;
    if (!scrollSection || !container) return;

    // Set up GSAP horizontal scroll pinning
    const getScrollAmount = () => {
      const scrollWidth = scrollSection.scrollWidth;
      const viewportWidth = window.innerWidth;
      return -(scrollWidth - viewportWidth);
    };

    const ctx = gsap.context(() => {
      gsap.to(scrollSection, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${scrollSection.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-neutral-900 overflow-hidden">
      {/* Horizontal Scroll Content Container */}
      <div 
        ref={scrollSectionRef} 
        className="h-screen flex items-center justify-start gap-12 px-12 md:px-24 w-max"
      >
        {/* Intro Slide */}
        <div className="w-[80vw] md:w-[45vw] flex flex-col justify-center text-white pr-12">
          <span className="text-[9px] font-accent uppercase text-neutral-500 font-light mb-4">
            Chapter 03
          </span>
          <h2 className="text-4xl md:text-6xl font-light font-serif tracking-wide leading-tight mb-6 text-white">
            The laughs, the chaos, the unforgettable.
          </h2>
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed max-w-sm">
            Swipe or scroll down to wander through the collection of captured time, where every frame holds a laughter, a story, and a feeling.
          </p>
          <div className="flex items-center gap-2 mt-8 text-neutral-400 text-[8px] font-accent uppercase">
            <span>Scroll Down to start</span>
            <ArrowRight size={14} className="animate-pulse" />
          </div>
        </div>

        {/* Gallery Cards */}
        {galleryPhotos.map((photo, index) => {
          // Define variable layouts to mimic luxury horizontal masonry
          const isOffset = index % 2 === 1;
          const cardWidth = 
            photo.aspectRatio === "portrait" 
              ? "w-[260px] sm:w-[300px] md:w-[380px] h-[50vh] sm:h-[400px] md:h-[520px]" 
              : photo.aspectRatio === "landscape"
              ? "w-[320px] sm:w-[380px] md:w-[500px] h-[40vh] sm:h-[300px] md:h-[380px]"
              : "w-[280px] sm:w-[320px] md:w-[400px] h-[45vh] sm:h-[300px] md:h-[400px]";

          return (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className={`relative flex-shrink-0 cursor-pointer overflow-hidden rounded-md border border-white/5 shadow-2xl transition-all duration-700 bg-neutral-950 group ${cardWidth} ${
                isOffset ? "translate-y-8 md:translate-y-16" : "-translate-y-8 md:-translate-y-8"
              }`}
            >
              {/* Blur focus transition placeholder */}
              <div className="absolute inset-0 bg-neutral-850 z-0 scale-105 filter blur-xl transition-opacity duration-1000 opacity-50" />
              
              {photo.type === "video" ? (
                <video
                  src={photo.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              ) : (
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 300px, 500px"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              )}

              {/* Minimal Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-light mb-1">
                  Memory 0{photo.id}
                </span>
                <h4 className="text-white text-base md:text-lg font-serif font-light tracking-wide">
                  {photo.title}
                </h4>
              </div>
            </div>
          );
        })}

        {/* Outro Slide spacer to clear screen */}
        <div className="w-[30vw] md:w-[20vw] h-1 flex-shrink-0" />
      </div>

      {/* Premium Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Modal Image Wrapper */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.95, opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative w-full max-w-4xl h-[70vh] md:h-[80vh] flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {activePhoto.type === "video" ? (
                  <video
                    src={activePhoto.url}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-md"
                  />
                ) : (
                  <Image
                    src={activePhoto.url}
                    alt={activePhoto.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                )}
              </div>

              {/* Caption */}
              <div className="text-center mt-6">
                <p className="text-[8px] font-accent text-neutral-500 uppercase font-light">
                  Memory 0{activePhoto.id}
                </p>
                <h3 className="text-white font-serif text-lg md:text-xl font-light mt-1 tracking-wide">
                  {activePhoto.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
