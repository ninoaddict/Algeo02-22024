import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Description from "../components/Description";
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
    if (elmt) {
      elmt.scrollIntoView({ behavior: "smooth", block: 'start' });
    }
  }

  return (
    <div className="cont" style={{ scrollBehavior: 'smooth' }}>
      <Header />
      <div className="home" id="home" style={{ scrollBehavior: 'smooth' }}>
        <div className="home-text">
          <div className="md:flex md:flex-col md:items-center">
            <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600" style={{ fontFamily: "Inter, system-ui" }}>Discover The World</h1>
            <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600" style={{ fontFamily: "Inter, system-ui" }}>In Pixels</h1>
          </div>
          <Link to="/upload" className="m-0 p-0">
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold pt-2 pb-3 px-5 rounded-full text-2xl hoverNav">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <div id="description" className='px-5 flex' style={{ scrollBehavior: 'smooth' }}>
        <div className="description-title flex items-center justify-end pr-10" style={{ width: "45%" }}>
          <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500" style={{ fontFamily: "Inter, system-ui" }}>How To Use</h1>
        </div>
        <div className="description-text flex items-center" style={{ width: "55%" }}>
          <Description />
        </div>
      </div>
      <div id="about" style={{ scrollBehavior: 'smooth' }}>
        
      </div>
    </div>
  );
};

export default Home;
