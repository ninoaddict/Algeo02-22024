import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Description from "./Description";
import About from "./About";
import { Link, useLocation } from "react-router-dom";
import "./../index.css";

const Home = () => {
  const loc = useLocation();

  useEffect(() => {
    const elmtID = loc.hash.substring(1);
    scrollToElmt(elmtID);
  }, [loc]);

  const scrollToElmt = (elmtID) => {
    const elmt = document.getElementById(elmtID);
    if (elmt) {
      elmt.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="cont" style={{ scrollBehavior: "smooth" }}>
      <Header />
      <div className="home" id="home" style={{ scrollBehavior: "smooth" }}>
        <div className="home-text">
          <div className="md:flex md:flex-col md:items-center">
            <h1
              className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 sm:text-6xl md:text-7xl lg:text-8xl"
              style={{
                fontFamily: "Inter, system-ui",
                maxWidth: "912px",
                textAlign: "center",
              }}
            >
              Discover The World In Pixels
            </h1>
          </div>
          <button class="bg-blue-600 hover:bg-blue-800 text-white font-bold pt-2 pb-3 px-5 rounded-full text-2xl">
            <Link to="/upload" className="p-0 m-0 hoverNav">
              Get Started
            </Link>
          </button>
        </div>
      </div>
      <div
        id="description"
        className="flex flex-col justify-center gap-10 px-5 overflow-hidden md:flex-row md:gap-0"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex items-center justify-center overflow-hidden description-title md:pr-10 md:w-1/2">
          <h1
            className="text-4xl font-extrabold text-transparent md:text-7xl lg:text-8xl sm:text-6xl bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500"
            style={{ fontFamily: "Inter, system-ui" }}
          >
            How To Use
          </h1>
        </div>
        <div className="flex items-center description-text md:w-1/2">
          <Description />
        </div>
      </div>
      <About />
    </div>
  );
};

export default Home;
