"use client";
import React, { useState } from "react";

export default function Artifacts({ artifacts: equippedArtifacts, structure }) {
  const [tooltip, setTooltip] = useState({
    content: null,
    x: 0,
    y: 0,
    visible: false,
  });

  if (!equippedArtifacts || equippedArtifacts.length < 2) return null;

  // Rebuild structure using Firestore + hunter mapping
  const artifactStructure = structure;
  const armorSetsRaw = [artifactStructure[0]];
  const accessorySet = artifactStructure[1];
  // Normalize armor sets into consistent structure
  const armorSets = Array.isArray(armorSetsRaw[0])
    ? armorSetsRaw
    : [armorSetsRaw];

  const accessoryName = accessorySet[0];
  const accessoryParts = accessorySet[1];

  // ✅ FIXED (use Firestore data)
  const accessoryData = equippedArtifacts.find((a) => a.name === accessoryName);

  const armorPartOrder = ["helmet", "bodyArmor", "gloves", "boots"];

  // Collect armor parts with their source set
  const armorPartsMapped = armorSets
    .flatMap(([setName, parts]) => parts.map((part) => ({ part, setName })))
    .sort(
      (a, b) => armorPartOrder.indexOf(a.part) - armorPartOrder.indexOf(b.part),
    );

  // Group all sets used (for 8-piece check)
  const allSets = [...armorSets, accessorySet];
  const setPieceCounts = {};

  allSets.forEach(([name, parts]) => {
    setPieceCounts[name] = (setPieceCounts[name] || 0) + parts.length;
  });

  function getEffectKey(pieceCount, effectKeys) {
    return effectKeys
      .filter((key) => key <= pieceCount)
      .sort((a, b) => b - a)[0];
  }

  function renderEffectText(effect) {
    return Array.isArray(effect) ? effect.join("\n") : effect;
  }

  function getTooltipContent(artifactData, pieceCount) {
    if (!artifactData?.setEffects) return null;
    const keys = Object.keys(artifactData.setEffects)
      .map(Number)
      .filter((k) => !isNaN(k));
    const effectKey = getEffectKey(pieceCount, keys);
    if (!effectKey) return null;
    const effect = artifactData.setEffects[effectKey];
    return (
      <div className="whitespace-pre-line text-xs text-white">
        <strong>{effectKey}-Piece Effect:</strong>
        <br />
        {renderEffectText(effect)}
      </div>
    );
  }

  function handleMouseMove(e, artifactData, pieceCount) {
    const tooltipContent = getTooltipContent(artifactData, pieceCount);
    if (!tooltipContent) return;
    setTooltip({
      content: tooltipContent,
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
      <div className="w-full grid grid-cols-2 gap-6 max-w-xl mx-auto my-6">
        {/* Armor Column */}
        <InfoCard>
          <div className="flex flex-col items-center gap-2 relative">
            <h3 className="text-sm text-yellow-400 font-bold text-center cursor-default">
              {armorSets.map(([name]) => name).join(" + ")}
            </h3>
            <div className="flex flex-col gap-2">
              {armorPartsMapped.map(({ part, setName }, i) => {
                // ✅ FIXED (use Firestore data)
                const data = equippedArtifacts.find((a) => a.name === setName);
                const count = setPieceCounts[setName] || 0;

                return (
                  <img
                    key={`${setName}-${part}-${i}`}
                    // ✅ FIXED (image from Firestore)
                    src={data?.pieces?.[part] || "/placeholder.png"}
                    alt={part}
                    width={64}
                    height={64}
                    className="border border-yellow-500 rounded-lg"
                    onMouseMove={(e) => handleMouseMove(e, data, count)}
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })}
            </div>
          </div>
        </InfoCard>

        {/* Accessory Column */}
        <InfoCard>
          <div className="flex flex-col items-center gap-2 relative">
            <h3 className="text-sm text-green-400 font-bold text-center cursor-default">
              {accessoryName}
            </h3>
            <div className="flex flex-col gap-2">
              {accessoryParts.map((part, i) => {
                const count = setPieceCounts[accessoryName] || 0;
                return (
                  <img
                    key={i}
                    // ✅ FIXED (image from Firestore)
                    src={accessoryData?.pieces?.[part] || "/placeholder.png"}
                    alt={part}
                    width={64}
                    height={64}
                    className="border border-green-500 rounded-lg"
                    onMouseMove={(e) =>
                      handleMouseMove(e, accessoryData, count)
                    }
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })}
            </div>
          </div>
        </InfoCard>
      </div>

      {/* Tooltip */}
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
  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
    {label && <div className="text-blue-400 text-sm mb-2">{label}</div>}
    <div className="text-lg sm:text-xl font-semibold">{children}</div>
  </div>
);
