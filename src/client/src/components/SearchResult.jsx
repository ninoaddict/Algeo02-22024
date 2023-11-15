import React from "react";

const SearchResult = (handleSearch, isDatasetUploaded) => {
  return (
    <div>
      <button
        onClick={handleSearch}
        className="w-full px-4 py-2 rounded bg-backColor2 text-textColor hover:bg-backColor3"
      >
        Search
      </button>
    </div>
  );
};

export default SearchResult;
