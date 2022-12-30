import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  SignInError,
  SignInStart,
  SignInSuccess,
  SignUpError,
  SignUpStart,
  LogoutStart,
  LogoutSuccess,
  LogoutError,
} from "../features/userSlice";
import { auth, db } from "../firebase/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const SignUp = async (data, dispatch, navigate) => {
  dispatch(SignUpStart());
  try {
    // Creating a User After Clicking the signup
    const { user } = await createUserWithEmailAndPassword(
      auth,
      data?.email,
      data?.password
    );
    await updateProfile(user, {
      displayName: `${data?.firstName} ${data?.lastName}`,
    });
    await addDoc(collection(db, "userCollection"), {
      uid: user.uid,
      followers: [],
      following: [],
      timestamp: serverTimestamp(),
    });
    // First Time User will be Signed In
    const userData = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    dispatch(SignInSuccess(userData?.user));
    navigate("/");
  } catch (error) {
    dispatch(SignUpError(error.respnse));
    console.log(error);
  }
};

export const SignIn = async (data, dispatch, navigate) => {
  dispatch(SignInStart());
  try {
    const userData = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    dispatch(SignInSuccess(userData?.user));
    if (document.location.pathname === "auth") {
      navigate("/");
    } else {
      navigate(document.location.pathname);
    }
  } catch (error) {
    dispatch(SignInError(error.respnse));
    console.log(error);
  }
};

export const LogOut = async (dispatch, navigate) => {
  dispatch(LogoutStart());
  try {
    await signOut(auth);
    dispatch(LogoutSuccess());

    navigate("/auth");
  } catch (error) {
    dispatch(LogoutError(error.response));
  }
};
