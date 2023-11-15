import React from "react";

const ImageCard = ({ imageUrl }) => {
  console.log("Image URL:", imageUrl);

  return (
    <div
      className="w-[600px] h-[400px] mx-auto cursor-pointer bg-backColor3  overflow-hidden shadow-lg rounded-2xl 
    p-8"
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
    </div>
  );
};

export default ImageCard;
