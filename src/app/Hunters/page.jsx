"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { unstable_ViewTransition as ViewTransition } from "react";
import HunterWeaponCard from "./HunterWeaponCard";
import { Cinzel_Decorative } from "next/font/google";
import SkeletonHunterPage from "./SkeletonHunterPage";
import Background from "@/Components/Background";
import { db } from "@/Firebase/FireBaseconfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import CarouselHunters from "./CarouselHunters";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700"],
});

export default function HunterPage() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const [hunters, setHunters] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [elements, setElements] = useState({});
  const [guilds, setGuilds] = useState({});
  const [types, setTypes] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypes = async () => {
      const snapshot = await getDocs(collection(db, "types"));
      const data = {};
      snapshot.forEach((d) => {
        data[d.data().name] = d.data().img;
      });
      setTypes(data);
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchGuilds = async () => {
      const snapshot = await getDocs(collection(db, "guilds"));
      const data = {};
      snapshot.forEach((d) => {
        data[d.data().name] = d.data().img;
      });
      setGuilds(data);
    };
    fetchGuilds();
  }, []);

  useEffect(() => {
    const fetchElements = async () => {
      const elementNames = ["Wind", "Fire", "Dark", "Light", "Water"];
      const data = {};
      for (const name of elementNames) {
        const snap = await getDoc(doc(db, "elements", name));
        if (snap.exists()) data[name] = snap.data().img;
      }
      setElements(data);
    };
    fetchElements();
  }, []);

  useEffect(() => {
    const fetchHunters = async () => {
      const snapshot = await getDocs(collection(db, "hunters"));
      setHunters(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchHunters();
  }, []);

  const sortedHunters = [...hunters].sort((a, b) => {
    const parseDate = (dateStr) => {
      if (!dateStr) return new Date(0);
      const parts = dateStr.split(" ");
      if (parts.length === 3) {
        const [day, month, year] = parts;
        return new Date(`${month} ${day}, ${year}`);
      }
      return new Date(dateStr);
    };
    return parseDate(b.releaseDate) - parseDate(a.releaseDate);
  });

  const selectedHunter = sortedHunters[selectedIndex];

  const centerCardByIndex = (index) => {
    const container = scrollRef.current;
    const card = cardRefs.current[index];
    if (container && card) {
      const leftOffset =
        card.offsetLeft -
        container.offsetLeft -
        container.clientWidth / 2 +
        card.offsetWidth / 2;
      container.scrollTo({ left: leftOffset, behavior: "smooth" });
    }
  };

  const selectHunter = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex(index);
    centerCardByIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const scrollByCards = (direction = "right") => {
    if (isTransitioning) return;
    const newIndex =
      direction === "right"
        ? (selectedIndex + 1) % hunters.length
        : (selectedIndex - 1 + hunters.length) % hunters.length;
    selectHunter(newIndex);
  };

  const handleScroll = () => {
    if (isTransitioning) return;
    const container = scrollRef.current;
    const center = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;
    cardRefs.current.forEach((card, index) => {
      if (card) {
        const cardCenter =
          card.offsetLeft + card.offsetWidth / 2 - container.offsetLeft;
        const distance = Math.abs(cardCenter - center);
        if (distance < minDistance) {
          closestIndex = index;
          minDistance = distance;
        }
      }
    });
    setSelectedIndex(closestIndex);
  };

  useEffect(() => {
    setTimeout(() => centerCardByIndex(0), 100);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollTimeout;
    const debouncedHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50);
    };
    container?.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      container?.removeEventListener("scroll", debouncedHandleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isTransitioning]);

  const goToDetails = () => {
    requestAnimationFrame(() => {
      if (typeof window !== "undefined" && ViewTransition?.start) {
        ViewTransition.start(() =>
          router.push(`/Hunters/HunterDetails/${selectedHunter.id}`),
        );
      } else {
        router.push(`/Hunters/HunterDetails/${selectedHunter.id}`);
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SkeletonHunterPage />;

  return (
    <Background className="fixed">
      {/*
        KEY FIX: h-[100dvh] uses dynamic viewport height (accounts for mobile browser chrome).
        flex-col with fixed carousel at bottom — hero fills the remaining space exactly.
        No overflow means no footer bleed, no black gap.
      */}
      <div className="h-[100dvh] lg:h-auto lg:pt-20 pt-16 flex flex-col overflow-hidden text-white">
        {/* ── Hero: fills all space between navbar and carousel ── */}
        <div className="flex-1 flex items-center justify-center relative px-4 md:px-8 min-h-0">
          {/* Hunter image — fills hero area naturally */}
          <div
            className="
            w-full mx-auto relative flex items-center justify-center h-full
            lg:aspect-square lg:max-w-xl lg:h-auto
          "
          >
            <motion.img
              layoutId={`hunter-img-${selectedHunter.id}`}
              src={selectedHunter.skin1[0]}
              alt={selectedHunter.name}
              className="
                max-h-full w-auto object-contain rounded-lg cursor-pointer
                drop-shadow-[0_0_15px_black] z-40
                lg:w-full lg:h-full
              "
              onClick={goToDetails}
            />
          </div>

          {/* RIGHT — rarity, element, type */}
          <div className="absolute top-4 right-4 text-right max-w-xs flex flex-col items-end space-y-1 lg:space-y-2">
            <h3
              className={`
                text-xl sm:text-2xl lg:text-3xl font-extrabold text-transparent
                tracking-tighter bg-clip-text drop-shadow-[0_0_5px_black]
                ${
                  selectedHunter.Rarity === "SSR"
                    ? "bg-gradient-to-b from-red-700 to-red-300"
                    : selectedHunter.Rarity === "SR"
                      ? "bg-gradient-to-b from-pink-600 to-pink-400"
                      : "bg-gradient-to-b from-blue-700 to-blue-300"
                }
              `}
            >
              {selectedHunter.Rarity}
            </h3>

            <motion.div
              key={`element-${selectedIndex}`}
              className="relative flex items-center group drop-shadow-[0_0_5px_black]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {selectedHunter?.element &&
                elements?.[selectedHunter.element] && (
                  <>
                    <img
                      src={elements[selectedHunter.element]}
                      alt={selectedHunter.element}
                      className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                    />
                    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      {selectedHunter.element}
                    </div>
                  </>
                )}
            </motion.div>

            <motion.div
              key={`type-${selectedIndex}`}
              className="relative flex items-center group drop-shadow-[0_0_5px_black]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {selectedHunter.type && types[selectedHunter.type] && (
                <>
                  <img
                    src={types[selectedHunter.type] || "/placeholder.png"}
                    alt={selectedHunter.type}
                    className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                  />
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    {selectedHunter.type}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* LEFT — name + guild */}
          <div className="absolute top-5 left-2 sm:left-6 space-y-1 lg:space-y-2 max-w-[42vw] lg:max-w-xs">
            <motion.div
              key={`name-${selectedIndex}`}
              className={`font-extrabold tracking-wider relative ${cinzel.className} leading-tight break-words
                text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl`}
              style={{
                color: selectedHunter.color,
                minHeight: "2rem",
                lineHeight: "1.2",
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedHunter.name}
            </motion.div>

            <motion.div
              key={`guild-${selectedIndex}`}
              className="relative flex items-center group drop-shadow-[0_0_15px_black]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {selectedHunter.guild && guilds[selectedHunter.guild] && (
                <>
                  <img
                    src={guilds[selectedHunter.guild]}
                    alt={selectedHunter.guild}
                    className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 z-10"
                  />
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    {selectedHunter.guild}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Weapon card — absolute inside hero on mobile, original position on lg+ */}
          <div
            className="
            absolute bottom-2 left-1/2 -translate-x-1/2 w-[92vw] max-w-[360px] z-50
            lg:left-auto lg:right-4 lg:bottom-44 lg:translate-x-0 lg:w-full lg:max-w-[400px]
            xl:bottom-20 2xl:bottom-10
          "
          >
            <HunterWeaponCard
              weaponName={selectedHunter.weaponName}
              weaponImg={selectedHunter.weaponImg}
              rarity={selectedHunter.Rarity}
              element={selectedHunter.element}
              selectedHunter={selectedHunter}
            />
          </div>
        </div>

        {/* ── Carousel — always pinned at bottom ── */}
        <div className="shrink-0">
          <CarouselHunters
            hunters={sortedHunters}
            selectedIndex={selectedIndex}
            selectHunter={selectHunter}
            scrollByCards={scrollByCards}
            isTransitioning={isTransitioning}
            scrollRef={scrollRef}
            cardRefs={cardRefs}
            getTypeGradient={(type) => {
              if (type === "Assassin") return "from-red-500 to-red-800";
              if (type === "Mage") return "from-blue-500 to-blue-800";
              if (type === "Tank") return "from-yellow-500 to-yellow-800";
              return "from-gray-500 to-gray-800";
            }}
          />
        </div>
      </div>
    </Background>
  );
}
