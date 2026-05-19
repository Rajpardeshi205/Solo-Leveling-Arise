"use client";

import React, { useEffect, useState, useRef } from "react";
import Background from "@/Components/Background";
import { db, auth } from "@/Firebase/FireBaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, setDoc, getDoc, doc } from "firebase/firestore";
import CommentsPage from "@/Components/CommentsPage ";
import GameTooltip from "@/Components/GameTooltip";
// ─── ImageSelect ──────────────────────────────────────────────────────────────
const ImageSelect = ({
  label,
  placeholder,
  border = "border-yellow-500",
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
                className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-white/5 transition-colors ${isActive ? "bg-white/10 text-white" : "text-gray-300"}`}
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
                    className="w-4 h-4 ml-auto text-yellow-400 flex-shrink-0"
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
const InfoCard = ({ label, children, accent = "yellow", className = "" }) => {
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
      amber: "border-amber-500/20",
      lime: "border-lime-500/20",
      teal: "border-teal-500/20",
      sky: "border-sky-500/20",
    }[accent] || "border-yellow-500/20";

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
      amber: "text-amber-400",
      lime: "text-lime-400",
      teal: "text-teal-400",
      sky: "text-sky-400",
    }[accent] || "text-yellow-400";

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
    }[accent] || "border-purple-500/60";

  return (
    <GameTooltip
      title={tooltipTitle || label}
      description={tooltipDescription}
      image={src}
    >
      <div className="flex flex-col items-center gap-1 cursor-pointer">
        <div
          className={`${sizeClass} rounded-xl border ${borderColor} bg-black/50 overflow-hidden flex items-center justify-center hover:scale-105 transition-all duration-300`}
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
    </GameTooltip>
  );
};

// ─── ArtifactPiecesGrid ───────────────────────────────────────────────────────
const ArtifactPiecesGrid = ({ artifact, accent = "yellow" }) => {
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
      yellow: "text-yellow-300",
      cyan: "text-cyan-300",
      orange: "text-orange-300",
      amber: "text-amber-300",
      lime: "text-lime-300",
      green: "text-green-300",
      teal: "text-teal-300",
      sky: "text-sky-300",
      blue: "text-blue-300",
    }[accent] || "text-yellow-300";
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
const CorePanel = ({ coreBody, coreMind, coreSpirit, size = "sm" }) => (
  <InfoCard label="Cores" accent="red">
    <div className="flex justify-around gap-2 sm:gap-4">
      <ItemSlot
        src={coreBody?.img}
        label={coreBody?.name || "Body"}
        accent="red"
        size="md"
        empty="⬡"
        tooltipTitle={coreBody?.name}
        tooltipDescription={coreBody?.passive?.[0]}
      />

      <ItemSlot
        src={coreMind?.img}
        label={coreMind?.name || "Mind"}
        accent="blue"
        size="md"
        empty="⬡"
        tooltipTitle={coreMind?.name}
        tooltipDescription={coreMind?.passive?.[0]}
      />

      <ItemSlot
        src={coreSpirit?.img}
        label={coreSpirit?.name || "Spirit"}
        accent="purple"
        size="md"
        empty="⬡"
        tooltipTitle={coreSpirit?.name}
        tooltipDescription={coreSpirit?.passive?.[0]}
      />
    </div>
  </InfoCard>
);

// ─── JinwooEquipPanel ─────────────────────────────────────────────────────────
const JinwooEquipPanel = ({
  weapon,
  weapon2,
  artifact,
  rune,
  rune2,
  coreBody,
  coreMind,
  coreSpirit,
  qteSkills,
  ultimate,
  survivalBlessings,
  empowermentBlessings,
}) => (
  <div className="space-y-3">
    {/* Weapons */}
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

    {/* Artifact */}
    <ArtifactPiecesGrid artifact={artifact} accent="cyan" />

    {/* Rune Stones */}
    <InfoCard label="Rune Stones" accent="purple">
      <div className="flex gap-3 sm:gap-4 flex-wrap">
        <ItemSlot
          src={rune?.skillImg}
          label={
            rune?.skill1 ||
            rune?.skill2 ||
            rune?.skill3 ||
            rune?.skill4 ||
            rune?.skill5 ||
            "Rune 1"
          }
          accent="purple"
          size="md"
          tooltipTitle={
            rune?.skill1 ||
            rune?.skill2 ||
            rune?.skill3 ||
            rune?.skill4 ||
            rune?.skill5
          }
          tooltipDescription={rune?.description}
        />

        <ItemSlot
          src={rune2?.skillImg}
          label={
            rune2?.skill1 ||
            rune2?.skill2 ||
            rune2?.skill4 ||
            rune2?.skill5 ||
            "Rune 2"
          }
          accent="purple"
          size="md"
          tooltipTitle={
            rune2?.skill1 ||
            rune2?.skill2 ||
            rune2?.skill3 ||
            rune2?.skill4 ||
            rune2?.skill5
          }
          tooltipDescription={rune2?.description}
        />
      </div>
    </InfoCard>

    {/* Cores */}
    <CorePanel
      coreBody={coreBody}
      coreMind={coreMind}
      coreSpirit={coreSpirit}
      size="md"
    />

    {/* QTE Skills & Ultimate */}
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
              skill?.skill5 ||
              `QTE ${i + 1}`
            }
            accent="yellow"
            size="md"
            tooltipTitle={
              skill?.skill1 ||
              skill?.skill2 ||
              skill?.skill3 ||
              skill?.skill4 ||
              skill?.skill5
            }
            tooltipDescription={skill?.description}
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
          accent="orange"
          size="md"
          tooltipTitle={
            ultimate?.skill1 ||
            ultimate?.skill2 ||
            ultimate?.skill3 ||
            ultimate?.skill4 ||
            ultimate
          }
          tooltipDescription={ultimate?.description}
        />
      </div>
    </InfoCard>

    {/* Survival Blessings */}
    <InfoCard label="Survival Blessings" accent="green">
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        {(survivalBlessings || [null, null, null, null])
          .filter(Boolean)
          .map((item, i) => (
            <ItemSlot
              key={i}
              src={item?.Runes?.[0]?.img}
              label={item?.Blessing || `Blessing ${i + 1}`}
              accent="green"
              size="md"
              tooltipTitle={item?.Blessing}
              tooltipDescription={item?.Runes?.[0]?.description}
            />
          ))}
      </div>
    </InfoCard>

    {/* Empowerment Blessings */}
    <InfoCard label="Empowerment Blessings" accent="pink">
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        {(empowermentBlessings || [null, null, null, null])
          .filter(Boolean)
          .map((item, i) => (
            <ItemSlot
              key={i}
              src={item?.Runes?.[0]?.img}
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

// ─── HunterEquipPanel ─────────────────────────────────────────────────────────
const HunterEquipPanel = ({
  hunter,
  artifact,
  coreBody,
  coreMind,
  coreSpirit,
  accent = "yellow",
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
      <ArtifactPiecesGrid artifact={artifact} accent={accent} />
      <CorePanel
        coreBody={coreBody}
        coreMind={coreMind}
        coreSpirit={coreSpirit}
      />
    </div>
  );
};

// ─── SectionLabel ─────────────────────────────────────────────────────────────
const SectionLabel = ({ color = "text-yellow-400", children }) => (
  <p className={`text-xs ${color} font-black uppercase tracking-widest mb-2`}>
    {children}
  </p>
);

// ─── Palette for 6 hunter slots ───────────────────────────────────────────────
const HUNTER_ACCENTS = ["yellow", "amber", "lime", "green", "teal", "sky"];
const HUNTER_BORDERS = [
  "border-yellow-500",
  "border-amber-500",
  "border-lime-500",
  "border-green-500",
  "border-teal-500",
  "border-sky-500",
];
const HUNTER_BORDER_CLS = [
  "border-yellow-500/30",
  "border-amber-500/30",
  "border-lime-500/30",
  "border-green-500/30",
  "border-teal-500/30",
  "border-sky-500/30",
];
const HUNTER_LABEL_COLORS = [
  "text-yellow-400",
  "text-amber-400",
  "text-lime-400",
  "text-green-400",
  "text-teal-400",
  "text-sky-400",
];
const SLOTS = 6;

// ─── Main GuildBoss Component ─────────────────────────────────────────────────
export default function GuildBoss({ fireToast }) {
  const [hunters, setHunters] = useState([]);
  const [shadows, setShadows] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [bodyCores, setBodyCores] = useState([]);
  const [mindCores, setMindCores] = useState([]);
  const [spiritCores, setSpiritCores] = useState([]);

  // ── Jinwoo base ──
  const [jinwooWeapons, setJinwooWeapons] = useState([]);
  const [runes, setRunes] = useState([]);
  const [blessings, setBlessings] = useState([]);

  // ── Jinwoo selections ──
  const [jinwooWeapon, setJinwooWeapon] = useState(null);
  const [jinwooWeapon2, setJinwooWeapon2] = useState(null);
  const [jinwooArtifact, setJinwooArtifact] = useState(null);
  const [jinwooRune, setJinwooRune] = useState(null);
  const [jinwooRune2, setJinwooRune2] = useState(null);
  const [jinwooCoreBody, setJinwooCoreBody] = useState(null);
  const [jinwooCoreMind, setJinwooCoreMind] = useState(null);
  const [jinwooCoreSpirit, setJinwooCoreSpirit] = useState(null);
  const [jinwooQteSkills, setJinwooQteSkills] = useState([null, null, null]);
  const [jinwooUltimate, setJinwooUltimate] = useState(null);
  const [jinwooSurvivalBlessings, setJinwooSurvivalBlessings] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [jinwooEmpowermentBlessings, setJinwooEmpowermentBlessings] = useState([
    null,
    null,
    null,
    null,
  ]);

  // ── Shadow ──
  const [selectedShadow, setSelectedShadow] = useState(null);

  // ── 6 Hunters ──
  const [selectedHunters, setSelectedHunters] = useState(
    Array(SLOTS).fill(null),
  );
  const [hunterArtifacts, setHunterArtifacts] = useState(
    Array(SLOTS).fill(null),
  );
  const [hunterCoreBody, setHunterCoreBody] = useState(Array(SLOTS).fill(null));
  const [hunterCoreMind, setHunterCoreMind] = useState(Array(SLOTS).fill(null));
  const [hunterCoreSpirit, setHunterCoreSpirit] = useState(
    Array(SLOTS).fill(null),
  );
  const [selectedHunterSkins, setSelectedHunterSkins] = useState(
    Array(SLOTS).fill(null),
  );

  const [userRole, setUserRole] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const [saving, setSaving] = useState(false);

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

  // ─── Fetch ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchCores = async () => {
      const snapshot = await getDocs(collection(db, "cores"));
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (doc.id === "Body") setBodyCores(data.items || []);
        if (doc.id === "Mind") setMindCores(data.items || []);
        if (doc.id === "Spirit") setSpiritCores(data.items || []);
      });
    };
    const fetchData = async () => {
      const snap = async (col) => {
        const s = await getDocs(collection(db, col));
        return s.docs.map((doc) => ({ firestoreId: doc.id, ...doc.data() }));
      };
      setHunters(await snap("hunters"));
      setShadows(await snap("shadows"));
      setArtifacts(await snap("artifacts"));
      setJinwooWeapons(await snap("jinwooWeapons"));
      setRunes(await snap("runes"));
      setBlessings(await snap("blessings"));
      // ─── Load Saved Guild Boss ─────────────────────
      const guildRef = doc(db, "GuildBoss", "Main");

      const guildSnap = await getDoc(guildRef);

      if (guildSnap.exists()) {
        const data = guildSnap.data();

        // Shadow
        setSelectedShadow(data.shadow || null);

        // Jinwoo
        if (data.jinwoo) {
          setJinwooWeapon(data.jinwoo.weapon1 || null);

          setJinwooWeapon2(data.jinwoo.weapon2 || null);

          setJinwooArtifact(data.jinwoo.artifact || null);

          setJinwooRune(data.jinwoo.rune1 || null);

          setJinwooRune2(data.jinwoo.rune2 || null);

          setJinwooCoreBody(data.jinwoo.bodyCore || null);

          setJinwooCoreMind(data.jinwoo.mindCore || null);

          setJinwooCoreSpirit(data.jinwoo.spiritCore || null);

          setJinwooQteSkills(data.jinwoo.qteSkills || [null, null, null]);

          setJinwooUltimate(data.jinwoo.ultimate || null);

          setJinwooSurvivalBlessings(
            data.jinwoo.survivalBlessings || [null, null, null, null],
          );

          setJinwooEmpowermentBlessings(
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
    };
    fetchCores();
    fetchData();
  }, []);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const updateSlot = (arr, setArr, i, val) => {
    const u = [...arr];
    u[i] = val;
    setArr(u);
  };
  const setHunterSlot = (i, id) =>
    updateSlot(
      selectedHunters,
      setSelectedHunters,
      i,
      hunters.find((h) => h.firestoreId === id) || null,
    );
  const setHunterArtifactSlot = (i, id) =>
    updateSlot(
      hunterArtifacts,
      setHunterArtifacts,
      i,
      artifacts.find((a) => a.firestoreId === id) || null,
    );
  const setHunterCoreBodySlot = (i, name) =>
    updateSlot(
      hunterCoreBody,
      setHunterCoreBody,
      i,
      bodyCores.find((c) => c.name === name) || null,
    );
  const setHunterCoreMindSlot = (i, name) =>
    updateSlot(
      hunterCoreMind,
      setHunterCoreMind,
      i,
      mindCores.find((c) => c.name === name) || null,
    );
  const setHunterCoreSpiritSlot = (i, name) =>
    updateSlot(
      hunterCoreSpirit,
      setHunterCoreSpirit,
      i,
      spiritCores.find((c) => c.name === name) || null,
    );

  const setJinwooQteSlot = (slot, id) => {
    const updated = [...jinwooQteSkills];
    updated[slot] = runes.find((r) => r.firestoreId === id) || null;
    setJinwooQteSkills(updated);
  };
  const setJinwooSurvivalSlot = (slot, id) => {
    const updated = [...jinwooSurvivalBlessings];
    updated[slot] =
      blessings.find(
        (b) => b.firestoreId === id && b?.Runes?.[0]?.type === "Survival",
      ) || null;
    setJinwooSurvivalBlessings(updated);
  };
  const setJinwooEmpowermentSlot = (slot, id) => {
    const updated = [...jinwooEmpowermentBlessings];
    updated[slot] =
      blessings.find(
        (b) => b.firestoreId === id && b?.Runes?.[0]?.type === "Empowerment",
      ) || null;
    setJinwooEmpowermentBlessings(updated);
  };

  // ─── Inline character card ─────────────────────────────────────────────────
  const CharCard = ({ name, imgSrc, isEmpty, emptyLabel, borderCls }) => (
    <div
      className={`relative rounded-2xl overflow-hidden border ${borderCls} bg-black/40 h-[130px] sm:h-[190px] md:h-[250px] lg:h-[300px]`}
    >
      {!isEmpty ? (
        <>
          <img
            src={imgSrc}
            className="w-full h-full object-cover object-top"
            alt={name}
          />
          <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/90 to-transparent">
            <p className="text-white font-bold text-[10px] sm:text-xs truncate">
              {name}
            </p>
          </div>
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-600 text-[10px] sm:text-xs text-center px-1">
          {emptyLabel}
        </div>
      )}
    </div>
  );

  const handleSaveGuildBoss = async () => {
    try {
      if (!currentUser) return;

      setSaving(true);

      const payload = {
        updatedBy: currentUser.uid,

        updatedAt: new Date(),

        shadow: selectedShadow,

        jinwoo: {
          weapon1: jinwooWeapon,
          weapon2: jinwooWeapon2,
          artifact: jinwooArtifact,
          rune1: jinwooRune,
          rune2: jinwooRune2,
          bodyCore: jinwooCoreBody,
          mindCore: jinwooCoreMind,
          spiritCore: jinwooCoreSpirit,
          qteSkills: jinwooQteSkills,
          ultimate: jinwooUltimate,
          survivalBlessings: jinwooSurvivalBlessings,
          empowermentBlessings: jinwooEmpowermentBlessings,
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

      await setDoc(doc(db, "GuildBoss", "Main"), payload);

      fireToast({
        type: "success",
        message: "Guild Boss Setup Saved Successfully ⚔",
      });
    } catch (error) {
      console.log(error);

      fireToast({
        type: "error",
        message: "Failed To Save Guild Boss Setup",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Background>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-screen-2xl mx-auto w-full">
        {/* ── Title ── */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-yellow-400 text-center tracking-tight leading-tight">
          Guild Boss
        </h1>
        <p className="text-center text-gray-300 text-sm sm:text-lg">Team 1 </p>
        {/* ── Main Team Preview ── */}
        <InfoCard label="Main Team" accent="yellow">
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {/* Row 1 */}
            <CharCard
              name="Sung Jinwoo"
              imgSrc="https://resources.vortexgaming.io/upload/post/2026/05/10/4a641924d08d47e7b531623c40ff1ad0.webp"
              isEmpty={false}
              borderCls="border-cyan-500/40"
            />
            {[0, 1, 2].map((i) => (
              <CharCard
                key={i}
                name={selectedHunters[i]?.name}
                imgSrc={
                  selectedHunterSkins[i] ||
                  selectedHunters[i]?.skin1[0] ||
                  selectedHunters[i]?.img1
                }
                isEmpty={!selectedHunters[i]}
                emptyLabel={`Hunter ${i + 1}`}
                borderCls={HUNTER_BORDER_CLS[i]}
              />
            ))}

            {/* Row 2 */}
            <div className="invisible" aria-hidden="true" />
            {[3, 4, 5].map((i) => (
              <CharCard
                key={i}
                name={selectedHunters[i]?.name}
                imgSrc={
                  selectedHunterSkins[i] ||
                  selectedHunters[i]?.skin1[0] ||
                  selectedHunters[i]?.img1
                }
                isEmpty={!selectedHunters[i]}
                emptyLabel={`Hunter ${i + 1}`}
                borderCls={HUNTER_BORDER_CLS[i]}
              />
            ))}
          </div>

          {/* Shadow */}
          <div className="pt-3 sm:pt-4">
            <p className="text-xs text-yellow-400 font-black uppercase tracking-widest mb-2">
              Shadow
            </p>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              <div className="relative rounded-xl overflow-hidden border border-yellow-500/30 bg-black/40 h-[70px] sm:h-[100px]">
                {selectedShadow ? (
                  <img
                    src={selectedShadow.img}
                    className="w-full h-full object-cover"
                    alt={selectedShadow.name}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-600 text-xs text-center px-1">
                    Empty Shadow
                  </div>
                )}
              </div>
            </div>
          </div>
        </InfoCard>
        {/* ── Jinwoo Equipment Panel ── */}
        <InfoCard label="⚔ Sung Jinwoo — Equipment" accent="cyan">
          <JinwooEquipPanel
            weapon={jinwooWeapon}
            weapon2={jinwooWeapon2}
            artifact={jinwooArtifact}
            rune={jinwooRune}
            rune2={jinwooRune2}
            coreBody={jinwooCoreBody}
            coreMind={jinwooCoreMind}
            coreSpirit={jinwooCoreSpirit}
            qteSkills={jinwooQteSkills}
            ultimate={jinwooUltimate}
            survivalBlessings={jinwooSurvivalBlessings}
            empowermentBlessings={jinwooEmpowermentBlessings}
          />
        </InfoCard>
        {/* ── 6 Hunter Equipment Panels ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: SLOTS }).map((_, slot) => (
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
        {/* ── Selectors (Admin Only) ── */}
        {userRole === "admin" && (
          <InfoCard label="Guild Boss Selectors" accent="yellow">
            <div className="space-y-5 sm:space-y-6">
              {/* ─ Shadow ─ */}
              <div>
                <SectionLabel color="text-yellow-400">Shadow</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  <ImageSelect
                    placeholder="Select Shadow"
                    border="border-yellow-500"
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

              {/* ─ Jinwoo Equipment ─ */}
              <div>
                <SectionLabel color="text-cyan-400">
                  Jinwoo Equipment
                </SectionLabel>

                {/* Weapons + Artifact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  <ImageSelect
                    placeholder="Select Weapon 1"
                    border="border-red-500"
                    items={jinwooWeapons}
                    keyFn={(w) => w.firestoreId}
                    labelFn={(w) => w.weaponName}
                    imgFn={(w) => w.weaponImg?.[0] || w.weaponImg2?.[0]}
                    value={jinwooWeapon?.firestoreId || ""}
                    onChange={(id) =>
                      setJinwooWeapon(
                        jinwooWeapons.find((w) => w.firestoreId === id) || null,
                      )
                    }
                  />
                  <ImageSelect
                    placeholder="Select Weapon 2"
                    border="border-red-500"
                    items={jinwooWeapons}
                    keyFn={(w) => w.firestoreId}
                    labelFn={(w) => w.weaponName}
                    imgFn={(w) => w.weaponImg?.[0] || w.weaponImg2?.[0]}
                    value={jinwooWeapon2?.firestoreId || ""}
                    onChange={(id) =>
                      setJinwooWeapon2(
                        jinwooWeapons.find((w) => w.firestoreId === id) || null,
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
                    value={jinwooArtifact?.firestoreId || ""}
                    onChange={(id) =>
                      setJinwooArtifact(
                        artifacts.find((a) => a.firestoreId === id) || null,
                      )
                    }
                  />
                </div>

                {/* Cores */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-2 sm:mt-3">
                  <ImageSelect
                    placeholder="Select Body Core"
                    border="border-red-500"
                    items={bodyCores}
                    keyFn={(c) => c.name}
                    labelFn={(c) => c.name}
                    imgFn={(c) => c.img}
                    value={jinwooCoreBody?.name || ""}
                    onChange={(id) =>
                      setJinwooCoreBody(
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
                    value={jinwooCoreMind?.name || ""}
                    onChange={(id) =>
                      setJinwooCoreMind(
                        mindCores.find((c) => c.name === id) || null,
                      )
                    }
                  />
                  <ImageSelect
                    placeholder="Select Spirit Core"
                    border="border-purple-500"
                    items={spiritCores}
                    keyFn={(c) => c.name}
                    labelFn={(c) => c.name}
                    imgFn={(c) => c.img}
                    value={jinwooCoreSpirit?.name || ""}
                    onChange={(id) =>
                      setJinwooCoreSpirit(
                        spiritCores.find((c) => c.name === id) || null,
                      )
                    }
                  />
                </div>

                {/* Rune Stones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-3">
                  {/* Rune 1 */}
                  <ImageSelect
                    placeholder="Select Rune Stone 1"
                    border="border-purple-500"
                    items={runes
                      .filter(
                        (r) =>
                          !r?.data?.[0]?.Skills?.includes("(QTE)") &&
                          !r?.data?.[0]?.Skills?.includes("(Ultimate)"),
                      )
                      .flatMap((r) =>
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
                    value={jinwooRune?.firestoreId || ""}
                    onChange={(id) => {
                      const selected = runes
                        .filter(
                          (r) =>
                            !r?.data?.[0]?.Skills?.includes("(QTE)") &&
                            !r?.data?.[0]?.Skills?.includes("(Ultimate)"),
                        )
                        .flatMap((r) =>
                          (r?.data?.[0]?.Runes || []).map((skill, index) => ({
                            ...skill,
                            firestoreId: `${r.firestoreId}-${index}`,
                            parentRune: r,
                          })),
                        )
                        .find((r) => r.firestoreId === id);

                      setJinwooRune(selected || null);
                    }}
                  />

                  {/* Rune 2 */}
                  <ImageSelect
                    placeholder="Select Rune Stone 2"
                    border="border-purple-500"
                    items={runes
                      .filter(
                        (r) =>
                          !r?.data?.[0]?.Skills?.includes("(QTE)") &&
                          !r?.data?.[0]?.Skills?.includes("(Ultimate)"),
                      )
                      .flatMap((r) =>
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
                    value={jinwooRune2?.firestoreId || ""}
                    onChange={(id) => {
                      const selected = runes
                        .filter(
                          (r) =>
                            !r?.data?.[0]?.Skills?.includes("(QTE)") &&
                            !r?.data?.[0]?.Skills?.includes("(Ultimate)"),
                        )
                        .flatMap((r) =>
                          (r?.data?.[0]?.Runes || []).map((skill, index) => ({
                            ...skill,
                            firestoreId: `${r.firestoreId}-${index}`,
                            parentRune: r,
                          })),
                        )
                        .find((r) => r.firestoreId === id);

                      setJinwooRune2(selected || null);
                    }}
                  />
                </div>
              </div>

              {/* ─ Jinwoo QTE Skills & Ultimate ─ */}
              <div>
                <SectionLabel color="text-yellow-400">
                  Jinwoo — QTE Skills & Ultimate
                </SectionLabel>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                  {/* QTE */}
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
                        s.skill5 ||
                        "QTE Skill"
                      }
                      imgFn={(s) => s.skillImg}
                      value={jinwooQteSkills?.[slot]?.firestoreId || ""}
                      onChange={(id) => {
                        const updated = [...jinwooQteSkills];

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

                        setJinwooQteSkills(updated);
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
                    value={jinwooUltimate?.firestoreId || ""}
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

                      setJinwooUltimate(selected || null);
                    }}
                  />
                </div>
              </div>

              {/* ─ Jinwoo Survival Blessings ─ */}
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
                      value={jinwooSurvivalBlessings[slot]?.firestoreId || ""}
                      onChange={(id) => setJinwooSurvivalSlot(slot, id)}
                    />
                  ))}
                </div>
              </div>

              {/* ─ Jinwoo Empowerment Blessings ─ */}
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
                        jinwooEmpowermentBlessings[slot]?.firestoreId || ""
                      }
                      onChange={(id) => setJinwooEmpowermentSlot(slot, id)}
                    />
                  ))}
                </div>
              </div>

              {/* ─ 6 Hunters ─ */}
              {Array.from({ length: SLOTS }).map((_, slot) => (
                <div key={slot}>
                  <SectionLabel color={HUNTER_LABEL_COLORS[slot]}>
                    Hunter {slot + 1} Equipment
                  </SectionLabel>

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
                          onClick={() =>
                            updateSlot(
                              selectedHunterSkins,
                              setSelectedHunterSkins,
                              slot,
                              skinImg,
                            )
                          }
                          className={`flex-shrink-0 rounded-xl overflow-hidden border-4 transition-all ${
                            selectedHunterSkins[slot] === skinImg
                              ? "border-yellow-400 scale-105"
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
            <div className="pt-6 flex justify-center">
              <button
                onClick={handleSaveGuildBoss}
                disabled={saving}
                className="px-8 py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.45)]"
              >
                {saving ? "Saving..." : "Save Guild Boss Setup"}
              </button>
            </div>
          </InfoCard>
        )}{" "}
      </div>
      <InfoCard label="Community Reviews" accent="cyan" className="pt-10 mt-8">
        <CommentsPage
          type="guildboss"
          itemId="guild-boss-main"
          itemName="Guild Boss Team 1"
        />
      </InfoCard>
    </Background>
  );
}
