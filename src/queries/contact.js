import { addDoc } from "firebase/firestore";
import { queriesColRef } from "../firebase";

export const registerQuery = async (data) => {
  try {
    await addDoc(queriesColRef, data);
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};
