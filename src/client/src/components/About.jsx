import React, { useState, useEffect } from "react";
import Header from "./Header";
import ImageAvatars from "./Avatar";
import './../index.css';

const About = () => {
  
  return (
    <div id="about" className="flex flex-col justify-center items-center px-5 py-6">
      <div className="about-text max-w-screen-lg flex flex-col items-center">
        <h1 className="font-extrabold text-transparent md:text-7xl lg:text-8xl sm:text-6xl text-4xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800 md:mb-10 sm:mb-8 mb-5"  style={{ fontFamily: "Inter, system-ui"}}>About Us</h1>
        <p className="text-white md:text-3xl text-center text-lg sm:text-2xl"  style={{ fontFamily: "Inter, system-ui"}}>We are a group of undergraduate computer science students from Bandung Institute Of Technology (ITB). This website aims to fulfill assignments from linear algebra and geometry courses.</p>
      </div>
      <ImageAvatars />
    </div>
  );
};

export default About;
