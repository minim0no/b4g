// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

console.log(process.env.REACT_APP_FIREBASE_API_KEY);

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "hackathon-6de94.firebaseapp.com",
    projectId: "hackathon-6de94",
    storageBucket: "hackathon-6de94.firebasestorage.app",
    messagingSenderId: "735960549353",
    appId: "1:735960549353:web:e825215f5b72ecc84b6d78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
