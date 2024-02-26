import {
  sendPasswordResetEmail,
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

export const resetPassword = async (email) => {
  try {
    const response = await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.log(`error en el metodo resetPassword: ${error}`);
    return null;
  }
};

export const createUserWithEmail = async (user, pass) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, user, pass);
    return { success: true, data: response };
  } catch (error) {
    //console.error(`Error en el método createUserWithEmail: ${error.message}`);
    return { success: false, error: error.message };
  }
};

export const verifyEmail = async () => {
  try {
    const response = await sendEmailVerification(auth.currentUser);
    console.log(response);
    return true;
  } catch (error) {
    console.log(`error en el metodo sendEmailVerification: ${error}`);
    return null;
  }
};
