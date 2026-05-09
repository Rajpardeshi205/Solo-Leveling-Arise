import React from "react";

const shadowIcon = (
  <img
    src="https://resources.vortexgaming.io/upload/post/2025/10/01/c6f8e66b1bb0448ca16b3e76f05f43a7.webp"
    alt="Hunter Icon"
    className="w-36 h-8"
  />
);

export default function ShadowWeaponCard({ weaponImg, weaponName }) {
  return (
    <div
      className={`relative w-full max-w-[350px] h-28 aspect-[3/1] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-Blue-900 via-purple-700 to-blue-600 border-purple-400/50`}
    >
      <img
        src={weaponImg}
        className="absolute right-55 scale-150 w-40  object-contain z-0 drop-shadow-[0_0_15px_black]"
      />
      <div className="absolute  bg-opacity-40 z-10" />

      <div className="absolute bottom-12 right-3 text-center text-white text-xl font-bold z-20 bg-clip-text drop-shadow-[0_0_5px_black] tracking-tighter">
        {weaponName}
      </div>
      <div className="absolute  bottom-0 right-0 z-20 drop-shadow-[0_0_15px_black]">
        {shadowIcon}
      </div>
    </div>
  );
}
