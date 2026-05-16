"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/FireBaseconfig";
import Background from "@/Components/Background";

// ─── Reusable InfoCard ────────────────────────────────────────────────────────
const InfoCard = ({ label, children, accent = "cyan", className = "" }) => {
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
    }[accent] || "border-cyan-500/20";

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
    }[accent] || "text-cyan-400";

  return (
    <div
      className={`bg-gray-900/60 border ${borderColor} rounded-2xl p-4 backdrop-blur-md ${className}`}
    >
      {label && (
        <h3
          className={`text-sm font-black uppercase tracking-widest ${labelColor} mb-3 flex items-center gap-2`}
        >
          {label}
        </h3>
      )}
      {children}
    </div>
  );
};

// ─── Item Slot ────────────────────────────────────────────────────────────────
const ItemSlot = ({
  src,
  label,
  accent = "cyan",
  size = "md",
  empty = "?",
}) => {
  const sizeClass = { sm: "w-12 h-12", md: "w-16 h-16", lg: "w-20 h-20" }[size];
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
    }[accent] || "border-cyan-500/60";
  const glowColor =
    {
      cyan: "shadow-cyan-500/20",
      purple: "shadow-purple-500/20",
      red: "shadow-red-500/20",
      yellow: "shadow-yellow-500/20",
      green: "shadow-green-500/20",
    }[accent] || "shadow-cyan-500/20";

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${sizeClass} rounded-xl border ${borderColor} bg-black/50 overflow-hidden flex items-center justify-center shadow-md ${glowColor} relative`}
      >
        {src ? (
          <img src={src} alt={label} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-600 text-xl">{empty}</span>
        )}
      </div>
      {label && (
        <span className="text-[10px] text-gray-400 text-center leading-tight max-w-[72px] truncate">
          {label}
        </span>
      )}
    </div>
  );
};

// ─── Artifact Pieces Grid (all 8 pieces) ──────────────────────────────────────
const ArtifactPiecesGrid = ({ artifact }) => {
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
  return (
    <InfoCard label="Artifact Set" accent="cyan">
      <div className="grid grid-cols-4 gap-2">
        {slots.map(({ key, label }) => (
          <ItemSlot
            key={key}
            src={pieces[key]}
            label={label}
            accent="cyan"
            size="sm"
          />
        ))}
      </div>
      {artifact?.name && (
        <p className="text-cyan-300 text-xs font-bold mt-2 text-center">
          {artifact.name}
        </p>
      )}
    </InfoCard>
  );
};

// ─── Hunter Core Panel (Body, Mind, Spirit) ───────────────────────────────────
const CorePanel = ({ coreBody, coreMind, coreSpirit }) => {
  return (
    <InfoCard label="Cores" accent="red">
      <div className="flex justify-around gap-4 flex-wrap">
        {/* BODY */}
        <ItemSlot
          src={coreBody?.img || null}
          label={coreBody?.name || "Body"}
          accent="red"
          size="sm"
          empty="⬡"
        />

        {/* MIND */}
        <ItemSlot
          src={coreMind?.img || null}
          label={coreMind?.name || "Mind"}
          accent="blue"
          size="sm"
          empty="⬡"
        />

        {/* SPIRIT */}
        <ItemSlot
          src={coreSpirit?.img || null}
          label={coreSpirit?.name || "Spirit"}
          accent="purple"
          size="sm"
          empty="⬡"
        />
      </div>
    </InfoCard>
  );
};

// ─── Hunter Equipment Detail Panel ───────────────────────────────────────────
const HunterEquipPanel = ({
  hunter,
  artifact,
  coreBody,
  coreMind,
  coreSpirit,
}) => {
  if (!hunter) return null;
  return (
    <div className="space-y-3">
      {/* Weapon */}
      <InfoCard label="Weapon" accent="orange">
        <div className="flex items-center gap-3">
          <ItemSlot
            src={hunter.weaponImg?.[0] || hunter.weapon?.img}
            label={hunter.weaponName || hunter.weapon?.name || "Weapon"}
            accent="orange"
            size="md"
          />
          {(hunter.weaponName || hunter.weapon?.name) && (
            <span className="text-orange-300 text-xs font-semibold">
              {hunter.weaponName || hunter.weapon?.name}
            </span>
          )}
        </div>
      </InfoCard>
      {/* Artifact */}
      <ArtifactPiecesGrid artifact={artifact} />
      {/* Cores */}
      <CorePanel
        coreBody={coreBody}
        coreMind={coreMind}
        coreSpirit={coreSpirit}
      />
    </div>
  );
};

// ─── Jinwoo Equipment Detail Panel ───────────────────────────────────────────
const JinwooEquipPanel = ({
  weapon,
  weapon2,
  artifact,
  rune,
  rune2,
  selectedCoreBody,
  selectedCoreMind,
  selectedCoreSpirit,
  qteSkills,
  ultimate,
  survivalBlessings,
  empowermentBlessings,
}) => (
  <div className="space-y-3">
    {/* Weapons row */}
    <InfoCard label="Weapons" accent="red">
      <div className="flex gap-4 flex-wrap">
        <ItemSlot
          src={weapon?.weaponImg?.[0] || weapon?.weaponImg2?.[0]}
          label={weapon?.weaponName || "Weapon 1"}
          accent="red"
          size="lg"
        />
        <ItemSlot
          src={weapon2?.weaponImg?.[0] || weapon2?.weaponImg2?.[0]}
          label={weapon2?.weaponName || "Weapon 2"}
          accent="red"
          size="lg"
        />
      </div>
    </InfoCard>

    {/* Artifact – all 8 pieces */}
    <ArtifactPiecesGrid artifact={artifact} />

    {/* Runes */}
    <InfoCard label="Rune Stones" accent="purple">
      <div className="flex gap-4 flex-wrap">
        <ItemSlot
          src={rune?.data?.[0]?.Runes?.[0]?.skillImg}
          label={rune?.data?.[0]?.Skills || "Rune 1"}
          accent="purple"
          size="md"
        />
        <ItemSlot
          src={rune2?.data?.[0]?.Runes?.[0]?.skillImg}
          label={rune2?.data?.[0]?.Skills || "Rune 2"}
          accent="purple"
          size="md"
        />
      </div>
    </InfoCard>

    {/* Cores – Body / Mind / Spirit */}
    <InfoCard label="Cores" accent="red">
      <div className="flex justify-around gap-4 flex-wrap">
        <ItemSlot
          src={selectedCoreBody?.img || null}
          label={selectedCoreBody?.name || "Body"}
          accent="red"
          size="md"
          empty="⬡"
        />

        <ItemSlot
          src={selectedCoreMind?.img || null}
          label={selectedCoreMind?.name || "Mind"}
          accent="blue"
          size="md"
          empty="⬡"
        />

        <ItemSlot
          src={selectedCoreSpirit?.img || null}
          label={selectedCoreSpirit?.name || "Spirit"}
          accent="green"
          size="md"
          empty="⬡"
        />
      </div>
    </InfoCard>

    {/* QTE Skills + Ultimate */}
    <InfoCard label="QTE Skills & Ultimate" accent="yellow">
      <div className="flex gap-3 flex-wrap">
        {(qteSkills || [null, null, null]).map((skill, i) => (
          <ItemSlot
            key={i}
            src={skill?.data?.[0]?.Runes?.[0]?.skillImg || "/placeholder.png"}
            label={skill?.data?.[0]?.Skills || `QTE ${i + 1}`}
            accent="yellow"
            size="md"
          />
        ))}

        <ItemSlot
          src={ultimate?.data?.[0]?.Runes?.[0]?.skillImg || "/placeholder.png"}
          label={ultimate?.data?.[0]?.Skills || "Ultimate"}
          accent="orange"
          size="md"
        />
      </div>
    </InfoCard>

    {/* Survival Blessings */}
    <InfoCard label="Survival Blessings" accent="green">
      <div className="flex gap-3 flex-wrap">
        {survivalBlessings
          ?.filter((item) => item?.Runes?.[0]?.type === "Survival")
          .slice(0, 4)
          .map((item, i) => (
            <ItemSlot
              key={i}
              src={item?.Runes?.[0]?.img || "/placeholder.png"}
              label={item?.Blessing || `Blessing ${i + 1}`}
              accent="green"
              size="md"
            />
          ))}
      </div>
    </InfoCard>

    {/* Empowerment Blessings */}
    <InfoCard label="Empowerment Blessings" accent="pink">
      <div className="flex gap-3 flex-wrap">
        {empowermentBlessings
          ?.filter((item) => item?.Runes?.[0]?.type === "Empowerment")
          .slice(0, 4)
          .map((item, i) => (
            <ItemSlot
              key={i}
              src={item?.Runes?.[0]?.img || "/placeholder.png"}
              label={item?.Blessing || `Blessing ${i + 1}`}
              accent="pink"
              size="md"
            />
          ))}
      </div>
    </InfoCard>
  </div>
);

// ─── Character Card (top image + overlay) ────────────────────────────────────
const CharacterCard = ({ name, imgSrc, isEmpty, emptyLabel }) => (
  <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-black/40 h-[420px]">
    {!isEmpty ? (
      <>
        <img
          src={imgSrc}
          className="w-full h-full object-cover items-center max-h-[75vh] "
          alt={name}
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
          <h2 className="text-white font-bold text-lg">{name}</h2>
        </div>
      </>
    ) : (
      <div className="h-full flex items-center justify-center text-gray-600 text-sm">
        {emptyLabel}
      </div>
    )}
  </div>
);

// ─── Main BOT Component ───────────────────────────────────────────────────────
export default function BOT() {
  const [hunters, setHunters] = useState([]);
  const [shadows, setShadows] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [cores, setCores] = useState([]);
  const [runes, setRunes] = useState([]);
  const [blessings, setBlessings] = useState([]);
  const [qteSkillsList, setQteSkillsList] = useState([]);
  const [ultimatesList, setUltimatesList] = useState([]);

  // ───────── STATES ─────────
  const [selectedCoreBody, setSelectedCoreBody] = useState(null);
  const [selectedCoreMind, setSelectedCoreMind] = useState(null);
  const [selectedCoreSpirit, setSelectedCoreSpirit] = useState(null);

  const [bodyCores, setBodyCores] = useState([]);
  const [mindCores, setMindCores] = useState([]);
  const [spiritCores, setSpiritCores] = useState([]);

  // Jinwoo selections
  const [selectedQteSkills, setSelectedQteSkills] = useState([
    null,
    null,
    null,
  ]);
  const [selectedUltimate, setSelectedUltimate] = useState(null);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [selectedWeapon2, setSelectedWeapon2] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [selectedCore, setSelectedCore] = useState(null);
  const [selectedRune, setSelectedRune] = useState(null);
  const [selectedRune2, setSelectedRune2] = useState(null);
  const [selectedSurvivalBlessings, setSelectedSurvivalBlessings] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [selectedEmpowermentBlessings, setSelectedEmpowermentBlessings] =
    useState([null, null, null, null]);

  // Hunters
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
  // Shadows
  const [selectedShadows, setSelectedShadows] = useState([null, null, null]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = async (col) => {
          const s = await getDocs(collection(db, col));
          return s.docs.map((doc) => ({ firestoreId: doc.id, ...doc.data() }));
        };

        setHunters(await snap("hunters"));
        setShadows(await snap("shadows"));
        setWeapons(await snap("jinwooWeapons"));
        setArtifacts(await snap("artifacts"));
        setRunes(await snap("runes"));
        setBlessings(await snap("blessings"));
        setQteSkillsList(await snap("qteSkills"));
        setUltimatesList(await snap("ultimates"));

        // Cores are nested
        const coreSnap = await getDocs(collection(db, "cores"));
        const coreData = [];
        coreSnap.docs.forEach((doc) => {
          const data = doc.data();
          if (Array.isArray(data.items)) {
            data.items.forEach((item, index) => {
              coreData.push({ firestoreId: `${doc.id}-${index}`, ...item });
            });
          }
        });
        setCores(coreData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCores();
    fetchData();
  }, []);

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const setQteSkill = (slot, firestoreId) => {
    const updated = [...selectedQteSkills];
    updated[slot] =
      qteSkillsList.find((s) => s.firestoreId === firestoreId) || null;
    setSelectedQteSkills(updated);
  };

  const setHunterSlot = (slot, firestoreId) => {
    const updated = [...selectedHunters];
    updated[slot] = hunters.find((h) => h.firestoreId === firestoreId) || null;
    setSelectedHunters(updated);
  };

  const setHunterArtifactSlot = (slot, firestoreId) => {
    const updated = [...hunterArtifacts];
    updated[slot] =
      artifacts.find((a) => a.firestoreId === firestoreId) || null;
    setHunterArtifacts(updated);
  };

  const setHunterCoreSlot = (slot, firestoreId) => {
    const updated = [...hunterCores];
    updated[slot] = cores.find((c) => c.name === firestoreId) || null;
    setHunterCores(updated);
  };

  const setSurvival = (slot, firestoreId) => {
    const updated = [...selectedSurvivalBlessings];

    updated[slot] =
      blessings.find(
        (b) =>
          b.firestoreId === firestoreId && b?.Runes?.[0]?.type === "Survival",
      ) || null;

    setSelectedSurvivalBlessings(updated);
  };

  const setEmpowerment = (slot, firestoreId) => {
    const updated = [...selectedEmpowermentBlessings];

    updated[slot] =
      blessings.find(
        (b) =>
          b.firestoreId === firestoreId &&
          b?.Runes?.[0]?.type === "Empowerment",
      ) || null;

    setSelectedEmpowermentBlessings(updated);
  };

  const Select = ({
    label,
    border,
    items,
    keyFn,
    labelFn,
    onChange,
    placeholder,
    value = "",
  }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-black/80 border ${border} rounded-xl p-3 text-white text-sm w-full`}
    >
      <option value="">{placeholder || label}</option>
      {items.map((item) => (
        <option key={keyFn(item)} value={keyFn(item)}>
          {labelFn(item)}
        </option>
      ))}
    </select>
  );

  // ───────── FETCH CORES ─────────
  const fetchCores = async () => {
    try {
      const snapshot = await getDocs(collection(db, "cores"));

      snapshot.docs.forEach((doc) => {
        const data = doc.data();

        if (doc.id === "Body") {
          setBodyCores(data.items || []);
        }

        if (doc.id === "Mind") {
          setMindCores(data.items || []);
        }

        if (doc.id === "Spirit") {
          setSpiritCores(data.items || []);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setHunterCoreBodySlot = (slot, firestoreId) => {
    const updated = [...hunterCoreBody];

    updated[slot] = bodyCores.find((c) => c.name === firestoreId) || null;

    setHunterCoreBody(updated);
  };

  const setHunterCoreMindSlot = (slot, firestoreId) => {
    const updated = [...hunterCoreMind];

    updated[slot] = mindCores.find((c) => c.name === firestoreId) || null;

    setHunterCoreMind(updated);
  };

  const setHunterCoreSpiritSlot = (slot, firestoreId) => {
    const updated = [...hunterCoreSpirit];

    updated[slot] = spiritCores.find((c) => c.name === firestoreId) || null;

    setHunterCoreSpirit(updated);
  };

  const setHunterSkin = (slot, skin) => {
    const updated = [...selectedHunterSkins];
    updated[slot] = skin;
    setSelectedHunterSkins(updated);
  };

  return (
    <Background>
      <div className="space-y-8">
        {/* ── Title ──────────────────────────────────────────────────────── */}
        <h1 className="text-5xl md:text-7xl font-black text-cyan-400 text-center tracking-tight">
          Battlefield Of Time
        </h1>
        <p className="text-center text-gray-300 text-lg">
          Build your perfect Solo Leveling team.
        </p>

        {/* ── Main Team Preview ───────────────────────────────────────────── */}
        <InfoCard label="Main Team" accent="cyan">
          <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
            {/* Jinwoo */}
            <CharacterCard
              name="Sung Jinwoo"
              imgSrc="https://resources.vortexgaming.io/upload/post/2026/05/10/4a641924d08d47e7b531623c40ff1ad0.webp"
              className="object-cover"
            />

            {/* Hunters */}
            {selectedHunters.map((hunter, index) => (
              <CharacterCard
                key={index}
                name={hunter?.name}
                imgSrc={
                  selectedHunterSkins[index] || hunter?.img2 || hunter?.img1
                }
                isEmpty={!hunter}
                emptyLabel={`Empty Hunter ${index + 1}`}
              />
            ))}
          </div>
          {/* Shadows column */}
          <div className=" pt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
            {selectedShadows.map((shadow, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden border border-purple-500/30 bg-black/40 h-[132px]"
              >
                {shadow ? (
                  <img
                    src={shadow.img}
                    className="w-full h-full object-cover"
                    alt={shadow.name}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-600 text-sm">
                    Empty Shadow
                  </div>
                )}
              </div>
            ))}
          </div>
        </InfoCard>

        {/* ── Equipment Detail Panels — 4 columns ────────────────────────── */}
        <div className="grid grid-cols-2 justify-center gap-6 w-full">
          {/* ── JINWOO ────────────────────────────────────── */}
          <InfoCard
            label="Sung Jinwoo"
            accent="cyan"
            className="flex-1 min-w-[320px] max-w-[420px]"
          >
            <div className="grid grid-cols-1 gap-4">
              <JinwooEquipPanel
                weapon={selectedWeapon}
                weapon2={selectedWeapon2}
                artifact={selectedArtifact}
                rune={selectedRune}
                rune2={selectedRune2}
                selectedCoreBody={selectedCoreBody}
                selectedCoreMind={selectedCoreMind}
                selectedCoreSpirit={selectedCoreSpirit}
                qteSkills={selectedQteSkills}
                ultimate={selectedUltimate}
                survivalBlessings={selectedSurvivalBlessings}
                empowermentBlessings={selectedEmpowermentBlessings}
              />
            </div>
          </InfoCard>

          {/* ── HUNTER 1 ──────────────────────────────────── */}
          <InfoCard
            label={`🗡 ${selectedHunters[0]?.name || "Hunter 1"}`}
            accent="purple"
            className="flex-1 min-w-[320px] max-w-[420px]"
          >
            <div className="grid grid-cols-1 gap-4">
              {selectedHunters[0] ? (
                <HunterEquipPanel
                  hunter={selectedHunters[0]}
                  artifact={hunterArtifacts[0]}
                  coreBody={hunterCoreBody[0]}
                  coreMind={hunterCoreMind[0]}
                  coreSpirit={hunterCoreSpirit[0]}
                />
              ) : (
                <p className="text-gray-600 text-sm">
                  Select a hunter to see equipment.
                </p>
              )}
            </div>
          </InfoCard>

          {/* ── HUNTER 2 ──────────────────────────────────── */}
          <InfoCard
            label={`🗡 ${selectedHunters[1]?.name || "Hunter 2"}`}
            accent="blue"
            className="flex-1 min-w-[320px] max-w-[420px]"
          >
            <div className="grid grid-cols-1 gap-4">
              {selectedHunters[1] ? (
                <HunterEquipPanel
                  hunter={selectedHunters[1]}
                  artifact={hunterArtifacts[1]}
                  coreBody={hunterCoreBody[0]}
                  coreMind={hunterCoreMind[0]}
                  coreSpirit={hunterCoreSpirit[0]}
                />
              ) : (
                <p className="text-gray-600 text-sm">
                  Select a hunter to see equipment.
                </p>
              )}
            </div>
          </InfoCard>

          {/* ── HUNTER 3 ──────────────────────────────────── */}
          <InfoCard
            label={`🗡 ${selectedHunters[2]?.name || "Hunter 3"}`}
            accent="orange"
            className="flex-1 min-w-[320px] max-w-[420px]"
          >
            <div className="grid grid-cols-1 gap-4">
              {selectedHunters[2] ? (
                <HunterEquipPanel
                  hunter={selectedHunters[2]}
                  artifact={hunterArtifacts[2]}
                  coreBody={hunterCoreBody[0]}
                  coreMind={hunterCoreMind[0]}
                  coreSpirit={hunterCoreSpirit[0]}
                />
              ) : (
                <p className="text-gray-600 text-sm">
                  Select a hunter to see equipment.
                </p>
              )}
            </div>
          </InfoCard>
        </div>

        {/* ── Selectors ───────────────────────────────────────────────────── */}
        <InfoCard label="Selectors" accent="cyan">
          <div className="space-y-6">
            {/* ─ Shadows ─ */}
            <div>
              <p className="text-xs text-purple-400 font-black uppercase tracking-widest mb-2">
                Shadows
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[0, 1, 2].map((slot) => (
                  <Select
                    key={slot}
                    placeholder={`Select Shadow ${slot + 1}`}
                    border="border-purple-500"
                    items={shadows}
                    keyFn={(s) => s.firestoreId}
                    labelFn={(s) => s.name}
                    value={selectedShadows[slot]?.firestoreId || ""}
                    onChange={(id) => {
                      const updated = [...selectedShadows];
                      updated[slot] =
                        shadows.find((s) => s.firestoreId === id) || null;
                      setSelectedShadows(updated);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ─ Jinwoo ─ */}
            <div>
              <p className="text-xs text-cyan-400 font-black uppercase tracking-widest mb-2">
                Jinwoo Equipment
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Select
                  placeholder="Select Weapon 1"
                  border="border-red-500"
                  items={weapons}
                  keyFn={(w) => w.firestoreId}
                  labelFn={(w) => w.weaponName}
                  value={selectedWeapon?.firestoreId || ""}
                  onChange={(id) =>
                    setSelectedWeapon(
                      weapons.find((w) => w.firestoreId === id) || null,
                    )
                  }
                />
                <Select
                  placeholder="Select Weapon 2"
                  border="border-red-500"
                  items={weapons}
                  keyFn={(w) => w.firestoreId}
                  labelFn={(w) => w.weaponName}
                  value={selectedWeapon2?.firestoreId || ""}
                  onChange={(id) =>
                    setSelectedWeapon2(
                      weapons.find((w) => w.firestoreId === id) || null,
                    )
                  }
                />
                <Select
                  placeholder="Select Artifact"
                  border="border-cyan-500"
                  items={artifacts}
                  keyFn={(a) => a.firestoreId}
                  labelFn={(a) => a.name}
                  value={selectedArtifact?.firestoreId || ""}
                  onChange={(id) =>
                    setSelectedArtifact(
                      artifacts.find((a) => a.firestoreId === id) || null,
                    )
                  }
                />
                {/* ───────── CORE SELECTORS ───────── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* BODY CORE */}
                  <Select
                    placeholder="Select Body Core"
                    border="border-red-500"
                    items={bodyCores}
                    keyFn={(c) => c.name}
                    labelFn={(c) => c.name}
                    imgFn={(c) => c.img}
                    value={selectedCoreBody?.name || ""}
                    onChange={(id) =>
                      setSelectedCoreBody(
                        bodyCores.find((c) => c.name === id) || null,
                      )
                    }
                  />

                  {/* MIND CORE */}
                  <Select
                    placeholder="Select Mind Core"
                    border="border-blue-500"
                    items={mindCores}
                    keyFn={(c) => c.name}
                    labelFn={(c) => c.name}
                    imgFn={(c) => c.img}
                    value={selectedCoreMind?.name || ""}
                    onChange={(id) =>
                      setSelectedCoreMind(
                        mindCores.find((c) => c.name === id) || null,
                      )
                    }
                  />

                  {/* SPIRIT CORE */}
                  <Select
                    placeholder="Select Spirit Core"
                    border="border-green-500"
                    items={spiritCores}
                    keyFn={(c) => c.name}
                    labelFn={(c) => c.name}
                    imgFn={(c) => c.img}
                    value={selectedCoreSpirit?.name || ""}
                    onChange={(id) =>
                      setSelectedCoreSpirit(
                        spiritCores.find((c) => c.name === id) || null,
                      )
                    }
                  />
                </div>
                <Select
                  placeholder="Select Rune Stone 1"
                  border="border-purple-500"
                  items={runes.filter(
                    (r) =>
                      !r?.data?.[0]?.Skills?.includes("(QTE)") &&
                      !r?.data?.[0]?.Skills?.includes("(Ultimate)"),
                  )}
                  keyFn={(r) => r.firestoreId}
                  labelFn={(r) => r.data?.[0]?.Skills || r.firestoreId}
                  value={selectedRune?.firestoreId || ""}
                  onChange={(id) =>
                    setSelectedRune(
                      runes.find((r) => r.firestoreId === id) || null,
                    )
                  }
                />

                <Select
                  placeholder="Select Rune Stone 2"
                  border="border-purple-500"
                  items={runes.filter(
                    (r) =>
                      !r?.data?.[0]?.Skills?.includes("(QTE)") &&
                      !r?.data?.[0]?.Skills?.includes("(Ultimate)"),
                  )}
                  keyFn={(r) => r.firestoreId}
                  labelFn={(r) => r.data?.[0]?.Skills || r.firestoreId}
                  value={selectedRune2?.firestoreId || ""}
                  onChange={(id) =>
                    setSelectedRune2(
                      runes.find((r) => r.firestoreId === id) || null,
                    )
                  }
                />
              </div>
            </div>

            {/* ─ Jinwoo QTE Skills & Ultimate ─ */}
            <div>
              <p className="text-xs text-yellow-400 font-black uppercase tracking-widest mb-2">
                Jinwoo — QTE Skills & Ultimate
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[0, 1, 2].map((slot) => (
                  <Select
                    key={slot}
                    placeholder={`QTE Skill ${slot + 1}`}
                    border="border-yellow-500"
                    items={runes.filter((rune) =>
                      rune?.data?.[0]?.Skills?.includes("(QTE)"),
                    )}
                    keyFn={(s) => s.firestoreId}
                    labelFn={(s) => s?.data?.[0]?.Skills || "QTE Skill"}
                    value={selectedQteSkills?.[slot]?.firestoreId || ""}
                    onChange={(id) => {
                      const selectedRune =
                        runes.find((rune) => rune.firestoreId === id) || null;

                      const updated = [...selectedQteSkills];

                      updated[slot] = selectedRune;

                      setSelectedQteSkills(updated);
                    }}
                  />
                ))}

                <Select
                  placeholder="Select Ultimate"
                  border="border-orange-500"
                  items={runes.filter((rune) =>
                    rune?.data?.[0]?.Skills?.includes("(Ultimate)"),
                  )}
                  keyFn={(u) => u.firestoreId}
                  labelFn={(u) => u?.data?.[0]?.Skills || "Ultimate"}
                  value={selectedUltimate?.firestoreId || ""}
                  onChange={(id) => {
                    const selectedUltimateRune =
                      runes.find((rune) => rune.firestoreId === id) || null;

                    setSelectedUltimate(selectedUltimateRune);
                  }}
                />
              </div>
            </div>

            {/* ─ Jinwoo Blessings ─ */}
            <div>
              <p className="text-xs text-green-400 font-black uppercase tracking-widest mb-2">
                Jinwoo — Survival Blessings
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((slot) => (
                  <Select
                    key={slot}
                    placeholder={`Survival Blessing ${slot + 1}`}
                    border="border-green-500"
                    items={blessings.filter(
                      (b) => b?.Runes?.[0]?.type === "Survival",
                    )}
                    keyFn={(b) => b.firestoreId}
                    labelFn={(b) => b.Blessing}
                    value={selectedSurvivalBlessings[slot]?.firestoreId || ""}
                    onChange={(id) => setSurvival(slot, id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-pink-400 font-black uppercase tracking-widest mb-2">
                Jinwoo — Empowerment Blessings
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((slot) => (
                  <Select
                    key={slot}
                    placeholder={`Empowerment Blessing ${slot + 1}`}
                    border="border-pink-500"
                    items={blessings.filter(
                      (b) => b?.Runes?.[0]?.type === "Empowerment",
                    )}
                    keyFn={(b) => b.firestoreId}
                    labelFn={(b) => b.Blessing}
                    value={
                      selectedEmpowermentBlessings[slot]?.firestoreId || ""
                    }
                    onChange={(id) => setEmpowerment(slot, id)}
                  />
                ))}
              </div>
            </div>

            {/* ─ Hunters ─ */}
            {[0, 1, 2].map((slot) => {
              const accentColors = [
                "purple",
                "border-blue-500",
                "border-orange-500",
              ];
              const labels = ["Hunter 1", "Hunter 2", "Hunter 3"];
              const labelColors = [
                "text-purple-400",
                "text-blue-400",
                "text-orange-400",
              ];
              const hunterBorders = [
                "border-purple-500",
                "border-blue-500",
                "border-orange-500",
              ];
              return (
                <div key={slot}>
                  <p
                    className={`text-xs ${labelColors[slot]} font-black uppercase tracking-widest mb-2`}
                  >
                    {labels[slot]} Equipment
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <select
                      value={selectedHunters[slot]?.firestoreId || ""}
                      onChange={(e) => setHunterSlot(slot, e.target.value)}
                      className={`bg-black/80 border ${hunterBorders[slot]} rounded-xl p-3 text-white text-sm`}
                    >
                      <option value="">Select {labels[slot]}</option>
                      {hunters.map((h) => (
                        <option key={h.firestoreId} value={h.firestoreId}>
                          {h.name}
                        </option>
                      ))}
                    </select>
                    {[
                      ...(selectedHunters[slot]?.skin1 || []),
                      ...(selectedHunters[slot]?.skin2 || []),
                      ...(selectedHunters[slot]?.skin3 || []),
                      ...(selectedHunters[slot]?.skin4 || []),
                      ...(selectedHunters[slot]?.skin5 || []),
                    ].length > 0 && (
                      <div className="mt-3">
                        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
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
                                  ? "border-cyan-400 scale-105"
                                  : "border-transparent"
                              }`}
                              style={{
                                width: "82px",
                                height: "82px",
                              }}
                            >
                              <img
                                src={skinImg}
                                alt={`hunter-skin-${idx}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <select
                      value={hunterArtifacts[slot]?.firestoreId || ""}
                      onChange={(e) =>
                        setHunterArtifactSlot(slot, e.target.value)
                      }
                      className={`bg-black/80 border border-cyan-500 rounded-xl p-3 text-white text-sm`}
                    >
                      <option value="">Select Artifact</option>
                      {artifacts.map((a) => (
                        <option key={a.firestoreId} value={a.firestoreId}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* BODY CORE */}
                      <select
                        value={hunterCoreBody[slot]?.name || ""}
                        onChange={(e) =>
                          setHunterCoreBodySlot(slot, e.target.value)
                        }
                        className="bg-black/80 border border-red-500 rounded-xl p-3 text-white text-sm"
                      >
                        <option value="">Select Body Core</option>

                        {bodyCores.map((c, index) => (
                          <option key={`${c.name}-${index}`} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      {/* MIND CORE */}
                      <select
                        value={hunterCoreMind[slot]?.name || ""}
                        onChange={(e) =>
                          setHunterCoreMindSlot(slot, e.target.value)
                        }
                        className="bg-black/80 border border-blue-500 rounded-xl p-3 text-white text-sm"
                      >
                        <option value="">Select Mind Core</option>

                        {mindCores.map((c, index) => (
                          <option key={`${c.name}-${index}`} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>

                      {/* SPIRIT CORE */}
                      <select
                        value={hunterCoreSpirit[slot]?.name || ""}
                        onChange={(e) =>
                          setHunterCoreSpiritSlot(slot, e.target.value)
                        }
                        className="bg-black/80 border border-purple-500 rounded-xl p-3 text-white text-sm"
                      >
                        <option value="">Select Spirit Core</option>

                        {spiritCores.map((c, index) => (
                          <option key={`${c.name}-${index}`} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </InfoCard>
      </div>
    </Background>
  );
}
