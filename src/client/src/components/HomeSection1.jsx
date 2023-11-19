import React, { useState } from "react";
import ImageCard from "./ImageCard";
import ToggleButton from "./ToggleButton";
import SingleImageButton from "./SingleImageUpload";
import SearchResult from "./SearchResult";
import NewDatasetUpload from "./NewDatasetUpload";
import JSZip, { file, files } from "jszip";
import ResultDisplay from "./ResultDisplay";
import Swal from "sweetalert2";
import axios from "axios";

const HomeSection1 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDatasetUploaded, setIsDatasetUploaded] = useState(false);
  const [files, setFiles] = useState([]);
  const [resultImages, setResultImages] = useState([]);
  const [imagesPerPage, setImagePerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [time, setTime] = useState(0);
  const [waiting, setWaiting] = useState(false);

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

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const handleDatasetUpload = async (e) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No dataset uploaded!",
      });
      return;
    }

    const startTime = performance.now();
    const zip = new JSZip();

    setWaiting(true);

    try {
      for (const file of files) {
        const arrayBuffer = await readFileAsArrayBuffer(file);
        zip.file(file.name, arrayBuffer);
      }

      const content = await zip.generateAsync({ type: "blob" });
      const formData = new FormData();
      formData.append("zipFile", content);

      const response = await axios
        .post("http://localhost:9000/upload/folder", formData, {
          timeout: 20000,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error uploading dataset!",
          });
        })
        .finally(() => {
          setWaiting(false);
          setFiles([]);
          setIsDatasetUploaded(true);
          const endTime = performance.now();
          const diffTime = (endTime - startTime) / 1000;
          setTime(diffTime);
          Swal.fire({
            icon: "success",
            title: "Folder uploaded in " + diffTime.toFixed(2) + " second",
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error uploading dataset!",
      });
    }
  };

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
