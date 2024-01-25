// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log(10);
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "work-atlas-4b8ae.firebaseapp.com",
  projectId: "work-atlas-4b8ae",
  storageBucket: "work-atlas-4b8ae.appspot.com",
  messagingSenderId: "784094769426",
  appId: "1:784094769426:web:8cff04f06fcdd429c0c3cb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);