import React, { useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const DatasetUpload = ({ handleDatasetChange }) => {
  const fileInputRef = useRef(null);

  return (
    <div className="flex items-center space-x-7">
      <div className="flex justify-center">
        <label
          htmlFor="fileInput"
          className="flex items-center justify-center w-[120px] h-[40px] p-2 text-white hover:bg-blue-700 bg-blue-500 hover:border-blue-700 border-blue-500 border rounded-full cursor-pointer focus:outline-none transition-all duration-300"
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
    </div>
  );
};

const NewDatasetUpload = ({
  handleDatasetDrop,
  handleDatasetChange,
  handleDatasetUpload,
}) => {
  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  async function sendUrlToBackend(e) {
    const apiUrl = "http://localhost:9000/upload/url";

    try {
      // Create a JSON object with the URL string
      const data = {
        urlPath: e.target,
      };
      console.log(e.target);

      // Make a POST request to the backend
      const response = await fetch(apiUrl, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json", // Specify the content type as JSON
        //   // Add any additional headers if needed
        // },
        body: JSON.stringify(data), // Convert the data object to a JSON string
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Server response:", responseData);

      // Handle the response from the server as needed
      return responseData;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Choose Folder" />
          <Tab label="Drag and Drop" />
          <Tab label="Web Scrapping" />
        </Tabs>
      </AppBar>
      <div axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <DatasetUpload handleDatasetChange={handleDatasetChange} />
          <button
            onClick={handleDatasetUpload}
            className="block w-[120px] p-2 mt-2  text-white  hover:bg-blue-700 bg-blue-500 hover:border-blue-700 border-blue-500 border  rounded-full cursor-pointer focus:outline-none transition-all duration-300 "
          >
            Upload
          </button>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div
            onDrop={handleDatasetDrop}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            className="flex flex-col items-center p-20 border-2 border-gray-300 dashed"
          >
            <span className="mb-4">Drag and drop files here</span>
            <button
              onClick={handleDatasetUpload}
              className="w-32 p-2 text-white transition-all duration-300 bg-blue-500 border border-blue-500 rounded-full cursor-pointer hover:bg-blue-700 hover:border-blue-700 focus:outline-none"
            >
              Upload
            </button>
          </div>
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <form
            onSubmit={sendUrlToBackend}
            className="flex flex-col items-center space-y-4"
          >
            <label className="text-lg font-semibold">
              Insert URL:
              <input
                type="url"
                name="urlPath"
                className="p-2 border-2 border-gray-300 rounded"
                placeholder="https://example.com"
                required
              />
            </label>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
              type="submit"
            >
              Send URL
            </button>
          </form>
        </TabPanel>
      </div>
      {/* <button
        onClick={handleDatasetUpload}
        className="px-6 py-2 mt-4 transition-transform transform border-r-4 rounded cursor-pointer bg-accentColor text-textColor hover:scale-105 hover:bg-opacity-80"
      >
        Upload
      </button> */}
    </Box>
  );
};

export default NewDatasetUpload;
