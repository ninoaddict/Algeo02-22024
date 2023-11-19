import React, { useRef } from "react";

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

export default SingleImageButton;
