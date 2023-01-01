import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
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
  UpdateUserProfileStart,
  UpdateUserProfileSuccess,
  UpdateUserProfileError,
  ImageUpdateStart,
  ImageUpdateError,
  ImageUpdateSuccess,
} from "../features/userSlice";
import { auth, db, storage } from "../firebase/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    await addDoc(collection(db, "userCollection", user.uid), {
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
    dispatch(SignUpError(error.response));
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
    console.log(document.location.pathname);
    if (document.location.pathname === "auth") {
      navigate("/");
    } else {
      navigate(document.location.pathname);
    }
  } catch (error) {
    dispatch(SignInError(error.response));
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

export const UpdateProfile = async (data, dispatch) => {
  dispatch(UpdateUserProfileStart());
  try {
    await updateProfile(auth.currentUser, {
      displayName: data.displayName,
    });
    await updateEmail(auth.currentUser, data.email);
    dispatch(UpdateUserProfileSuccess(data));
  } catch (error) {
    dispatch(UpdateUserProfileError(error.response));
    console.log(error);
  }
};

export const UserImageUpload = async (data, dispatch) => {
  dispatch(ImageUpdateStart());
  try {
    const imageRef = await ref(storage, `/UserImage/${data.uid + v4()}`);
    await uploadBytes(imageRef, data.image);
    await updateProfile(auth.currentUser, {
      photoURL: await getDownloadURL(imageRef),
    });
    dispatch(
      ImageUpdateSuccess({
        url: await getDownloadURL(imageRef),
      })
    );
  } catch (error) {
    dispatch(ImageUpdateError(error.response));
  }
};
