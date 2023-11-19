import React, { useRef } from "react";

const DatasetUpload = ({ handleDatasetChange, handleDatasetUpload }) => {
  const fileInputRef = useRef(null);

  return (
    <div className="flex items-center space-x-7">
      <div className="relative">
        <label
          htmlFor="fileInput"
          className="px-4 py-2 rounded cursor-pointer text-textColor bg-accentColor"
        >
          Choose File
        </label>
        <input
          type="file"
          id="fileInput"
          multiple
          onChange={handleDatasetChange}
          className="hidden left-[-4px]"
          ref={fileInputRef}
        />
      </div>
      <button
        onClick={handleDatasetUpload}
        className="px-6 py-2 border-r-4 rounded cursor-pointer bg-accentColor text-textColor"
      >
        Upload
      </button>
    </div>
  );
};

export default DatasetUpload;
