import React from "react";
import logo from "../AppBar.logo.svg";
import "../css/AppBar.css";

const Header = () => (
  <>
    <nav className="AppBar">
      <img
        className="AppBar-logo"
        src={logo}
        aria-label="people"
        alt="People"
      />
    </nav>
  </>
);

export default Header;
