import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [page, setPage] = useState(false);

  const handlePageClick = () => {
    setPage(false);
  };

  return (
  );
};

export default Header;
