"use client";

import React, { useEffect, useRef, useState } from "react";
import { db } from "@/Firebase/FireBaseconfig";
import Background from "@/Components/Background";
import { onAuthStateChanged } from "firebase/auth";

import { collection, getDocs, setDoc, getDoc, doc } from "firebase/firestore";
import { auth } from "@/Firebase/FireBaseconfig";
import CommentsPage from "@/Components/CommentsPage ";
import GameTooltip from "@/Components/GameTooltip";
// ─── ImageSelect ──────────────────────────────────────────────────────────────
const ImageSelect = ({
  label,
  placeholder,
  border = "border-cyan-500",
  items = [],
  keyFn,
  labelFn,
  imgFn,
  onChange,
  value = "",
}) => {
  const selected = items.find((item) => keyFn(item) === value) || null;
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

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
                    className="w-4 h-4 ml-auto text-cyan-400 flex-shrink-0"
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
      className={`bg-gray-900/60 border ${borderColor} rounded-2xl p-3 sm:p-4 backdrop-blur-md overflow-visible ${className}`}
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
  accent = "cyan",
  size = "md",
  empty = "?",
  tooltipTitle,
  tooltipDescription,
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
    }[accent] || "border-cyan-500/60";

  return (
    <GameTooltip
      title={tooltipTitle || label}
      description={tooltipDescription}
      image={src}
      width="w-80"
    >
      <div className="flex flex-col items-center gap-1 cursor-pointer">
        {/* ITEM */}
        <div
          className={`${sizeClass} rounded-xl border ${borderColor} bg-black/50 overflow-hidden flex items-center justify-center hover:scale-105 transition-all duration-300`}
        >
          {src ? (
            <img src={src} alt={label} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-600 text-base sm:text-xl">{empty}</span>
          )}
        </div>

        {/* LABEL */}
        {label && (
          <span className="text-[9px] sm:text-[10px] text-gray-400 text-center leading-tight max-w-[56px] sm:max-w-[72px] truncate">
            {label}
          </span>
        )}
      </div>
    </GameTooltip>
  );
};

// ─── ArtifactPiecesGrid ───────────────────────────────────────────────────────
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
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {slots.map(({ key, label }) => (
          <ItemSlot
            key={key}
            src={pieces[key]}
            label={label}
            accent="cyan"
            size="sm"
            tooltipTitle={artifact?.name}
            tooltipDescription={
              artifact?.setEffects?.[4]?.[0] ||
              artifact?.setEffects?.[8]?.[0] ||
              "Artifact Set"
            }
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

// ─── CorePanel ────────────────────────────────────────────────────────────────
const CorePanel = ({ coreBody, coreMind, coreSpirit }) => (
  <InfoCard label="Cores" accent="red">
    <div className="flex justify-around gap-2 sm:gap-4">
      <ItemSlot
        src={coreBody?.img}
        label={coreBody?.name || "Body"}
        accent="red"
        size="sm"
        empty="⬡"
        tooltipTitle={coreBody?.name}
        tooltipDescription={coreBody?.passive?.[0]}
      />

      <ItemSlot
        src={coreMind?.img}
        label={coreMind?.name || "Mind"}
        accent="blue"
        size="sm"
        empty="⬡"
        tooltipTitle={coreMind?.name}
        tooltipDescription={coreMind?.passive?.[0]}
      />

      <ItemSlot
        src={coreSpirit?.img}
        label={coreSpirit?.name || "Spirit"}
        accent="purple"
        size="sm"
        empty="⬡"
        tooltipTitle={coreSpirit?.name}
        tooltipDescription={coreSpirit?.passive?.[0]}
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
}) => {
  if (!hunter) return null;
  return (
    <div className="space-y-3">
      <InfoCard label="Weapon" accent="orange">
        <div className="flex items-start gap-4">
          {/* LEFT SIDE - NAME + IMAGE */}
          <div className="flex flex-col items-center min-w-[90px]">
            <ItemSlot
              src={hunter.weaponImg?.[0] || hunter.weapon?.img}
              label={hunter.weaponName || hunter.weapon?.name || "Weapon"}
              accent="orange"
              size="md"
              tooltipTitle={
                hunter.weaponName || hunter.weapon?.name || "Weapon"
              }
              tooltipDescription={
                hunter.weapon?.skills?.[0]?.description ||
                hunter.weaponDescription ||
                "No Description"
              }
            />
          </div>

          {/* RIGHT SIDE -  */}
          <div className="flex-1">
            <p className=" leading-relaxed">
              {(hunter.weaponName || hunter.weapon?.name) && (
                <span className="text-orange-300 text-2xl font-semibold">
                  {hunter.weaponName || hunter.weapon?.name}
                </span>
              )}{" "}
            </p>
          </div>
        </div>
      </InfoCard>
      <ArtifactPiecesGrid artifact={artifact} />
      <CorePanel
        coreBody={coreBody}
        coreMind={coreMind}
        coreSpirit={coreSpirit}
      />
    </div>
  );
};

// ─── JinwooEquipPanel ─────────────────────────────────────────────────────────
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
    <InfoCard label="Weapons" accent="red">
      <div className="flex gap-3 sm:gap-4 flex-wrap">
        <ItemSlot
          src={weapon?.weaponImg?.[0] || weapon?.weaponImg2?.[0]}
          label={weapon?.weaponName || "Weapon 1"}
          accent="red"
          size="lg"
          tooltipTitle={weapon?.weaponName}
          tooltipDescription={weapon?.skills?.[2]?.description}
        />
        <ItemSlot
          src={weapon2?.weaponImg?.[0] || weapon2?.weaponImg2?.[0]}
          label={weapon2?.weaponName || "Weapon 2"}
          accent="red"
          size="lg"
          tooltipTitle={weapon2?.weaponName}
          tooltipDescription={weapon2?.skills?.[2]?.description}
        />
      </div>
    </InfoCard>

    <ArtifactPiecesGrid artifact={artifact} />

    <InfoCard label="Rune Stones" accent="purple">
      <div className="flex gap-3 sm:gap-4 flex-wrap">
        <ItemSlot
          src={rune?.skillImg}
          label={
            rune?.skill1 ||
            rune?.skill2 ||
            rune?.skill3 ||
            rune?.skill4 ||
            "Rune 1"
          }
          tooltipTitle={
            rune?.skill1 || rune?.skill2 || rune?.skill3 || rune?.skill4
          }
          tooltipDescription={rune?.description}
          size="md"
          accent="purple"
        />

        <ItemSlot
          src={rune2?.skillImg}
          label={
            rune2?.skill1 ||
            rune2?.skill2 ||
            rune2?.skill3 ||
            rune2?.skill4 ||
            rune2?.skill5 ||
            "Rune 2"
          }
          tooltipTitle={
            rune2?.skill1 ||
            rune2?.skill2 ||
            rune2?.skill3 ||
            rune2?.skill4 ||
            rune2?.skill5
          }
          tooltipDescription={rune2?.description}
          size="md"
          accent="purple"
        />
      </div>
    </InfoCard>

    <InfoCard label="Cores" accent="red">
      <div className="flex justify-around gap-2 sm:gap-4">
        <ItemSlot
          src={selectedCoreBody?.img}
          label={selectedCoreBody?.name || "Body"}
          accent="red"
          size="md"
          empty="⬡"
          tooltipTitle={selectedCoreBody?.name}
          tooltipDescription={selectedCoreBody?.passive?.[0]}
        />

        <ItemSlot
          src={selectedCoreMind?.img}
          label={selectedCoreMind?.name || "Mind"}
          accent="blue"
          size="md"
          empty="⬡"
          tooltipTitle={selectedCoreMind?.name}
          tooltipDescription={selectedCoreMind?.passive?.[0]}
        />

        <ItemSlot
          src={selectedCoreSpirit?.img}
          label={selectedCoreSpirit?.name || "Spirit"}
          accent="green"
          size="md"
          empty="⬡"
          tooltipTitle={selectedCoreSpirit?.name}
          tooltipDescription={selectedCoreSpirit?.passive?.[0]}
        />
      </div>
    </InfoCard>

    <InfoCard label="QTE Skills & Ultimate" accent="yellow">
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        {(qteSkills || [null, null, null]).map((skill, i) => (
          <ItemSlot
            key={i}
            src={skill?.skillImg || "/placeholder.png"}
            label={
              skill?.skill1 ||
              skill?.skill2 ||
              skill?.skill3 ||
              skill?.skill4 ||
              `QTE ${i + 1}`
            }
            tooltipTitle={
              skill?.skill1 || skill?.skill2 || skill?.skill3 || skill?.skill4
            }
            tooltipDescription={skill?.description}
            accent="yellow"
            size="md"
          />
        ))}
        <ItemSlot
          src={ultimate?.skillImg || "/placeholder.png"}
          label={
            ultimate?.skill1 ||
            ultimate?.skill2 ||
            ultimate?.skill3 ||
            ultimate?.skill4 ||
            ultimate?.skill5 ||
            "Ultimate"
          }
          tooltipTitle={
            ultimate?.skill1 ||
            ultimate?.skill2 ||
            ultimate?.skill3 ||
            ultimate?.skill4 ||
            ultimate?.skill5
          }
          tooltipDescription={ultimate?.description}
          accent="orange"
          size="md"
        />
      </div>
    </InfoCard>

    <InfoCard label="Survival Blessings" accent="green">
      <div className="flex gap-2 sm:gap-3 flex-wrap">
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
              tooltipTitle={item?.Blessing}
              tooltipDescription={item?.Runes?.[0]?.description}
            />
          ))}
      </div>
    </InfoCard>

    <InfoCard label="Empowerment Blessings" accent="pink">
      <div className="flex gap-2 sm:gap-3 flex-wrap">
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
              tooltipTitle={item?.Blessing}
              tooltipDescription={item?.Runes?.[0]?.description}
            />
          ))}
      </div>
    </InfoCard>
  </div>
);

// ─── CharacterCard ────────────────────────────────────────────────────────────
const CharacterCard = ({ name, imgSrc, isEmpty, emptyLabel }) => (
  <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-black/40 h-[160px] sm:h-[260px] md:h-[340px] lg:h-[420px]">
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

// ─── SectionLabel ─────────────────────────────────────────────────────────────
const SectionLabel = ({ color = "text-cyan-400", children }) => (
  <p className={`text-xs ${color} font-black uppercase tracking-widest mb-2`}>
    {children}
  </p>
);

// ─── Main BOT Component ───────────────────────────────────────────────────────
export default function BOT({ fireToast }) {
  const [hunters, setHunters] = useState([]);
  const [shadows, setShadows] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [cores, setCores] = useState([]);
  const [runes, setRunes] = useState([]);
  const [blessings, setBlessings] = useState([]);
  const [qteSkillsList, setQteSkillsList] = useState([]);
  const [ultimatesList, setUltimatesList] = useState([]);

  const [selectedCoreBody, setSelectedCoreBody] = useState(null);
  const [selectedCoreMind, setSelectedCoreMind] = useState(null);
  const [selectedCoreSpirit, setSelectedCoreSpirit] = useState(null);

  const [bodyCores, setBodyCores] = useState([]);
  const [mindCores, setMindCores] = useState([]);
  const [spiritCores, setSpiritCores] = useState([]);

  const [selectedQteSkills, setSelectedQteSkills] = useState([
    null,
    null,
    null,
  ]);
  const [selectedUltimate, setSelectedUltimate] = useState(null);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [selectedWeapon2, setSelectedWeapon2] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
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
  const [selectedShadows, setSelectedShadows] = useState([null, null, null]);
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [saving, setSaving] = useState(false);
  // ─── Fetch Cores ─────────────────────────────────────────────────────────
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserRole(null);
        return;
      }

      setCurrentUser(user);

      try {
        const snapshot = await getDocs(collection(db, "users"));

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();

          if (data.uid === user.uid) {
            setUserRole(data.role || "user");
          }
        });
      } catch (err) {
        console.log(err);
      }
    });

    return () => unsubscribe();
  }, []);

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
        // ─── Load Saved BOT Setup ─────────────────────
        const botRef = doc(db, "BOT", "Jinwoo Mode");

        const botSnap = await getDoc(botRef);

        if (botSnap.exists()) {
          const data = botSnap.data();

          // Shadows
          if (data.shadows) {
            setSelectedShadows(data.shadows);
          }

          // Jinwoo
          if (data.jinwoo) {
            setSelectedWeapon(data.jinwoo.weapon1 || null);

            setSelectedWeapon2(data.jinwoo.weapon2 || null);

            setSelectedArtifact(data.jinwoo.artifact || null);

            setSelectedRune(data.jinwoo.rune1 || null);

            setSelectedRune2(data.jinwoo.rune2 || null);

            setSelectedCoreBody(data.jinwoo.bodyCore || null);

            setSelectedCoreMind(data.jinwoo.mindCore || null);

            setSelectedCoreSpirit(data.jinwoo.spiritCore || null);

            setSelectedQteSkills(data.jinwoo.qteSkills || [null, null, null]);

            setSelectedUltimate(data.jinwoo.ultimate || null);

            setSelectedSurvivalBlessings(
              data.jinwoo.survivalBlessings || [null, null, null, null],
            );

            setSelectedEmpowermentBlessings(
              data.jinwoo.empowermentBlessings || [null, null, null, null],
            );
          }

          // Hunters
          if (data.hunters) {
            setSelectedHunters(data.hunters.map((h) => h.hunter || null));

            setHunterArtifacts(data.hunters.map((h) => h.artifact || null));

            setHunterCoreBody(data.hunters.map((h) => h.bodyCore || null));

            setHunterCoreMind(data.hunters.map((h) => h.mindCore || null));

            setHunterCoreSpirit(data.hunters.map((h) => h.spiritCore || null));

            setSelectedHunterSkins(data.hunters.map((h) => h.skin || null));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCores();
    fetchData();
  }, []);

  // ─── Helpers ─────────────────────────────────────────────────────────────
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
  const setSurvival = (slot, id) => {
    const updated = [...selectedSurvivalBlessings];
    updated[slot] =
      blessings.find(
        (b) => b.firestoreId === id && b?.Runes?.[0]?.type === "Survival",
      ) || null;
    setSelectedSurvivalBlessings(updated);
  };
  const setEmpowerment = (slot, id) => {
    const updated = [...selectedEmpowermentBlessings];
    updated[slot] =
      blessings.find(
        (b) => b.firestoreId === id && b?.Runes?.[0]?.type === "Empowerment",
      ) || null;
    setSelectedEmpowermentBlessings(updated);
  };

  const hunterLabels = ["Hunter 1", "Hunter 2", "Hunter 3"];
  const hunterLabelColors = [
    "text-purple-400",
    "text-blue-400",
    "text-orange-400",
  ];
  const hunterBorders = [
    "border-purple-500",
    "border-blue-500",
    "border-orange-500",
  ];

  const handleSaveBOT = async () => {
    try {
      if (!currentUser) return;

      setSaving(true);

      const payload = {
        updatedBy: currentUser.uid,
        updatedAt: new Date(),

        shadows: selectedShadows,

        jinwoo: {
          weapon1: selectedWeapon,
          weapon2: selectedWeapon2,
          artifact: selectedArtifact,
          rune1: selectedRune,
          rune2: selectedRune2,
          bodyCore: selectedCoreBody,
          mindCore: selectedCoreMind,
          spiritCore: selectedCoreSpirit,
          qteSkills: selectedQteSkills,
          ultimate: selectedUltimate,
          survivalBlessings: selectedSurvivalBlessings,
          empowermentBlessings: selectedEmpowermentBlessings,
        },

        hunters: selectedHunters.map((hunter, index) => ({
          hunter,
          artifact: hunterArtifacts[index],
          bodyCore: hunterCoreBody[index],
          mindCore: hunterCoreMind[index],
          spiritCore: hunterCoreSpirit[index],
          skin: selectedHunterSkins[index],
        })),
      };

      await setDoc(doc(db, "BOT", "Jinwoo Mode"), payload);

      fireToast({
        type: "success",
        message: "BOT (Jinwoo Mode) Setup Saved Successfully",
      });
    } catch (error) {
      console.log(error);
      fireToast({
        type: "error",
        message: "Failed To Save BOT (Jinwoo Mode) Setup",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Background>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-screen-2xl mx-auto w-full overflow-visible">
        {/* ── Title ── */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-cyan-400 text-center tracking-tight leading-tight">
          Battlefield Of Time
        </h1>
        <p className="text-center text-gray-300 text-sm sm:text-lg">
          Jinwoo Mode
        </p>

        {/* ── Main Team Preview ── */}
        <InfoCard label="Main Team" accent="cyan">
          {/* 2-col on mobile → 4-col on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <CharacterCard
              name="Sung Jinwoo"
              imgSrc="https://resources.vortexgaming.io/upload/post/2026/05/10/4a641924d08d47e7b531623c40ff1ad0.webp"
            />
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

          {/* Shadows – 3-col always (only 3 slots) */}
          <div className="pt-3 sm:pt-4 grid grid-cols-3 gap-2 sm:gap-4">
            {selectedShadows.map((shadow, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden border border-purple-500/30 bg-black/40 h-[80px] sm:h-[110px] md:h-[132px]"
              >
                {shadow ? (
                  <img
                    src={shadow.img}
                    className="w-full h-full object-cover"
                    alt={shadow.name}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-600 text-xs sm:text-sm text-center">
                    Empty Shadow
                  </div>
                )}
              </div>
            ))}
          </div>
        </InfoCard>

        {/* ── Equipment Detail Panels ── */}
        {/* 1-col mobile → 2-col md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <InfoCard label="Sung Jinwoo" accent="cyan">
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
          </InfoCard>

          {[0, 1, 2].map((slot) => {
            const accents = ["purple", "blue", "orange"];
            return (
              <InfoCard
                key={slot}
                label={`🗡 ${selectedHunters[slot]?.name || hunterLabels[slot]}`}
                accent={accents[slot]}
              >
                {selectedHunters[slot] ? (
                  <HunterEquipPanel
                    hunter={selectedHunters[slot]}
                    artifact={hunterArtifacts[slot]}
                    coreBody={hunterCoreBody[slot]}
                    coreMind={hunterCoreMind[slot]}
                    coreSpirit={hunterCoreSpirit[slot]}
                  />
                ) : (
                  <p className="text-gray-600 text-sm">
                    Select a hunter to see equipment.
                  </p>
                )}
              </InfoCard>
            );
          })}
        </div>

        {/* ── Selectors ── */}
        {userRole === "admin" && (
          <InfoCard label="Selectors" accent="cyan">
            <div className="space-y-5 sm:space-y-6">
              {/* ─ Shadows ─ */}
              <div>
                <SectionLabel color="text-purple-400">Shadows</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  {[0, 1, 2].map((slot) => (
                    <ImageSelect
                      key={slot}
                      placeholder={`Select Shadow ${slot + 1}`}
                      border="border-purple-500"
                      items={shadows}
                      keyFn={(s) => s.firestoreId}
                      labelFn={(s) => s.name}
                      imgFn={(s) => s.img}
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

              {/* ─ Jinwoo Equipment ─ */}
              <div>
                <SectionLabel color="text-cyan-400">
                  Jinwoo Equipment
                </SectionLabel>

                {/* Weapons + Artifact: 1-col → 2-col sm → 3-col lg */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  <ImageSelect
                    placeholder="Select Weapon 1"
                    border="border-red-500"
                    items={weapons}
                    keyFn={(w) => w.firestoreId}
                    labelFn={(w) => w.weaponName}
                    imgFn={(w) => w.weaponImg?.[0] || w.weaponImg2?.[0]}
                    value={selectedWeapon?.firestoreId || ""}
                    onChange={(id) =>
                      setSelectedWeapon(
                        weapons.find((w) => w.firestoreId === id) || null,
                      )
                    }
                  />
                  <ImageSelect
                    placeholder="Select Weapon 2"
                    border="border-red-500"
                    items={weapons}
                    keyFn={(w) => w.firestoreId}
                    labelFn={(w) => w.weaponName}
                    imgFn={(w) => w.weaponImg?.[0] || w.weaponImg2?.[0]}
                    value={selectedWeapon2?.firestoreId || ""}
                    onChange={(id) =>
                      setSelectedWeapon2(
                        weapons.find((w) => w.firestoreId === id) || null,
                      )
                    }
                  />
                  <ImageSelect
                    placeholder="Select Artifact"
                    border="border-cyan-500"
                    items={artifacts}
                    keyFn={(a) => a.firestoreId}
                    labelFn={(a) => a.name}
                    imgFn={(a) => a.pieces?.helmet || a.img}
                    value={selectedArtifact?.firestoreId || ""}
                    onChange={(id) =>
                      setSelectedArtifact(
                        artifacts.find((a) => a.firestoreId === id) || null,
                      )
                    }
                  />
                </div>

                {/* Cores: 1-col → 3-col */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-2 sm:mt-3">
                  <ImageSelect
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
                  <ImageSelect
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
                  <ImageSelect
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

                {/* Rune Stones: 1-col → 2-col */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-3">
                  {/* Rune Stone 1 */}
                  <ImageSelect
                    placeholder="Select Rune Stone 1"
                    border="border-purple-500"
                    items={runes.flatMap((r) =>
                      (r?.data?.[0]?.Runes || []).map((skill, index) => ({
                        ...skill,
                        firestoreId: `${r.firestoreId}-${index}`,
                        parentRune: r,
                      })),
                    )}
                    keyFn={(r) => r.firestoreId}
                    labelFn={(r) =>
                      r.skill1 ||
                      r.skill2 ||
                      r.skill3 ||
                      r.skill4 ||
                      r.skill5 ||
                      "Rune Skill"
                    }
                    imgFn={(r) => r.skillImg}
                    value={selectedRune?.firestoreId || ""}
                    onChange={(id) => {
                      const selected = runes
                        .flatMap((r) =>
                          (r?.data?.[0]?.Runes || []).map((skill, index) => ({
                            ...skill,
                            firestoreId: `${r.firestoreId}-${index}`,
                            parentRune: r,
                          })),
                        )
                        .find((r) => r.firestoreId === id);

                      setSelectedRune(selected || null);
                    }}
                  />

                  {/* Rune Stone 2 */}
                  <ImageSelect
                    placeholder="Select Rune Stone 2"
                    border="border-purple-500"
                    items={runes.flatMap((r) =>
                      (r?.data?.[0]?.Runes || []).map((skill, index) => ({
                        ...skill,
                        firestoreId: `${r.firestoreId}-${index}`,
                        parentRune: r,
                      })),
                    )}
                    keyFn={(r) => r.firestoreId}
                    labelFn={(r) =>
                      r.skill1 ||
                      r.skill2 ||
                      r.skill3 ||
                      r.skill4 ||
                      r.skill5 ||
                      "Rune Skill"
                    }
                    imgFn={(r) => r.skillImg}
                    value={selectedRune2?.firestoreId || ""}
                    onChange={(id) => {
                      const selected = runes
                        .flatMap((r) =>
                          (r?.data?.[0]?.Runes || []).map((skill, index) => ({
                            ...skill,
                            firestoreId: `${r.firestoreId}-${index}`,
                            parentRune: r,
                          })),
                        )
                        .find((r) => r.firestoreId === id);

                      setSelectedRune2(selected || null);
                    }}
                  />
                </div>
              </div>

              {/* ─ QTE Skills & Ultimate ─ */}
              <div>
                <SectionLabel color="text-yellow-400">
                  Jinwoo — QTE Skills & Ultimate
                </SectionLabel>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                  {/* QTE Skills */}
                  {[0, 1, 2].map((slot) => (
                    <ImageSelect
                      key={slot}
                      placeholder={`QTE Skill ${slot + 1}`}
                      border="border-yellow-500"
                      items={runes
                        .filter((r) => r?.data?.[0]?.Skills?.includes("(QTE)"))
                        .flatMap((r) =>
                          (r?.data?.[0]?.Runes || []).map((skill, index) => ({
                            ...skill,
                            firestoreId: `${r.firestoreId}-${index}`,
                            parentRune: r,
                          })),
                        )}
                      keyFn={(s) => s.firestoreId}
                      labelFn={(s) =>
                        s.skill1 ||
                        s.skill2 ||
                        s.skill3 ||
                        s.skill4 ||
                        "QTE Skill"
                      }
                      imgFn={(s) => s.skillImg}
                      value={selectedQteSkills?.[slot]?.firestoreId || ""}
                      onChange={(id) => {
                        const updated = [...selectedQteSkills];

                        const selected = runes
                          .filter((r) =>
                            r?.data?.[0]?.Skills?.includes("(QTE)"),
                          )
                          .flatMap((r) =>
                            (r?.data?.[0]?.Runes || []).map((skill, index) => ({
                              ...skill,
                              firestoreId: `${r.firestoreId}-${index}`,
                              parentRune: r,
                            })),
                          )
                          .find((r) => r.firestoreId === id);

                        updated[slot] = selected || null;

                        setSelectedQteSkills(updated);
                      }}
                    />
                  ))}

                  {/* Ultimate */}
                  <ImageSelect
                    placeholder="Select Ultimate"
                    border="border-orange-500"
                    items={runes
                      .filter((r) =>
                        r?.data?.[0]?.Skills?.includes("(Ultimate)"),
                      )
                      .flatMap((r) =>
                        (r?.data?.[0]?.Runes || []).map((skill, index) => ({
                          ...skill,
                          firestoreId: `${r.firestoreId}-${index}`,
                          parentRune: r,
                        })),
                      )}
                    keyFn={(u) => u.firestoreId}
                    labelFn={(u) =>
                      u.skill1 ||
                      u.skill2 ||
                      u.skill3 ||
                      u.skill4 ||
                      u.skill5 ||
                      "Ultimate"
                    }
                    imgFn={(u) => u.skillImg}
                    value={selectedUltimate?.firestoreId || ""}
                    onChange={(id) => {
                      const selected = runes
                        .filter((r) =>
                          r?.data?.[0]?.Skills?.includes("(Ultimate)"),
                        )
                        .flatMap((r) =>
                          (r?.data?.[0]?.Runes || []).map((skill, index) => ({
                            ...skill,
                            firestoreId: `${r.firestoreId}-${index}`,
                            parentRune: r,
                          })),
                        )
                        .find((r) => r.firestoreId === id);

                      setSelectedUltimate(selected || null);
                    }}
                  />
                </div>
              </div>

              {/* ─ Survival Blessings ─ */}
              <div>
                <SectionLabel color="text-green-400">
                  Jinwoo — Survival Blessings
                </SectionLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                  {[0, 1, 2, 3].map((slot) => (
                    <ImageSelect
                      key={slot}
                      placeholder={`Survival ${slot + 1}`}
                      border="border-green-500"
                      items={blessings.filter(
                        (b) => b?.Runes?.[0]?.type === "Survival",
                      )}
                      keyFn={(b) => b.firestoreId}
                      labelFn={(b) => b.Blessing}
                      imgFn={(b) => b?.Runes?.[0]?.img}
                      value={selectedSurvivalBlessings[slot]?.firestoreId || ""}
                      onChange={(id) => setSurvival(slot, id)}
                    />
                  ))}
                </div>
              </div>

              {/* ─ Empowerment Blessings ─ */}
              <div>
                <SectionLabel color="text-pink-400">
                  Jinwoo — Empowerment Blessings
                </SectionLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                  {[0, 1, 2, 3].map((slot) => (
                    <ImageSelect
                      key={slot}
                      placeholder={`Empower ${slot + 1}`}
                      border="border-pink-500"
                      items={blessings.filter(
                        (b) => b?.Runes?.[0]?.type === "Empowerment",
                      )}
                      keyFn={(b) => b.firestoreId}
                      labelFn={(b) => b.Blessing}
                      imgFn={(b) => b?.Runes?.[0]?.img}
                      value={
                        selectedEmpowermentBlessings[slot]?.firestoreId || ""
                      }
                      onChange={(id) => setEmpowerment(slot, id)}
                    />
                  ))}
                </div>
              </div>

              {/* ─ Hunters ─ */}
              {[0, 1, 2].map((slot) => (
                <div key={slot}>
                  <SectionLabel color={hunterLabelColors[slot]}>
                    {hunterLabels[slot]} Equipment
                  </SectionLabel>

                  {/* Hunter + Artifact: 1-col → 2-col */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <ImageSelect
                      placeholder={`Select ${hunterLabels[slot]}`}
                      border={hunterBorders[slot]}
                      items={hunters}
                      keyFn={(h) => h.firestoreId}
                      labelFn={(h) => h.name}
                      imgFn={(h) => h.img2 || h.img1}
                      value={selectedHunters[slot]?.firestoreId || ""}
                      onChange={(id) => setHunterSlot(slot, id)}
                    />
                    <ImageSelect
                      placeholder="Select Artifact"
                      border="border-cyan-500"
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
                              ? "border-cyan-400 scale-105"
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

                  {/* Hunter Cores: 1-col → 3-col */}
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
            <div className="pt-6 flex justify-center">
              <button
                onClick={handleSaveBOT}
                disabled={saving}
                className="px-8 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              >
                {saving ? "Saving..." : "Save BOT Setup"}
              </button>
            </div>
          </InfoCard>
        )}
      </div>
      <InfoCard label="Community Reviews" accent="cyan" className="pt-10 mt-8">
        <CommentsPage
          type="bot"
          itemId="jinwoo-mode"
          itemName="BOT Jinwoo Mode"
        />
      </InfoCard>
    </Background>
  );
}
