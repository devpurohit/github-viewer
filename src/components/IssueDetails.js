import { Box, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { dateFormatOptions } from "../constants";

const IssueDetails = () => {
  const location = useLocation();
  const issueDetails = location.state;

  if (!issueDetails) return <></>;

  return (
    <Box className="bg-gray-100 min-h-screen p-5">
      <Box className="flex justify-between items-center">
        <Typography variant="h5">{issueDetails.title}</Typography>
        <Button
          variant="contained"
          href={issueDetails.html_url}
          target="_blank"
        >
          View on GitHub
        </Button>
      </Box>
      <Box className="flex gap-10 mt-5">
        <Box className="flex-1">
          <Typography variant="subtitle1" className="font-bold">
            Author:
          </Typography>
          <Typography variant="body1">{issueDetails.user.login}</Typography>
        </Box>
        <Box className="flex-1">
          <Typography variant="subtitle1" className="font-bold">
            Created At:
          </Typography>
          <Typography variant="body1">
            {new Date(issueDetails.created_at).toLocaleDateString(
              "en-US",
              dateFormatOptions
            )}
          </Typography>
        </Box>
        <Box className="flex-1">
          <Typography variant="subtitle1" className="font-bold">
            Updated At:
          </Typography>
          <Typography variant="body1">
            {new Date(issueDetails.updated_at).toLocaleDateString(
              "en-US",
              dateFormatOptions
            )}
          </Typography>
        </Box>
        <Box className="flex-1">
          <Typography variant="subtitle1" className="font-bold">
            Status:
          </Typography>
          <Typography variant="body1">{issueDetails.state}</Typography>
        </Box>
      </Box>
      <Box className="mt-10">
        <Typography variant="subtitle1" className="font-bold">
          Description:
        </Typography>
        <Typography variant="body1">{issueDetails.body}</Typography>
      </Box>
    </Box>
  );
};

export default IssueDetails;
