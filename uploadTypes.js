// uploadTypes.js

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";

import { Type } from "./src/Components/gameData/Type.js";

const firebaseConfig = {
apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadTypes = async () => {
  try {

    for (const [name, img] of Object.entries(Type)) {

      await setDoc(doc(db, "types", name), {
        name: name.replace(/_/g, " "),
        img,
      });

      console.log(`✅ Uploaded ${name}`);
    }

    console.log("🔥 All types uploaded!");

  } catch (error) {
    console.error("❌ Error:", error);
  }
};

uploadTypes();