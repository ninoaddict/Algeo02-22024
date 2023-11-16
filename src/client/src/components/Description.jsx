import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import UploadIcon from '@mui/icons-material/Upload';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Description() {
  return (
    <Timeline position="alternate" className='text-white' style={{maxWidth: "750px"}}>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color='primary'>
            <FolderIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '20px', px: 2 }}>
          <Typography variant="h3" component="span" style={{ fontFamily: "Inter, system-ui", fontWeight: "600"}}>
            Dataset
          </Typography>
          <Typography variant="h6">Upload your dataset to the provided form</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <UploadIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '20px', px: 2 }}>
          <Typography variant="h3" component="span" style={{ fontFamily: "Inter, system-ui", fontWeight: "600" }}>
            Query
          </Typography>
          <Typography variant="h6">Upload your query image</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <ImageSearchIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '20px', px: 2 }}>
          <Typography variant="h3" component="span" style={{ fontFamily: "Inter, system-ui", fontWeight: "600" }}>
            Search
          </Typography>
          <Typography variant="h6">Don&apos;t forget to click the search button after you submit the query image</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector/>
          <TimelineDot color="primary">
            <CheckCircleIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '20px', px: 2 }}>
          <Typography variant="h3" component="span" style={{ fontFamily: "Inter, system-ui", fontWeight: "600" }}>
            Done
          </Typography>
          <Typography variant="h6">Wait for a couple of second and your result images will be ready</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}