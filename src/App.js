import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import IssueDetails from "./components/IssueDetails";
import IssueList from "./components/IssueList";
import PrDetails from "./components/PrDetails";
import PrList from "./components/PrList";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/pulls" element={<PrList />} />
      <Route exact path="/issues" element={<IssueList />} />
      <Route path="/pr/:number" element={<PrDetails />} />
      <Route path="/issue/:number" element={<IssueDetails />} />
    </Routes>
  );
}

export default App;
