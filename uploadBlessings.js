import { initializeApp } from "firebase/app";

import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";

import { Blessings } from "./src/Components/gameData/Blessings.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const uploadBlessings = async () => {
  try {
    for (const key in Blessings) {
      const blessingData = Blessings[key]?.[0];

      if (!blessingData) continue;

      await setDoc(
        doc(db, "blessings", key.toString()),
        {
          id: key,
          ...blessingData,
        },
      );

      console.log(
        `✅ Uploaded Blessing ${key}: ${blessingData.Blessing}`,
      );
    }

    console.log("🔥 All Blessings Uploaded!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

uploadBlessings();