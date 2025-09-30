import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword as firebaseSignIn } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2yO0M98shlCWl30RIm9Nh3KR_j_A8Stw",
  authDomain: "jubasef-store.firebaseapp.com",
  projectId: "jubasef-store",
  storageBucket: "jubasef-store.firebasestorage.app",
  messagingSenderId: "834567651219",
  appId: "1:834567651219:web:eb536901e85a35d75d7266",
  measurementId: "G-5G1SVC0L8Z",
};

// Initialize Firebase
//
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



