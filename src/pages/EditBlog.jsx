import { CircularProgress } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateBlog } from "../api/blog";
import { selectUser, UserState } from "../features/userSlice";
import { db } from "../firebase/firebase-config";

const initialState = {
  title: "",
  description: "",
  category: "others",
};
const EditBlog = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [blogForm, setBlogForm] = useState(initialState);
  const [err, setError] = useState(false);
  const { id } = useParams();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector(UserState);
  const [loading, setLoading] = useState(true);

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
  const fetchBlogData = async () => {
    const blogRef = doc(db, "blogs", id);
    const blogSnap = await getDoc(blogRef);
    const data = blogSnap.data();
    console.log(data);
    if (data.authorID != user?.uid) {
      alert("You are not allowed");
      navigate("/");
    } else {
      setBlogForm({
        title: data.title,
        img_urn: data.img_urn,
        description: data.description,
        category: data.category,
        authorID: data.authorID,
        authorInfo: data.authorInfo,
        likeCount: data.likeCount || 0,
        timeStamp: data.timeStamp,
        likes: data.likes,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(blogForm);
    if (blogForm?.title && blogForm?.category && blogForm?.description) {
      if (imageUrl) {
        await UpdateBlog(
          {
            title: blogForm.title,
            description: blogForm.description,
            category: blogForm.category,
            image: file,
            id: id,
            imgChange: true,
            img_urn: blogForm.img_urn,
            authorID: blogForm.authorID,
            authorInfo: blogForm.authorInfo,
            likeCount: blogForm.likeCount || 0,
            timeStamp: blogForm.timeStamp,
            likes: blogForm.likes,
          },
          dispatch,
          navigate
        );
      } else {
        await UpdateBlog(
          {
            title: blogForm.title,
            description: blogForm.description,
            category: blogForm.category,
            image: file,
            id: id,
            imgChange: false,
            img_urn: blogForm.img_urn,
            authorID: blogForm.authorID,
            authorInfo: blogForm.authorInfo,
            likeCount: blogForm.likeCount || 0,
            timeStamp: blogForm.timeStamp,
            likes: blogForm.likes,
          },
          dispatch,
          navigate
        );
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="createblogcontainer">
        <span> Edit Your Blog</span>
        {loading ? (
          <>
            <div
              style={{
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <CircularProgress />
            </div>
          </>
        ) : (
          <form className="createblogform" onSubmit={submitHandler}>
            <input
              type="file"
              id="blogImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={changeHandlerImage}
            />
            <label style={{ width: "100%" }} htmlFor="blogImage">
              {blogForm.img_urn ? (
                <img src={imageUrl ? imageUrl : blogForm?.img_urn}></img>
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
              value={blogForm.title}
            />
            <select
              name="category"
              id="cars"
              value={blogForm.category}
              onChange={changeHandlerForm}
            >
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
              value={blogForm.description}
              onChange={changeHandlerForm}
            ></textarea>{" "}
            {err && <span className="err"> * All Feilds are Required</span>}
            <button type="submit" disabled={userState?.isPending}>
              Update Post
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default EditBlog;
