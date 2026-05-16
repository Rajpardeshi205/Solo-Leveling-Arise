"use client";

import React, { useState } from "react";
import Background from "@/Components/Background";

import BOT from "./BOT";
import POD from "./POD";
import GuildBoss from "./GuildBoss";
import SimulationGate from "./SimulationGate";

export default function WeeklyContent() {
  const [selectedPage, setSelectedPage] = useState("BOT");

  const renderPage = () => {
    switch (selectedPage) {
      case "BOT":
        return <BOT />;

      case "POD":
        return <POD />;

      case "Guild Boss":
        return <GuildBoss />;

      case "Simulation Gate":
        return <SimulationGate />;

      default:
        return <BOT />;
    }
  };

  return (
    <Background>
      <div className="min-h-screen pt-20 w-full flex flex-col md:flex-row text-white">
        {/* LEFT SIDEBAR */}
        <div className="w-full md:w-72 border-r border-gray-700 bg-black/40 backdrop-blur-md p-4">
          <h1 className="text-3xl font-black text-purple-400 mb-8">
            Weekly Content
          </h1>

          <div className="flex flex-col gap-3">
            {["BOT", "POD", "Guild Boss", "Simulation Gate"].map((page) => (
              <button
                key={page}
                onClick={() => setSelectedPage(page)}
                className={`text-left px-5 py-4 rounded-xl transition-all duration-300 font-semibold border ${
                  selectedPage === page
                    ? "bg-purple-600 border-purple-400 shadow-lg shadow-purple-500/30"
                    : "bg-gray-800/40 border-gray-700 hover:bg-gray-700/60"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-6 md:p-10">
          <div className="w-full max-w-6xl mx-auto bg-gray-900/50 border border-gray-700 rounded-3xl p-10 backdrop-blur-md shadow-2xl">
            {renderPage()}
          </div>
        </div>
      </div>
    </Background>
  );
}
