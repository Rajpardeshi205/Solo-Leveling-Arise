"use client";

import Blessings from "./Blessings";
import JinwooSkins from "./JinwooSkins";
import Runes from "./Runes";
import Weapons from "./Weapons";

export default function Page() {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <JinwooSkins />
      <Runes />
      <Blessings />
      <Weapons />
    </div>
  );
}
