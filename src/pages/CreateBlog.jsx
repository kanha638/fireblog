import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UploadBlog } from "../api/blog";
import { selectUser, UserState } from "../features/userSlice";

const initialState = {
  title: "",
  description: "",
  category: "others",
};
const CreateBlog = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [blogForm, setBlogForm] = useState(initialState);
  const [err, setError] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector(UserState);

  const changeHandlerImage = (e) => {
    setFile(e.target.files[0]);
    setError(false);
    const imageurl = URL.createObjectURL(e.target.files[0]);
    setImageUrl(imageurl);
  };

  const changeHandlerForm = (e) => {
    setBlogForm({ ...blogForm, [e.target.name]: e.target.value });
    setError(false);
    console.log(blogForm);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      blogForm?.title &&
      blogForm?.category &&
      blogForm?.description &&
      file
    ) {
      await UploadBlog(
        {
          title: blogForm.title,
          description: blogForm.description,
          category: blogForm.category,
          image: file,
          uid: user.uid,
          authorInfo: {
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          followers: user.followers,
        },
        dispatch,
        navigate
      );
    } else {
      setError(true);
    }
  };
  return (
    <div className="createblogcontainer">
      <span> Post Your Blog</span>
      <form className="createblogform" onSubmit={submitHandler}>
        <input
          type="file"
          id="blogImage"
          accept="image/*"
          style={{ display: "none" }}
          onChange={changeHandlerImage}
        />
        <label style={{ width: "100%" }} htmlFor="blogImage">
          {imageUrl ? (
            <img src={imageUrl}></img>
          ) : (
            <div className="imageupload">
              <span> Upload</span>
            </div>
          )}
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={changeHandlerForm}
        />
        <select name="category" id="cars" onChange={changeHandlerForm}>
          <option value="others">Others</option>
          <option value="politics">Politics</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="music">Music</option>
          <option value="bollywood">Bollywood</option>
        </select>
        <textarea
          name="description"
          cols="30"
          rows="30"
          placeholder="Blog Description"
          onChange={changeHandlerForm}
        ></textarea>{" "}
        {err && <span className="err"> * All Feilds are Required</span>}
        <button type="submit" disabled={userState?.isPending}>
          {" "}
          Upload Post
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
