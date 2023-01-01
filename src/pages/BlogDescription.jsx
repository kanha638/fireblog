import { Divider, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, UserState } from "../features/userSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { checkIfPresentInArray } from "../utility/Filters";
import { CommentOnBlog, LikeTheBlog } from "../api/blog";
import ReactTimeAgo from "react-time-ago";

const initialState = {
  title: "",
  description: "",
  img_urn: "",
  likes: [],
  likeCount: 0,
};

const BlogDescription = () => {
  const user = useSelector(selectUser);
  const userState = useSelector(UserState);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [commentsArray, setCommentsArray] = useState(null);
  const [likeCounter, setLikeCounter] = useState(0);

  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(true);
  const [commentValue, setCommentValue] = useState("");
  const [flag, setFlag] = useState(false);
  const fetchBlogData = async () => {
    setLoading(true);
    const blogRef = await doc(db, "blogs", id);
    const blogSnap = await getDoc(blogRef);
    const data = await blogSnap.data();
    // console.log(data);
    setBlogData(data);
    setLikeCounter(data?.likeCount);
    let arr = [];
    arr.push(data?.comments);
    setCommentsArray(arr);
    setLoading(false);
  };

  const LikeHandler = async () => {
    // setLoading(true);
    if (userState?.isLoggedIn === false) {
      if (
        window.confirm(
          "For liking this post you have to loggin first. Do you want to login ??"
        )
      ) {
        navigate("/auth");
      } else {
        return;
      }
    }
    console.log("like is hanled");
    let prevBlogData = blogData;
    prevBlogData.likes.push(user?.uid);
    setLikeCounter((prev) => prev + 1);
    setBlogData({ ...blogData, likeCount: prevBlogData.likeCount });
    setBlogData({ ...blogData, likeCount: parseInt(prevBlogData.likes, 10) });
    await LikeTheBlog(
      {
        id: id,
        likeCount: blogData.likeCount,
        likes: blogData.likes,
      },
      dispatch
    );
    // setLoading(false);
  };

  const CommentHandler = async (e) => {
    e.preventDefault();
    console.log(commentValue);
    if (userState?.isLoggedIn === false) {
      if (
        window.confirm(
          "For liking this post you have to loggin first. Do you want to login ??"
        )
      ) {
        navigate("/auth");
      } else {
        return;
      }
    }
    const newComment = {
      uid: user?.uid,
      message: commentValue,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      createdAt: Date.now(),
    };
    let tmp = blogData?.comments;

    tmp.push(newComment);

    await CommentOnBlog(
      {
        id: id,
        comments: tmp,
      },
      dispatch
    );
    // setFlag((flat) => !flag);
  };

  useEffect(() => {
    fetchBlogData();
  }, [flag]);
  return (
    <>
      {!loading && (
        <div className="BlogDescriptionContainer">
          <div className="MainBlogDisplayContainer">
            <div className="wholeblogcontainer">
              <div className="authorDetailContainer">
                <div className="profileDetails">
                  <img src={blogData?.authorInfo?.photoURL}></img>
                  <div className="nameAndDateContainer">
                    <span className="name">
                      {blogData?.authorInfo?.displayName}
                    </span>
                    <span className="date">23-4-2015 12:40 PM </span>
                  </div>
                </div>
                <div className="blogDataAnalyticsContainer">
                  <div className="likeCountContainer">
                    <span className="count">{likeCounter}</span>
                    <span>Likes</span>
                  </div>
                  {!checkIfPresentInArray(blogData?.likes, user?.uid) ? (
                    <button onClick={LikeHandler}>
                      <span>Like</span>
                      <FavoriteBorderIcon
                        fontSize="small"
                        sx={{ marginLeft: "10px" }}
                      />
                    </button>
                  ) : (
                    <button
                      disabled
                      style={{ background: "gray", border: "none" }}
                    >
                      <span>Liked</span>
                      <FavoriteBorderIcon
                        fontSize="small"
                        sx={{ marginLeft: "10px" }}
                      />
                    </button>
                  )}
                </div>
              </div>
              <div className="BlogDetailsContainer">
                <img src={blogData?.img_urn}></img>
                <Divider />
                <h1 className="blogTitle">{blogData?.title}</h1>
                <Divider />
                <pre className="blogDesc">{blogData?.description}</pre>
                <Divider />
                <div className="commentsContainer">
                  {/* {commentsArray} */}
                  <span>Comments ({blogData?.comments?.length})</span>
                  <div className="commentBoxContainer">
                    {blogData?.comments
                      .slice(0)
                      .reverse()
                      .map((data1, idx) => {
                        return (
                          <div key={idx} className="commentBox">
                            <div className="userInfo1Container">
                              <Avatar
                                className="dropbtn"
                                alt={data1?.photoURL}
                                src={user.photoURL}
                                sx={{ width: 60, height: 60 }}
                              />
                              {/* <img src={data1?.photoURL} alt="" /> */}
                              <div className="nameAndDateContainer">
                                <span>{data1?.displayName}</span>
                                <span>
                                  {new Date(
                                    data1?.createdAt * 1000
                                  ).toDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="comment">
                              <pre>{data1.message}</pre>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div
                    className="commentFormContainer"
                    style={{ width: "100%" }}
                  >
                    <form
                      className="commentForm"
                      onSubmit={CommentHandler}
                      style={{ width: "100%" }}
                    >
                      <h2
                        style={{ textDecoration: "underline", color: "gray" }}
                      >
                        {" "}
                        Leave a Comment{" "}
                      </h2>
                      <textarea
                        name="comment"
                        id=""
                        cols="30"
                        rows="10"
                        style={{ width: "100%" }}
                        value={commentValue}
                        onChange={(e) => setCommentValue(e.target.value)}
                      ></textarea>
                      <button
                        disabled={
                          commentValue === "" || userState?.isPending
                            ? true
                            : false
                        }
                      >
                        Comment
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sideBarContainer">
            <div className="authorProfileContainer">
              <img src={blogData?.authorInfo?.photoURL} alt="" />
              <div
                style={{ width: "100%", textAlign: "center", color: "black" }}
              >
                {blogData?.authorInfo?.displayName}
              </div>
              <button>Follow</button>
            </div>
            <div className="commentFormContainer">
              <form className="commentForm" onSubmit={CommentHandler}>
                <h2 style={{ textDecoration: "underline", color: "gray" }}>
                  {" "}
                  Leave a Comment{" "}
                </h2>
                <textarea
                  name="comment"
                  cols="30"
                  rows="10"
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                ></textarea>
                <button
                  disabled={
                    commentValue === "" || userState?.isPending ? true : false
                  }
                >
                  Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDescription;
