import { addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { cartColRef } from "../firebase";

export const getAllCartProductsFromFirestore = async () => {
  const cartProducts = [];

  const querySnapshot = await getDocs(cartColRef);
  console.log(querySnapshot.docs);
  querySnapshot.docs.forEach((doc) => {
    cartProducts.push({ ...doc.data() });
  });
  console.log({ cartProducts });

  return cartProducts;
};

export const deleteProductFromCartInFirestore = async (id) => {
  const querySnapshot = await getDocs(cartColRef);
  querySnapshot.forEach(async (doc) => {
    if (doc.data().id === id) {
      console.log("doc.id", doc.id);
      return deleteDoc(doc.ref);
    }
  });

  // console.log(id);
  // const docRef = doc(cartColRef, id);
  // console.log({ docRef });

  // const response = await deleteDoc(docRef);

  // console.log({ response });

  // return response;
};

export const setProductToCartInFirestore = async (product) => {
  console.log("product", product);

  const response = await addDoc(cartColRef, product);
  return response;
};
