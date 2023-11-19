import React from "react";
import Button from "@mui/material/Button";

const SearchResult = ({ handleSearch, isDatasetUploaded, isImageChosen }) => {
  return (
    <div>
      {isDatasetUploaded && isImageChosen ? (
        <Button
          variant="contained"
          onClick={handleSearch}
          className="w-full px-4 py-2 rounded bg-backColor2 text-textColor hover:bg-backColor3"
        >
          Search
        </Button>
      ) : (
        <Button variant="contained" disabled>
          Search
        </Button>
      )}
    </div>
  );
};

export default SearchResult;
