// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCj5_ZPizj0oKpqo0kzXKLbJII6LT-Igs0",
  authDomain: "fir-7a28d.firebaseapp.com",
  projectId: "fir-7a28d",
  storageBucket: "fir-7a28d.appspot.com",
  messagingSenderId: "313191039340",
  appId: "1:313191039340:web:7ea421adcf6921092cf349",
  measurementId: "G-VNGZQWSFNK",
};
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  setDoc,
};
