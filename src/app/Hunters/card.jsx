"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Card({ selectedHunter, children }) {
  return (
    <motion.div
      className={`relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center rounded-2xl overflow-hidden border-2 ${
        selectedHunter.Rarity === "SSR"
          ? "bg-gradient-to-br from-red-900 via-red-700 to-rose-600 border-red-400/50"
          : selectedHunter.Rarity === "SR"
          ? "bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-600 border-purple-400/50"
          : "bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-600 border-emerald-400/50"
      }`}
      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Modern glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 backdrop-blur-sm" />

      {/* Dynamic corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/30 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/30 to-transparent rounded-tl-full" />

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2x animate-border-glow" />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white/60 rounded-full blur-sm animate-float-orbs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Prismatic light streaks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-streak-1" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-streak-2" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent animate-streak-3" />
      </div>

      {/* Hexagonal pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMzAgMTBsMTAgNS41djExTDMwIDMyTDIwIDI2LjVWMTUuNUwzMCAxMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4KICA8cGF0aCBkPSJNMzAgMjBsMTAgNS41djExTDMwIDQyTDIwIDM2LjVWMjUuNUwzMCAyMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4KPC9zdmc+')] animate-pulse" />
      </div>

      {/* Holographic shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

      {/* Content area with inner glow */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="absolute inset-8  rounded-xl " />
        {children}
      </div>

      <style jsx>{`
        @keyframes border-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2),
              inset 0 0 20px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.4),
              inset 0 0 30px rgba(255, 255, 255, 0.2);
          }
        }

        @keyframes float-orbs {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-20px) translateX(15px) scale(1.2);
            opacity: 1;
          }
          50% {
            transform: translateY(-10px) translateX(-10px) scale(0.8);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-30px) translateX(8px) scale(1.1);
            opacity: 0.9;
          }
        }

        @keyframes streak-1 {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes streak-2 {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes streak-3 {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }

        .animate-border-glow {
          animation: border-glow 3s ease-in-out infinite;
        }

        .animate-float-orbs {
          animation: float-orbs 8s ease-in-out infinite;
        }

        .animate-streak-1 {
          animation: streak-1 4s ease-in-out infinite;
          animation-delay: 0s;
        }

        .animate-streak-2 {
          animation: streak-2 4s ease-in-out infinite;
          animation-delay: 1.3s;
        }

        .animate-streak-3 {
          animation: streak-3 4s ease-in-out infinite;
          animation-delay: 2.6s;
        }

        .animate-shimmer {
          animation: shimmer 6s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
}
