import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <nav className="fixed top-0 border-gray-200 navtop" style={{ width: "100%" }}>
      <div className="flex flex-wrap items-center justify-between mx-auto px-10">
        <Link className="flex items-center space-x-3 rtl:space-x-reverse" to="/">
          <img src="hlogo.png" alt="" width={100} height={100} />
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto md:mr-9" id="navbar-default">
          <ul className="text-xl font-serif flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-navColor">
            <a href="/#home" className="block py-2 px-3 md:border-0 md:p-0 scroll-smooth">
              <li
                className={`p-4 hoverNav ${location.hash === "#home" || location.hash === ''? "text-white font-bold" : ""
                  }`}
              >
                Home
              </li>
            </a>
            <a href="/#description" className="block py-2 px-3 md:border-0 md:p-0 scroll-smooth">
              <li
                className={`p-4 hoverNav ${location.hash === "#description" ? "text-white font-bold" : ""
                  }`}
              >
                Description
              </li>
            </a>
            <a href="/#about" className="block py-2 px-3 md:border-0 md:p-0 scroll-smooth">
              <li
                className={`p-4 hoverNav ${location.hash === "#about" ? "text-white font-bold" : ""
                  }`}
              >
                About
              </li>
            </a>
          </ul>
        </div>
        <Link to="/upload">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm">
            Try Now
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
