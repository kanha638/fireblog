import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { auth, db } from "./firebase/firebase-config";
import Auth from "./pages/Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error404 from "./components/Error404";

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
      <Router>
        <Navbar />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
