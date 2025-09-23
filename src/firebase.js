// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPVy5yb8g-mDOQvTrrHlaXjnx7G1BRdl0",
  authDomain: "finance-tracker-93d53.firebaseapp.com",
  projectId: "finance-tracker-93d53",
  storageBucket: "finance-tracker-93d53.firebasestorage.app",
  messagingSenderId: "916170105392",
  appId: "1:916170105392:web:520f4b479ecadc794503f5",
  measurementId: "G-EENLEN866Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth & firestore so we can use them
export const auth = getAuth(app);
export const db = getFirestore(app);
