import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { cartColRef } from "../firebase";
import { update } from "firebase/database";
import { useContext } from "react";
import { TotalAmountContext } from "../context/TotalAmount/TotalAmountProvider";

export const updateQuantityInCartInFirestore = async ({ id, quantity }) => {
  const querySnapshot = await getDocs(cartColRef);

  // console.log({ id, quantity });

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      if (doc.data().id === id) {
        await updateDoc(doc.ref, {
          quantity,
        });
        // console.log("updated");
      }
    })
  );
};

export const getCartTotalAndNoOfItems = async () => {
  const querySnapshot = await getDocs(cartColRef);

  const total = querySnapshot.docs.reduce(
    (acc, doc) => acc + doc.data().price * doc.data().quantity,
    0
  );

  const noOfItems = querySnapshot.docs.reduce(
    (acc, doc) => acc + doc.data().quantity,
    0
  );

  return { noOfItems, total };
};

// getCartTotalAndNoOfItems();

export const getAllCartProductsFromFirestore = async () => {
  const cartProducts = [];

  const querySnapshot = await getDocs(cartColRef);
  querySnapshot.docs.forEach((doc) => {
    cartProducts.push({ ...doc.data() });
  });

  return cartProducts;
};

export const isPresentInCartInFirestore = async (id) => {
  const querySnapshot = await getDocs(cartColRef);
  return querySnapshot.docs.some((doc) => doc.data().id === id);
};

export const deleteProductFromCartInFirestore = async (id) => {
  const querySnapshot = await getDocs(cartColRef);
  // querySnapshot.forEach(async (doc) => {
  //   if (doc.data().id === id) {
  //     console.log("doc.id", doc.id);
  //     return deleteDoc(doc.ref);
  //   }
  // });

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      if (doc.data().id === id) {
        await deleteDoc(doc.ref);
      }
    })
  );
};

export const increaseQuantityInCartInFirestore = async (id) => {
  const querySnapshot = await getDocs(cartColRef);

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      if (doc.data().id === id) {
        await update(doc.ref, {
          quantity: doc.data().quantity + 1,
        });
      }
    })
  );
};

export const addProductToCartInFirestore = async (product) => {
  console.log("product", product);

  const querySnapshot = await getDocs(cartColRef);

  const isProductAlreadyInCart = querySnapshot.docs.some(
    (doc) => doc.data().productId === product.productId
  );
  // console.log({ isProductAlreadyInCart });

  if (isProductAlreadyInCart) {
    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        if (doc.data().productId === product.productId) {
          await updateDoc(doc.ref, {
            quantity: doc.data().quantity + 1,
          });
        }
      })
    );
    return;
  }

  const response = await addDoc(cartColRef, product);
  return response;
};
