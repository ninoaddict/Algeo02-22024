import React from "react";
import { Pagination } from "@mui/material";

function Item({ fileComponent }) {
  const filePath = "dataset/" + fileComponent.name;
  const simp = fileComponent.simp;
  const percent = simp?.toFixed(2) + "%";
  return (
    <div className="item-page">
      <div className="percent-info">
        <p>{percent}</p>
      </div>
      <br />
      <img src={filePath} alt="Similar Image" className="item-image" />
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
    <div>
      <div>
        <p>banyak gambar {resultCount} </p>
      </div>
      <div>
        <div>
          {currentImages.map((fileImg, index) => (
            <Item key={index} fileComponent={fileImg} />
          ))}
        </div>
      </div>
      <div>
        <Pagination
          count={Math.ceil(resultCount / imagesPerPage)}
          page={currentPage}
          onChange={paginate}
          color="secondary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default ResultDisplay;
