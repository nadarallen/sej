"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";

// Dynamically import client-only interactive sections with SSR disabled
const ChapterOne = dynamic(() => import("@/components/TimelineChapters").then((mod) => mod.ChapterOne), { ssr: false });
const ChapterTwo = dynamic(() => import("@/components/TimelineChapters").then((mod) => mod.ChapterTwo), { ssr: false });
const ChapterFour = dynamic(() => import("@/components/TimelineChapters").then((mod) => mod.ChapterFour), { ssr: false });
const HorizontalGallery = dynamic(() => import("@/components/HorizontalGallery"), { ssr: false });
const MemoryCollage = dynamic(() => import("@/components/MemoryCollage"), { ssr: false });
const QuoteSection = dynamic(() => import("@/components/QuoteSection"), { ssr: false });
const InteractiveLetter = dynamic(() => import("@/components/InteractiveLetter"), { ssr: false });
const SpotifySection = dynamic(() => import("@/components/SpotifySection"), { ssr: false });
const FinalSection = dynamic(() => import("@/components/FinalSection"), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      {/* Film Grain Texture overlay */}
      <div className="grain-overlay" />

      {/* Nav & Music controls */}
      <Navbar />
      <MusicPlayer />

      {/* Narrative flow */}
      <main className="relative z-10 w-full min-h-screen">
        {/* Landing screen */}
        <Hero />

        {/* Story chapters */}
        <ChapterOne />
        
        <ChapterTwo />

        {/* Pinned horizontal scrolling masonry */}
        <HorizontalGallery />

        {/* Dynamic typographic focus */}
        <ChapterFour />

        {/* Scattered interactive photo wall */}
        <MemoryCollage />

        {/* Ambient reflection segment */}
        <QuoteSection />

        {/* Read section */}
        <InteractiveLetter />

        {/* Soundtrack playlist segment */}
        <SpotifySection />

        {/* Star fields and final wishes */}
        <FinalSection />
      </main>
    </SmoothScroll>
  );
}
