import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebase";

import { addDoc, collection, getFirestore } from "firebase/firestore";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const mugsColRef = collection(db, "mugs");
export const tshirtColRef = collection(db, "tshirts");
export const productColRef = collection(db, "products");
