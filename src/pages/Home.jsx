import { Fab, Tab, Tabs } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { border, Box } from "@mui/system";

import BlogList from "../components/BlogList";

const Home = () => {
  const [value, setValue] = React.useState("/");

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    searchParams.delete("search");
    if (newValue === "/") {
      navigate("/");
      return;
    }
    navigate(`/${newValue}`);
  };

  return (
    <div className="homepagecontainer">
      <Box sx={{ width: "70%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="secondary tabs example"
          variant="scrollable"
          scrollButtons={true}
        >
          <Tab value="/" label="All Posts"></Tab>
          <Tab value="sports" label="Sports" />
          <Tab value="politics" label="Politics" />
          <Tab value="technology" label="Technology" />
          <Tab value="bollywood" label="Bollywood" />
          <Tab value="music" label="Music" />
          <Tab value="health" label="Health" />
        </Tabs>

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/sports" element={<BlogList />} />
          <Route path="/politics" element={<BlogList />} />
          <Route path="/technology" element={<BlogList />} />
          <Route path="/bollywood" element={<BlogList />} />
          <Route path="/music" element={<BlogList />} />
          <Route path="/health" element={<BlogList />} />
        </Routes>
      </Box>

      <Link to="/create">
        <Fab
          color="primary"
          aria-label="edit"
          style={{
            position: "absolute",
            bottom: 80,
            right: 40,
          }}
        >
          <EditIcon />
        </Fab>
      </Link>
    </div>
  );
};

export default Home;
