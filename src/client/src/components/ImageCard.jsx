import React, { useState } from "react";

const ImageCard = ({ imageUrl, handleDrop, handleRemove }) => {
  const [isDropped, setIsDropped] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDropped(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDropped(false);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className={`w-[600px] h-[400px] mx-auto cursor-pointer  overflow-hidden shadow-lg rounded-2xl p-8 ${
          imageUrl ? "bg-accentColor" : "bg-backColor3"
        }`}
      >
        <div className="flex items-center justify-center h-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="UploadedImage"
              className="object-contain object-center w-full h-full rounded-lg"
              onError={(e) => console.error("Error loading image:", e)}
            />
          ) : (
            <div>
              <div className="flex items-center justify-center w-full h-full text-textColor">
                drag & drop your image here
              </div>
            </div>
          )}
        </div>
        <button
          className="px-6 py-2 border-r-4 rounded cursor-pointer bg-accentColor text-textColor"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
