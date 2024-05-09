import {
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { queriesColRef } from "../firebase";

export const registerQuery = async (data) => {
  try {
    await addDoc(queriesColRef, { ...data, createdAt: serverTimestamp() });
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

export const getQueries = async (uid) => {
  try {
    const querySnapshot = await getDocs(
      query(
        queriesColRef,
        where("uid", "==", uid),
        orderBy("createdAt", "desc")
      )
    );
    const queries = querySnapshot.docs.map((doc) => doc.data());
    return queries[0]?.createdAt.seconds ?? null;
  } catch (error) {
    return { error: error.message };
  }
};
