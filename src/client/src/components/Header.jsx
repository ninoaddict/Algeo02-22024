import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <nav
      className="fixed top-0 border-gray-200 navtop"
      style={{ width: "100%", zIndex: 999 }}
    >
      <div className="flex flex-wrap items-center justify-between px-10 mx-auto">
        <Link
          className="flex items-center space-x-3 rtl:space-x-reverse"
          to="/"
        >
          <img src="hlogo.png" alt="" width={100} height={100} />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto md:mr-9"
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 mt-4 font-serif text-xl border border-gray-100 rounded-lg md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-navColor">
            <a
              href="/#home"
              className="block px-3 py-2 md:border-0 md:p-0 scroll-smooth"
            >
              <li
                className={`p-4 hoverNav ${
                  location.hash === "#home" || location.hash === ""
                    ? "text-white font-bold"
                    : ""
                }`}
              >
                Home
              </li>
            </a>
            <a
              href="/#description"
              className="block px-3 py-2 md:border-0 md:p-0 scroll-smooth"
            >
              <li
                className={`p-4 hoverNav ${
                  location.hash === "#description" ? "text-white font-bold" : ""
                }`}
              >
                Description
              </li>
            </a>
            <a
              href="/#about"
              className="block px-3 py-2 md:border-0 md:p-0 scroll-smooth"
            >
              <li
                className={`p-4 hoverNav ${
                  location.hash === "#about" ? "text-white font-bold" : ""
                }`}
              >
                About
              </li>
            </a>
          </ul>
        </div>
        <Link to="/upload">
          <button className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700">
            Try Now
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
