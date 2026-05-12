// uploadSkins.js

import { initializeApp } from "firebase/app";

import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";

import { skins } from "./src/Components/gameData/skins.js";

const firebaseConfig = {
   apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const uploadSkins = async () => {

  try {

    for (const [name, img] of Object.entries(skins)) {

      await setDoc(
        doc(db, "skins", name),
        {
          name,
          img,
        }
      );

      console.log(
        `✅ Uploaded ${name}`
      );
    }

    console.log(
      "🔥 All skins uploaded!"
    );

  } catch (error) {

    console.error(
      "❌ Error:",
      error
    );
  }
};

uploadSkins();