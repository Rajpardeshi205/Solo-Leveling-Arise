"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Background = ({ children, className = "" }) => {
  const [particles, setParticles] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 80; i++) {
        newParticles.push({
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
            Math.random() > 0.6
              ? "blue"
              : Math.random() > 0.3
              ? "purple"
              : "cyan",
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    const timeInterval = setInterval(() => {
      setTime((prev) => prev + 0.1);
    }, 100);

    return () => clearInterval(timeInterval);
  }, []);

  const getParticleColor = (particle) => {
    switch (particle.color) {
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

  const renderParticle = (particle) => {
    const baseClasses = "absolute backdrop-blur-sm";
    const colorClasses = `bg-gradient-to-br ${getParticleColor(particle)}`;

    const commonProps = {
      className: `${baseClasses} ${colorClasses}`,
      style: {
        width: particle.size,
        height: particle.size,
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        opacity: particle.opacity,
        ...(particle.type === "diamond" && {
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        }),
        ...(particle.type === "circle" && { borderRadius: "9999px" }),
      },
      animate: {
        y: [0, -120, 0],
        x: [0, Math.sin(particle.id + time) * 30, 0],
        rotate: particle.type !== "circle" ? [0, 360, 0] : undefined,
        scale: [1, 1.4, 1],
        opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
      },
      transition: {
        duration: particle.duration,
        delay: particle.delay,
        repeat: Infinity,
        ease: "easeInOut",
      },
    };

    return <motion.div key={particle.id} {...commonProps} />;
  };

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden ${className}`}
    >
      {/* Geometric Particles */}
      {particles.map(renderParticle)}

      {/* Glowing Morphing Orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
        style={{
          background: `radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(147,51,234,0.3) 35%, rgba(6,182,212,0.2) 70%, transparent 100%)`,
          left: "5%",
          top: "10%",
        }}
        animate={{
          x: [0, 150, -50, 0],
          y: [0, -80, 100, 0],
          scale: [1, 1.4, 0.8, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-25"
        style={{
          background: `conic-gradient(from 0deg, rgba(236,72,153,0.3) 0deg, rgba(59,130,246,0.3) 120deg, rgba(16,185,129,0.3) 240deg, rgba(236,72,153,0.3) 360deg)`,
          right: "10%",
          top: "15%",
        }}
        animate={{
          x: [0, -100, 80, 0],
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
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0px 0px", "50px 50px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(147,51,234,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147,51,234,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default Background;
