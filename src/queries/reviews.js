import { addDoc, getDocs, query, where } from "firebase/firestore";
import { reviewsColRef } from "../firebase";

export const saveReviewInFirestore = async (reviewData) => {
  const querySnapshot = await getDocs(reviewsColRef);

  const alreadyReviewed = querySnapshot.docs.some(
    (doc) =>
      doc.data().email === reviewData.email &&
      doc.data().productId === reviewData.productId
  );

  if (alreadyReviewed && reviewData.email !== "anonymous") {
    return { error: "You have already reviewed this product" };
  }

  await addDoc(reviewsColRef, reviewData);

  return { data: reviewData };
};

export const getReviewsFromFirestore = async (productId) => {
  let reviews = [];
  const querySnapshot = await getDocs(
    query(reviewsColRef, where("productId", "==", productId))
  );

  querySnapshot.forEach((doc) => {
    reviews.push(doc.data());
  });

  return reviews;
};
