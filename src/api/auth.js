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
import {
  updateDoc,
  serverTimestamp,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const SignUp = async (data, dispatch, location, navigate) => {
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
    await setDoc(doc(db, "userCollection", user.uid), {
      uid: user.uid,
      description: `Hello I am ${user?.displayName}`,
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
    let result = await getDoc(doc(db, "userCollection", user.uid));
    result = result.data();

    let result1 = userData?.user;
    result1 = { ...result1, description: result.description };
    result1 = { ...result1, followers: result.followers };
    result1 = { ...result1, following: result.following };
    console.log(result1);

    dispatch(SignInSuccess(result1));
    if (location === "auth") {
      navigate("/");
    } else {
      navigate(location);
    }
  } catch (error) {
    dispatch(SignUpError(error.response));
    console.log(error);
  }
};

export const SignIn = async (data, dispatch, location, navigate) => {
  dispatch(SignInStart());
  try {
    const userData = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    let result = await getDoc(doc(db, "userCollection", userData?.user.uid));
    result = result.data();
    let result1 = userData?.user;
    result1 = { ...result1, description: result.description };
    result1 = { ...result1, followers: result.followers };
    result1 = { ...result1, following: result.following };
    dispatch(SignInSuccess(result1));
    navigate("/");
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
    await updateDoc(doc(db, "userCollection", data.uid), {
      description: data.description,
    });
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
