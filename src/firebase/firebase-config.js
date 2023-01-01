import { initializeApp } from "firebase/app";
// import { getFireStore } from "firebase/firestore";
// import {g}
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

/* Firebase Configurations */
const firebaseConfig = {
  apiKey: "AIzaSyDPZfA_vt3Ze1CgVQBWzzOn8PSBFEnWxFI",
  authDomain: "fireblog - c7e8f.firebaseapp.com",
  projectId: "fireblog-c7e8f",
  storageBucket: "fireblog-c7e8f.appspot.com",
  messagingSenderId: "531263936060",
  appId: "1:531263936060:web:ebffee3a587468d1819539",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
