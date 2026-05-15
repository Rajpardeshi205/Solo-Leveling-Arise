"use client";

import React, { useEffect, useState } from "react";
import { Cinzel_Decorative } from "next/font/google";
import { Star } from "lucide-react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Firebase/FireBaseconfig";

import { Elements } from "@/Components/gameData/Elements";
import CommentsPage from "@/Components/CommentsPage ";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700"],
});

const rarityGradient = {
  SSR: "from-red-900 via-red-700 to-rose-600 border-red-400/50",
  SR: "from-purple-900 via-purple-700 to-indigo-600 border-purple-400/50",
  R: "from-emerald-900 via-emerald-700 to-teal-600 border-emerald-400/50",
};

const formatText = (text) => {
  if (!text) return null;

  return text
    .split(/(\[[^\]]+\]|\d+ ?second\(s\)?|[\d.,]+(?:–|-) *[\d.,]+%|[\d.]+%)/gi)
    .map((part, i) => {
      if (/^[\d.,]+(?:–|-) *[\d.,]+%$/.test(part)) {
        return (
          <span key={i} className="text-cyan-400 font-semibold">
            {part}
          </span>
        );
      } else if (/^[\d.]+%$/.test(part)) {
        return (
          <span key={i} className="text-cyan-400 font-semibold">
            {part}
          </span>
        );
      } else if (/^\d+ ?second\(s\)?$/i.test(part)) {
        return (
          <span key={i} className="text-rose-400 font-semibold">
            {part}
          </span>
        );
      } else if (/^\[[^\]]+\]$/.test(part)) {
        return (
          <span
            key={i}
            className="font-semibold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent"
          >
            {part}
          </span>
        );
      } else {
        return <span key={i}>{part}</span>;
      }
    });
};

export default function Page({ params }) {
  const { WeaponId } = React.use(params);

  const [weapon, setWeapon] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchWeapon = async () => {
      try {
        const docRef = doc(db, "jinwooWeapons", WeaponId);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setWeapon(docSnap.data());
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeapon();
  }, [WeaponId]);

  if (!weapon) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <h1 className="text-white text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  const gradient =
    rarityGradient[weapon.rarity] ||
    "from-gray-700 via-gray-600 to-gray-500 border-gray-400/50";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-950 to-purple-950 pt-25 overflow-hidden">
      {/* PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
              animationDelay: `${i % 5}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {/* LEFT SIDE */}
        <div className="sticky top-24 flex justify-center">
          <div className="fixed">
            <div
              className="absolute inset-0 blur-3xl rounded-full"
              style={{
                backgroundColor: weapon.color || "#a855f7",
                opacity: 0.2,
              }}
            />

            <img
              src={
                weapon.weaponImg2?.[0] ||
                weapon.weaponImg?.[0] ||
                "/placeholder.png"
              }
              alt={weapon.weaponName}
              className="relative w-full max-w-[32rem] h-[42rem] object-contain"
              style={{
                filter: `drop-shadow(0 0 35px ${weapon.color || "#a855f7"})`,
              }}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">
          <div>
            <h1
              className={`text-5xl md:text-6xl font-black tracking-wide bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-transparent ${cinzel.className}`}
            >
              {weapon.weaponName}
            </h1>

            <div className="flex items-center gap-4 mt-4">
              <span className="px-4 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-purple-300 font-bold">
                {weapon.rarity}
              </span>

              <span className="text-lg text-gray-300">{weapon.weapon}</span>

              {weapon.element && Elements[weapon.element] && (
                <img
                  src={Elements[weapon.element]}
                  alt={weapon.element}
                  className="w-8 h-8"
                />
              )}
            </div>
          </div>

          {/* RELEASE */}
          <InfoCard label="Release Date">
            <p className="text-cyan-300 text-lg">{weapon.releaseDate}</p>
          </InfoCard>

          {/* ADVANCEMENT */}
          <InfoCard label="Advancement Effects">
            <div className="flex flex-col gap-4">
              {/* STARS */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    onClick={() =>
                      setSelectedIndex((prev) => (prev === i ? i - 1 : i))
                    }
                    className={`w-7 h-7 cursor-pointer transition-all ${
                      selectedIndex >= i
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>

              {/* ADV TEXT */}
              <div className="bg-black/30 border border-purple-500/20 rounded-2xl p-5 text-sm text-gray-300 leading-relaxed">
                {weapon.advancement?.[selectedIndex]
                  ?.split("\n")
                  .map((line, idx) => (
                    <p key={idx}>{formatText(line)}</p>
                  ))}
              </div>
            </div>
          </InfoCard>

          {/* SKILLS */}
          {weapon.skills?.length > 0 && (
            <div className="space-y-6">
              {weapon.skills.map((skill, index) => (
                <InfoCard key={index} label="Skills">
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* LEFT */}
                    <div className="flex flex-col items-center gap-3">
                      {skill.skillImg && (
                        <img
                          src={skill.skillImg}
                          alt={skill.skillName}
                          className="w-24 h-24 object-contain border border-gray-600 rounded-xl bg-black/30"
                        />
                      )}

                      {Array.isArray(skill.skillImg2) &&
                        skill.skillImg2.length > 0 && (
                          <div className="flex gap-2 flex-wrap justify-center">
                            {skill.skillImg2.map((imgUrl, i) =>
                              imgUrl ? (
                                <img
                                  key={i}
                                  src={imgUrl}
                                  alt={`Skill extra ${i + 1}`}
                                  className="w-14 h-14 object-contain border border-gray-500 rounded-lg bg-black/30"
                                />
                              ) : null,
                            )}
                          </div>
                        )}
                    </div>

                    {/* RIGHT */}
                    <div className="flex-1 space-y-3">
                      <div className="text-2xl font-bold text-white">
                        {skill.skillName}
                      </div>

                      <div className="text-sm text-gray-300 leading-relaxed">
                        {skill.description?.split("\n").map((line, idx) => (
                          <p key={idx}>{formatText(line)}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </InfoCard>
              ))}
            </div>
          )}

          <InfoCard>
            <CommentsPage />
          </InfoCard>
        </div>
      </div>
    </div>
  );
}

const InfoCard = ({ label, children }) => (
  <div className="bg-gray-900/50 border border-purple-500/20 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
    {label && (
      <div className="text-purple-400 text-sm uppercase tracking-[0.3em] mb-5 font-semibold">
        {label}
      </div>
    )}

    {children}
  </div>
);
