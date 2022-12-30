import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "../api/auth";
import { UserState } from "../features/userSlice";

export const Navbar = () => {
  const userState = useSelector(UserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await LogOut(dispatch, navigate);
  };

  return (
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label className="crossbtn" htmlFor="check">
        <i className="fa-solid fa-xmark"></i>
      </label>
      <label className="logo">FireBlog</label>
      <ul>
        <li>
          <Link
            className={document.location.pathname === "/" ? "active" : ""}
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={document.location.pathname === "/create" ? "active" : ""}
            to="/create"
          >
            Create
          </Link>
        </li>{" "}
        {userState?.isLoggedIn && (
          <li>
            <Link
              // to="/auth"
              onClick={() => {
                logoutHandler();
              }}
            >
              LOGOUT
            </Link>
          </li>
        )}
        {userState?.isLoggedIn ? (
          <li>{userState?.userInfo?.displayName}</li>
        ) : (
          <li>
            <Link
              className={document.location.pathname === "/auth" ? "active" : ""}
              to="/auth"
            >
              Login / Register
            </Link>
          </li>
        )}
        {/* <li>
          <a href="#">Feedback</a>
        </li> */}
      </ul>
    </nav>
  );
};
