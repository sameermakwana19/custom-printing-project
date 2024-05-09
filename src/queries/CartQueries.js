import {
  addDoc,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { cartColRef } from "../firebase";

export const updateQuantityInCartInFirestore = async ({
  id,
  quantity,
  uid,
}) => {
  // const querySnapshot = await getDocs(cartColRef);

  const querySnapshot = await getDocs(
    query(cartColRef, where("uid", "==", uid))
  );

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      if (doc.data().id === id) {
        await updateDoc(doc.ref, {
          quantity,
        });
      }
    })
  );
};

export const getCartTotalAndNoOfItems = async (uid) => {
  // const querySnapshot = await getDocs(cartColRef);
  const querySnapshot = await getDocs(
    query(cartColRef, where("uid", "==", uid))
  );

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

export const getAllCartProductsFromFirestore = async (uid) => {
  const cartProducts = [];

  // const querySnapshot = await getDocs(cartColRef);

  const querySnapshot = await getDocs(
    query(cartColRef, where("uid", "==", uid))
  );

  querySnapshot.docs.forEach((doc) => {
    cartProducts.push({ ...doc.data() });
  });
  return cartProducts;
};

export const isPresentInCartInFirestore = async ({ id, uid }) => {
  // const querySnapshot = await getDocs(cartColRef);
  const querySnapshot = await getDocs(
    query(cartColRef, where("uid", "==", uid))
  );

  let test = querySnapshot.docs.some((doc) => doc.data().productId === id);
  return test;
};
export const quantityPresentInCartInFirestore = async ({ id, uid }) => {
  // const querySnapshot = await getDocs(cartColRef);

  const querySnapshot = await getDocs(
    query(cartColRef, where("uid", "==", uid))
  );

  const product = querySnapshot.docs.find((doc) => doc.data().productId === id);
  return product?.data()?.quantity || null;
};

export const deleteProductFromCartInFirestore = async ({ id, uid }) => {
  const querySnapshot = await getDocs(
    query(cartColRef, where("uid", "==", uid))
  );

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      if (doc.data().id === id) {
        await deleteDoc(doc.ref);
      }
    })
  );
};

// export const increaseQuantityInCartInFirestore = async (id) => {
//   const querySnapshot = await getDocs(cartColRef);

//   await Promise.all(
//     querySnapshot.docs.map(async (doc) => {
//       if (doc.data().id === id) {
//         await update(doc.ref, {
//           quantity: doc.data().quantity + 1,
//         });
//       }
//     })
//   );
// };

export const addProductToCartInFirestore = async (product) => {
  // const querySnapshot = await getDocs(cartColRef);

  const querySnapshot = await getDocs(
    query(cartColRef, where("uid", "==", product.uid))
  );

  const isProductAlreadyInCart = querySnapshot.docs.some(
    (doc) => doc.data().productId === product.productId
  );

  if (isProductAlreadyInCart) {
    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        if (doc.data().productId === product.productId) {
          await updateDoc(doc.ref, {
            quantity: doc.data().quantity + product.quantity,
          });
        }
      })
    );
    return;
  }

  const response = await addDoc(cartColRef, product);
  return response;
};
