import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BranchLayout from "../layouts/BranchLayout";
import AllMails from "../pages/AllMails";
import Help from "../pages/Help";
import Settings from "../pages/Setting";
import BranchDashboard from "../pages/dashboard/BranchDashboard";

function BranchAppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BranchLayout />}>
          <Route index element={<BranchDashboard />} /> {/* Default route */}
          <Route path="allmails" element={<AllMails />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="login" element={<div>This is Login Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default BranchAppRouter;
