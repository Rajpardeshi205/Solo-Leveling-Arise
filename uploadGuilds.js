import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";

import { Guild } from "./src/Components/gameData/Guild.js";

const firebaseConfig = {
 apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadGuilds = async () => {
  try {

    for (const [name, img] of Object.entries(Guild)) {

      await setDoc(doc(db, "guilds", name), {
        name,
        img,
      });

      console.log(`✅ Uploaded ${name}`);
    }

    console.log("🔥 All guilds uploaded!");

  } catch (error) {
    console.error("❌ Error:", error);
  }
};

uploadGuilds();