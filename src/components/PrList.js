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
  const [pullRequests, setPullRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("popularity");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchPullRequests() {
      const response = await githubApi.getLatestPullRequests({
        per_page: rowsPerPage,
        page,
        state: filter,
        sort,
      });
      setPullRequests(response);
      setLoading(false);
    }

    fetchPullRequests();
  }, [filter, sort, rowsPerPage, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box className="bg-gray-100 h-screen p-5">
      <Typography variant="h5">Pull Requests</Typography>
      <Box className="mb-5 flex gap-5 mt-8">
        <FormControl sx={{ minWidth: 120, color: "white" }}>
          <InputLabel>Status</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Status">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
            <MenuItem value="merged">Merged</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort by</InputLabel>
          <Select value={sort} onChange={handleSortChange} label="Sort by">
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="created">Date Created</MenuItem>
            <MenuItem value="updated">Date Updated</MenuItem>
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
              pullRequests.map((pullRequest) => (
                <TableRow key={pullRequest.id} className=" border-gray-700">
                  <TableCell>
                    <Link
                      to={{
                        pathname: `/pr/${pullRequest.number}`,
                      }}
                      state={pullRequest}
                    >
                      {pullRequest.title}
                    </Link>
                  </TableCell>
                  <TableCell>{pullRequest.number}</TableCell>
                  <TableCell>{pullRequest.user.login}</TableCell>
                  <TableCell>
                    {new Date(pullRequest.created_at).toLocaleDateString(
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
