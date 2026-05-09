import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { advancementData } from "./src/Components/gameData/advancement.js"; // adjust path

const firebaseConfig = {
  apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadAdvancement = async () => {
  try {
    for (let id in advancementData) {
      await setDoc(
        doc(db, "advancements", id.toString()),
        {
          data: advancementData[id], // array of strings
        }
      );

      console.log(`✅ Uploaded advancement for Hunter ${id}`);
    }

    console.log("🔥 All advancements uploaded!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

uploadAdvancement();