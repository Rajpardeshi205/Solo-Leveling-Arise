"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/FireBaseconfig";
import Background from "@/Components/Background";
import { useRouter } from "next/navigation";

const rarityGradient = {
  SSR: "from-red-900 via-red-700 to-rose-600 border-red-400/50",
  SR: "from-purple-900 via-purple-700 to-indigo-600 border-purple-400/50",
  R: "from-emerald-900 via-emerald-700 to-teal-600 border-emerald-400/50",
};

const hunterIcon = (
  <img
    src="https://resources.vortexgaming.io/upload/post/2026/05/15/ee5a7c077c46485285dfc584b2dbe78c.webp"
    alt="Player Icon"
    className="w-36 h-6"
  />
);

const JinwooWeaponCard = ({ weapon, elementImg, onClick }) => {
  const gradient =
    rarityGradient[weapon.rarity] ||
    "from-gray-700 via-gray-600 to-gray-500 border-gray-400/50";

  // ✅ FIXED weapon image
  const displayWeaponImg = Array.isArray(weapon.weaponImg)
    ? weapon.weaponImg[0]
    : weapon.weaponImg || "/placeholder.png";

  return (
    <div
      onClick={onClick}
      className={`relative w-full max-w-[420px] aspect-[3/1] rounded-2xl overflow-hidden shadow-2xl border bg-gradient-to-br ${gradient} cursor-pointer hover:scale-105 transition-all duration-300`}
    >
      {/* Weapon Image */}
      <img
        src={displayWeaponImg}
        alt={weapon.weaponName}
        className="absolute right-10 scale-150 w-full h-full object-contain z-0 drop-shadow-[0_0_20px_black]"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Rarity */}
      <div className="absolute top-2 right-3 text-3xl font-black text-white drop-shadow-[0_0_5px_black] z-20">
        {weapon.rarity}
      </div>

      {/* Element */}
      {elementImg && (
        <img
          src={elementImg}
          alt={weapon.element}
          className="absolute top-3 left-3 w-8 h-8 z-20 drop-shadow-[0_0_10px_black]"
        />
      )}

      {/* Weapon Name */}
      <div className="absolute bottom-10 left-4 text-white text-2xl font-black z-20 drop-shadow-[0_0_8px_black] max-w-[70%] leading-tight">
        {weapon.weaponName}
      </div>

      {/* Hunter Icon */}
      <div className="absolute bottom-0 right-0 z-20">{hunterIcon}</div>
    </div>
  );
};

export default function Weapons() {
  const [weapons, setWeapons] = useState([]);
  const [elements, setElements] = useState({});

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ FETCH WEAPONS
        const weaponSnapshot = await getDocs(collection(db, "jinwooWeapons"));

        const weaponData = weaponSnapshot.docs.map((doc) => ({
          firestoreId: doc.id,
          ...doc.data(),
        }));

        setWeapons(weaponData);

        // ✅ FETCH ELEMENTS
        const elementSnapshot = await getDocs(collection(db, "elements"));

        const elementData = {};

        elementSnapshot.docs.forEach((doc) => {
          const data = doc.data();

          elementData[data.name || doc.id] = data.img;
        });

        setElements(elementData);

        console.log("WEAPONS:", weaponData);
        console.log("ELEMENTS:", elementData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Background className="pb-20">
      {/* TITLE */}
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl font-black text-center text-purple-400">
          Weapons
        </h1>
      </div>

      {/* WEAPONS GRID */}
      <div className="w-full max-w-7xl mx-auto px-4 pb-20">
        <InfoCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
            {weapons.map((weapon, index) => (
              <InfoCard
                key={weapon.firestoreId || index}
                className="w-full max-w-[450px] hover:scale-[1.02] transition-all duration-300"
              >
                <JinwooWeaponCard
                  weapon={weapon}
                  elementImg={elements[weapon.element]}
                  onClick={() =>
                    router.push(`/Jinwoo/WeaponDetails/${weapon.firestoreId}`)
                  }
                />
              </InfoCard>
            ))}
          </div>
        </InfoCard>
      </div>
    </Background>
  );
}
const InfoCard = ({ label, children, className = "" }) => (
  <div
    className={`bg-gray-800/40 backdrop-blur-md rounded-2xl p-4 border border-gray-700 shadow-xl ${className}`}
  >
    {label && <div className="text-blue-400 text-sm mb-2">{label}</div>}

    {children}
  </div>
);
