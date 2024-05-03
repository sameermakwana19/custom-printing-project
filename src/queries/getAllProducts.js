import { getDocs, orderBy, where } from "firebase/firestore";

import {
  hottestDealsColRef,
  mugsColRef,
  productColRef,
  tshirtColRef,
} from "../firebase";
import { query } from "firebase/database";

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

export const getFilteredAndSortedProducts = async ({
  collection,
  filterValue,
  sortBy,
}) => {
  console.log({ collection, filterValue, sortBy });

  const collections = {
    mugs: mugsColRef,
    tshirts: tshirtColRef,
    allproducts: productColRef,
  };

  const queries = {
    default: query(
      collections[collection],
      where("price", "<=", filterValue),
      orderBy("rating", "desc")
    ),
    "price-asc": query(
      collections[collection],
      where("price", "<=", filterValue),
      orderBy("price")
    ),
    "price-desc": query(
      collections[collection],
      where("price", "<=", filterValue),
      orderBy("price", "desc")
    ),
  };

  console.log({ demo: collections[collection] });
  const products = [];
  const querySnapshot = await getDocs(query(queries[sortBy]));
  querySnapshot.docs.forEach((doc) => {
    products.push({ ...doc.data() });
  });

  console.log({ products });
  return products;
};
