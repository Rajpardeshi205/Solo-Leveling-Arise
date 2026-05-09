import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Elements = {
  Wind:
    "https://resources.vortexgaming.io/upload/post/2025/07/11/0420f2e8575347f8ab514e457233e97b.png",

  Fire:
    "https://resources.vortexgaming.io/upload/post/2025/07/11/91a61318395b406aa509cd62832a261b.png",

  Dark:
    "https://resources.vortexgaming.io/upload/post/2025/07/11/a832d2d8b62f42dd9da92c70d310c8aa.png",

  Light:
    "https://resources.vortexgaming.io/upload/post/2025/07/11/0c89df45214f421d9331f821bfaa0b5b.png",

  Water:
    "https://resources.vortexgaming.io/upload/post/2025/07/11/322af3a80e7c437f9c5ccda21375995f.png",
};

const uploadElements = async () => {
  try {
    for (const [name, img] of Object.entries(
      Elements,
    )) {
      await setDoc(doc(db, "elements", name), {
        img,
      });

      console.log(`✅ Uploaded ${name}`);
    }

    console.log("🔥 Elements uploaded!");
  } catch (error) {
    console.log("❌ Error:", error);
  }
};

uploadElements();