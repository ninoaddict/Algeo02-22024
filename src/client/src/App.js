import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Description from "./components/Description";
import UploadPage from "./page/UploadPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/upload" element={< UploadPage />}></Route>
      </Routes>
    </Router>
  );
};


export default App;
