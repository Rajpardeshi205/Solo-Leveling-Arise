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
      if (/^[\d.,]+(?:–|-) *[\d.,]+%$/.test(part))
        return (
          <span key={i} className="text-cyan-400 font-semibold">
            {part}
          </span>
        );
      if (/^[\d.]+%$/.test(part))
        return (
          <span key={i} className="text-cyan-400 font-semibold">
            {part}
          </span>
        );
      if (/^\d+ ?second\(s\)?$/i.test(part))
        return (
          <span key={i} className="text-rose-400 font-semibold">
            {part}
          </span>
        );
      if (/^\[[^\]]+\]$/.test(part))
        return (
          <span
            key={i}
            className="font-semibold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent"
          >
            {part}
          </span>
        );
      return <span key={i}>{part}</span>;
    });
};

const InfoCard = ({ label, children }) => (
  <div className="bg-gray-900/50 border border-purple-500/20 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">
    {label && (
      <div className="text-purple-400 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-5 font-semibold">
        {label}
      </div>
    )}
    {children}
  </div>
);

export default function Page({ params }) {
  const { WeaponId } = React.use(params);
  const [weapon, setWeapon] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const fetchWeapon = async () => {
      try {
        const docRef = doc(db, "jinwooWeapons", WeaponId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setWeapon(docSnap.data());
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeapon();
  }, [WeaponId]);

  if (!weapon) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <h1 className="text-white text-2xl sm:text-3xl font-bold animate-pulse">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-950 to-purple-950 pt-16 sm:pt-20 md:pt-24 overflow-hidden">
      {/* Particles */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* ── MOBILE: weapon image on top, full width ── */}
        <div className="lg:hidden w-full flex justify-center mb-6 sm:mb-8">
          <div className="relative w-full max-w-xs sm:max-w-sm">
            <div
              className="absolute inset-0 blur-3xl rounded-full"
              style={{
                backgroundColor: weapon.color || "#a855f7",
                opacity: 0.25,
              }}
            />
            <img
              src={
                weapon.weaponImg2?.[0] ||
                weapon.weaponImg?.[0] ||
                "/placeholder.png"
              }
              alt={weapon.weaponName}
              onLoad={() => setImgLoaded(true)}
              className={`relative w-full h-56 sm:h-72 object-contain transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              style={{
                filter: `drop-shadow(0 0 30px ${weapon.color || "#a855f7"})`,
              }}
            />
          </div>
        </div>

        {/* ── DESKTOP: two-column layout ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10">
          {/* LEFT — sticky image, desktop only */}
          <div className="hidden lg:flex justify-center">
            <div className="sticky top-24 self-start">
              <div className="relative w-full max-w-md">
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
                  className="relative w-full h-[42rem] object-contain"
                  style={{
                    filter: `drop-shadow(0 0 35px ${weapon.color || "#a855f7"})`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT — content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Title + meta */}
            <div>
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-transparent leading-tight ${cinzel.className}`}
              >
                {weapon.weaponName}
              </h1>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 sm:mt-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-purple-300 font-bold text-sm">
                  {weapon.rarity}
                </span>
                <span className="text-sm sm:text-lg text-gray-300">
                  {weapon.weapon}
                </span>
                {weapon.element && Elements[weapon.element] && (
                  <img
                    src={Elements[weapon.element]}
                    alt={weapon.element}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                )}
              </div>
            </div>

            {/* Release date */}
            <InfoCard label="Release Date">
              <p className="text-cyan-300 text-base sm:text-lg">
                {weapon.releaseDate}
              </p>
            </InfoCard>

            {/* Advancement */}
            <InfoCard label="Advancement Effects">
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Stars */}
                <div className="flex gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      onClick={() =>
                        setSelectedIndex((prev) => (prev === i ? i - 1 : i))
                      }
                      className={`w-6 h-6 sm:w-7 sm:h-7 cursor-pointer transition-all ${
                        selectedIndex >= i
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                {/* Advancement text */}
                <div className="bg-black/30 border border-purple-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-5 text-xs sm:text-sm text-gray-300 leading-relaxed space-y-1">
                  {weapon.advancement?.[selectedIndex]
                    ?.split("\n")
                    .map((line, idx) => (
                      <p key={idx}>{formatText(line)}</p>
                    ))}
                </div>
              </div>
            </InfoCard>

            {/* Skills */}
            {weapon.skills?.length > 0 && (
              <div className="space-y-4 sm:space-y-6">
                {weapon.skills.map((skill, index) => (
                  <InfoCard key={index} label="Skills">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                      {/* Skill images */}
                      <div className="flex sm:flex-col items-center gap-3 shrink-0">
                        {skill.skillImg && (
                          <img
                            src={skill.skillImg}
                            alt={skill.skillName}
                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain border border-gray-600 rounded-xl bg-black/30"
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
                                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain border border-gray-500 rounded-lg bg-black/30"
                                  />
                                ) : null,
                              )}
                            </div>
                          )}
                      </div>

                      {/* Skill text */}
                      <div className="flex-1 space-y-2 sm:space-y-3">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                          {skill.skillName}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300 leading-relaxed space-y-1">
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

            {/* Comments */}
            <InfoCard>
              <CommentsPage />
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
}
