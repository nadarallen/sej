"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
}

export default function FinalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const maxParticles = 60;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const createParticle = (initY = false): Particle => {
      const size = Math.random() * 2.5 + 0.5;
      return {
        x: Math.random() * canvas.width,
        y: initY ? Math.random() * canvas.height : canvas.height + 10,
        size,
        speedY: -(Math.random() * 0.6 + 0.2), // slow upward drift
        speedX: Math.sin(Math.random() * Math.PI * 2) * 0.15,
        opacity: Math.random() * 0.5 + 0.1,
        fadeSpeed: Math.random() * 0.005 + 0.001,
      };
    };

    // Pre-populate particles across the screen
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Render particles
      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Draw soft circles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
        ctx.fill();

        // Recycle if out of bounds
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[index] = createParticle(false);
        }
      });

      // Clear shadows for performance
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-neutral-950 text-white px-6"
    >
      {/* Star Particles Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      {/* Subtle bottom vignette gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-1" />

      {/* Main Closing Copy */}
      <div className="relative z-10 text-center max-w-2xl flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="text-[8px] font-accent uppercase text-neutral-500 font-light mb-6 block"
        >
          The End of this Chapter
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 2, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-wide text-glow mb-4"
        >
          Happy Birthday Sejal ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="text-[8px] sm:text-[9px] font-accent text-neutral-400 font-light mt-6 uppercase"
        >
          Thank you for being part of this story.
        </motion.p>
      </div>

      {/* Minimal Footer */}
      <div className="absolute bottom-10 z-10 text-[7px] font-accent text-neutral-600 uppercase font-light">
        Made with love • 2026
      </div>
    </section>
  );
}
