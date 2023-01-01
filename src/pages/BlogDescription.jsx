import { Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const BlogDescription = () => {
  const user = useSelector(selectUser);
  return (
    <div className="BlogDescriptionContainer">
      <div className="MainBlogDisplayContainer">
        <div className="wholeblogcontainer">
          <div className="authorDetailContainer">
            <div className="profileDetails">
              <img src={user?.photoURL}></img>
              <div className="nameAndDateContainer">
                <span className="name">Kanha Tiwari</span>
                <span className="date">23-4-2015 12:40 PM </span>
              </div>
            </div>
            <div className="blogDataAnalyticsContainer">
              <div className="likeCountContainer">
                <span className="count">40</span>
                <span>Likes</span>
              </div>
              <button>
                <span>Like</span>
                <FavoriteBorderIcon
                  fontSize="small"
                  sx={{ marginLeft: "10px" }}
                />
              </button>
            </div>
          </div>
          <div className="BlogDetailsContainer">
            <img src={user?.photoURL}></img>
            <Divider />
            <h1 className="blogTitle">What is Raspberry Pie ?? </h1>
            <Divider />
            <pre className="blogDesc">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              quis aperiam voluptates suscipit eligendi rem eveniet incidunt
              excepturi at laborum asperiores qui saepe vitae nihil animi, quos
              ea quam magni. Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Tenetur quis aperiam voluptates suscipit eligendi rem
              eveniet incidunt excepturi at laborum asperiores qui saepe vitae
              nihil animi, quos ea quam magni. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Tenetur quis aperiam voluptates
              suscipit eligendi rem eveniet incidunt excepturi at laborum
              asperiores qui saepe vitae nihil animi, quos ea quam magni. Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. Tenetur quis
              aperiam voluptates suscipit eligendi rem eveniet incidunt
              excepturi at laborum asperiores qui saepe vitae nihil animi, quos
              ea quam magni. Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Tenetur quis aperiam voluptates suscipit eligendi rem
              eveniet incidunt excepturi at laborum asperiores qui saepe vitae
              nihil animi, quos ea quam magni. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Tenetur quis aperiam voluptates
              suscipit eligendi rem eveniet incidunt excepturi at laborum
              asperiores qui saepe vitae nihil animi, quos ea quam magni. Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. Tenetur quis
              aperiam voluptates suscipit eligendi rem eveniet incidunt
              excepturi at laborum asperiores qui saepe vitae nihil animi, quos
              ea quam magni. Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Tenetur quis aperiam voluptates suscipit eligendi rem
              eveniet incidunt excepturi at laborum asperiores qui saepe vitae
              nihil animi, quos ea quam magni. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Tenetur quis aperiam voluptates
              suscipit eligendi rem eveniet incidunt excepturi at laborum
              asperiores qui saepe vitae nihil animi, quos ea quam magni.
            </pre>
            <Divider />
            <div className="commentsContainer">
              <span>Comments (12)</span>
              <div className="commentBoxContainer">
                <div className="commentBox">
                  <div className="userInfo1Container">
                    <img src={user?.photoURL} alt="" />
                    <div className="nameAndDateContainer">
                      <span>Kanha Tiwari</span>
                      <span>12/11/2011 11:32PM</span>
                    </div>
                  </div>
                  <div className="comment">
                    <pre>Hello kanha how are you ??</pre>
                  </div>
                </div>
                <div className="commentBox">
                  <div className="userInfo1Container">
                    <img src={user?.photoURL} alt="" />
                    <div className="nameAndDateContainer">
                      <span>Kanha Tiwari</span>
                      <span>12/11/2011 11:32PM</span>
                    </div>
                  </div>
                  <div className="comment">
                    <pre>Hello kanha how are you ??</pre>
                  </div>
                </div>
                <div className="commentBox">
                  <div className="userInfo1Container">
                    <img src={user?.photoURL} alt="" />
                    <div className="nameAndDateContainer">
                      <span>Kanha Tiwari</span>
                      <span>12/11/2011 11:32PM</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="commentFormContainer">
                <form className="commentForm">
                  <h2 style={{ textDecoration: "underline", color: "gray" }}>
                    {" "}
                    Leave a Comment{" "}
                  </h2>
                  <textarea name="comment" id="" cols="30" rows="10"></textarea>
                  <button>Comment</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sideBarContainer">
        <div className="authorProfileContainer">
          <img src={user?.photoURL} alt="" />
          <div style={{ width: "100%", textAlign: "center", color: "black" }}>
            Kanha Tiwari
          </div>
          <button>Follow</button>
        </div>
        <div className="commentFormContainer">
          <form className="commentForm">
            <h2 style={{ textDecoration: "underline", color: "gray" }}>
              {" "}
              Leave a Comment{" "}
            </h2>
            <textarea name="comment" id="" cols="30" rows="10"></textarea>
            <button>Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogDescription;
