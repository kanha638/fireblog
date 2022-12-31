import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { auth } from "./firebase/firebase-config";
import Auth from "./pages/Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error404 from "./components/Error404";
import CreateBlog from "./pages/CreateBlog";
import Home from "./pages/Home";
import { SetLoggedInUser, UserState } from "./features/userSlice";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import EditBlog from "./pages/EditBlog";

function App() {
  const [loading, setLoading] = useState(true);
  const userState = useSelector(UserState);
  useEffect(() => {
    console.log("app loading");
    const loader = document.getElementById("loading");
    if (loader) {
      loader.style.display = "none";
      setLoading(false);
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged IN");
      } else {
        console.log("No User Logged In");
        localStorage.clear();
      }
      SetLoggedInUser(true);
    });
  }, []);
  return (
    <>
      {!loading && (
        <div className="App">
          {/* <pre>{auth}</pre> */}
          <Router>
            <Navbar />
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route
                path="/auth"
                element={userState.isLoggedIn ? <Home /> : <Auth />}
              />
              <Route
                path="/edit/:id"
                element={userState?.isLoggedIn ? <EditBlog /> : <Auth />}
              />
              <Route
                path="/create"
                element={userState.isLoggedIn ? <CreateBlog /> : <Auth />}
              />{" "}
              <Route path="/user/:id/*" element={<Profile />} />
              {/* <Route path="/*" element={<Error404 />} /> */}
            </Routes>

            <Footer />
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
