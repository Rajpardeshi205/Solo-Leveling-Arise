"use client";
import React, { useState } from "react";

export default function Cores({ selectedHunter, coresData }) {
  const [tooltip, setTooltip] = useState({
    content: null,
    x: 0,
    y: 0,
    visible: false,
  });

  if (!selectedHunter?.Cores || selectedHunter.Cores.length !== 3) return null;

  const coreTypes = ["Mind", "Body", "Spirit"];

  function handleMouseMove(e, core, rarity) {
    const rarityIndex = ["Rare", "Heroic", "Legendary"].indexOf(rarity);
    const effect = core.passive[rarityIndex] || core.passive[0];

    setTooltip({
      content: (
        <div className="whitespace-pre-line text-xs text-white max-w-xs">
          <strong>{core.name}</strong>
          <br />
          <span className="text-yellow-400">{rarity} Passive:</span> {effect}
        </div>
      ),
      x: e.clientX + 16,
      y: e.clientY + 16,
      visible: true,
    });
  }

  function handleMouseLeave() {
    setTooltip({ content: null, x: 0, y: 0, visible: false });
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto my-6">
        {coreTypes.map((type, index) => {
          const coreName = selectedHunter.Cores[index]
            ?.replace(/\s+/g, " ")
            .trim(); // ✅ FIX for extra spaces/tabs

          if (!coreName) return null;

          const coreData = coresData[type]?.find(
            (c) => c.name.trim() === coreName,
          );

          if (!coreData) return null;

          const rarity = "Legendary";

          return (
            <InfoCard key={type}>
              <div className="h-full flex flex-col justify-between items-center gap-2 text-center relative">
                <h3 className="text-sm font-bold text-blue-400 cursor-default px-2">
                  {coreData.name}
                </h3>

                <div className="w-16 h-16 flex items-center justify-center bg-black border border-blue-400 rounded-lg">
                  <img
                    src={coreData.img || "/placeholder.png"}
                    alt={coreData.name}
                    className="w-full h-full object-contain"
                    onMouseMove={(e) => handleMouseMove(e, coreData, rarity)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>

                <div className="text-xs text-gray-300 mt-1">{rarity}</div>
              </div>
            </InfoCard>
          );
        })}
      </div>

      {tooltip.visible && (
        <div
          className="fixed z-50 bg-gray-900 border border-yellow-400 text-white rounded p-2 text-xs shadow-xl pointer-events-none w-72"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.content}
        </div>
      )}
    </>
  );
}

const InfoCard = ({ label, children }) => (
  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 h-full flex flex-col items-center justify-center">
    {label && <div className="text-blue-400 text-sm mb-2">{label}</div>}
    {children}
  </div>
);
