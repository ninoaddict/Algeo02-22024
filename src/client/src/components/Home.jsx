import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Description from "./Description";
import About from "./About"
import { Link, useLocation } from "react-router-dom";
import './../index.css';

const Home = () => {
  const loc = useLocation();

  useEffect(() => {
    const elmtID = loc.hash.substring(1);
    scrollToElmt(elmtID);
  }, [loc]);

  const scrollToElmt = (elmtID) => {
    const elmt = document.getElementById(elmtID);
    if (elmt){
      elmt.scrollIntoView();
    }
  }

  return (
    <div className="cont" style={{scrollBehavior:'smooth'}}>
      <Header />
      <div className="home" id="home" style={{scrollBehavior:'smooth'}}>
        <div className="home-text">
          <div className="md:flex md:flex-col md:items-center">
            <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 sm:text-6xl md:text-7xl lg:text-8xl text-4xl" style={{ fontFamily: "Inter, system-ui", maxWidth: "912px", textAlign: "center"}}>Discover The World In Pixels</h1>
          </div>
          <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold md:pt-2 md:pb-3 md:px-5 rounded-full md:text-2xl py-1 px-3">
            <Link to="/upload" className="m-0 p-0 hoverNav">Get Started</Link>
          </button>
        </div>
      </div>
      <div id="description" className='px-5 flex md:flex-row flex-col justify-center overflow-hidden md:gap-0 gap-10' style={{scrollBehavior:'smooth'}}>
        <div className="description-title flex items-center justify-center md:pr-10 md:w-1/2 overflow-hidden">
          <h1 className="font-extrabold text-transparent md:text-7xl lg:text-8xl sm:text-6xl text-4xl bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500" style={{ fontFamily: "Inter, system-ui" }}>How To Use</h1>
        </div>
        <div className="description-text flex items-center md:w-1/2">
          <Description />
        </div>
      </div>
      <About />
    </div>
  );
};

export default Home;
