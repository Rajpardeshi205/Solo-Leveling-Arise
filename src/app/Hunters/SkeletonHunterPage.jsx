"use client";
import React from "react";

export default function SkeletonHunterPage() {
  return (
    <div className="h-screen pt-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white flex flex-col animate-pulse">
      <div className="flex-1 flex items-center justify-center relative px-4 md:px-8">
        {/* Big Image Placeholder */}
        <div className="w-full max-w-xl mx-auto aspect-square sm:aspect-[16/14] md:aspect-[4/4] bg-gray-700/40 rounded-lg shadow-inner" />

        {/* Right Side Info */}
        <div className="absolute top-4 right-4 space-y-3">
          <div className="w-20 h-6 bg-gray-600 rounded" />
          <div className="w-10 h-10 bg-gray-700 rounded-full" />
          <div className="w-10 h-10 bg-gray-700 rounded-full" />
        </div>

        {/* Left Name & Guild */}
        <div className="absolute top-5 left-2 sm:left-6 space-y-3">
          <div className="w-36 h-8 bg-gray-600 rounded" />
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-700 rounded-full" />
        </div>
      </div>

      {/* Weapon Card Loader */}
      <div className="absolute w-full max-w-[400px] right-4 bottom-44 sm:bottom-20 lg:bottom-50 z-50">
        <div className="w-full h-24 rounded-xl bg-gray-700/50 shimmer overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Bottom Scroll Cards */}
      <div className="w-full bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 z-50 py-4 sm:py-6 px-12 sm:px-16">
        <div className="flex gap-4 overflow-x-auto">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-28 w-20 sm:h-40 sm:w-[100px] rounded-xl bg-gray-700/50"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
