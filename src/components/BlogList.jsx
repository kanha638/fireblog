import { CircularProgress, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../api/blog";
import { selectUser, UserState } from "../features/userSlice";
import SearchIcon from "@mui/icons-material/Search";
import { useParams, useSearchParams } from "react-router-dom";
import { sortByLikeCount, sortByTimeStamp } from "../utility/Filters";

const BlogList = ({ category }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const userState = useSelector(UserState);
  const user = useSelector(selectUser);
  const [search, setSearch] = useState("");
  const [mostLiked, setMostLiked] = useState(false);
  const [Blogs, setBlogs] = useState(userState?.Blogs);
  const [AllBlogs, setAllBlogs] = useState(userState?.Blogs);
  const [searchParams, setSearchParams] = useSearchParams();
  const [flag, setFLag] = useState(false);
  const fetchBlog = async () => {
    await fetchBlogs(
      {
        category: category,
      },
      dispatch,
      setBlogs
    );
    // setBlogs(userState?.Blogs);
    setAllBlogs(userState?.Blogs);
  };
  const FilterSubmitHandler = (e) => {
    e.preventDefault();
    setSearchParams(searchParams.append(search, e.target.value));
  };

  useEffect(() => {
    fetchBlog();
  }, [category]);

  useEffect(() => {
    let result = [];
    console.log("loading");
    userState?.Blogs.forEach((data) => {
      if (
        String(data.title)
          ?.toLowerCase()
          ?.includes(searchParams.get("search")?.toLowerCase())
      ) {
        result.push(data);
      }
    });
    setBlogs(result);
  }, [flag]);

  return (
    <>
      <form
        style={{ width: "100%", background: "inherit" }}
        onSubmit={FilterSubmitHandler}
      >
        <select
          name="category"
          id="cars"
          onChange={(e) => {
            if (e.target.value === "mostLiked") {
              searchParams.delete("search");
              const val = sortByLikeCount(userState?.Blogs);
              setBlogs(val);
            } else {
              searchParams.delete("search");
              const val = sortByTimeStamp(userState?.Blogs);
              setBlogs(val);
            }
          }}
        >
          <option value="latest">Latest</option>
          <option value="mostLiked">Most Liked</option>
        </select>
        <div>
          <input
            type="text"
            name="searchInput"
            value={search}
            placeholder="Search Here"
            onChange={(e) => {
              setSearch(e.target.value);
              setFLag((flag) => !flag);
              setSearchParams({
                search: e.target.value,
              });
            }}
          ></input>
          <button type="sumbit">
            <SearchIcon />
          </button>
        </div>
      </form>
      <Divider />
      <div className="PostContainer">
        {userState?.isPending ? (
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
        ) : (
          <div className="band">
            {Blogs.map((data, idx) => {
              return (
                <div className="item-1" key={idx}>
                  <a
                    href="https://design.tutsplus.com/articles/international-artist-feature-malaysia--cms-26852"
                    className="card"
                  >
                    <div
                      className="thumb"
                      style={{ backgroundImage: `url(${data?.img_urn})` }}
                    ></div>
                    <article>
                      <h1>{data?.title}</h1>

                      <span>{data?.authorInfo?.displayName}</span>
                      <span> {data?.likeCount} likes</span>
                    </article>
                  </a>
                </div>
              );
            })}

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {userState?.Blogs.length === 0 && (
                <button
                  style={{
                    background: "black",
                    color: "white",
                    border: "solid 1px black",
                  }}
                  onClick={() => {
                    setPage((page) => page + 1);
                    fetchBlog();
                  }}
                >
                  No Data
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogList;
