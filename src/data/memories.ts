export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface MemoryPhoto {
  id: number;
  url: string;
  title: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  type?: 'image' | 'video';
  rotation?: number; // for collage layouts
  top?: string; // relative coordinates for collage wall
  left?: string;
  zIndex?: number;
}

export interface Trait {
  word: string;
  description: string;
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "When everything started...",
    subtitle: "A beautiful addition to the story.",
    description: "Every story has a beginning, a single spark that sets off a chain of beautiful moments. From the very start, your presence brought a light that made everything feel a little warmer, a little brighter.",
    image: "/images/chapter1.jpg",
  },
  {
    id: 2,
    title: "Moments that became memories.",
    subtitle: "Frozen in time, cherished forever.",
    description: "It is in the quiet, unplanned seconds that the magic happens. A look, a shared glance, a laugh that echoed through the room. These are the details that build the foundation of who we are together.",
    image: "/images/chapter2.jpg",
  },
  {
    id: 3,
    title: "The laughs, the chaos, the unforgettable.",
    subtitle: "A beautiful symphony of madness.",
    description: "Through the noise and the silence, the adventures and the lazy afternoons, every chapter with you is a work of art. The memories we paint are vibrant, layered, and utterly priceless.",
    image: "/images/chapter3.jpg",
  },
];

export const traits: Trait[] = [
  {
    word: "Kind",
    description: "You have a heart that naturally seeks to comfort, uplift, and shelter the people around you.",
  },
  {
    word: "Strong",
    description: "An understated resilience. You navigate storms with a quiet grace that inspires everyone.",
  },
  {
    word: "Beautiful",
    description: "Beyond the elegance on the outside, there is a deep, luminous sincerity that shines from within.",
  },
  {
    word: "Funny",
    description: "Your laughter is contagious. You bring a lighthearted joy that melts away the heaviest days.",
  },
  {
    word: "Inspiring",
    description: "Just by being authentically yourself, you make the world feel like a better place to live in.",
  },
];

// Luxury Horizontal Gallery Images
export const galleryPhotos: MemoryPhoto[] = [
  { id: 1, url: "/images/gallery1.jpg", title: "A quiet afternoon", aspectRatio: "portrait" },
  { id: 2, url: "/images/gallery2.jpg", title: "Chasing the sun", aspectRatio: "landscape" },
  { id: 3, url: "/images/gallery3.jpg", title: "Golden hour glow", aspectRatio: "square" },
  { id: 4, url: "/images/gallery4.mp4", title: "Pure simplicity", aspectRatio: "portrait", type: "video" },
  { id: 5, url: "/images/gallery5.jpg", title: "Shared laughter", aspectRatio: "landscape" },
  { id: 6, url: "/images/gallery6.jpg", title: "A perfect moment", aspectRatio: "portrait" },
];

// Overlapping Collage Wall Photos
export const collagePhotos: MemoryPhoto[] = [
  {
    id: 1,
    url: "/images/collages/photo1.jpg",
    title: "Elegance",
    aspectRatio: "portrait",
    rotation: -6,
    top: "10%",
    left: "12%",
    zIndex: 10,
  },
  {
    id: 2,
    url: "/images/collages/photo2.jpg",
    title: "A Shared Smile",
    aspectRatio: "landscape",
    rotation: 5,
    top: "22%",
    left: "45%",
    zIndex: 12,
  },
  {
    id: 3,
    url: "/images/collages/photo3.jpg",
    title: "Candid Joy",
    aspectRatio: "square",
    rotation: -3,
    top: "48%",
    left: "20%",
    zIndex: 15,
  },
  {
    id: 4,
    url: "/images/collages/photo4.jpg",
    title: "Dreamer",
    aspectRatio: "portrait",
    rotation: 8,
    top: "55%",
    left: "65%",
    zIndex: 11,
  },
  {
    id: 5,
    url: "/images/collages/photo5.jpg",
    title: "Warmth",
    aspectRatio: "landscape",
    rotation: -4,
    top: "15%",
    left: "72%",
    zIndex: 9,
  },
  {
    id: 6,
    url: "/images/collages/photo6.jpg",
    title: "Light & Shadow",
    aspectRatio: "portrait",
    rotation: 2,
    top: "40%",
    left: "85%",
    zIndex: 14,
  },
];

export const quotes = [
  {
    text: "Some people become memories.",
    highlight: "Some become a part of your story.",
    author: "Unknown",
  },
  {
    text: "In the garden of lifetime,",
    highlight: "certain souls bloom like eternal spring.",
    author: "A. G.",
  },
];

export const heartfeltLetter = {
  salutation: "Dearest Sejal,",
  paragraphs: [
    "I was thinking about everything we've been through to get here, and I felt like putting it into words.",
    "Looking back, I honestly don't know how we managed it all. We already had such a heavy academic workload, and then somehow we decided adding Eta Max to the mix was a good idea. We were basically surviving on coffee, stress, and whatever sleep we could steal between deadlines.",
    "As crazy as that time was, I wouldn't change it. I think that's when our friendship really became something special. Going through all of that together, figuring things out, supporting each other when everything felt overwhelming—it brought us closer in a way I never expected. Somewhere along the way, I realized there wasn't anyone else I'd rather have beside me.",
    "I loved having you as my best friend, but watching our story become something more has been the most unexpected and beautiful part of my life. You've seen every version of me—the stressed, exhausted, frustrated, completely unfiltered version—and somehow you still chose me.",
    "And now, we're not just trying to survive the next deadline anymore. We're building something together. I love the team we've become. I love how we push each other to grow, encourage each other to be better, and still manage to be the safest place for each other when life gets overwhelming.",
    "When I think about everything we've been through, it just makes me even more grateful that I get to do life with you.",
  ],
  closing: "With all my love and warm wishes,",
  signature: "Happy Birthday. ❤️",
};
