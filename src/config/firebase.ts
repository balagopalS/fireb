// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5Hm_3uGWIZXh8j6hf7ZAVWRk9Dgkf3eg",
  authDomain: "trialsocialmedia-86b10.firebaseapp.com",
  projectId: "trialsocialmedia-86b10",
  storageBucket: "trialsocialmedia-86b10.appspot.com",
  messagingSenderId: "565454158449",
  appId: "1:565454158449:web:daaf56252bc9c5f81db9d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
