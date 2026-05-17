"use client";

import React, { useState } from "react";
import { Cinzel_Decorative } from "next/font/google";
import Link from "next/link";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700"],
});

const NAV_LINKS = [
  { href: "/Hunters", label: "Hunters" },
  { href: "/Jinwoo", label: "Jinwoo" },
  { href: "/Shadows", label: "Shadows" },
  { href: "/WeeklyContent", label: "Weekly Content" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed w-screen z-50 bg-dark/80 backdrop-blur-lg border-b border-gray-700">
      {/* ── Main bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <h1
            className={`text-base sm:text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#ffffff] to-[#a855f7] drop-shadow-[0_0_20px_rgba(0,0,0,0.6)] leading-tight ${cinzel.className}`}
          >
            Solo Leveling:
            <br />
            Arise
          </h1>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm lg:text-base text-gray-300 hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side: Login + hamburger */}
        <div className="flex items-center gap-3">
          <button className="bg-primary text-white text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:brightness-110 transition whitespace-nowrap">
            Login
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg border border-gray-600 bg-gray-800/60 gap-1.5 shrink-0"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-64 border-t border-gray-700" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-3 gap-1 bg-black/60 backdrop-blur-lg">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors text-sm font-medium"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
