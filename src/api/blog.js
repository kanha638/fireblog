import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  UpladBlogStart,
  UploadBlogError,
  UploadBlogSuccess,
} from "../features/userSlice";
import { db, storage } from "../firebase/firebase-config";

export const UploadBlog = async (data, dispatch, navigate) => {
  dispatch(UpladBlogStart());
  try {
    console.log(data.image);
    const imageRef = await ref(storage, `/blogImages/${data.uid + v4()}`);
    await uploadBytes(imageRef, data.image);
    const blogData = await addDoc(collection(db, "blogs"), {
      title: data.title,
      description: data.description,
      img_urn: await getDownloadURL(imageRef),
      category: data.category,
      authorID: data.uid,
      likes: [],
      likeCount: 0,
    });
    dispatch(UploadBlogSuccess());
    navigate("/");
  } catch (error) {
    dispatch(UploadBlogError(error.response));
    console.log(error);
  }
};
