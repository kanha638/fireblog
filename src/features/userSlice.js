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
    Blogs: [],
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
    UpladBlogStart: (state, action) => {
      state.isErrors = false;
      state.isPending = true;
    },
    UploadBlogSuccess: (state) => {
      state.isErrors = false;
      state.isPending = false;
    },
    UploadBlogError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
    },
    UpdateUserProfileStart: (state) => {
      state.isErrors = false;
      state.isPending = true;
    },
    UpdateUserProfileSuccess: (state, action) => {
      state.isErrors = false;
      state.isPending = false;
      state.userInfo.displayName = action.payload.displayName;
      state.userInfo.email = action.payload.email;
      localStorage.setItem("user", JSON.stringify(state.userInfo));
    },
    UpdateUserProfileError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
    },
    ImageUpdateStart: (state) => {
      state.isPending = true;
      state.isErrors = false;
    },
    ImageUpdateSuccess: (state, action) => {
      state.isErrors = false;
      state.isPending = false;
      state.userInfo.photoURL = action.payload.url;
      localStorage.setItem("user", JSON.stringify(state.userInfo));
    },
    ImageUpdateError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
    },
    FetchBlogStart: (state) => {
      state.isPending = true;
      state.isErrors = false;
    },
    FetchBlogSuccess: (state, action) => {
      state.isErrors = false;
      state.isPending = false;
      state.Blogs = action.payload;
    },
    FetchBlogError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
    },
    BlogsUpdater: (state, action) => {
      state.Blogs = action.payload;
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
  UpladBlogStart,
  UploadBlogError,
  UploadBlogSuccess,
  UpdateUserProfileStart,
  UpdateUserProfileSuccess,
  UpdateUserProfileError,
  ImageUpdateError,
  ImageUpdateStart,
  ImageUpdateSuccess,
  FetchBlogError,
  FetchBlogStart,
  FetchBlogSuccess,
  BlogsUpdater,
} = userSlice.actions;
export const UserState = (state) => state.user;
export const selectUser = (state) => state.user.userInfo;
export default userSlice.reducer;
