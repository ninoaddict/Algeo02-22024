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
      <div className="mx-12">
        <h2 className="mt-24 mb-4 text-2xl font-bold text-accentColor">
          Upload Page
        </h2>
        <HomeSection1 />
      </div>
    </div>
  );
};

export default UploadPage;
