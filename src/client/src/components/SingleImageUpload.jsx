import React from "react";

const SingleImageButton = ({ handleImageChange }) => {
  return (
    <div className="flex flex-col">
      <input
        className="block w-[600px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      <p
        className="mt-1 text-xs text-textColor dark:text-backColor3"
        id="file_input_help"
      >
        *PNG or JPG (MAX. 800x400px).
      </p>
    </div>
  );
};

export default SingleImageButton;
