import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB1wsMpzzedQ4bQJ7ucSMW2bGQo4qB-4N0",
  authDomain: "provokedevelopers.firebaseapp.com",
  projectId: "provokedevelopers",
  storageBucket: "provokedevelopers.appspot.com",
  messagingSenderId: "31067907633",
  appId: "1:31067907633:web:f579de9d962f8e1488d710",
  measurementId: "G-D8SZJHXK2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore=getFirestore();
