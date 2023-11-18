import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Description from "../components/Description";
import { Link, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import './../index.css';
import JSZip from 'jszip';

function UploadPage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState(null);
    const [queryType, setQueryType] = useState(false);
    const [image, setImage] = useState(null);
    const [waiting, setWaiting] = useState(false);
    const [listSimilarImage, setListSimilarImage] = useState([]);
    const [time, setTime] = useState(0);
    const [IsEnabled, setIsEnabled] = useState(false);
    const [imageNum, setImageNum] = useState(30);
    const [currPage, setCurrPage] = useState(1);
    const [selectedFolder, setSelectedFolder] = useState([]);
    const [folderUploadType, setFolderUploadType] = useState(false);

    /** Image Upload Handler */
    const handleToggle = () => {
        console.log(queryType);
        let temp = queryType;
        setQueryType(!temp);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setSelectedFileName(file.name);
            setImage(file);
        }
    }

    const handleRemove = () => {
        setSelectedFileName(null);
        setSelectedImage(null);
        setImage(null);
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

            setImage(droppedFiles);
            setSelectedFileName(droppedFiles.name);
            setSelectedImage(URL.createObjectURL(droppedFiles));
        } else {
            Swal.fire({
                icon: "error",
                title: "Only drop one image file!"
            })
        }
    };

    const handleSearch = async () => {
        if (!IsEnabled) {
            Swal.fire({
                icon: "warning",
                title: "Upload your dataset first!"
            });
            return;
        }
        if (!image) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No file selected!"
            })
            return;
        }
        const startTime = performance.now();
        const formData = new FormData();
        formData.append('file', image);
        console.log(formData);

        let typeSearch = queryType ? 'http://localhost:9000/upload/color' : 'http://localhost:9000/upload/texture';

        setWaiting(true);

        try {
            const response = await fetch(typeSearch, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            const dataObj = JSON.parse(data);
            const len = data.length;

            const endTime = performance.now();
            let diffTime = endTime - startTime;
            diffTime /= 1000;
            diffTime = diffTime.toFixed(2);
            setTime(diffTime);

            const showDataNum = 'Found ' + len + ' image.';
            Swal(showDataNum);

            console.log('Data: ', dataObj);

            if (data != null) {
                setListSimilarImage(dataObj);
            }
            else {
                setListSimilarImage([]);
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error Uploading File!"
            });
        } finally {
            Swal.fire({
                icon: "success",
                title: "File uploaded!",
            });
            setWaiting(false);
        }
    };

    useEffect(() => {
        console.log('Selected Image: ', selectedImage);
    }, [selectedImage]);


    /* Handle for Folder */
    const handleFolderToggle = () => {
        let temp = folderUploadType;
        setFolderUploadType(!temp);
        setSelectedFolder([]);
    };

    const handleDatasetChange = (e) => {
        setSelectedFolder(e.target.files);
    }

    const handleDatasetUpload = async () => {
        if (!selectedFolder || selectedFolder.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "No dataset uploaded!"
            });
            return;
        }
        const startTime = performance.now();
        const zip = new JSZip();
        const filesSelected = selectedFolder;
        for (let file in filesSelected) {
            zip.file(file.name, file);
        }

        setWaiting(true);
        zip.generateAsync({ type: 'blob' }).then((content) => {
            const formData = new FormData();
            formData.append('zipFile', content);

            // post method
            axios.post('http://localhost:9000/upload/folder', formData)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Error Uploading File!"
                    });
                })
                .finally(() => {
                    setWaiting(false);
                    setSelectedFolder([]);
                    const endTime = performance.now();
                    let diffTime = (endTime - startTime) / 1000;
                    setTime(diffTime);
                });
            setSelectedFolder([]);
        });
    };

    const handleWebScrappingUpload = async () => {
        const startTime = performance.now();
        
        const endTime = performance.now();
    };

    /* Handle for paginations */

    const lastImageIndex = currPage * imageNum;
    const firstImageIndex = lastImageIndex - imageNum;
    const currImage = listSimilarImage.slice(firstImageIndex, lastImageIndex);

    const paginate = (event, value) => {
        setCurrPage(value);
    };

    return (
        <div className="container-all">
            <Header />
            <div className="container-content">
                <section className="upload-section">
                    halo
                </section>
            </div>
        </div>
    )
}

export default UploadPage;