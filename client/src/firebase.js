// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-blog-d676a.firebaseapp.com",
  projectId: "mern-blog-d676a",
  storageBucket: "mern-blog-d676a.appspot.com",
  messagingSenderId: "1087852665855",
  appId: "1:1087852665855:web:4b3715269d0d088c3a65ca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
