import React, { useState, useRef } from "react";

const SingleImageButton = ({ handleImageChange }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col">
      <button
        className="block w-[120px] p-2 mt-2  text-white  hover:bg-blue-700 bg-blue-500 hover:border-blue-700 border-blue-500 border  rounded-full cursor-pointer focus:outline-none transition-all duration-300 "
        onClick={handleClick}
      >
        choose image
      </button>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
    </div>
  );
};

const ImageCard = ({
  imageUrl,
  handleDrop,
  handleRemove,
  handleImageChange,
}) => {
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
      className="flex items-center justify-center pb-4"
    >
      <div
        className={`flex flex-col w-[600px] h-[400px] mx-auto cursor-pointer overflow-hidden shadow-lg rounded-2xl p-8 ${
          imageUrl ? "bg-accentColor" : "bg-backColor3"
        }`}
      >
        <div className="flex items-center justify-center h-full">
          {imageUrl ? (
            <div className="flex flex-col items-center space-y-3">
              <img
                src={imageUrl}
                alt="UploadedImage"
                className="object-contain object-center max-w-[400px] max-h-[300px] w-full h-full rounded-lg"
                onError={(e) => console.error("Error loading image:", e)}
              />
              <button
                className=" block w-[120px] p-2 mt-2  text-white  hover:bg-blue-700 bg-blue-500 hover:border-blue-700 border-blue-500 border  rounded-full cursor-pointer focus:outline-none transition-all duration-300 "
                onClick={handleRemove}
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <SingleImageButton handleImageChange={handleImageChange} />
              <div className="text-textColor">OR</div>
              <div className="text-textColor">drag & drop your image here</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
