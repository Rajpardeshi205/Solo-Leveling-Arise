import React from "react";
import { Elements } from "../../Components/gameData/Elements";

const rarityGradient = {
  SSR: "bg-gradient-to-br from-red-900 via-red-700 to-rose-600 border-red-400/50",
  SR: "bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-600 border-purple-400/50",
  R: "bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-600 border-emerald-400/50",
};

const hunterIcon = (
  <img
    src="https://resources.vortexgaming.io/upload/post/2025/07/11/8ed354b9c7044dea928ecce69721dd72.webp"
    alt="Hunter Icon"
    className="w-36 h-6"
  />
);

const HunterWeaponCard = ({ weaponName, weaponImg, rarity, element }) => {
  const gradient = rarityGradient[rarity] || "from-gray-400 to-gray-600";
  return (
    <div
      className={`relative w-full max-w-[400px] aspect-[3/1] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br ${gradient}`}
    >
      <img
        src={weaponImg[1]}
        className="absolute right-16 scale-150 w-full h-full object-contain z-0 drop-shadow-[0_0_15px_black]"
      />
      <div className="absolute  bg-opacity-40 z-10" />
      <div
        className={`absolute top-2 right-2 text-3xl font-extrabold text-transparent bg-clip-text drop-shadow-[0_0_3px_black] tracking-tighter z-20 ${rarityGradient[rarity]}`}
      >
        {rarity}
      </div>
      {element && Elements[element] && (
        <img
          src={Elements[element]}
          alt={element}
          className="absolute top-2 left-2 w-6 h-6 z-20 drop-shadow-[0_0_10px_black]"
        />
      )}
      <div className="absolute bottom-12 right-3 text-center text-white text-2xl font-bold z-20 bg-clip-text drop-shadow-[0_0_5px_black] tracking-tighter">
        {weaponName}
      </div>
      <div className="absolute  bottom-0 right-0 z-20">{hunterIcon}</div>
    </div>
  );
};

export default HunterWeaponCard;
