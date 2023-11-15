import React from "react";

const DatasetUpload = (handleDatasetChange, handleDatasetUpload) => {
  return (
    <div>
      <input type="file" onChange={handleDatasetChange} />
      <button onClick={handleDatasetUpload}>Upload</button>
    </div>
  );
};

export default DatasetUpload;
