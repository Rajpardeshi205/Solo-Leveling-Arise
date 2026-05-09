"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { collection, getDocs } from "firebase/firestore";

import { db } from "@/Firebase/FireBaseconfig";

export default function Shadows() {
  const router = useRouter();

  const [shadowsArray, setShadowsArray] = useState([]);

  useEffect(() => {
    const fetchShadows = async () => {
      const snapshot = await getDocs(collection(db, "shadows"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setShadowsArray(data);
    };

    fetchShadows();
  }, []);

  const goToDetails = (shadow) => {
    requestAnimationFrame(() => {
      if (typeof document !== "undefined" && document.startViewTransition) {
        document.startViewTransition(() => {
          router.push(`/Shadows/ShadowDetails/${shadow.id}`);
        });
      } else {
        router.push(`/Shadows/ShadowDetails/${shadow.id}`);
      }
    });
  };

  return (
    <div className="relative pt-16 sm:pt-20 md:pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 flex items-center justify-center overflow-hidden pb-8">
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent"></div>

      {/* Title */}
      <div className="absolute top-20 sm:top-24 md:top-28 lg:top-30 left-1/2 -translate-x-1/2 text-center z-40 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-2xl mb-2 sm:mb-3 md:mb-4">
          Shadow Army
        </h1>

        <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"></div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block absolute bottom-24 left-1/2 -translate-x-1/2 flex-col items-center justify-center group">
        {/* Back row */}
        <div className="absolute bottom-32 flex items-end justify-between gap-1">
          {shadowsArray.slice(0, 7).map((shadow, index) => (
            <div
              key={shadow.id}
              onClick={() => goToDetails(shadow)}
              className="cursor-pointer  group-hover:opacity-30 hover:!opacity-100 relative transition-all duration-700 ease-out hover:scale-110"
              style={{
                transform: `translateY(${-index * 15}px)`,
                zIndex: 10 + index,
              }}
            >
              <img
                src={shadow.img || "/placeholder.png"}
                alt={shadow.name}
                className="w-52 h-96 object-cover rounded-lg shadow-2xl transition-all duration-500 group-hover:shadow-purple-500/60 group-hover:brightness-125"
              />

              <p className="text-white group-hover:brightness-200 text-2xl font-bold absolute bottom-0 left-1/2 -translate-x-1/2">
                {shadow.name}
              </p>

              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent rounded-lg"></div>
            </div>
          ))}
        </div>

        {/* Front row */}
        <div className="flex items-end justify-between gap-1">
          {shadowsArray.slice(7, 14).map((shadow, index) => (
            <div
              key={shadow.id}
              onClick={() => goToDetails(shadow)}
              className="cursor-pointer group-hover:opacity-30 hover:!opacity-100 relative transition-all duration-700 ease-out hover:scale-110"
              style={{
                transform: `translateY(${-index * 10}px)`,
                zIndex: 20 + index,
              }}
            >
              <img
                src={shadow.img || "/placeholder.png"}
                alt={shadow.name}
                className="w-52 h-96 object-cover rounded-lg shadow-2xl transition-all duration-500 group-hover:shadow-purple-500/80 group-hover:brightness-125"
              />

              <p className="text-white group-hover:brightness-200 text-2xl font-bold absolute bottom-0 left-1/2 -translate-x-1/2">
                {shadow.name}
              </p>

              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent rounded-lg"></div>

              <div className="absolute inset-0 ring-1 ring-purple-400/20 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet */}
      <div className="hidden md:grid lg:hidden grid-cols-3 gap-4 px-6 mt-16 w-full max-w-5xl">
        {shadowsArray.map((shadow) => (
          <div
            key={shadow.id}
            onClick={() => goToDetails(shadow)}
            className="relative cursor-pointer w-full group"
          >
            <img
              src={shadow.img || "/placeholder.png"}
              alt={shadow.name}
              className="w-full h-56 object-cover rounded-lg shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 group-hover:shadow-purple-500/50"
            />

            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-base font-bold drop-shadow-lg">
              {shadow.name}
            </p>

            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent rounded-lg"></div>

            <div className="absolute inset-0 ring-1 ring-purple-400/20 rounded-lg"></div>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden grid grid-cols-2 gap-3 sm:gap-4 px-3 sm:px-4 mt-16 sm:mt-20 w-full">
        {shadowsArray.map((shadow) => (
          <div
            key={shadow.id}
            onClick={() => goToDetails(shadow)}
            className="relative cursor-pointer w-full"
          >
            <img
              src={shadow.img || "/placeholder.png"}
              alt={shadow.name}
              className="w-full h-40 sm:h-48 object-cover rounded-lg shadow-md transition-all duration-500 active:scale-95 hover:brightness-110"
            />

            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-xs sm:text-sm font-bold drop-shadow-lg whitespace-nowrap">
              {shadow.name}
            </p>

            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent rounded-lg"></div>
          </div>
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-300 rounded-full animate-pulse"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
              animationDelay: `${i % 3}s`,
              animationDuration: `${2 + (i % 2)}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
