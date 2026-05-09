import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function CarouselHunters({
  hunters,
  selectedIndex,
  selectHunter,
  scrollByCards,
  isTransitioning,
  scrollRef,
  cardRefs,
  getTypeGradient,
}) {
  if (!hunters || !hunters.length) return null; // ✅ safety fix

  return (
    <div className="fixed  bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 z-50">
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scrollByCards("left")}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-full z-10 transition-all"
        >
          <ArrowLeft className="text-white w-6 h-6" />
        </button>

        {/* Scroll List */}
        <div
          ref={scrollRef}
          className="flex  items-center px-16 py-6 space-x-6 overflow-x-auto scroll-smooth scrollbar-hide "
          style={{ scrollBehavior: "smooth" }}
        >
          {hunters.map((hunter, index) => (
            <motion.div
              key={hunter.id} // ✅ stable key
              ref={(el) => (cardRefs.current[index] = el)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => selectHunter(index)}
              className={`flex-shrink-0 h-40 rounded-xl overflow-hidden cursor-pointer border-2 ${
                index === selectedIndex
                  ? `border-cyan-400 shadow-lg shadow-cyan-400/50`
                  : "border-gray-600 opacity-70"
              } transition-all duration-300`}
            >
              <div
                className={`w-25 h-40 relative ${
                  index === selectedIndex
                    ? `bg-gradient-to-br ${getTypeGradient(hunter.type)}`
                    : ""
                }`}
              >
                <img
                  src={
                    hunter.cardImage?.startsWith("http")
                      ? hunter.cardImage
                      : hunter.img1?.startsWith("http")
                        ? hunter.img1
                        : hunter.img2?.startsWith("http")
                          ? hunter.img2
                          : "/placeholder.png"
                  }
                  alt={hunter.name}
                  className={`w-25 h-40 object-cover ${
                    index === selectedIndex ? "mix-blend-overlay" : ""
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollByCards("right")}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-full z-10 transition-all"
        >
          <ArrowLeft className="rotate-180 text-white w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
