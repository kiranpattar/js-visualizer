import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditorPage from "./EditorPage";
import Layout from "./Layout"; // shared layout

function Docs() {
  return <div className="p-4">📘 This is the Documentation page.</div>;
}

function About() {
  return <div className="p-4">ℹ️ About this application.</div>;
}

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EditorPage />} />
          <Route path="docs" element={<Docs />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Main;
