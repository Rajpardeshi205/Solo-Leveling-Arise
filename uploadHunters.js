// uploadHunters.js

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { hunters } from "./src/Components/gameData/Hunters.js";
const firebaseConfig = {
  apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const removeNestedArrays = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => {
      if (Array.isArray(item)) {
        // 🔥 convert nested array → object
        return { value: removeNestedArrays(item) };
      }
      return removeNestedArrays(item);
    });
  }

  if (typeof data === "object" && data !== null) {
    const newObj = {};
    for (let key in data) {
      newObj[key] = removeNestedArrays(data[key]);
    }
    return newObj;
  }

  return data;
};

const uploadData = async () => {
  try {
   for (let hunter of hunters) {

  const cleanHunter = removeNestedArrays(hunter);

  await setDoc(
    doc(db, "hunters", hunter.id.toString()),
    cleanHunter
  );

  console.log(`✅ Uploaded hunter ${hunter.name}`);
}

    console.log("🔥 All hunters uploaded!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

uploadData();