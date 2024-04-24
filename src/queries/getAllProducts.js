import { getDocs } from "firebase/firestore";

import {
  hottestDealsColRef,
  mugsColRef,
  productColRef,
  tshirtColRef,
} from "../firebase";

export const getAllMugsFromFirestore = async () => {
  const mugs = [];
  const querySnapshot = await getDocs(mugsColRef);
  querySnapshot.forEach((doc) => {
    mugs.push({ ...doc.data() });
  });
  return mugs;
};

export const getAllTshirtsFromFirestore = async () => {
  const tshirts = [];
  const querySnapshot = await getDocs(tshirtColRef);
  querySnapshot.docs.forEach((doc) => {
    tshirts.push({ ...doc.data() });
  });
  return tshirts;
};

export const getAllProductsFromFirestore = async () => {
  const products = [];
  const querySnapshot = await getDocs(productColRef);

  querySnapshot.docs.forEach((doc) => {
    products.push({ ...doc.data() });
  });

  return products;
};

export const getAllHottestDealsFromFirestore = async () => {
  const hottestDeals = [];
  const querySnapshot = await getDocs(hottestDealsColRef);
  querySnapshot.forEach((doc) => {
    hottestDeals.push({ ...doc.data() });
  });
  return hottestDeals;
};
