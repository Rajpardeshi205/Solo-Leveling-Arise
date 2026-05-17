"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Background from "@/Components/Background";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/FireBaseconfig";

export default function JinwooSkins() {
  const [skins, setSkins] = useState([]);
  const [activeSkin, setActiveSkin] = useState(0);

  useEffect(() => {
    const fetchSkins = async () => {
      const snapshot = await getDocs(collection(db, "skins"));
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((skin) => skin.img);
      data.sort((a, b) => {
        const numA = parseInt(a.name.replace("skin", ""));
        const numB = parseInt(b.name.replace("skin", ""));
        return numA - numB;
      });
      setSkins(data);
      setActiveSkin(data.length - 1);
    };
    fetchSkins();
  }, []);

  const prev = () => setActiveSkin((p) => (p <= 0 ? skins.length - 1 : p - 1));
  const next = () => setActiveSkin((p) => (p >= skins.length - 1 ? 0 : p + 1));

  return (
    <Background className="fixed">
      <div className="pt-16 sm:pt-20 md:pt-24 text-white flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-between px-4 sm:px-6 pb-6 gap-4">
          {/* Character Image */}
          <div className="flex-1 w-full flex items-start justify-center">
            <motion.div
              key={activeSkin}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full flex items-start justify-center"
            >
              <img
                src={skins[activeSkin]?.img || "/placeholder.png"}
                alt="Sung Jinwoo"
                className="h-auto max-h-[55vh] sm:max-h-[65vh] md:max-h-[75vh] w-auto object-contain drop-shadow-[0_0_15px_black]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 85%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 85%, transparent 100%)",
                }}
              />
            </motion.div>
          </div>

          {/* Carousel */}
          <div className="w-full max-w-xs sm:max-w-sm shrink-0">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              {/* LEFT */}
              <button
                onClick={prev}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center hover:bg-slate-700 transition-colors shrink-0"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* CURRENT SKIN */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkin}
                  initial={{ opacity: 0, scale: 0.9, x: 40 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  <div className="relative w-20 h-32 sm:w-24 sm:h-40 rounded-2xl overflow-hidden border-2 border-purple-500 bg-white shadow-[0_0_25px_rgba(168,85,247,0.45)]">
                    <img
                      src={skins[activeSkin]?.img || "/placeholder.png"}
                      alt={skins[activeSkin]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {skins[activeSkin]?.badge && (
                    <div className="absolute -top-2 -right-2 bg-red-600 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border border-slate-900 shadow-lg">
                      {skins[activeSkin].badge}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* RIGHT */}
              <button
                onClick={next}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center hover:bg-slate-700 transition-colors shrink-0"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Skin name */}
            <motion.div
              key={`skin-name-${activeSkin}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-3"
            >
              <h3 className="text-base sm:text-lg font-bold text-white">
                {skins[activeSkin]?.name}
              </h3>
            </motion.div>

            {/* Dot indicators */}
            {skins.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-3 flex-wrap">
                {skins.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSkin(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      i === activeSkin
                        ? "bg-purple-400 w-3"
                        : "bg-gray-600 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </Background>
  );
}
