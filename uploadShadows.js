import { initializeApp } from "firebase/app";

import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";

import { ShadowArmy } from "./src/Components/gameData/Shadows.js";

const firebaseConfig = {
apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const fixNestedArrays = (obj) => {

  if (Array.isArray(obj)) {
    return obj.map(fixNestedArrays);
  }

  if (
    obj !== null &&
    typeof obj === "object"
  ) {

    const fixed = {};

    for (const key in obj) {
      fixed[key] = fixNestedArrays(obj[key]);
    }

    return fixed;
  }

  return obj;
};

const uploadShadows = async () => {

  try {

    const shadows = Object.values(
      ShadowArmy
    );

    for (const shadow of shadows) {

      const cleanShadow =
        fixNestedArrays(shadow);

      await setDoc(
        doc(
          db,
          "shadows",
          shadow.id.toString()
        ),
        cleanShadow
      );

      console.log(
        `✅ Uploaded ${shadow.name}`
      );
    }

    console.log(
      "🔥 All shadows uploaded!"
    );

  } catch (error) {

    console.error(
      "❌ Error:",
      error
    );
  }
};

uploadShadows();