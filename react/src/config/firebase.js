// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm93B2gm0Hfz1MYQVGf22vDXrI64VXLnw",
  authDomain: "cours-fb-karl.firebaseapp.com",
  projectId: "cours-fb-karl",
  storageBucket: "cours-fb-karl.firebasestorage.app",
  messagingSenderId: "657182710909",
  appId: "1:657182710909:web:1b98b0082486c3b2baa514",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
