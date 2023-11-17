import React from "react";
import HomeSection1 from "./HomeSection1";
import Header from "./Header";

const UploadPage = () => {
  return (
    <div className="bg-gradient-to-r from-backColor1 to-black">
      <Header />
      <div className="container mx-12 mt-24">
        <h2 className="mb-4 text-2xl font-bold text-accentColor">
          Upload Page
        </h2>
        <HomeSection1 />
      </div>
    </div>
  );
};

export default UploadPage;
