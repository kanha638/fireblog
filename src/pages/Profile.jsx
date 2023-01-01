import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, UserState } from "../features/userSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import Error404 from "../components/Error404";
import { UpdateProfile, UserImageUpload } from "../api/auth";
import { UserList } from "../components/UserList";

const Profile = () => {
  const user = useSelector(selectUser);
  const [value, setValue] = React.useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector(UserState);
  const [form, setForm] = useState({
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    description: user.description,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 2) navigate(`followers`);
    else if (newValue === 1) navigate(`/user/${user?.uid}`);
    else navigate("following");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(form);
    await UpdateProfile(form, dispatch);
  };
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const ImageUploadHandler = async (e) => {
    if (window.confirm("Do You want to Update You Image")) {
      await UserImageUpload(
        { image: e.target.files[0], uid: user.uid },
        dispatch
      );
    }
  };
  return (
    <div className="profilePageContainer">
      <div className="profilePageInsideContainer">
        <div className="profileInfoContainer">
          <div style={{ position: "relative" }}>
            {user.photoURL ? (
              <img src={user.photoURL}></img>
            ) : (
              <Skeleton
                style={{
                  width: "100%",
                  minHeight: "200px",
                  maxHeight: "300px",
                  borderRadius: "10px",
                }}
                height={400}
              ></Skeleton>
            )}
            <form>
              <input
                type="file"
                id="userImg"
                accept="image/*"
                style={{ display: "none" }}
                onChange={ImageUploadHandler}
              />

              <Fab
                disabled={userState?.isPending}
                color="primary"
                aria-label="add"
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  right: "-10px",
                  zIndex: 4,
                }}
                size="small"
                onClick={() => {
                  const inputButton = document.getElementById("userImg");
                  inputButton.click();
                }}
              >
                <AddIcon></AddIcon>
              </Fab>
            </form>
          </div>
        </div>
        <div className="userInformationContainer">
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value={1} label="Edit Profile "></Tab>
              <Tab value={2} label="Followers(10)" />
              <Tab value={3} label="Following 0" />
            </Tabs>
            <Routes>
              <Route
                path="/"
                element={
                  <form className="profileForm" onSubmit={submitHandler}>
                    <span> Update You Profile</span>
                    <input
                      type="text"
                      placeholder="Display Name"
                      name="displayName"
                      value={form.displayName}
                      onChange={changeHandler}
                    />
                    <input
                      type="email"
                      placeholder="email"
                      name="email"
                      value={form.email}
                      onChange={changeHandler}
                    />
                    <textarea
                      placeholder="Profile Description"
                      rows={8}
                      name="description"
                      value={form.description}
                      onChange={changeHandler}
                    />

                    <button disabled={userState?.isPending} type="submit">
                      Update
                    </button>
                  </form>
                }
              />
              <Route path="/followers" element={<UserList />} />
              <Route path="/following" element={<UserList />} />
            </Routes>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
