import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dateFormatOptions } from "../constants";
import githubApi from "../services/github";

const PrList = () => {
  const [issueList, setIssueList] = useState([]);
  const [filterState, setFilterState] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [labelsList, setLabelsList] = useState([]);
  const [filterLabels, setFilterLabels] = useState("");

  useEffect(() => {
    async function fetchLabels() {
      const labels = await githubApi.getIssueLabels();
      console.log("dfds", { labels });

      setLabelsList(labels);
    }
    fetchLabels();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchLatestIssues() {
      const response = await githubApi.getLatestIssues({
        per_page: rowsPerPage,
        page,
        state: filterState,
        filterLabels,
      });
      setIssueList(response);
      setLoading(false);
    }

    fetchLatestIssues();
  }, [filterState, filterLabels, rowsPerPage, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStateFilterChange = (event) => {
    setFilterState(event.target.value);
  };

  return (
    <Box className="bg-gray-100 h-screen p-5">
      <Typography variant="h5">Issues</Typography>
      <Box className="mb-5 flex gap-5 mt-8">
        <FormControl sx={{ minWidth: 120, color: "white" }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterState}
            onChange={handleStateFilterChange}
            label="Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
            <MenuItem value="merged">Merged</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, color: "white" }}>
          <InputLabel>Labels</InputLabel>
          <Select
            value={filterLabels}
            onChange={(e) => setFilterLabels(e.target.value)}
            label="Labels"
          >
            <MenuItem value="">All</MenuItem>
            {labelsList.map((label) => (
              <MenuItem key={label.id} value={label.name}>
                {label.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer className="text-zinc-50 border border-gray-700 border-collapse">
        <Table sx={{ "& td, & th": { border: 0 } }}>
          <TableHead>
            <TableRow className="border-b border-gray-700 border-collapse">
              <TableCell className="!font-bold">Title</TableCell>
              <TableCell className="!font-bold">Number</TableCell>
              <TableCell className="!font-bold">Author</TableCell>
              <TableCell className="!font-bold">Created At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <CircularProgress color="secondary" className="self-center" />
            ) : (
              issueList.map((issue) => (
                <TableRow key={issue.id} className=" border-gray-700 ">
                  <TableCell>
                    <Link
                      to={{
                        pathname: `/issue/${issue.number}`,
                      }}
                      state={issue}
                    >
                      {issue.title}

                      {issue.title}
                    </Link>
                  </TableCell>
                  <TableCell>{issue.number}</TableCell>
                  <TableCell>{issue.user.login}</TableCell>
                  <TableCell>
                    {new Date(issueList.created_at).toLocaleDateString(
                      "en-US",
                      dateFormatOptions
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={-1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="border-t border-gray-700 border-collapse"
        />
      </TableContainer>
    </Box>
  );
};

export default PrList;
