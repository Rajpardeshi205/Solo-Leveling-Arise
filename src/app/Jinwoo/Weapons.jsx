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
    className="w-24 h-4 sm:w-36 sm:h-6"
  />
);

const JinwooWeaponCard = ({ weapon, elementImg, onClick }) => {
  const gradient =
    rarityGradient[weapon.rarity] ||
    "from-gray-700 via-gray-600 to-gray-500 border-gray-400/50";

  const displayWeaponImg = Array.isArray(weapon.weaponImg)
    ? weapon.weaponImg[0]
    : weapon.weaponImg || "/placeholder.png";

  return (
    <div
      onClick={onClick}
      className={`relative w-full aspect-[3/1] rounded-2xl overflow-hidden shadow-2xl border bg-gradient-to-br ${gradient} cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300`}
    >
      {/* Weapon image */}
      <img
        src={displayWeaponImg}
        alt={weapon.weaponName}
        className="absolute right-8 sm:right-10 scale-150 w-full h-full object-contain z-0 drop-shadow-[0_0_20px_black]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Rarity */}
      <div className="absolute top-2 right-2 sm:right-3 text-xl sm:text-3xl font-black text-white drop-shadow-[0_0_5px_black] z-20">
        {weapon.rarity}
      </div>

      {/* Element */}
      {elementImg && (
        <img
          src={elementImg}
          alt={weapon.element}
          className="absolute top-2 sm:top-3 left-2 sm:left-3 w-6 h-6 sm:w-8 sm:h-8 z-20 drop-shadow-[0_0_10px_black]"
        />
      )}

      {/* Weapon name */}
      <div className="absolute bottom-7 sm:bottom-10 left-3 sm:left-4 text-white text-base sm:text-2xl font-black z-20 drop-shadow-[0_0_8px_black] max-w-[65%] leading-tight">
        {weapon.weaponName}
      </div>

      {/* Hunter icon */}
      <div className="absolute bottom-0 right-0 z-20">{hunterIcon}</div>
    </div>
  );
};

const InfoCard = ({ children, className = "" }) => (
  <div
    className={`bg-gray-800/40 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-gray-700 shadow-xl ${className}`}
  >
    {children}
  </div>
);

export default function Weapons() {
  const [weapons, setWeapons] = useState([]);
  const [elements, setElements] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weaponSnapshot = await getDocs(collection(db, "jinwooWeapons"));
        setWeapons(
          weaponSnapshot.docs.map((doc) => ({
            firestoreId: doc.id,
            ...doc.data(),
          })),
        );

        const elementSnapshot = await getDocs(collection(db, "elements"));
        const elementData = {};
        elementSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          elementData[data.name || doc.id] = data.img;
        });
        setElements(elementData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Background className="pb-20">
      {/* Hero title */}
      <div className="h-screen flex items-center justify-center px-4">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-center text-purple-400">
          Weapons
        </h1>
      </div>

      {/* Weapons grid */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 pb-20">
        <InfoCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 place-items-center">
            {weapons.map((weapon, index) => (
              <div
                key={weapon.firestoreId || index}
                className="w-full max-w-[450px]"
              >
                <JinwooWeaponCard
                  weapon={weapon}
                  elementImg={elements[weapon.element]}
                  onClick={() =>
                    router.push(`/Jinwoo/WeaponDetails/${weapon.firestoreId}`)
                  }
                />
              </div>
            ))}
          </div>
        </InfoCard>
      </div>
    </Background>
  );
}
