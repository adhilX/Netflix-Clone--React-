import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCupTKDt5BG_x3Bdq4kNHNSBC3Mm9swfuo",
  authDomain: "netfix-clone-f0125.firebaseapp.com",
  projectId: "netfix-clone-f0125",
  storageBucket: "netfix-clone-f0125.firebasestorage.app",
  messagingSenderId: "381077840483",
  appId: "1:381077840483:web:67a7cdff6e9ee924a64e56"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const db = getFirestore(app)

export {auth , db}