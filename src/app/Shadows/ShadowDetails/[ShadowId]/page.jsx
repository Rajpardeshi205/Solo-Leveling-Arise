import React from "react";
import { ShadowArmy } from "../../../../Components/gameData/Shadows";
import { Cinzel_Decorative } from "next/font/google";
import ShadowWeaponCard from "../../ShadowWeaponCard";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700"],
});

// 🔹 Parser function reused for Shadow text
const formatText = (text, color = "#f7b655") => {
  return text
    .split(/(\[[^\]]+\]|\d+ ?second\(s\)?|[\d.,]+(?:–|-) *[\d.,]+%|[\d.]+%)/gi)
    .map((part, i) => {
      if (/^[\d.,]+(?:–|-) *[\d.,]+%$/.test(part)) {
        return (
          <span key={i} className="text-blue-400 font-semibold">
            {part}
          </span>
        );
      } else if (/^[\d.]+%$/.test(part)) {
        return (
          <span key={i} className="text-blue-400 font-semibold">
            {part}
          </span>
        );
      } else if (/^\d+ ?second\(s\)?$/.test(part)) {
        return (
          <span key={i} className="text-rose-600 font-semibold">
            {part}
          </span>
        );
      } else if (/^\[[^\]]+\]$/.test(part)) {
        return (
          <span
            key={i}
            className="font-semibold  bg-gradient-to-r from-green-400 to-green-400 bg-clip-text text-transparent"
          >
            {part}
          </span>
        );
      } else {
        return <span key={i}>{part}</span>;
      }
    });
};

export default async function Page({ params }) {
  // ✅ Await params before accessing properties
  const { ShadowId } = await params;
  const shadow = ShadowArmy[ShadowId]; // lookup by key

  if (!shadow) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <h1 className="text-red-500 text-3xl font-bold">Shadow not found!</h1>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-purple-900 min-h-screen flex items-center justify-center px-10 py-12 pt-24">
      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-6xl">
        {/* Left side: Big Image */}
        <div className="w-full md:w-[60%] md:sticky md:top-24 self-start">
          <div className="flex justify-center">
            <img
              src={shadow.img}
              alt={shadow.name}
              style={{
                filter: "drop-shadow(0 0 20px rgba(185, 36, 235, 0.879))",
              }}
              className="w-96 h-[40rem] object-cover rounded-2xl shadow-2xl border border-purple-600/40"
            />
          </div>
        </div>

        {/* Right side: Info */}
        <div className="flex flex-col space-y-6 text-white">
          {/* Name */}
          <h1
            className={`text-5xl bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-transparent sm:text-4xl font-extrabold tracking-wider ${cinzel.className}`}
          >
            {shadow.name}
          </h1>

          <h6
            className={`text-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-100
 bg-clip-text text-transparent font-light tracking-wide -mt-5 ${cinzel.className}`}
          >
            {shadow.nickname}
          </h6>

          <InfoCard label="Shadow's Rank">
            <p className={`text-3xl text-teal-400  ${cinzel.className}`}>
              {formatText(shadow.rank)}
            </p>
          </InfoCard>

          {/* Authority */}
          <InfoCard label="Shadow's Authority">
            <p className="text-gray-300 text-sm ">
              {formatText(shadow.authority, "#a855f7")}
            </p>
          </InfoCard>

          {/* Weapon */}
          <InfoCard label="Weapon">
            <div className="flex justify-center">
              <ShadowWeaponCard
                weaponImg={shadow.weaponImg}
                weaponName={shadow.weaponName}
              />
            </div>
            <div className="flex items-center pt-8">
              <p className="text-gray-300 text-sm">
                {formatText(shadow.weaponEffect, "#a855f7")}
              </p>
            </div>
          </InfoCard>

          {/* Skills */}
          <InfoCard label="Skills">
            <div className="skills">
              <h2 className="text-white text-2xl font-bold mb-2">
                Basic Skills
              </h2>
              <ul className="space-y-2">
                {shadow.skills.basic.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-gray-800/50 p-2 rounded-lg flex items-center gap-2"
                  >
                    <img
                      src={skill.img}
                      alt={skill.name}
                      className="w-10 h-10"
                    />
                    <div>
                      <p className="text-purple-300 font-semibold">
                        {skill.name}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {formatText(skill.description, "#a855f7")}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <h2 className="text-white text-2xl font-bold mt-4 mb-2">
                Special Skill
              </h2>
              <div className="bg-gray-800/50 p-2 rounded-lg flex items-center gap-2">
                <img
                  src={shadow.skills.special.img}
                  alt={shadow.skills.special.name}
                  className="w-10 h-10"
                />
                <div>
                  <p className="text-purple-300 font-semibold">
                    {shadow.skills.special.name}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {formatText(shadow.skills.special.description, "#a855f7")}
                  </p>
                </div>
              </div>
            </div>
          </InfoCard>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-300 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

const InfoCard = ({ label, children }) => (
  <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700 shadow-lg">
    {label && <div className="text-purple-400 text-sm mb-2">{label}</div>}
    <div className="text-lg sm:text-xl">{children}</div>
  </div>
);
