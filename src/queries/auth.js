import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

export const signInUser = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    console.log({ user: user, displayName: user.email });

    return { user: user, error: null };
  } catch (error) {
    console.log(error);
    return { user: null, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    const user = await signOut(auth);
    console.log({ user: user });
    return { user: user, error: null };
  } catch (error) {
    console.log(error);
    return { user: null, error: error.message };
  }
};

export const createUserInFirestore = async (email, username, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (user) {
      await updateProfile(user, {
        displayName: username,
      });
    }
    console.log({ user: user });
    return { user: user, error: null };
  } catch (error) {
    console.log(error);
    return { user: null, error: error.message };
  }
};
