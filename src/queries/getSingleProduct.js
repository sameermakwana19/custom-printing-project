import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const getSingleProductFromFirestore = async ({ category, id }) => {
  // const docRef = doc(db, "mugs", (name = "Cute Animal Mug"));

  const appliedCategory = category === "t-shirts" ? "tshirts" : category;

  console.log({ appliedCategory, id, category });

  const q = query(collection(db, appliedCategory), where("id", "==", id));

  const docSnap = await getDocs(q);
  const product = { ...docSnap.docs[0].data() };
  console.log({ product });

  return product;
};
