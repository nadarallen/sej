import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Syncopate } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-body",
  display: "swap",
});

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: "For Sejal — Happy Birthday",
  description: "A premium interactive storytelling experience crafted to celebrate your birthday. A journey of memories, shared laughter, and quiet thoughts.",
  authors: [{ name: "For Sejal" }],
  openGraph: {
    title: "For Sejal — Happy Birthday",
    description: "A premium interactive storytelling experience crafted to celebrate your birthday.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${inter.variable} ${syncopate.variable} font-sans bg-black text-neutral-50 antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
