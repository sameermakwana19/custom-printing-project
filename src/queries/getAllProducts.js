import { getDocs } from "firebase/firestore";

import { mugsColRef, productColRef, tshirtColRef } from "../firebase";

export const getAllMugsFromFirestore = async () => {
  const mugs = [];
  const querySnapshot = await getDocs(mugsColRef);
  console.log({ querySnapshot });
  querySnapshot.forEach((doc) => {
    mugs.push({ ...doc.data(), id: doc.id });
  });
  return mugs;
};

export const getAllTshirtsFromFirestore = async () => {
  const tshirts = [];
  const querySnapshot = await getDocs(tshirtColRef);
  querySnapshot.docs.forEach((doc) => {
    tshirts.push({ ...doc.data(), id: doc.id });
  });
  return tshirts;
};

export const getAllProductsFromFirestore = async () => {
  const products = [];
  const querySnapshot = await getDocs(productColRef);

  querySnapshot.docs.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });

  console.log({ products });
  return products;
};

// getAllTshirtsFromFirestore();

// getAllMugsFromFirestore();
// console.log({ mugs: await getAllMugsFromFirestore() });
// console.log({ tshirt: await getAllTshirtsFromFirestore() });
// console.log({ products: await getAllProductsFromFirestore() });
