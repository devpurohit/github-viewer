import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { dateFormatOptions } from "../constants";
import githubApi from "../services/github";

const PrDetails = () => {
  const location = useLocation();
  const prDetails = location.state;
  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (prDetails) {
      githubApi.getPullRequestComments(prDetails.number).then((data) => {
        setComments(data.slice(0, 5));
      });
    }
  }, [prDetails]);

  if (!prDetails) return <></>;
  return (
    <Box className="bg-gray-100 p-5 min-h-screen">
      <Box className="flex justify-between items-center">
        <Typography variant="h5">{prDetails.title}</Typography>
        <Button variant="contained" href={prDetails.html_url} target="_blank">
          View on GitHub
        </Button>
      </Box>
      <Box className="flex gap-10 mt-5">
        <Box className="flex-1">
          <Typography variant="subtitle1" className="font-bold">
            Author:
          </Typography>
          <Typography variant="body1">{prDetails.user.login}</Typography>
        </Box>
        <Box className="flex-1">
          <Typography variant="subtitle1" className="font-bold">
            Created At:
          </Typography>
          <Typography variant="body1">
            {new Date(prDetails.created_at).toLocaleDateString(
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
            {new Date(prDetails.updated_at).toLocaleDateString(
              "en-US",
              dateFormatOptions
            )}
          </Typography>
        </Box>
        <Box className="flex-1">
          <Typography variant="subtitle1" className="font-bold">
            Status:
          </Typography>
          <Typography variant="body1">{prDetails.state}</Typography>
        </Box>
      </Box>
      <Box className="mt-10">
        <Typography variant="subtitle1" className="font-bold">
          Description:
        </Typography>
        <Typography variant="body1">{prDetails.body}</Typography>
      </Box>
      <Box className="mt-10">
        <Typography variant="subtitle1" className="font-bold">
          Latest Comments:
        </Typography>

        {comments === null ? (
          <CircularProgress color="secondary" className="self-center" />
        ) : comments.length === 0 ? (
          <Typography variant="body1">No comments found.</Typography>
        ) : (
          comments.map((comment, index) => (
            <Box key={index} className="border-2 border-gray-300 p-3 mt-3">
              <Typography variant="subtitle1" className="font-bold">
                {comment.user.login}
              </Typography>
              <Typography variant="body1">{comment.body}</Typography>
              <Typography variant="caption" className="text-gray-500">
                {new Date(comment.created_at).toLocaleDateString(
                  "en-US",
                  dateFormatOptions
                )}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default PrDetails;
