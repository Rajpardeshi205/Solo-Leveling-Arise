// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // ADD THIS

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4Z7bko6I0-HPajhcjxRz97_GOCy_bc2Q",
  authDomain: "solo-leveling-arise-52341.firebaseapp.com",
  projectId: "solo-leveling-arise-52341",
  storageBucket: "solo-leveling-arise-52341.firebasestorage.app",
  messagingSenderId: "394006971660",
  appId: "1:394006971660:web:a5bb601514164677ec7529",
  measurementId: "G-ZH3E3MBR9Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // ADD THIS

export { fireDB, db, auth, storage }; // EXPORT STORAGE
