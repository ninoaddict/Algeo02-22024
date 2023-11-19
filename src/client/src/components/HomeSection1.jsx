import React, { useState } from "react";
import ImageCard from "./ImageCard";
import ToggleButton from "./ToggleButton";
import SingleImageButton from "./SingleImageUpload";
import SearchResult from "./SearchResult";
import NewDatasetUpload from "./NewDatasetUpload";
import JSZip from "jszip";
import ResultDisplay from "./ResultDisplay";
import swal from "sweetalert";

const HomeSection1 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDatasetUploaded, setIsDatasetUploaded] = useState(false);
  const [files, setFiles] = useState(null);
  const [resultImages, setResultImages] = useState([]);
  const [imagesPerPage, setImagePerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = resultImages.slice(indexOfFirstImage, indexOfLastImage);
  // Pagination Logic
  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  // Dataset Handler
  const handleDatasetChange = (e) => {
    setFiles(e.target.files);
  };

  const handleDatasetDrop = (e) => {
    e.preventDefault();
    setFiles(e.dataTransfer.files);
  };

  async function handleDatasetUpload(e) {
    try {
      if (!files || files.length === 0) {
        console.error("No files selected");
        return;
      }

      const readFile = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function (event) {
            resolve(event.target.result);
          };
          reader.onerror = function (error) {
            swal("errrrr");
            console.log("eror disini");
            reject(`Error reading file ${file.name}: ${error.message}`);
          };

          reader.readAsArrayBuffer(file);
        });
      };

      const zip = new JSZip();

      for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        const content = await readFile(fileName);
        zip.file(fileName.name, content);
      }

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });

      const formData = new FormData();
      formData.append("zipFile", zipBlob, "images.zip");
      console.log(formData);

      const response = await fetch("http://localhost:9000/upload/folder", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Server response: ", data);
          setIsDatasetUploaded(true);
          console.log(data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  }

  // Image Handler
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

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    // Memeriksa apakah ada file dan hanya satu file
    if (
      droppedFiles.length === 1 &&
      droppedFiles[0].type.startsWith("image/")
    ) {
      const file = droppedFiles[0];

      setSelectedFile(file);

      // Membuat pratinjau gambar
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please drop only one image file.");
    }
  };

  // Toggle Handler
  const handleToggle = () => {
    console.log(!isEnabled);
    setIsEnabled(!isEnabled);
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
        const searchMethod = isEnabled ? "texture" : "color";
        const response = await fetch(
          "http://localhost:9000/upload/" + searchMethod,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Upload failed");
        }
        const data = await response.json();

        // console.log(data);
        if (data != null) {
          setResultImages(data);
        } else {
          setResultImages([]);
        }
        console.log("Upload successful:", data);
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen space-y-8">
      <div className="flex flex-wrap space-x-8">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-extrabold text-transparent font-arial text-bold bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Upload Image{" "}
          </h1>
          <ImageCard
            imageUrl={previewUrl}
            handleDrop={handleDrop}
            handleRemove={handleRemove}
            handleImageChange={handleImageChange}
          />
        </div>
        <div className="flex flex-col items-center space-y-12">
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold text-transparent font-arial text-bold bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Upload Dataset
            </h1>
            <NewDatasetUpload
              handleDatasetDrop={handleDatasetDrop}
              handleDatasetChange={handleDatasetChange}
              handleDatasetUpload={handleDatasetUpload}
            />
          </div>
          <ToggleButton enabled={isEnabled} handleToggleClick={handleToggle} />
        </div>
      </div>
      <div>
        <SearchResult
          isDatasetUploaded={isDatasetUploaded}
          isImageChosen={selectedFile ? true : false}
          handleSearch={handleSearch}
        />
      </div>
      <div className="flex min-h-screen item-center">
        {resultImages.length > 0 && (
          <ResultDisplay
            resultCount={resultImages.length}
            paginate={paginate}
            currentPage={currentPage}
            currentImages={currentImages}
            imagesPerPage={imagesPerPage}
          />
        )}
      </div>
    </div>
  );
};

export default HomeSection1;
