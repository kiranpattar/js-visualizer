import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css"; // optional for styling

const Layout = () => {
  return (
    <div className="layout">
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <Link to="/">JS Editor</Link> | <Link to="/docs">Documentation</Link> | <Link to="/about">About</Link>
      </nav>

      {/* Main content routed via Outlet */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
