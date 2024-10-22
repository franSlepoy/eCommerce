// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { signInWithEmailAndPassword, getAuth, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH,
  projectId: import.meta.env.VITE_PROJECT,
  storageBucket: import.meta.env.VITE_STORAGE,
  messagingSenderId: import.meta.env.VITE_MESSAGING,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const db = getFirestore(app)

//Los Servicios

//auth

//login

export const onSigIn = async ({ email, password }) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

//logout
export const logout = () => {
  signOut(auth);
};

//login con Google

let googleProvider = new GoogleAuthProvider();

export const loginGoogle = async () => {
  try {
    let res = await signInWithPopup(auth, googleProvider);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//registro

export const signUp = async ({ email, password }) => {
    try {
      let res = await createUserWithEmailAndPassword(auth, email, password);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

//olvide la contraseña
export const forgotPassword = async (email) => {
    try {
      const data = await sendPasswordResetEmail(auth, email);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
