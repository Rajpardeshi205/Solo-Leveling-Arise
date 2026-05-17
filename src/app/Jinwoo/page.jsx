"use client";

import Blessings from "./Blessings";
import JinwooSkins from "./JinwooSkins";
import Runes from "./Runes";
import Weapons from "./Weapons";

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-black">
      {/* SKINS */}
      <section className="min-h-screen">
        <JinwooSkins />
      </section>

      {/* RUNES */}
      <section className="relative z-20">
        <Runes />
      </section>

      {/* BLESSINGS */}
      <section className="relative z-20">
        <Blessings />
      </section>

      {/* WEAPONS */}
      <section className="relative z-20">
        <Weapons />
      </section>
    </div>
  );
}
