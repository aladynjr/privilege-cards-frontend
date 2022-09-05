// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMgcUhawAo0hT5OLp5fOCMCYNXU-NEN_E",
  authDomain: "privilegecards-8b43d.firebaseapp.com",
  projectId: "privilegecards-8b43d",
  storageBucket: "privilegecards-8b43d.appspot.com",
  messagingSenderId: "1023963779605",
  appId: "1:1023963779605:web:de760224baed5e1328b41c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);