import { createSlice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";
import { onAuthStateChanged } from "firebase/auth";
import { startAfter } from "firebase/firestore";
import { auth } from "../firebase/firebase-config";

const getUser = async () => {
  const val = null;
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      val = user;
      console.log("user");
    } else {
      console.log("eror");
    }
  });
  return val;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    isPending: false,
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    isErrors: false,
  },
  reducers: {
    SignUpStart: (state) => {
      state.isErrors = false;
      state.isPending = true;
    },
    SignInStart: (state) => {
      state.isErrors = false;
      state.isPending = true;
    },
    SignInSuccess: (state, action) => {
      state.isErrors = false;
      state.isPending = false;
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
    },

    SignUpError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
    },
    SignInError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
    },
    LogoutStart: (state) => {
      state.isErrors = false;
      state.isPending = true;
    },
    LogoutSuccess: (state) => {
      state.isErrors = false;
      state.isPending = false;
      state.userInfo = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
    LogoutError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
    },
  },
});

export const {
  SignUpStart,
  SignInSuccess,
  SignUpError,
  SignInStart,
  SignInError,
  SetLoggedInUser,
  LogoutStart,
  LogoutSuccess,
  LogoutError,
} = userSlice.actions;
export const UserState = (state) => state.user;
export default userSlice.reducer;
