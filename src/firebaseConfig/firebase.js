// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzuTYeEfDzX5PDq8ZVExZkiijD7MpbrvU",
  authDomain: "ecommerceboss-f6e9b.firebaseapp.com",
  projectId: "ecommerceboss-f6e9b",
  storageBucket: "ecommerceboss-f6e9b.appspot.com",
  messagingSenderId: "51159297550",
  appId: "1:51159297550:web:6815e8160525f587eb965f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
