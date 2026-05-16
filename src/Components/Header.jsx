import React from "react";
import { Cinzel_Decorative } from "next/font/google";
import Link from "next/link";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Header() {
  return (
    <header className="fixed w-screen z-50 bg-dark/80 backdrop-blur-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <h1
            className={`text-xl font-bold text-primary tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#ffffff] to-[#a855f7] drop-shadow-[0_0_20px_rgba(0,0,0,0.6)] ${cinzel.className}`}
          >
            Solo Leveling:
            <br /> Arise
          </h1>
        </Link>

        <nav className="space-x-8 hidden md:flex">
          <Link href="/Hunters" className="hover:text-primary">
            Hunters
          </Link>
          <Link href="/Jinwoo" className="hover:text-primary">
            Jinwoo
          </Link>
          <Link href="/Shadows" className="hover:text-primary">
            Shadows
          </Link>
          <Link href="/WeeklyContent" className="hover:text-primary">
            Weekly Content
          </Link>
        </nav>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:brightness-110 transition">
          Play Now
        </button>
      </div>
    </header>
  );
}
