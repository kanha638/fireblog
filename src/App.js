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
import { auth, db } from "./firebase/firebase-config";

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
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "50%",
          marginTop: "40px",
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
}

export default App;
