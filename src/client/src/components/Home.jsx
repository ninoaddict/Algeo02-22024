import React, { useState } from "react";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
import './../index.css';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="home-text">
        <div className="md:flex md:flex-col md:items-center" style={{ marginTop: "-30px" }}>
          <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600" style={{ fontFamily: "Inter, system-ui" }}>Discover The World</h1>
          <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600" style={{ fontFamily: "Inter, system-ui" }}>In Pixels</h1>
        </div>
        <button class="bg-blue-600 hover:bg-blue-800 text-white font-bold pt-2 pb-3 px-5 rounded-full text-3xl">
          <Link to="/upload" className="m-0 p-0">Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
