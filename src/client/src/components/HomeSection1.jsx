import React, { useState } from "react";
import ImageCard from "./ImageCard";
import ToggleButton from "./ToggleButton";
import SingleImageButton from "./SingleImageUpload";
import SearchResult from "./SearchResult";
import DatasetUpload from "./DatasetUpload";
import JSZip from "jszip";

const HomeSection1 = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDatasetUploaded, setIsDatasetUploaded] = useState(false);
  const [files, setFiles] = useState(null);

  const handleDatasetChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleDatasetUpload = async () => {
    try {
      if (!files || files.length === 0) {
        console.error("No files selected");
        return;
      }

      const zip = new JSZip();

      Array.from(files).forEach((file, index) => {
        zip.file(`image_${index + 1}.jpg`, file);
      });

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipFile = new File([zipBlob], "images.zip", {
        type: "application/zip",
      });

      const formData = new FormData();
      formData.append("zipFile", zipFile);

      const response = await fetch("http://localhost:9000/upload/folder", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setIsDatasetUploaded(true);
        console.log("Server response:", responseData);
      } else {
        console.error("Error uploading images:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
    console.log(isEnabled);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      searhResult(formData);
    } else {
      console.log("No file selected.");
    }

    async function searhResult(formData) {
      try {
        const response = await fetch("http://localhost:9000/upload/image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }
        const data = await response.json();

        console.log("Upload successful:", data);
        onUploadSuccess(data.imageUrl);
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <ImageCard imageUrl={previewUrl} />
        <div className="flex flex-col ">
          <div className="flex flex-col items-start ml-2 space-y-20">
            <DatasetUpload
              handleDatasetChange={handleDatasetChange}
              handleDatasetUpload={handleDatasetUpload}
            />
            <SingleImageButton handleImageChange={handleImageChange} />
            <ToggleButton
              enabled={isEnabled}
              handleToggleClick={handleToggle}
            />
            <SearchResult
              isDatasetUploaded={isDatasetUploaded}
              handleSearch={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection1;
