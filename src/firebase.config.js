// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8OoaA8EEg5qXxwi5NalfnkQviqtCx72E",
  authDomain: "house-marketplace-app-77d74.firebaseapp.com",
  projectId: "house-marketplace-app-77d74",
  storageBucket: "house-marketplace-app-77d74.appspot.com",
  messagingSenderId: "792725780743",
  appId: "1:792725780743:web:65bc802a94d26c8bd8ada2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()