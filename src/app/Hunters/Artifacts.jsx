"use client";
import React, { useState } from "react";

export default function Artifacts({ artifacts: equippedArtifacts, structure }) {
  const [tooltip, setTooltip] = useState({
    content: null,
    x: 0,
    y: 0,
    visible: false,
  });

  if (!equippedArtifacts?.length) {
    return <div className="text-gray-400 text-sm">No artifacts found.</div>;
  }

  const armorPartOrder = ["helmet", "bodyArmor", "gloves", "boots"];

  const accessoryPartOrder = ["necklace", "bracelet", "ring", "earrings"];

  const allSets = Array.isArray(structure)
    ? structure
    : Object.values(structure || {});
  const armorPartsMapped = [];
  const accessoryPartsMapped = [];

  allSets.forEach((rawSet) => {
    const set = rawSet?.value || rawSet;

    if (!set) return;

    const setArray = Array.isArray(set) ? set : Object.values(set);

    const setName = setArray[0];

    const rawParts = setArray[1];

    const parts = Array.isArray(rawParts)
      ? rawParts
      : Object.values(rawParts?.value || rawParts || {});

    parts.forEach((part) => {
      const cleanPart = typeof part === "string" ? part.trim() : "";

      if (armorPartOrder.includes(cleanPart)) {
        armorPartsMapped.push({
          part: cleanPart,
          setName,
        });
      }

      if (accessoryPartOrder.includes(cleanPart)) {
        accessoryPartsMapped.push({
          part: cleanPart,
          setName,
        });
      }
    });
  });

  function getArtifactData(setName) {
    return equippedArtifacts.find(
      (a) =>
        a?.name?.replace(/\s+/g, " ").trim().toLowerCase() ===
        setName?.replace(/\s+/g, " ").trim().toLowerCase(),
    );
  }

  function handleMouseMove(e, artifactData) {
    if (!artifactData) return;

    setTooltip({
      content: (
        <div className="whitespace-pre-line text-xs text-white">
          <strong>{artifactData.name}</strong>

          {Object.entries(artifactData.setEffects || {}).map(([key, value]) => (
            <div key={key} className="mt-2">
              <span className="text-yellow-400">{key} Set:</span>

              <div>{Array.isArray(value) ? value.join("\n") : value}</div>
            </div>
          ))}
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

  return (
    <>
      <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
        {/* ARMOR */}
        <InfoCard>
          <div className="flex flex-col items-center gap-4">
            {" "}
            {armorPartsMapped.map(({ part, setName }, i) => {
              const data = getArtifactData(setName);

              return (
                <img
                  key={i}
                  src={
                    data?.pieces?.[
                      Object.keys(data?.pieces || {}).find(
                        (key) =>
                          key.toLowerCase().trim() ===
                          part.toLowerCase().trim(),
                      )
                    ] || "/placeholder.png"
                  }
                  alt={part}
                  className="w-20 h-20 object-contain border border-yellow-500 rounded-lg bg-black"
                  onMouseMove={(e) => handleMouseMove(e, data)}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}
          </div>
        </InfoCard>

        {/* ACCESSORIES */}
        <InfoCard>
          <div className="flex flex-col items-center gap-4">
            {" "}
            {accessoryPartsMapped.map(({ part, setName }, i) => {
              const data = getArtifactData(setName);

              return (
                <img
                  key={i}
                  src={
                    data?.pieces?.[
                      Object.keys(data?.pieces || {}).find(
                        (key) =>
                          key.toLowerCase().trim() ===
                          part.toLowerCase().trim(),
                      )
                    ] || "/placeholder.png"
                  }
                  alt={part}
                  className="w-20 h-20 object-contain border border-green-500 rounded-lg bg-black"
                  onMouseMove={(e) => handleMouseMove(e, data)}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}
          </div>
        </InfoCard>
      </div>

      {tooltip.visible && (
        <div
          className="fixed z-50 bg-gray-900 border border-yellow-400 text-white rounded p-2 text-xs shadow-xl pointer-events-none w-72"
          style={{
            top: tooltip.y,
            left: tooltip.x,
          }}
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
