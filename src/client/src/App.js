import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Description from "./components/Description";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/description" element={<Description />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};