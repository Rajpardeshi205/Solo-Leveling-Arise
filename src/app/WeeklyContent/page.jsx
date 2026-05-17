"use client";

import React, { useState } from "react";
import Background from "@/Components/Background";

import BOT from "./BOT";
import BOTHunterMode from "./BOTHuntermode.jsx";
import POD from "./POD";
import GuildBoss from "./GuildBoss";
import SimulationGate from "./SimulationGate";

const PAGES = [
  { key: "BOT (Jinwoo Mode)", label: "BOT (Jinwoo Mode)" },
  { key: "BOT (Hunter Mode)", label: "BOT (Hunter Mode)" },
  { key: "POD", label: "POD" },
  { key: "Guild Boss", label: "Guild Boss" },
  { key: "Simulation Gate", label: "Simulation Gate" },
];

export default function WeeklyContent() {
  const [selectedPage, setSelectedPage] = useState("BOT (Jinwoo Mode)");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (selectedPage) {
      case "BOT (Jinwoo Mode)":
        return <BOT />;
      case "BOT (Hunter Mode)":
        return <BOTHunterMode />;
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

  const currentPage = PAGES.find((p) => p.key === selectedPage);

  return (
    <Background>
      <div className="min-h-screen pt-22 md:pt-22 w-full flex flex-col md:flex-row text-white">
        {/* ── MOBILE: Top bar ── */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur-md border-b border-gray-700 sticky top-16 z-30">
          <span className="text-base font-black text-purple-400 truncate">
            {currentPage?.label}
          </span>
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-600/30 border border-purple-500/50 text-purple-300 text-xs font-bold"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  sidebarOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
            Menu
          </button>
        </div>

        {/* ── MOBILE: Dropdown nav ── */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-x-0 top-[7.5rem] z-40 bg-black/95 backdrop-blur-md border-b border-gray-700 px-4 py-3 flex flex-col gap-2 shadow-2xl">
            {PAGES.map((page) => (
              <button
                key={page.key}
                onClick={() => {
                  setSelectedPage(page.key);
                  setSidebarOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-xl transition-all duration-200 font-semibold border flex items-center gap-3 ${
                  selectedPage === page.key
                    ? "bg-purple-600 border-purple-400 shadow-lg shadow-purple-500/30 text-white"
                    : "bg-gray-800/40 border-gray-700 hover:bg-gray-700/60 text-gray-300"
                }`}
              >
                <span className="text-sm">{page.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* ── DESKTOP: Left Sidebar ── */}
        <div className="hidden md:flex w-64 lg:w-72 shrink-0 flex-col border-r border-gray-700 bg-black/40 backdrop-blur-md p-4 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <h1 className="text-2xl lg:text-3xl font-black text-purple-400 mb-8">
            Weekly Content
          </h1>
          <div className="flex flex-col gap-3">
            {PAGES.map((page) => (
              <button
                key={page.key}
                onClick={() => setSelectedPage(page.key)}
                className={`text-left px-4 py-3 lg:px-5 lg:py-4 rounded-xl transition-all duration-300 font-semibold border flex items-center gap-3 ${
                  selectedPage === page.key
                    ? "bg-purple-600 border-purple-400 shadow-lg shadow-purple-500/30 text-white"
                    : "bg-gray-800/40 border-gray-700 hover:bg-gray-700/60 text-gray-300"
                }`}
              >
                <span className="text-sm lg:text-base">{page.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 backdrop-blur-md shadow-2xl">
            {renderPage()}
          </div>
        </div>
      </div>
    </Background>
  );
}
