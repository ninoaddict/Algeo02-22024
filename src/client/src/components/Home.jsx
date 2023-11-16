import React, { useState } from "react";
import Header from "./Header";
import Description from "./Description";
import { Link, useLocation } from "react-router-dom";
import './../index.css';

const Home = () => {
  return (
    <div className="cont">
      <Header />
      <div className="home" id="home">
        <div className="home-text">
          <div className="md:flex md:flex-col md:items-center">
            <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600" style={{ fontFamily: "Inter, system-ui" }}>Discover The World</h1>
            <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600" style={{ fontFamily: "Inter, system-ui" }}>In Pixels</h1>
          </div>
          <button class="bg-blue-600 hover:bg-blue-800 text-white font-bold pt-2 pb-3 px-5 rounded-full text-2xl">
            <Link to="/upload" className="m-0 p-0 hoverNav">Get Started</Link>
          </button>
        </div>
      </div>
      <div id="description" className="px-5 flex">
        <div className="description-title flex items-center justify-end" style={{width: "40%"}}>
          <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500" style={{ fontFamily: "Inter, system-ui" }}>How To Use</h1>
        </div>
        <div className="description-text flex items-center justify-center" style={{width: "60%"}}>
          <Description />
        </div>
      </div>
      <div id="about" className="grow">

      </div>
    </div>
  );
};

export default Home;
