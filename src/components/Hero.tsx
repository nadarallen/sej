"use client";

import { motion } from "framer-motion";

export default function Hero() {
  // Title letter container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  // Letter animations
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const, // premium ease out
      },
    },
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black px-4">
      {/* Background Drawing Strokes */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top-Right Curve */}
          <motion.path
            d="M950,50 Q1150,150 1350,450 T1200,850"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Bottom-Left Curve */}
          <motion.path
            d="M50,850 Q250,750 100,450 T300,100"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.8 }}
          />
          {/* Subtle Center Diagonal Slashed stroke */}
          <motion.path
            d="M600,200 C500,400 900,500 800,700"
            stroke="#ffffff"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 1.2 }}
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-neutral-50 font-serif leading-none"
            variants={childVariants}
          >
            Happy Birthday
          </motion.h1>
          <motion.span 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-wide text-neutral-50 font-serif block mt-2"
            variants={childVariants}
            style={{ textShadow: "0 10px 30px rgba(255,255,255,0.01)" }}
          >
            Sejal.
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-8 text-neutral-400 font-light font-accent tracking-widest text-[10px] sm:text-xs uppercase"
        >
          A small story made just for you.
        </motion.p>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10 cursor-pointer"
      >
        <span className="text-[8px] font-accent uppercase text-neutral-500 font-light">
          Scroll
        </span>
        <div className="w-[18px] h-[32px] rounded-full border border-neutral-700 flex justify-center p-[4px] relative">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[3px] h-[6px] rounded-full bg-neutral-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
