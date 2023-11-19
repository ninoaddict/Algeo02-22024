import React from "react";
import { Pagination } from "@mui/material";

function Item({ fileComponent }) {
  const filePath = "dataset/" + fileComponent.name;
  const simp = fileComponent.simp;
  const percent = simp?.toFixed(2) + "%";
  return (
    <div className="p-4 m-2 transition-transform rounded bg-[#282c34] hover:transition-transform hover:scale-105">
      <div className="mb-2 text-center percent-info">
        <p className="font-bold text-textColor">{percent}</p>
      </div>
      <img
        src={filePath}
        alt="Similar Image"
        className="item-image w-full h-auto max-h-full max-w-[180px]"
      />
    </div>
  );
}

const ResultDisplay = ({
  paginate,
  currentPage,
  resultCount,
  currentImages,
  imagesPerPage,
}) => {
  return (
    <div className="flex-grow">
      <div>
        <p>banyak gambar {resultCount} </p>
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {currentImages.map((fileImg, index) => (
          <Item key={index} fileComponent={fileImg} />
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          count={Math.ceil(resultCount / imagesPerPage)}
          page={currentPage}
          onChange={paginate}
          color="primary"
          showFirstButton
          showLastButton
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#D1D7E0",
              "&:hover": {
                backgroundColor: "#0066cc", // Set hover background color
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ResultDisplay;
