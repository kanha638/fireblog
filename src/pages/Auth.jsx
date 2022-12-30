import React from "react";

const initialForm = {
  firstName: "",
};
const Auth = () => {
  return (
    <>
      <div className="auth-container" id="auth-container">
        <div className="form-container sign-up-container">
          <form>
            <h1>Create Account</h1>
            <div className="social-container"></div>
            {/* <span>Use your email for registration</span> */}
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button style={{ marginTop: "15px" }}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign in</h1>
            <div className="social-container"></div>
            {/* <span>or use your account</span> */}
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a>Forgot your password?</a>
            <button>Sign In</button>
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
    </>
  );
};

export default Auth;
