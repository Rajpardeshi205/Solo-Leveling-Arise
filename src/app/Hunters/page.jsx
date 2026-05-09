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

  useEffect(() => {
    const fetchTypes = async () => {
      const snapshot = await getDocs(collection(db, "types"));

      const data = {};

      snapshot.forEach((docItem) => {
        const typeData = docItem.data();

        data[typeData.name] = typeData.img;
      });

      setTypes(data);
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchGuilds = async () => {
      const snapshot = await getDocs(collection(db, "guilds"));

      const data = {};

      snapshot.forEach((docItem) => {
        const guildData = docItem.data();

        data[guildData.name] = guildData.img;
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
        const docRef = doc(db, "elements", name);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          data[name] = docSnap.data().img;
        }
      }

      setElements(data);
    };

    fetchElements();
  }, []);

  useEffect(() => {
    const fetchHunters = async () => {
      const snapshot = await getDocs(collection(db, "hunters"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHunters(data);
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
        ViewTransition.start(() => {
          router.push(`/Hunters/HunterDetails/${selectedHunter.id}`);
        });
      } else {
        router.push(`/Hunters/HunterDetails/${selectedHunter.id}`);
      }
    });
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SkeletonHunterPage />;
  return (
    <Background>
      {" "}
      <div className="h-auto pt-20 overflow-hidden  text-white flex flex-col">
        <div className="flex-1 flex items-center justify-center relative px-4 md:px-8">
          <div className="w-full max-w-xl mx-auto relative aspect-square sm:aspect-[16/14] md:aspect-[4/4] flex items-center justify-center sm:w-full sm:max-w-xl">
            <motion.img
              layoutId={`hunter-img-${selectedHunter.id}`}
              src={selectedHunter.skin1[0]}
              alt={selectedHunter.name}
              className="w-full h-full z-40 object-contain rounded-lg cursor-pointer bg-clip-text drop-shadow-[0_0_15px_black] "
              onClick={goToDetails}
            />
          </div>

          <div className="absolute top-4 right-4 text-right max-w-xs flex flex-col items-end space-y-2">
            <h3
              className={`text-3xl font-extrabold text-transparent tracking-tighter bg-clip-text drop-shadow-[0_0_5px_black]  ${
                selectedHunter.Rarity === "SSR"
                  ? "bg-gradient-to-b from-red-700 to-red-300"
                  : selectedHunter.Rarity === "SR"
                    ? "bg-gradient-to-b from-pink-600 to-pink-400"
                    : "bg-gradient-to-b from-blue-700 to-blue-300"
              }`}
            >
              {selectedHunter.Rarity}
            </h3>

            <motion.div
              key={`element-${selectedIndex}`}
              className="relative flex items-center group bg-clip-text drop-shadow-[0_0_5px_black] "
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
                      className="w-10 h-10"
                    />
                    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      {selectedHunter.element}
                    </div>
                  </>
                )}
            </motion.div>

            <motion.div
              key={`type-${selectedIndex}`}
              className="relative flex items-center group bg-clip-text drop-shadow-[0_0_5px_black] "
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {selectedHunter.type && types[selectedHunter.type] && (
                <>
                  <img
                    src={types[selectedHunter.type] || "/placeholder.png"}
                    alt={selectedHunter.type}
                    className="w-10 h-10"
                  />
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    {selectedHunter.type}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          <div className="absolute top-5 left-2 sm:left-6 space-y-2 max-w-xs">
            {/* NAME */}
            <motion.div
              key={`name-${selectedIndex}`}
              className={`text-3xl sm:text-4xl font-extrabold tracking-wider relative ${cinzel.className} leading-tight break-words`}
              style={{
                color: selectedHunter.color,
                maxWidth: "16rem", // roughly max-w-xs
                minHeight: "3.5rem", // height to hold 2 lines
                lineHeight: "1.2",
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedHunter.name}
            </motion.div>

            {/* GUILD ICON */}
            <motion.div
              key={`type-${selectedIndex}`}
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
                    className="w-32 h-32 sm:w-40 sm:h-40 z-10"
                  />
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    {selectedHunter.guild}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>

        <div className="absolute z-50 w-full max-w-[400px] right-4 bottom-44 sm:bottom-20 lg:bottom-50">
          <HunterWeaponCard
            weaponName={selectedHunter.weaponName}
            weaponImg={selectedHunter.weaponImg}
            rarity={selectedHunter.Rarity}
            element={selectedHunter.element}
            selectedHunter={selectedHunter}
          />
        </div>
        <CarouselHunters
          hunters={sortedHunters} // ✅ IMPORTANT
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
    </Background>
  );
}
