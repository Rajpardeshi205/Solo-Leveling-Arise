"use client";

import { useParams } from "next/navigation";
import { Plus, Sword, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Type } from "../../../../Components/gameData/Type";
import { Elements } from "../../../../Components/gameData/Elements";
import { Cinzel_Decorative } from "next/font/google";
import Card from "../../card";
import HunterDetailsSkeleton from "../../HunterDetailsSkeleton";
import CommentsPage from "@/Components/CommentsPage ";
import Cores from "../../Cores";
import { Guild } from "@/Components/gameData/Guild";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Firebase/FireBaseconfig";
import Artifacts from "../../Artifacts";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700"],
});

export default function HunterDetailsPage() {
  const { HunterId } = useParams();

  // ✅ FIX: moved inside component
  const [selectedHunter, setSelectedHunter] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [skills, setSkills] = useState([]);
  const [advancement, setAdvancement] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [coresData, setCoresData] = useState({
    Mind: [],
    Body: [],
    Spirit: [],
  });

  useEffect(() => {
    const fetchHunter = async () => {
      if (!HunterId) return;

      const docRef = doc(db, "hunters", HunterId.toString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSelectedHunter(docSnap.data());
      } else {
        console.log("❌ Hunter not found");
      }
    };

    fetchHunter();
  }, [HunterId]);

  // ❌ REMOVED THIS (IMPORTANT)
  // const selectedHunter = hunters.find(...)

  useEffect(() => {
    const fetchCores = async () => {
      const data = {};
      const coreTypes = ["Mind", "Body", "Spirit"];

      for (let type of coreTypes) {
        const docRef = doc(db, "cores", type);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          data[type] = docSnap.data().items;
        }
      }

      setCoresData(data);
    };

    fetchCores();
  }, []);

  useEffect(() => {
    if (!selectedHunter) return;

    const fetchSkills = async () => {
      const docRef = doc(db, "skills", selectedHunter.id.toString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSkills(docSnap.data().data);
      }
    };

    fetchSkills();
  }, [selectedHunter]);

  const [mainSkin, setMainSkin] = useState(null);

  useEffect(() => {
    if (selectedHunter?.skin1?.length) {
      setMainSkin(selectedHunter.skin1[0]);
    }
  }, [selectedHunter]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!selectedHunter) return;

    const fetchAdvancement = async () => {
      const docRef = doc(db, "advancements", selectedHunter.id.toString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAdvancement(docSnap.data().data);
      }
    };

    fetchAdvancement();
  }, [selectedHunter]);

  useEffect(() => {
    if (!selectedHunter) return;

    const fetchArtifacts = async () => {
      const artifactData = selectedHunter.Artifacts || [];
      const results = [];

      for (let item of artifactData) {
        // ✅ safety checks
        if (!Array.isArray(item)) continue;
        if (!item[0]) continue;

        const setName = item[0].trim();

        try {
          const docRef = doc(db, "artifacts", setName);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            results.push(docSnap.data());
          } else {
            console.log("❌ Artifact not found:", setName);
          }
        } catch (error) {
          console.log("❌ Artifact fetch error:", error);
        }
      }

      setArtifacts(results);
    };

    fetchArtifacts();
  }, [selectedHunter]);

  if (!selectedHunter) {
    return <div className="text-white">Loading...</div>;
  }

  if (loading) return <HunterDetailsSkeleton />;

  const skinGroups = [];
  for (let i = 1; i <= 4; i++) {
    const skinKey = `skin${i}`;
    if (selectedHunter[skinKey] && selectedHunter[skinKey].length > 0) {
      skinGroups.push({
        key: skinKey,
        skins: selectedHunter[skinKey],
      });
    }
  }

  return (
    <motion.div
      key={HunterId}
      className="min-h-screen pt-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white"
    >
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        {/* Left: Image & Skin Section */}
        <div className="w-full md:w-[40%] md:sticky md:top-24 self-start">
          <Card selectedHunter={selectedHunter}>
            {/* Rarity Tag */}
            <h3
              className={`absolute top-3 right-3 text-3xl font-extrabold text-transparent tracking-tighter bg-clip-text drop-shadow-[0_0_5px_black] ${
                selectedHunter.Rarity === "SSR"
                  ? "bg-gradient-to-b from-red-700 to-red-300"
                  : selectedHunter.Rarity === "SR"
                    ? "bg-gradient-to-b from-pink-600 to-pink-400"
                    : "bg-gradient-to-b from-blue-700 to-blue-300"
              }`}
            >
              {selectedHunter.Rarity}
            </h3>

            {/* Element Icon */}
            <div className="absolute top-3 left-3">
              {selectedHunter?.element && Elements[selectedHunter.element] && (
                <img
                  src={Elements[selectedHunter.element]}
                  alt={selectedHunter.element}
                  className="w-10 h-10 drop-shadow-[0_0_5px_black]"
                />
              )}
            </div>

            {/* Hunter Image */}
            <motion.img
              layoutId={`hunter-img-${selectedHunter.id}`}
              src={mainSkin}
              alt={selectedHunter.id}
              className="max-h-[100%] max-w-full object-contain"
              style={{ filter: "drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </Card>

          {/* Skins Section Below Image */}
          {skinGroups.length > 0 && (
            <div className="mt-1">
              <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
                {skinGroups.flatMap(({ skins }, i) =>
                  skins.map((skinImg, idx) => (
                    <button
                      key={`${i}-${idx}`}
                      onClick={() => setMainSkin(skinImg)}
                      className={`flex-shrink-0 rounded-lg overflow-hidden border-4 ${
                        mainSkin === skinImg
                          ? "border-blue-400"
                          : "border-transparent"
                      }`}
                      style={{ width: "72px", height: "72px" }}
                    >
                      <img
                        src={skinImg}
                        alt={`skin-${i}-${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Hunter Info */}
        <div className="flex-1 space-y-6">
          <motion.h1
            className={`text-3xl sm:text-4xl font-extrabold tracking-wider ${cinzel.className}`}
            style={{ color: selectedHunter.color }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {selectedHunter.name}
          </motion.h1>

          {/* Info Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <InfoCard label="Description">
              {selectedHunter.description?.replace(/_/g, " ")}
            </InfoCard>

            <InfoCard label="Guild">
              {selectedHunter.guild?.replace(/_/g, " ")}
              <motion.div
                key={`type-${selectedIndex}`}
                className="relative flex items-center group drop-shadow-[0_0_15px_black]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {selectedHunter.guild && Guild[selectedHunter.guild] && (
                  <>
                    <img
                      src={Guild[selectedHunter.guild]}
                      alt={selectedHunter.guild}
                      className="w-32 h-32 sm:w-40 sm:h-40 z-10"
                    />
                  </>
                )}
              </motion.div>
            </InfoCard>

            <InfoCard label="Type">
              <div className="flex items-center gap-2">
                <span style={{ color: selectedHunter.color }}>
                  {selectedHunter.type}
                </span>
                {selectedHunter.type && Type[selectedHunter.type] && (
                  <img
                    src={Type[selectedHunter.type]}
                    alt={selectedHunter.type}
                    className="w-8 h-8"
                  />
                )}
              </div>
            </InfoCard>

            <InfoCard label="Rank">{selectedHunter.rank}</InfoCard>
            <InfoCard label="Gender">{selectedHunter.gender}</InfoCard>
            <InfoCard label="Age">{selectedHunter.age}</InfoCard>
            <InfoCard label="Release Date">
              {selectedHunter.releaseDate}
            </InfoCard>
            <InfoCard label="Country">
              {selectedHunter.affiliatedCountry}
            </InfoCard>
          </div>

          {/* Advancement Section */}
          <InfoCard label="Advancement">
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    onClick={() =>
                      setSelectedIndex((prev) => (prev === i ? i - 1 : i))
                    }
                    className={`w-6 h-6 cursor-pointer ${
                      selectedIndex >= i ? "text-yellow-400" : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <div className="text-gray-300 text-sm space-y-1">
                {advancement?.[selectedIndex]?.split("\n").map((line, idx) => (
                  <p key={idx}>
                    {line
                      .split(/(\[[^\]]+\]|\d+ ?second\(s\)?|[\d.]+%)/gi)
                      .map((part, i) => {
                        if (/^\d+ ?second\(s\)?$/i.test(part)) {
                          return (
                            <span
                              key={i}
                              className="text-rose-600 font-semibold"
                            >
                              {part}
                            </span>
                          );
                        } else if (/^[\d.]+%$/.test(part)) {
                          return (
                            <span
                              key={i}
                              className="text-blue-400 font-semibold"
                            >
                              {part}
                            </span>
                          );
                        } else if (/^\[[^\]]+\]$/.test(part)) {
                          return (
                            <span
                              key={i}
                              style={{ color: selectedHunter.color }}
                              className="font-semibold"
                            >
                              {part}
                            </span>
                          );
                        } else {
                          return <span key={i}>{part}</span>;
                        }
                      })}
                  </p>
                ))}
              </div>
            </div>
          </InfoCard>

          {/* Skills */}
          {skills?.map((category) => (
            <div key={category.category}>
              {category.skills.map((skill, index) => (
                <InfoCard key={index} label={category.category.toUpperCase()}>
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="flex flex-col items-center gap-2">
                      {/* ✅ FIXED MAIN IMAGE */}
                      {skill.skillImg ? (
                        <img
                          src={skill.skillImg}
                          alt={skill.skillName}
                          className="w-20 h-20 object-contain border border-gray-600 rounded"
                        />
                      ) : null}

                      {/* ✅ FIXED EXTRA IMAGES */}
                      {Array.isArray(skill.skillImg2) &&
                        skill.skillImg2.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {skill.skillImg2.map((imgUrl, i) =>
                              imgUrl ? (
                                <img
                                  key={i}
                                  src={imgUrl}
                                  alt={`Skill extra ${i + 1}`}
                                  className="w-12 h-12 object-contain border border-gray-500 rounded"
                                />
                              ) : null,
                            )}
                          </div>
                        )}
                    </div>

                    <div className="text-sm text-gray-300 space-y-1">
                      <div className="text-base font-semibold">
                        {skill.skillName}
                      </div>

                      {skill.description.split("\n").map((line, idx) => (
                        <p key={idx}>
                          {line
                            .split(
                              /(\[[^\]]+\]|\d+ ?second\(s\)?|[\d.,]+(?:–|-) *[\d.,]+%|[\d.]+%)/gi,
                            )
                            .map((part, i) => {
                              if (/^[\d.,]+(?:–|-) *[\d.,]+%$/.test(part)) {
                                return (
                                  <span
                                    key={i}
                                    className="text-blue-400 font-semibold"
                                  >
                                    {part}
                                  </span>
                                );
                              } else if (/^[\d.]+%$/.test(part)) {
                                return (
                                  <span
                                    key={i}
                                    className="text-blue-400 font-semibold"
                                  >
                                    {part}
                                  </span>
                                );
                              } else if (/^\d+ ?second\(s\)?$/.test(part)) {
                                return (
                                  <span
                                    key={i}
                                    className="text-rose-600 font-semibold"
                                  >
                                    {part}
                                  </span>
                                );
                              } else if (/^\[[^\]]+\]$/.test(part)) {
                                return (
                                  <span
                                    key={i}
                                    className="font-semibold"
                                    style={{ color: selectedHunter.color }}
                                  >
                                    {part}
                                  </span>
                                );
                              } else {
                                return <span key={i}>{part}</span>;
                              }
                            })}
                        </p>
                      ))}
                    </div>
                  </div>
                </InfoCard>
              ))}
            </div>
          ))}

          <InfoCard label="Recommended Artifacts">
            <Artifacts
              artifacts={artifacts}
              structure={selectedHunter.Artifacts}
            />{" "}
          </InfoCard>
          <InfoCard label="Recommended Cores">
            {" "}
            <Cores selectedHunter={selectedHunter} coresData={coresData} />{" "}
          </InfoCard>

          <InfoCard>
            {" "}
            <CommentsPage />
          </InfoCard>
        </div>
      </div>
    </motion.div>
  );
}

const InfoCard = ({ label, children }) => (
  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
    {label && <div className="text-blue-400 text-sm mb-2">{label}</div>}
    <div className="text-lg sm:text-xl font-semibold">{children}</div>
  </div>
);
