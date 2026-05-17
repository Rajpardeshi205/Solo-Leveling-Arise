"use client";

import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/FireBaseconfig";
import Background from "@/Components/Background";

// ─── ImageSelect ──────────────────────────────────────────────────────────────
const ImageSelect = ({
  label,
  placeholder,
  border = "border-purple-500",
  items = [],
  keyFn,
  labelFn,
  imgFn,
  onChange,
  value = "",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = items.find((item) => keyFn(item) === value) || null;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-2 bg-black/80 border ${border} rounded-xl px-3 py-2.5 text-white text-sm text-left`}
      >
        {selected && imgFn?.(selected) ? (
          <img
            src={imgFn(selected)}
            alt=""
            className="w-7 h-7 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <span className="w-7 h-7 rounded-lg bg-white/10 flex-shrink-0" />
        )}
        <span className="truncate flex-1 text-xs sm:text-sm">
          {selected ? labelFn(selected) : placeholder || label}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-gray-900 border border-white/10 rounded-xl shadow-2xl max-h-56 overflow-y-auto">
          <div
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-white/5 text-gray-500 text-sm"
          >
            <span className="w-8 h-8 rounded-lg bg-white/5 flex-shrink-0" />
            <span className="text-xs sm:text-sm">{placeholder || label}</span>
          </div>
          {items.map((item) => {
            const key = keyFn(item);
            const isActive = key === value;
            return (
              <div
                key={key}
                onClick={() => {
                  onChange(key);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-white/5 transition-colors ${
                  isActive ? "bg-white/10 text-white" : "text-gray-300"
                }`}
              >
                {imgFn?.(item) ? (
                  <img
                    src={imgFn(item)}
                    alt=""
                    className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex-shrink-0" />
                )}
                <span className="truncate flex-1 text-xs sm:text-sm">
                  {labelFn(item)}
                </span>
                {isActive && (
                  <svg
                    className="w-4 h-4 ml-auto text-purple-400 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── InfoCard ─────────────────────────────────────────────────────────────────
const InfoCard = ({ label, children, accent = "purple", className = "" }) => {
  const borderColor =
    {
      cyan: "border-cyan-500/20",
      purple: "border-purple-500/20",
      red: "border-red-500/20",
      yellow: "border-yellow-500/20",
      green: "border-green-500/20",
      blue: "border-blue-500/20",
      orange: "border-orange-500/20",
      pink: "border-pink-500/20",
      violet: "border-violet-500/20",
      indigo: "border-indigo-500/20",
      fuchsia: "border-fuchsia-500/20",
    }[accent] || "border-purple-500/20";

  const labelColor =
    {
      cyan: "text-cyan-400",
      purple: "text-purple-400",
      red: "text-red-400",
      yellow: "text-yellow-400",
      green: "text-green-400",
      blue: "text-blue-400",
      orange: "text-orange-400",
      pink: "text-pink-400",
      violet: "text-violet-400",
      indigo: "text-indigo-400",
      fuchsia: "text-fuchsia-400",
    }[accent] || "text-purple-400";

  return (
    <div
      className={`bg-gray-900/60 border ${borderColor} rounded-2xl p-3 sm:p-4 backdrop-blur-md ${className}`}
    >
      {label && (
        <h3
          className={`text-xs sm:text-sm font-black uppercase tracking-widest ${labelColor} mb-3 flex items-center gap-2`}
        >
          {label}
        </h3>
      )}
      {children}
    </div>
  );
};

// ─── ItemSlot ─────────────────────────────────────────────────────────────────
const ItemSlot = ({
  src,
  label,
  accent = "purple",
  size = "md",
  empty = "?",
}) => {
  const sizeClass = {
    sm: "w-10 h-10 sm:w-12 sm:h-12",
    md: "w-12 h-12 sm:w-16 sm:h-16",
    lg: "w-14 h-14 sm:w-20 sm:h-20",
  }[size];

  const borderColor =
    {
      cyan: "border-cyan-500/60",
      purple: "border-purple-500/60",
      red: "border-red-500/60",
      yellow: "border-yellow-500/60",
      green: "border-green-500/60",
      orange: "border-orange-500/60",
      pink: "border-pink-500/60",
      blue: "border-blue-500/60",
      violet: "border-violet-500/60",
      indigo: "border-indigo-500/60",
      fuchsia: "border-fuchsia-500/60",
    }[accent] || "border-purple-500/60";

  const glowColor =
    {
      cyan: "shadow-cyan-500/20",
      purple: "shadow-purple-500/20",
      red: "shadow-red-500/20",
      yellow: "shadow-yellow-500/20",
      green: "shadow-green-500/20",
      violet: "shadow-violet-500/20",
      fuchsia: "shadow-fuchsia-500/20",
    }[accent] || "shadow-purple-500/20";

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${sizeClass} rounded-xl border ${borderColor} bg-black/50 overflow-hidden flex items-center justify-center shadow-md ${glowColor}`}
      >
        {src ? (
          <img src={src} alt={label} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-600 text-base sm:text-xl">{empty}</span>
        )}
      </div>
      {label && (
        <span className="text-[9px] sm:text-[10px] text-gray-400 text-center leading-tight max-w-[56px] sm:max-w-[72px] truncate">
          {label}
        </span>
      )}
    </div>
  );
};

// ─── ArtifactPiecesGrid ───────────────────────────────────────────────────────
const ArtifactPiecesGrid = ({ artifact, accent = "purple" }) => {
  const pieces = artifact?.pieces || {};
  const slots = [
    { key: "helmet", label: "Helmet" },
    { key: "bodyArmor", label: "BodyArmor" },
    { key: "gloves", label: "Gloves" },
    { key: "boots", label: "Boots" },
    { key: "necklace", label: "Necklace" },
    { key: "bracelet", label: "Bracelet" },
    { key: "ring", label: "Ring" },
    { key: "earrings", label: "Earrings" },
  ];
  const nameColor =
    {
      purple: "text-purple-300",
      violet: "text-violet-300",
      indigo: "text-indigo-300",
      fuchsia: "text-fuchsia-300",
    }[accent] || "text-purple-300";

  return (
    <InfoCard label="Artifact Set" accent={accent}>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {slots.map(({ key, label }) => (
          <ItemSlot
            key={key}
            src={pieces[key]}
            label={label}
            accent={accent}
            size="sm"
          />
        ))}
      </div>
      {artifact?.name && (
        <p className={`${nameColor} text-xs font-bold mt-2 text-center`}>
          {artifact.name}
        </p>
      )}
    </InfoCard>
  );
};

// ─── CorePanel ────────────────────────────────────────────────────────────────
const CorePanel = ({ coreBody, coreMind, coreSpirit }) => (
  <InfoCard label="Cores" accent="purple">
    <div className="flex justify-around gap-2 sm:gap-4">
      <ItemSlot
        src={coreBody?.img}
        label={coreBody?.name || "Body"}
        accent="red"
        size="sm"
        empty="⬡"
      />
      <ItemSlot
        src={coreMind?.img}
        label={coreMind?.name || "Mind"}
        accent="blue"
        size="sm"
        empty="⬡"
      />
      <ItemSlot
        src={coreSpirit?.img}
        label={coreSpirit?.name || "Spirit"}
        accent="purple"
        size="sm"
        empty="⬡"
      />
    </div>
  </InfoCard>
);

// ─── HunterEquipPanel ─────────────────────────────────────────────────────────
const HunterEquipPanel = ({
  hunter,
  artifact,
  coreBody,
  coreMind,
  coreSpirit,
  accent = "purple",
}) => {
  if (!hunter) return null;
  return (
    <div className="space-y-3">
      <InfoCard label="Weapon" accent="orange">
        <div className="flex items-center gap-3">
          <ItemSlot
            src={hunter.weaponImg?.[0] || hunter.weapon?.img}
            label={hunter.weaponName || hunter.weapon?.name || "Weapon"}
            accent="orange"
            size="md"
          />
          {(hunter.weaponName || hunter.weapon?.name) && (
            <span className="text-orange-300 text-xs font-semibold truncate">
              {hunter.weaponName || hunter.weapon?.name}
            </span>
          )}
        </div>
      </InfoCard>
      <ArtifactPiecesGrid artifact={artifact} accent={accent} />
      <CorePanel
        coreBody={coreBody}
        coreMind={coreMind}
        coreSpirit={coreSpirit}
      />
    </div>
  );
};

// ─── CharacterCard ────────────────────────────────────────────────────────────
const CharacterCard = ({
  name,
  imgSrc,
  isEmpty,
  emptyLabel,
  accent = "purple",
}) => {
  const borderColor =
    {
      purple: "border-purple-500/30",
      violet: "border-violet-500/30",
      fuchsia: "border-fuchsia-500/30",
      indigo: "border-indigo-500/30",
    }[accent] || "border-purple-500/30";

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border ${borderColor} bg-black/40 h-[160px] sm:h-[260px] md:h-[340px] lg:h-[420px]`}
    >
      {!isEmpty ? (
        <>
          <img
            src={imgSrc}
            className="w-full h-full object-cover object-top"
            alt={name}
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/90 to-transparent">
            <h2 className="text-white font-bold text-xs sm:text-base truncate">
              {name}
            </h2>
          </div>
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-600 text-xs sm:text-sm text-center px-2">
          {emptyLabel}
        </div>
      )}
    </div>
  );
};

// ─── SectionLabel ─────────────────────────────────────────────────────────────
const SectionLabel = ({ color = "text-purple-400", children }) => (
  <p className={`text-xs ${color} font-black uppercase tracking-widest mb-2`}>
    {children}
  </p>
);

// ─── Palette for 3 hunter slots ───────────────────────────────────────────────
const HUNTER_ACCENTS = ["purple", "violet", "fuchsia"];
const HUNTER_BORDERS = [
  "border-purple-500",
  "border-violet-500",
  "border-fuchsia-500",
];
const HUNTER_LABEL_COLORS = [
  "text-purple-400",
  "text-violet-400",
  "text-fuchsia-400",
];
const HUNTER_CARD_ACCENTS = ["purple", "violet", "fuchsia"];

// ─── Main SimulationGate Component ───────────────────────────────────────────
export default function SimulationGate() {
  const [hunters, setHunters] = useState([]);
  const [shadows, setShadows] = useState([]);
  const [artifacts, setArtifacts] = useState([]);

  const [bodyCores, setBodyCores] = useState([]);
  const [mindCores, setMindCores] = useState([]);
  const [spiritCores, setSpiritCores] = useState([]);

  // ── 3 Hunters ──
  const [selectedHunters, setSelectedHunters] = useState([null, null, null]);
  const [hunterArtifacts, setHunterArtifacts] = useState([null, null, null]);
  const [hunterCoreBody, setHunterCoreBody] = useState([null, null, null]);
  const [hunterCoreMind, setHunterCoreMind] = useState([null, null, null]);
  const [hunterCoreSpirit, setHunterCoreSpirit] = useState([null, null, null]);
  const [selectedHunterSkins, setSelectedHunterSkins] = useState([
    null,
    null,
    null,
  ]);

  // ── 1 Shadow ──
  const [selectedShadow, setSelectedShadow] = useState(null);

  // ─── Fetch ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchCores = async () => {
      try {
        const snapshot = await getDocs(collection(db, "cores"));
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (doc.id === "Body") setBodyCores(data.items || []);
          if (doc.id === "Mind") setMindCores(data.items || []);
          if (doc.id === "Spirit") setSpiritCores(data.items || []);
        });
      } catch (error) {
        console.error(error);
      }
    };
    const fetchData = async () => {
      try {
        const snap = async (col) => {
          const s = await getDocs(collection(db, col));
          return s.docs.map((doc) => ({ firestoreId: doc.id, ...doc.data() }));
        };
        setHunters(await snap("hunters"));
        setShadows(await snap("shadows"));
        setArtifacts(await snap("artifacts"));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCores();
    fetchData();
  }, []);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const setHunterSlot = (slot, id) => {
    const updated = [...selectedHunters];
    updated[slot] = hunters.find((h) => h.firestoreId === id) || null;
    setSelectedHunters(updated);
  };
  const setHunterArtifactSlot = (slot, id) => {
    const updated = [...hunterArtifacts];
    updated[slot] = artifacts.find((a) => a.firestoreId === id) || null;
    setHunterArtifacts(updated);
  };
  const setHunterCoreBodySlot = (slot, name) => {
    const updated = [...hunterCoreBody];
    updated[slot] = bodyCores.find((c) => c.name === name) || null;
    setHunterCoreBody(updated);
  };
  const setHunterCoreMindSlot = (slot, name) => {
    const updated = [...hunterCoreMind];
    updated[slot] = mindCores.find((c) => c.name === name) || null;
    setHunterCoreMind(updated);
  };
  const setHunterCoreSpiritSlot = (slot, name) => {
    const updated = [...hunterCoreSpirit];
    updated[slot] = spiritCores.find((c) => c.name === name) || null;
    setHunterCoreSpirit(updated);
  };

  return (
    <Background>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-screen-2xl mx-auto w-full">
        {/* ── Title ── */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-purple-400 text-center tracking-tight leading-tight">
          Simulation Gate
        </h1>
        <p className="text-center text-gray-300 text-sm sm:text-lg">
          Enter simulation battles with increasing difficulty and rewards.
        </p>

        {/* ── Main Team Preview ── */}
        <InfoCard label="Main Team" accent="purple">
          {/* 3 Hunters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            {selectedHunters.map((hunter, index) => (
              <CharacterCard
                key={index}
                name={hunter?.name}
                imgSrc={
                  selectedHunterSkins[index] || hunter?.skin1[0] || hunter?.img1
                }
                isEmpty={!hunter}
                emptyLabel={`Empty Hunter ${index + 1}`}
                accent={HUNTER_CARD_ACCENTS[index]}
              />
            ))}
          </div>

          {/* 1 Shadow */}
          <div className="pt-3 sm:pt-4">
            <p className="text-xs text-purple-400 font-black uppercase tracking-widest mb-2">
              Shadow
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="relative rounded-xl overflow-hidden border border-purple-500/30 bg-black/40 h-[80px] sm:h-[110px] md:h-[132px]">
                {selectedShadow ? (
                  <img
                    src={selectedShadow.img}
                    className="w-full h-full object-cover"
                    alt={selectedShadow.name}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-600 text-xs sm:text-sm text-center">
                    Empty Shadow
                  </div>
                )}
              </div>
            </div>
          </div>
        </InfoCard>

        {/* ── Equipment Detail Panels ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[0, 1, 2].map((slot) => (
            <InfoCard
              key={slot}
              label={`🗡 ${selectedHunters[slot]?.name || `Hunter ${slot + 1}`}`}
              accent={HUNTER_ACCENTS[slot]}
            >
              {selectedHunters[slot] ? (
                <HunterEquipPanel
                  hunter={selectedHunters[slot]}
                  artifact={hunterArtifacts[slot]}
                  coreBody={hunterCoreBody[slot]}
                  coreMind={hunterCoreMind[slot]}
                  coreSpirit={hunterCoreSpirit[slot]}
                  accent={HUNTER_ACCENTS[slot]}
                />
              ) : (
                <p className="text-gray-600 text-sm">
                  Select a hunter to see equipment.
                </p>
              )}
            </InfoCard>
          ))}
        </div>

        {/* ── Selectors ── */}
        <InfoCard label="Selectors" accent="purple">
          <div className="space-y-5 sm:space-y-6">
            {/* ─ Shadow ─ */}
            <div>
              <SectionLabel color="text-purple-400">Shadow</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <ImageSelect
                  placeholder="Select Shadow"
                  border="border-purple-500"
                  items={shadows}
                  keyFn={(s) => s.firestoreId}
                  labelFn={(s) => s.name}
                  imgFn={(s) => s.img}
                  value={selectedShadow?.firestoreId || ""}
                  onChange={(id) =>
                    setSelectedShadow(
                      shadows.find((s) => s.firestoreId === id) || null,
                    )
                  }
                />
              </div>
            </div>

            {/* ─ 3 Hunters ─ */}
            {[0, 1, 2].map((slot) => (
              <div key={slot}>
                <SectionLabel color={HUNTER_LABEL_COLORS[slot]}>
                  Hunter {slot + 1} Equipment
                </SectionLabel>

                {/* Hunter + Artifact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <ImageSelect
                    placeholder={`Select Hunter ${slot + 1}`}
                    border={HUNTER_BORDERS[slot]}
                    items={hunters}
                    keyFn={(h) => h.firestoreId}
                    labelFn={(h) => h.name}
                    imgFn={(h) => h.img2 || h.img1}
                    value={selectedHunters[slot]?.firestoreId || ""}
                    onChange={(id) => setHunterSlot(slot, id)}
                  />
                  <ImageSelect
                    placeholder="Select Artifact"
                    border={HUNTER_BORDERS[slot]}
                    items={artifacts}
                    keyFn={(a) => a.firestoreId}
                    labelFn={(a) => a.name}
                    imgFn={(a) => a.pieces?.helmet || a.img}
                    value={hunterArtifacts[slot]?.firestoreId || ""}
                    onChange={(id) => setHunterArtifactSlot(slot, id)}
                  />
                </div>

                {/* Skin picker */}
                {[
                  ...(selectedHunters[slot]?.skin1 || []),
                  ...(selectedHunters[slot]?.skin2 || []),
                  ...(selectedHunters[slot]?.skin3 || []),
                  ...(selectedHunters[slot]?.skin4 || []),
                  ...(selectedHunters[slot]?.skin5 || []),
                ].length > 0 && (
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mt-2">
                    {[
                      ...(selectedHunters[slot]?.skin1 || []),
                      ...(selectedHunters[slot]?.skin2 || []),
                      ...(selectedHunters[slot]?.skin3 || []),
                      ...(selectedHunters[slot]?.skin4 || []),
                      ...(selectedHunters[slot]?.skin5 || []),
                    ].map((skinImg, idx) => (
                      <button
                        key={`${slot}-${idx}`}
                        onClick={() => {
                          const updated = [...selectedHunterSkins];
                          updated[slot] = skinImg;
                          setSelectedHunterSkins(updated);
                        }}
                        className={`flex-shrink-0 rounded-xl overflow-hidden border-4 transition-all ${
                          selectedHunterSkins[slot] === skinImg
                            ? "border-purple-400 scale-105"
                            : "border-transparent"
                        }`}
                        style={{ width: "60px", height: "60px" }}
                      >
                        <img
                          src={skinImg}
                          alt={`skin-${idx}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Cores */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-2 sm:mt-3">
                  <ImageSelect
                    placeholder="Select Body Core"
                    border="border-red-500"
                    items={bodyCores}
                    keyFn={(c) => c.name}
                    labelFn={(c) => c.name}
                    imgFn={(c) => c.img}
                    value={hunterCoreBody[slot]?.name || ""}
                    onChange={(id) => setHunterCoreBodySlot(slot, id)}
                  />
                  <ImageSelect
                    placeholder="Select Mind Core"
                    border="border-blue-500"
                    items={mindCores}
                    keyFn={(c) => c.name}
                    labelFn={(c) => c.name}
                    imgFn={(c) => c.img}
                    value={hunterCoreMind[slot]?.name || ""}
                    onChange={(id) => setHunterCoreMindSlot(slot, id)}
                  />
                  <ImageSelect
                    placeholder="Select Spirit Core"
                    border="border-purple-500"
                    items={spiritCores}
                    keyFn={(c) => c.name}
                    labelFn={(c) => c.name}
                    imgFn={(c) => c.img}
                    value={hunterCoreSpirit[slot]?.name || ""}
                    onChange={(id) => setHunterCoreSpiritSlot(slot, id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>
    </Background>
  );
}
