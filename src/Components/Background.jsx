"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Background = ({ children, className = "" }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 30,
      duration: Math.random() * 20 + 15,
      type:
        Math.random() > 0.7
          ? "diamond"
          : Math.random() > 0.5
            ? "square"
            : "circle",
      color:
        Math.random() > 0.6 ? "blue" : Math.random() > 0.3 ? "purple" : "cyan",
      drift: Math.random() * 60 - 30,
    }));
    setParticles(newParticles);
  }, []);

  const getParticleColor = (color) => {
    switch (color) {
      case "blue":
        return "from-blue-400/30 to-blue-600/30";
      case "purple":
        return "from-purple-400/30 to-purple-600/30";
      case "cyan":
        return "from-cyan-400/30 to-cyan-600/30";
      default:
        return "from-white/20 to-white/40";
    }
  };

  return (
    <div
      className={`relative w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden ${className}`}
    >
      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute backdrop-blur-sm bg-gradient-to-br ${getParticleColor(p.color)}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            ...(p.type === "diamond" && {
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }),
            ...(p.type === "circle" && { borderRadius: "9999px" }),
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, p.drift, 0],
            rotate: p.type !== "circle" ? [0, 360, 0] : undefined,
            scale: [1, 1.4, 1],
            opacity: [p.opacity, p.opacity * 0.3, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Orb 1 — clamped so it never bleeds past 50% x */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          width: "min(500px, 60vw)",
          height: "min(500px, 60vw)",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(147,51,234,0.3) 35%, rgba(6,182,212,0.2) 70%, transparent 100%)",
          left: "5%",
          top: "10%",
        }}
        animate={{
          x: [0, "8vw", "-4vw", 0],
          y: [0, -80, 100, 0],
          scale: [1, 1.4, 0.8, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 — anchored to right edge, moves inward only */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{
          width: "min(400px, 50vw)",
          height: "min(400px, 50vw)",
          background:
            "conic-gradient(from 0deg, rgba(236,72,153,0.3) 0deg, rgba(59,130,246,0.3) 120deg, rgba(16,185,129,0.3) 240deg, rgba(236,72,153,0.3) 360deg)",
          right: "5%",
          top: "15%",
        }}
        animate={{
          x: [0, "-8vw", "4vw", 0],
          y: [0, 120, -60, 0],
          scale: [1, 0.7, 1.3, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
      />

      {/* Holographic Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Background;
