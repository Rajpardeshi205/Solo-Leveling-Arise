"use client";
import React, { useState, useRef, useEffect } from "react";
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
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
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

  return (
    <Background className="fixed">
      <div className="sm:pt-20 md:pt-24 text-white flex flex-col">
        {" "}
        {/* Main Content */}
        <main className="relative flex flex-col px-6 gap-6">
          {" "}
          <div className="flex-1 relative flex flex-col items-center justify-start">
            {" "}
            {/* Character Image - Shifted Up */}
            <motion.div
              key={activeSkin}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full flex items-start justify-center"
            >
              <img
                src={skins[activeSkin]?.img || "/placeholder.png"}
                alt="Sung Jinwoo"
                className="h-full max-h-[75vh] object-contain  drop-shadow-[0_0_15px_black] mask-image-gradient"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 85%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 85%, transparent 100%)",
                }}
              />
            </motion.div>
            {/* Skin Selector Carousel */}
            <div className="relative w-full max-w-md mb-2 shrink-0">
              <div className="flex items-center justify-center gap-4">
                {/* LEFT */}
                <button
                  onClick={() =>
                    setActiveSkin((prev) =>
                      prev <= 0 ? skins.length - 1 : prev - 1,
                    )
                  }
                  className="w-10 h-10 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center hover:bg-slate-700 transition-colors shrink-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* CURRENT SKIN */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSkin}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      x: 40,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      x: -40,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="relative"
                  >
                    <div className="relative w-25 h-40 rounded-2xl overflow-hidden border-2 border-purple-500 bg-white shadow-[0_0_25px_rgba(168,85,247,0.45)]">
                      <img
                        src={skins[activeSkin]?.img || "/placeholder.png"}
                        alt={skins[activeSkin]?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* BADGE */}
                    {skins[activeSkin]?.badge && (
                      <div className="absolute -top-2 -right-2 bg-red-600 text-[10px] font-bold px-2 py-1 rounded-full border border-slate-900 shadow-lg">
                        {skins[activeSkin].badge}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* RIGHT */}
                <button
                  onClick={() =>
                    setActiveSkin((prev) =>
                      prev >= skins.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="w-10 h-10 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center hover:bg-slate-700 transition-colors shrink-0"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* SKIN NAME */}
              <motion.div
                key={`skin-name-${activeSkin}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-3"
              >
                <h3 className="text-lg font-bold text-white">
                  {skins[activeSkin]?.name}
                </h3>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </Background>
  );
}
