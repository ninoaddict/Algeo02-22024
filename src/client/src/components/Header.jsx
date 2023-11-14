import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [page, setPage] = useState(false);

  const handlePageClick = () => {
    setPage(false);
  };

  return (
    <div className="bg-accentColor flex justify-between items-center h-24 mx-auto px-4 text-textColor">
      <Link to="/" className="text-3xl font-bold text-backColor1">
        PA_LENZ
      </Link>
      <ul className={`flex`}>
        <li
          className={`p-4 hover:underline ${
            location.pathname === "/description" ? "font-bold" : ""
          }`}
          onClick={handlePageClick}
        >
          <Link to="/description">Description</Link>
        </li>
        <li
          className={`p-4 hover:underline ${
            location.pathname === "/about" ? "font-bold" : ""
          }`}
          onClick={handlePageClick}
        >
          <Link to="/about">About</Link>
        </li>
        <li
          className={`p-4 hover:underline ${
            location.pathname === "/" ? "font-bold" : ""
          }`}
          onClick={handlePageClick}
        >
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
