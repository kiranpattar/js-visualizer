import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import logo from "../images/codeNurture.png"; // update the path to match your structure

const Layout = () => {
  return (
    <div className="layout">
      {/* Navigation Bar */}
      <nav className="nav-bar">
  <div className="logo-container">
    <img
      style={{ width: "75px", height: "75px" }}
      src={logo}
      alt="JS Visualizer Logo"
      className="logo"
    />
  </div>

  <div className="nav-links">
    <Link to="/">JS Editor</Link> |{" "}
    <Link to="/docs">HTML Editor</Link> |{" "}

    <Link to="/docs">Documentation</Link> |{" "}
    <Link to="/about">About</Link>
  </div>
</nav>

      {/* Main content routed via Outlet */}
      <div className="main-content">
        <Outlet />
      </div>
       <nav className="nav-bar">
 
  <div className="nav-links">
    <Link>Location</Link> |{" "}
    <Link>Contact us</Link> |{" "}
    <Link>About</Link>
  </div>
</nav>
    </div>
  );
};

export default Layout;
