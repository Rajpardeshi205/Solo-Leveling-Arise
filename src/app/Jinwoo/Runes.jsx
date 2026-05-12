"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/FireBaseconfig";
import Background from "@/Components/Background";

export default function Runes() {
  const [runes, setRunes] = useState([]);

  const [tooltip, setTooltip] = useState({
    content: null,
    x: 0,
    y: 0,
    visible: false,
  });

  useEffect(() => {
    const fetchRunes = async () => {
      try {
        const snapshot = await getDocs(collection(db, "runes"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRunes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRunes();
  }, []);

  function handleMouseMove(e, skill) {
    setTooltip({
      content: (
        <div className="whitespace-pre-line text-xs text-white max-w-xs space-y-2">
          {/* ALL SKILL NAMES */}
          <div className="space-y-1">
            {["skill1", "skill2", "skill3", "skill4", "skill5"].map(
              (key, index) =>
                skill[key] && (
                  <div
                    key={key}
                    className={`font-semibold ${
                      index === 0 ? "text-purple-300" : "text-purple-300"
                    }`}
                  >
                    {skill[key]}
                  </div>
                ),
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <span className="text-yellow-400">Description:</span>

            <div className="mt-1 text-gray-200">{skill.description}</div>
          </div>
        </div>
      ),

      x: e.clientX + 16,
      y: e.clientY + 16,
      visible: true,
    });
  }

  function handleMouseLeave() {
    setTooltip({
      content: null,
      x: 0,
      y: 0,
      visible: false,
    });
  }

  const normalSkills = runes.filter((rune) => {
    const name = rune?.data?.[0]?.Skills?.toLowerCase() || "";

    return !name.includes("ultimate") && !name.includes("qte");
  });

  const qteSkills = runes.filter((rune) => {
    const name = rune?.data?.[0]?.Skills?.toLowerCase() || "";

    return name.includes("qte");
  });

  const ultimateSkills = runes.filter((rune) => {
    const name = rune?.data?.[0]?.Skills?.toLowerCase() || "";

    return name.includes("ultimate");
  });

  return (
    <Background>
      <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-8">
        <div className="w-full h-screen flex items-center justify-center">
          <h1 className="text-7xl md:text-9xl font-black text-center text-purple-400 tracking-widest uppercase drop-shadow-[0_0_40px_rgba(168,85,247,0.9)]">
            Runes
          </h1>
        </div>

        {/* ================= NORMAL SKILLS ================= */}

        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-yellow-400">Skills</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {normalSkills.map((rune) => {
              const runeGroup = rune?.data?.[0];

              if (!runeGroup) return null;

              return (
                <InfoCard
                  key={rune.id}
                  className="rounded-[40px] p-4 bg-gray-900/70 border border-purple-500/40"
                >
                  <div className="w-full flex flex-col items-center gap-3">
                    <h3 className="text-xl font-bold text-white text-center">
                      {runeGroup.Skills}
                    </h3>

                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      {runeGroup.Runes?.map((skill, index) => (
                        <div
                          key={index}
                          className="cursor-pointer"
                          onMouseMove={(e) => handleMouseMove(e, skill)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <img
                            src={skill.skillImg || "/placeholder.png"}
                            alt={skill.skill1}
                            className="w-20 h-20 object-contain rounded-2xl border-2 border-purple-400 bg-black/40 p-1 hover:scale-110 transition-all duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </InfoCard>
              );
            })}
          </div>
        </div>

        {/* ================= QTE ================= */}

        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-cyan-400">QTE</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {qteSkills.map((rune) => {
              const runeGroup = rune?.data?.[0];

              if (!runeGroup) return null;

              return (
                <InfoCard
                  key={rune.id}
                  className="rounded-[40px] p-4 bg-gray-900/70 border border-cyan-500/40"
                >
                  <div className="w-full flex flex-col items-center gap-3">
                    <h3 className="text-xl font-bold text-cyan-300 text-center">
                      {runeGroup.Skills}
                    </h3>

                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      {runeGroup.Runes?.map((skill, index) => (
                        <div
                          key={index}
                          className="cursor-pointer"
                          onMouseMove={(e) => handleMouseMove(e, skill)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <img
                            src={skill.skillImg || "/placeholder.png"}
                            alt={skill.skill1}
                            className="w-20 h-20 object-contain rounded-2xl border-2 border-cyan-400 bg-black/40 p-1 hover:scale-110 transition-all duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </InfoCard>
              );
            })}
          </div>
        </div>

        {/* ================= ULTIMATE ================= */}

        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-red-400">Ultimate</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {ultimateSkills.map((rune) => {
              const runeGroup = rune?.data?.[0];

              if (!runeGroup) return null;

              return (
                <InfoCard
                  key={rune.id}
                  className="rounded-[40px] p-4 bg-gray-900/70 border border-red-500/40"
                >
                  <div className="w-full flex flex-col items-center gap-3">
                    <h3 className="text-xl font-bold text-red-300 text-center">
                      {runeGroup.Skills}
                    </h3>

                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      {runeGroup.Runes?.map((skill, index) => (
                        <div
                          key={index}
                          className="cursor-pointer"
                          onMouseMove={(e) => handleMouseMove(e, skill)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <img
                            src={skill.skillImg || "/placeholder.png"}
                            alt={skill.skill1}
                            className="w-20 h-20 object-contain rounded-2xl border-2 border-red-400 bg-black/40 p-1 hover:scale-110 transition-all duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </InfoCard>
              );
            })}
          </div>
        </div>
      </div>

      {/* TOOLTIP */}

      {tooltip.visible && (
        <div
          className="fixed z-50 bg-gray-900 border border-yellow-400 text-white rounded-lg p-3 text-xs shadow-xl pointer-events-none w-80"
          style={{
            top: tooltip.y,
            left: tooltip.x,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </Background>
  );
}

const InfoCard = ({ label, children, className = "" }) => (
  <div
    className={`bg-gray-800/50 rounded-xl p-4 border border-gray-700 h-full flex flex-col items-center justify-center ${className}`}
  >
    {label && <div className="text-blue-400 text-sm mb-1">{label}</div>}

    {children}
  </div>
);
