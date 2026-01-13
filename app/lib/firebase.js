import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDk5GGv7hVuQc5OY6lLwa0N4itsIOGsl7I",
  authDomain: "ritu-38a3a.firebaseapp.com",
  projectId: "ritu-38a3a",
  storageBucket: "ritu-38a3a.firebasestorage.app",
  messagingSenderId: "32856784090",
  appId: "1:32856784090:web:d135747c590d93576f79e3",
  measurementId: "G-BYLR2EQRLN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);