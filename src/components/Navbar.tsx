"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-[100]"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 w-full z-45 transition-all duration-500 ease-in-out py-6 px-6 md:px-12 flex justify-between items-center ${
          isScrolled ? "bg-black/85 backdrop-blur-md border-b border-neutral-900 py-4" : "bg-transparent"
        }`}
      >
        <div className="overflow-hidden">
          <motion.span
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-xs sm:text-sm font-accent tracking-[0.2em] uppercase text-white block"
          >
            S E J A L
          </motion.span>
        </div>

        <div className="overflow-hidden hidden sm:block">
          <motion.span
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-[8px] font-accent uppercase text-neutral-550 block"
          >
            A Story of You
          </motion.span>
        </div>
      </header>
    </>
  );
}
