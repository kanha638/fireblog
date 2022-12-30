import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import Error404 from "../components/Error404";

const Profile = () => {
  const user = useSelector(selectUser);
  const [value, setValue] = React.useState(1);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 2) navigate(`followers`);
    else if (newValue === 1) navigate(`/user/${user?.uid}`);
    else navigate("following");
  };
  return (
    <div className="profilePageContainer">
      <div className="profilePageInsideContainer">
        <div className="profileInfoContainer">
          <div style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"></img>
            {/* <hr /> */}
            <Fab
              color="primary"
              aria-label="add"
              style={{ position: "absolute", bottom: "-10px", right: "-10px" }}
              size="small"
            >
              <AddIcon></AddIcon>
            </Fab>
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
                  <form className="profileForm">
                    <span> Update You Profile</span>
                    <input
                      type="text"
                      placeholder="Display Name"
                      value={user.displayName}
                    />
                    <input
                      type="email"
                      placeholder="email"
                      value={user?.email}
                    />
                    <textarea placeholder="Profile Description" rows={8} />
                    <button>Update</button>
                  </form>
                }
              />
              <Route
                path="/followers"
                element={
                  <div
                    style={{
                      color: "black",
                    }}
                  >
                    Follwers page
                  </div>
                }
              />
              <Route
                path="/following"
                element={
                  <div
                    style={{
                      color: "black",
                    }}
                  >
                    Follwing page
                  </div>
                }
              />
            </Routes>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
