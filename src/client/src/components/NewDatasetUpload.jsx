import React, { useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
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
      <div className="relative">
        <label
          htmlFor="fileInput"
          className="px-4 py-2 rounded cursor-pointer text-textColor bg-accentColor"
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
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div
            onDrop={handleDatasetDrop}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            style={{
              border: "2px dashed #ccc",
              padding: "20px",
              textAlign: "center",
            }}
          >
            Drag and drop files here
          </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <form onSubmit={sendUrlToBackend}>
            <label>
              Insert Url:
              <input type="url" name="urlPath" />
            </label>
            <button> sendUrl</button>
          </form>
        </TabPanel>
      </div>
      <button
        onClick={handleDatasetUpload}
        className="px-6 py-2 mt-4 transition-transform transform border-r-4 rounded cursor-pointer bg-accentColor text-textColor hover:scale-105 hover:bg-opacity-80"
      >
        Upload
      </button>
    </Box>
  );
};

export default NewDatasetUpload;
