"use client";

import React, { useState } from "react";
import Background from "@/Components/Background";

import BOT from "./BOT";
import BOTHunterMode from "./BOTHuntermode.jsx";
import POD from "./POD";
import GuildBoss from "./GuildBoss";
import SimulationGate from "./SimulationGate";
import POD2 from "./POD2";
import GuildBoss2 from "./GuildBoss2";

const PAGES = [
  { key: "BOT (Jinwoo Mode)", label: "BOT (Jinwoo Mode)" },
  { key: "BOT (Hunter Mode)", label: "BOT (Hunter Mode)" },
  { key: "POD", label: "POD" },
  { key: "POD2", label: "POD 2" },
  { key: "Guild Boss", label: "Guild Boss" },
  { key: "Guild Boss 2", label: "Guild Boss 2" },
  { key: "Simulation Gate", label: "Simulation Gate" },
];
function Toast({ show, message, type }) {
  const isErr = type === "error";

  return (
    <div
      className={`fixed right-5 z-[999999] flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 ${
        show ? "translate-x-0 opacity-100" : "translate-x-[140%] opacity-0"
      }`}
      style={{
        top: "90px",

        background:
          "linear-gradient(135deg,rgba(10,22,48,0.98),rgba(6,14,32,0.99))",

        border: `1px solid ${
          isErr ? "rgba(255,80,80,0.45)" : "rgba(80,200,130,0.4)"
        }`,

        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",

        minWidth: 230,
        maxWidth: 320,

        pointerEvents: "none",
      }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: isErr ? "rgba(255,80,80,0.12)" : "rgba(80,200,130,0.12)",

          border: `1px solid ${
            isErr ? "rgba(255,80,80,0.35)" : "rgba(80,200,130,0.35)"
          }`,
        }}
      >
        {isErr ? "✕" : "✦"}
      </div>

      <div>
        <div
          className="text-xs font-semibold tracking-widest uppercase mb-0.5"
          style={{
            color: isErr ? "rgba(255,110,110,0.85)" : "rgba(80,200,130,0.85)",
          }}
        >
          {isErr ? "Error" : "Success"}
        </div>

        <div
          className="text-sm font-bold leading-snug"
          style={{
            color: isErr ? "#ffd8d8" : "#d8f0e8",
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}

export default function WeeklyContent() {
  const [selectedPage, setSelectedPage] = useState("BOT (Jinwoo Mode)");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const renderPage = () => {
    switch (selectedPage) {
      case "BOT (Jinwoo Mode)":
        return <BOT fireToast={fireToast} />;
      case "BOT (Hunter Mode)":
        return <BOTHunterMode fireToast={fireToast} />;
      case "POD":
        return <POD fireToast={fireToast} />;
      case "POD2":
        return <POD2 fireToast={fireToast} />;
      case "Guild Boss":
        return <GuildBoss fireToast={fireToast} />;
      case "Guild Boss 2":
        return <GuildBoss2 fireToast={fireToast} />;
      case "Simulation Gate":
        return <SimulationGate fireToast={fireToast} />;
      default:
        return <BOT fireToast={fireToast} />;
    }
  };

  const currentPage = PAGES.find((p) => p.key === selectedPage);

  const fireToast = ({ type = "success", message }) => {
    setToast({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast((t) => ({
        ...t,
        show: false,
      }));
    }, 3500);
  };

  return (
    <>
      <Toast show={toast.show} message={toast.message} type={toast.type} />

      <Background>
        {" "}
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
    </>
  );
}
