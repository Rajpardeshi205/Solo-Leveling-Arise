import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { cores } from "./src/Components/gameData/cores.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadCores = async () => {
  try {
    for (let category in cores) {
      await setDoc(
        doc(db, "cores", category), // Mind, Body, Spirit
        {
          items: cores[category],
        }
      );

      console.log(`✅ Uploaded: ${category}`);
    }

    console.log("🔥 All cores uploaded!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

uploadCores();