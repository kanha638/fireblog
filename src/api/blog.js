import { create } from "@mui/material/styles/createTransitions";
import { FirebaseError } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limitToLast,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  FetchBlogError,
  FetchBlogStart,
  FetchBlogSuccess,
  UpladBlogStart,
  UploadBlogError,
  UploadBlogSuccess,
} from "../features/userSlice";
import { db, storage } from "../firebase/firebase-config";
import { sortByLikeCount, sortByTimeStamp } from "../utility/Filters";

export const UploadBlog = async (data, dispatch, navigate) => {
  dispatch(UpladBlogStart());
  try {
    console.log(data.image);
    const imageRef = await ref(storage, `/blogImages/${data.uid + v4()}`);
    await uploadBytes(imageRef, data.image);
    const blogData = await addDoc(collection(db, `blogs`), {
      title: data.title,
      description: data.description,
      img_urn: await getDownloadURL(imageRef),
      category: data.category,
      authorID: data.uid,
      authorInfo: data.authorInfo,
      likes: [],
      likeCount: 0,
      timeStamp: serverTimestamp(),
    });
    dispatch(UploadBlogSuccess());

    navigate("/");
  } catch (error) {
    dispatch(UploadBlogError(error.response));
    console.log(error);
  }
};

export const fetchBlogs = async (data, dispatch, setBlogs = (val) => {}) => {
  dispatch(FetchBlogStart());
  try {
    // console.log("fetching..", data.page);
    let items = [];
    if (data.category) {
      const q = await query(
        collection(db, "blogs"),
        orderBy("timeStamp", "asc"),
        where("category", "==", data.category)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
    } else {
      const blogRef = await collection(db, "blogs");

      const querySnapshot = await getDocs(blogRef);
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
    }

    setBlogs(sortByTimeStamp(items));
    dispatch(FetchBlogSuccess(sortByTimeStamp(items)));
  } catch (error) {
    console.log(error);
    dispatch(FetchBlogError(error.response));
  }
};

export const UpdateBlog = async (data, dispatch, navigate) => {
  dispatch(UpladBlogStart());
  try {
    console.log(data);
    if (data.imgChange) {
      const imageRef = ref(storage, `/blogImages/${data.uid + v4()}`);
      await uploadBytes(imageRef, data.image);
      const blogRef = doc(db, "blogs", data.id);
      updateDoc(blogRef, {
        title: data.title,
        description: data.description,
        img_urn: await getDownloadURL(imageRef),
        category: data.category,
      });
    } else {
      const blogRef = doc(db, "blogs", data.id);
      updateDoc(blogRef, {
        title: data.title,
        description: data.description,
        category: data.category,
      });
    }

    dispatch(UploadBlogSuccess());
    navigate("/");
  } catch (error) {
    dispatch(UploadBlogError(error.response));
    console.log(error);
  }
};
