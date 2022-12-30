import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { SignIn, SignUp } from "../api/auth";
import { UserState } from "../features/userSlice";

const initialFormSignup = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const initialFormSignIn = {
  email: "",
  password: "",
};
const Auth = () => {
  const dispatch = useDispatch();
  const [signUpForm, setSignUpForm] = useState(initialFormSignup);
  const [signInForm, setSignInForm] = useState(initialFormSignIn);
  const userState = useSelector(UserState);
  const navigate = useNavigate();
  const changeHandlerSignUp = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };
  const submitHandlerSignUp = async (e) => {
    e.preventDefault();
    await SignUp(signUpForm, dispatch, navigate);
    console.log(signUpForm);
  };
  const changeHandlerSignIn = (e) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
    console.log(signInForm);
  };
  const submitHandlerSignIn = async (e) => {
    e.preventDefault();
    await SignIn(signInForm, dispatch, navigate);
    console.log(signInForm);
  };
  return (
    <>
      <div className="main-container-full">
        <div className="auth-container" id="auth-container">
          <div className="form-container sign-up-container">
            <form onSubmit={submitHandlerSignUp}>
              <h1>Create Account</h1>
              <div className="social-container"></div>
              {/* <span>Use your email for registration</span> */}
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={changeHandlerSignUp}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={changeHandlerSignUp}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={changeHandlerSignUp}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeHandlerSignUp}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={changeHandlerSignUp}
              />
              <button
                style={{ marginTop: "15px" }}
                type="submit"
                // disabled={false}
                disabled={userState?.isPending}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={submitHandlerSignIn}>
              <h1>Sign in</h1>
              <div className="social-container"></div>
              {/* <span>or use your account</span> */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={changeHandlerSignIn}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeHandlerSignIn}
              />
              <a>Forgot your password?</a>
              <button type="submit" disabled={userState?.isPending}>
                Sign In
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => {
                    document
                      .getElementById("auth-container")
                      .classList.remove("right-panel-active");
                  }}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => {
                    document
                      .getElementById("auth-container")
                      .classList.add("right-panel-active");
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
