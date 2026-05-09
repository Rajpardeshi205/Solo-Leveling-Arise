import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { skillS } from "./src/Components/gameData/Skills.js"; // adjust path

const firebaseConfig = {
  apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔥 fix nested arrays (IMPORTANT)
const cleanData = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => {
      if (Array.isArray(item)) {
        return { value: cleanData(item) };
      }
      return cleanData(item);
    });
  }

  if (typeof data === "object" && data !== null) {
    const newObj = {};
    for (let key in data) {
      newObj[key] = cleanData(data[key]);
    }
    return newObj;
  }

  return data;
};

const uploadSkills = async () => {
  try {
    for (let id in skillS) {

      const cleaned = cleanData(skillS[id]);

      await setDoc(
        doc(db, "skills", id.toString()), 
        { data: cleaned } 
      );

      console.log(`✅ Uploaded skills for Hunter ${id}`);
    }

    console.log("🔥 All skills uploaded!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

uploadSkills();