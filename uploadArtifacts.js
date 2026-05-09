import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { artifacts } from "./src/Components/gameData/artifacts.js";

const firebaseConfig = {
apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadArtifacts = async () => {
  try {
    for (let artifact of artifacts) {
      await setDoc(
        doc(db, "artifacts", artifact.name), // ✅ name as ID
        artifact
      );

      console.log(`✅ Uploaded: ${artifact.name}`);
    }

    console.log("🔥 All artifacts uploaded!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

uploadArtifacts();