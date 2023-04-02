import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export default function DashboardBox({ data, title, onView, loading, type }) {
  return (
    <div className="bg-gray-700 rounded-lg shadow-lg p-4 flex-1 flex-col justify-between flex">
      <div className="mb-10">
        <h2 className="text-lg font-medium mb-4">{title}</h2>
        {!loading && (
          <ul className="space-y-4">
            {data.map((item) => (
              <li key={item.id}>
                <Link
                  to={{
                    pathname: `/${type}/${item.number}`,
                  }}
                  state={item}
                  className="text-blue-400 hover:text-blue-200"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Button variant="contained" color="info" onClick={onView}>
          View all
        </Button>
      )}
    </div>
  );
}
