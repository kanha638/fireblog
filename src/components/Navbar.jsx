import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [active, setActive] = useState("/");
  return (
    <nav>
      <input type="checkbox" id="check" />
      <label for="check" class="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label class="crossbtn" for="check">
        <i className="fa-solid fa-xmark"></i>
      </label>
      <label className="logo">FireBlog</label>
      <ul>
        <li>
          <Link
            className={active === "/" ? "active" : ""}
            to="/"
            onClick={() => setActive("/")}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            className={active === "/auth" ? "active" : ""}
            to="/auth"
            onClick={() => setActive("/auth")}
          >
            Login / Register
          </Link>
        </li>
        {/* <li>
          <a href="#">Feedback</a>
        </li> */}
      </ul>
    </nav>
  );
};
