// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9a1nJij5ap3vNuMYasKdC1N_-bpRTR00",
  authDomain: "wander-wiz-33d12.firebaseapp.com",
  projectId: "wander-wiz-33d12",
  storageBucket: "wander-wiz-33d12.firebasestorage.app",
  messagingSenderId: "622245791858",
  appId: "1:622245791858:web:22c55a2fade3e48d545aeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
export const auth = getAuth(app)

// Firestore
export const db = getFirestore(app);