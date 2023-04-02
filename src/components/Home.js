import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import githubApi from "../services/github";
import DashboardBox from "./DashboardBox";

const Home = () => {
  const navigate = useNavigate();

  const [{ latestIssues, latestPullRequests }, setData] = useState({
    latestIssues: [],
    latestPullRequests: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchIssuesAndPullRequests() {
      const [issues, pullRequests] = await Promise.all([
        githubApi.getLatestIssues({}),
        githubApi.getLatestPullRequests({}),
      ]);

      setData({ latestIssues: issues, latestPullRequests: pullRequests });
      setLoading(false);
    }

    fetchIssuesAndPullRequests();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-8">Github Dashboard</h1>
      <div className="flex gap-8 max-w-screen-lg">
        <DashboardBox
          data={latestIssues}
          title="Latest Issues"
          onView={() => {
            navigate("/issues");
          }}
          loading={loading}
          type="issue"
        />

        <DashboardBox
          data={latestPullRequests}
          title="Latest Pull Requests"
          onView={() => {
            navigate("/pulls");
          }}
          loading={loading}
          type="pr"
        />
      </div>
    </div>
  );
};

export default Home;
