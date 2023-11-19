import React from "react";
import HomeSection1 from "./HomeSection1";
import Header from "./Header";

const UploadPage = () => {
  return (
    <div
      className="bg-gradient-to-r from-backColor1 to-black"
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      <Header />
      <div className="mx-12 mt-28">
        <HomeSection1 />
      </div>
      <div></div>
    </div>
  );
};

export default UploadPage;
