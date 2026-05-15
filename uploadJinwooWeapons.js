// uploadJinwooWeapons.js

import { initializeApp } from "firebase/app";

import { getFirestore, doc, setDoc } from "firebase/firestore";

import { JinwooWeapons } from "./src/Components/gameData/JinwooWeapons.js";

const firebaseConfig = {
   apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const uploadWeapons = async () => {
  try {
    for (const [id, weapon] of Object.entries(JinwooWeapons)) {
      await setDoc(doc(db, "jinwooWeapons", id.toString()), weapon);

      console.log(`✅ Uploaded Weapon ${weapon.name}`);
    }

    console.log("🔥 All Jinwoo Weapons uploaded!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

uploadWeapons();