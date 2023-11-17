import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadPage from "./components/UploadPage";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
