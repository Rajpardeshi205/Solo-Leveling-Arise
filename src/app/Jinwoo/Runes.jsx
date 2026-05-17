"use client";

import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/FireBaseconfig";
import Background from "@/Components/Background";

// ─── Tooltip content builder ──────────────────────────────────────────────────
function buildTooltipContent(skill) {
  return (
    <div className="whitespace-pre-line text-xs text-white max-w-xs space-y-2">
      <div className="space-y-1">
        {["skill1", "skill2", "skill3", "skill4", "skill5"].map(
          (key) =>
            skill[key] && (
              <div key={key} className="font-semibold text-purple-300">
                {skill[key]}
              </div>
            ),
        )}
      </div>
      <div>
        <span className="text-yellow-400">Description:</span>
        <div className="mt-1 text-gray-200">{skill.description}</div>
      </div>
    </div>
  );
}

// ─── SkillIcon — handles both hover (desktop) and tap (mobile) ────────────────
function SkillIcon({ skill, borderColor = "border-purple-400" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside tap
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative cursor-pointer">
      <img
        src={skill.skillImg || "/placeholder.png"}
        alt={skill.skill1}
        className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain rounded-2xl border-2 ${borderColor} bg-black/40 p-1 hover:scale-110 transition-all duration-300`}
        /* Desktop hover */
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        /* Mobile tap */
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
      />
      {open && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 sm:w-72 bg-gray-900 border border-yellow-400 text-white rounded-lg p-3 text-xs shadow-xl pointer-events-none">
          {buildTooltipContent(skill)}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-yellow-400" />
        </div>
      )}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
function RuneSection({ title, runes, titleColor, borderColor, iconBorder }) {
  if (!runes.length) return null;
  return (
    <div className="space-y-3">
      <h2 className={`text-2xl sm:text-3xl font-bold ${titleColor}`}>
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {runes.map((rune) => {
          const runeGroup = rune?.data?.[0];
          if (!runeGroup) return null;
          return (
            <div
              key={rune.id}
              className={`rounded-3xl p-4 bg-gray-900/70 border ${borderColor} flex flex-col items-center gap-3`}
            >
              <h3
                className={`text-base sm:text-lg font-bold text-white text-center`}
              >
                {runeGroup.Skills}
              </h3>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {runeGroup.Runes?.map((skill, i) => (
                  <SkillIcon key={i} skill={skill} borderColor={iconBorder} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Runes() {
  const [runes, setRunes] = useState([]);

  useEffect(() => {
    const fetchRunes = async () => {
      try {
        const snapshot = await getDocs(collection(db, "runes"));
        setRunes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error(error);
      }
    };
    fetchRunes();
  }, []);

  const normalSkills = runes.filter((r) => {
    const name = r?.data?.[0]?.Skills?.toLowerCase() || "";
    return !name.includes("ultimate") && !name.includes("qte");
  });
  const qteSkills = runes.filter((r) =>
    r?.data?.[0]?.Skills?.toLowerCase().includes("qte"),
  );
  const ultimateSkills = runes.filter((r) =>
    r?.data?.[0]?.Skills?.toLowerCase().includes("ultimate"),
  );

  return (
    <Background>
      <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-8 sm:space-y-12">
        {/* Hero title */}
        <div className="w-full h-screen flex items-center justify-center">
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-center text-purple-400 tracking-widest uppercase drop-shadow-[0_0_40px_rgba(168,85,247,0.9)]">
            Runes
          </h1>
        </div>

        <RuneSection
          title="Skills"
          runes={normalSkills}
          titleColor="text-yellow-400"
          borderColor="border-purple-500/40"
          iconBorder="border-purple-400"
        />
        <RuneSection
          title="QTE"
          runes={qteSkills}
          titleColor="text-cyan-400"
          borderColor="border-cyan-500/40"
          iconBorder="border-cyan-400"
        />
        <RuneSection
          title="Ultimate"
          runes={ultimateSkills}
          titleColor="text-red-400"
          borderColor="border-red-500/40"
          iconBorder="border-red-400"
        />
      </div>
    </Background>
  );
}
