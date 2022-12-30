import {
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDoc,
  doc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import { auth, db } from "./firebase/firebase-config";
import Auth from "./pages/Auth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();

    // SignUp;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await addDoc(collection(db, "userCollection"), {
      uid: user.uid,
      title: "Hellow",
      followers: [],
      timestamp: serverTimestamp(),
    });

    //  SignIn

    // const { user } = await signInWithEmailAndPassword(auth, email, password);
    // console.log("user : ", user);

    // const data = await

    // console.log("data : ", data);
  };
  return (
    <div className="App">
      <Auth />
      <Footer />
    </div>
  );
}

export default App;
