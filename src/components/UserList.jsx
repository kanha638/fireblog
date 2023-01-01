import React from "react";
import { Avatar } from "@mui/material";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

export const UserList = () => {
  const user = useSelector(selectUser);
  return (
    <div className="user-card-container">
      <div className="user-card first">
        <Avatar
          className="dropbtn"
          alt={user?.displayName}
          src={user.photoURL}
          sx={{ width: 40, height: 40 }}
        />
        <span>{user.displayName}</span>
        <button>Follow</button>
      </div>
      <div className="user-card">
        <Avatar
          className="dropbtn"
          alt={user?.displayName}
          src={user.photoURL}
          sx={{ width: 40, height: 40 }}
        />
        <span>{user.displayName}</span>
        <button className="following">Following</button>
      </div>
      <div className="user-card">
        <Avatar
          className="dropbtn"
          alt={user?.displayName}
          src={user.photoURL}
          sx={{ width: 40, height: 40 }}
        />
        <span>{user.displayName}</span>
        <button>Follow</button>
      </div>
      <div className="user-card">
        <Avatar
          className="dropbtn"
          alt={user?.displayName}
          src={user.photoURL}
          sx={{ width: 40, height: 40 }}
        />
        <span>{user.displayName}</span>
        <button>Follow</button>
      </div>
      <div className="user-card ">
        <Avatar
          className="dropbtn"
          alt={user?.displayName}
          src={user.photoURL}
          sx={{ width: 40, height: 40 }}
        />
        <span>{user.displayName}</span>
        <button>Follow</button>
      </div>
      <div className="user-card ">
        <Avatar
          className="dropbtn"
          alt={user?.displayName}
          src={user.photoURL}
          sx={{ width: 40, height: 40 }}
        />
        <span>{user.displayName}</span>
        <button>Follow</button>
      </div>
    </div>
  );
};
