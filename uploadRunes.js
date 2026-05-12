// uploadRunes.js

import { initializeApp } from "firebase/app";

import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";

import { Runes } from "./src/Components/gameData/Runes.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const uploadRunes = async () => {

  try {

    for (const [id, runeData] of Object.entries(Runes)) {

      await setDoc(
        doc(db, "runes", id),
        {
          id,
          data: runeData,
        }
      );

      console.log(
        `✅ Uploaded Rune ${id}`
      );
    }

    console.log(
      "🔥 All runes uploaded!"
    );

  } catch (error) {

    console.error(
      "❌ Error:",
      error
    );
  }
};

uploadRunes();