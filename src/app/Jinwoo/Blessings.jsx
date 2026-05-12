"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/FireBaseconfig";
import Background from "@/Components/Background";

export default function Blessings() {
  const [blessings, setBlessings] = useState([]);

  const [tooltip, setTooltip] = useState({
    content: null,
    x: 0,
    y: 0,
    visible: false,
  });

  useEffect(() => {
    const fetchBlessings = async () => {
      try {
        const snapshot = await getDocs(collection(db, "blessings"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("BLESSINGS DATA:", data);

        setBlessings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlessings();
  }, []);

  const survivalBlessings = blessings.filter(
    (blessing) => blessing?.Runes?.[0]?.type === "Survival",
  );

  const empowermentBlessings = blessings.filter(
    (blessing) => blessing?.Runes?.[0]?.type === "Empowerment",
  );

  function handleMouseMove(e, blessing) {
    const blessingData = blessing?.Runes?.[0];

    setTooltip({
      content: (
        <div className="whitespace-pre-line text-xs text-white max-w-xs">
          <strong className="text-yellow-400">{blessing?.Blessing}</strong>

          <br />
          <br />

          <span className="text-purple-300">{blessingData?.description}</span>
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

  const renderBlessings = (title, data) => (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-center text-cyan-400">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.map((blessing) => {
          const blessingData = blessing?.Runes?.[0];

          return (
            <InfoCard key={blessing.id}>
              <div
                className="flex flex-col items-center gap-3 cursor-pointer"
                onMouseMove={(e) => handleMouseMove(e, blessing)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={blessingData?.img}
                  alt={blessing?.Blessing}
                  className="w-24 h-24 object-contain"
                />

                <h3 className="text-sm text-center text-white font-semibold">
                  {blessing?.Blessing}
                </h3>
              </div>
            </InfoCard>
          );
        })}
      </div>
    </div>
  );

  return (
    <Background>
      <div className="w-full max-w-7xl mx-auto px-4 py-10 space-y-12">
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-black text-center text-purple-400">
            Blessings
          </h1>
        </div>

        {renderBlessings("Survival", survivalBlessings)}

        {renderBlessings("Empowerment", empowermentBlessings)}
      </div>

      {tooltip.visible && (
        <div
          className="fixed z-50 bg-gray-900 border border-yellow-400 text-white rounded-lg p-3 text-xs shadow-xl pointer-events-none w-80"
          style={{
            top: tooltip.y,
            left: tooltip.x,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </Background>
  );
}

const InfoCard = ({ label, children, className = "" }) => (
  <div
    className={`bg-gray-800/50 rounded-xl p-4 border border-gray-700 h-full flex flex-col items-center justify-center ${className}`}
  >
    {label && <div className="text-blue-400 text-sm mb-2">{label}</div>}

    {children}
  </div>
);
