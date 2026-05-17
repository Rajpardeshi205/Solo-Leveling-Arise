"use client";

import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/FireBaseconfig";
import Background from "@/Components/Background";

// ─── BlessingCard — hover on desktop, tap on mobile ──────────────────────────
function BlessingCard({ blessing }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const blessingData = blessing?.Runes?.[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700 flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-pointer"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") {
          e.preventDefault();
          setOpen((o) => !o);
        }
      }}
    >
      <img
        src={blessingData?.img}
        alt={blessing?.Blessing}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
      />
      <h3 className="text-xs sm:text-sm text-center text-white font-semibold leading-tight">
        {blessing?.Blessing}
      </h3>

      {/* Tooltip — pops upward */}
      {open && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 sm:w-72 bg-gray-900 border border-yellow-400 text-white rounded-lg p-3 text-xs shadow-xl pointer-events-none">
          <strong className="text-yellow-400">{blessing?.Blessing}</strong>
          <br />
          <br />
          <span className="text-purple-300">{blessingData?.description}</span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-yellow-400" />
        </div>
      )}
    </div>
  );
}

// ─── Section renderer ─────────────────────────────────────────────────────────
function BlessingSection({ title, data }) {
  if (!data.length) return null;
  return (
    <div className="space-y-4 sm:space-y-5">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-cyan-400">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {data.map((blessing) => (
          <BlessingCard key={blessing.id} blessing={blessing} />
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Blessings() {
  const [blessings, setBlessings] = useState([]);

  useEffect(() => {
    const fetchBlessings = async () => {
      try {
        const snapshot = await getDocs(collection(db, "blessings"));
        setBlessings(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlessings();
  }, []);

  const survivalBlessings = blessings.filter(
    (b) => b?.Runes?.[0]?.type === "Survival",
  );
  const empowermentBlessings = blessings.filter(
    (b) => b?.Runes?.[0]?.type === "Empowerment",
  );

  return (
    <Background>
      <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:py-10 space-y-10 sm:space-y-12">
        {/* Hero title */}
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-center text-purple-400">
            Blessings
          </h1>
        </div>

        <BlessingSection title="Survival" data={survivalBlessings} />
        <BlessingSection title="Empowerment" data={empowermentBlessings} />
      </div>
    </Background>
  );
}
