import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BranchLayout from "../layouts/BranchLayout";
import AllMails from "../pages/AllMails";
import Help from "../pages/Help";
import Settings from "../pages/Setting";
import BranchDashboard from "../pages/dashboard/BranchDashboard";
import Profile from "../pages/Profile";
import PendingMails from "../pages/PendingMails";

function BranchAppRouter() {
  return (
    <Routes>
      <Route path="/" element={<BranchLayout />}>
        <Route index element={<BranchDashboard />} /> {/* Default route */}
        <Route path="pending" element={<PendingMails />} />
        <Route path="allmails" element={<AllMails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Routes>
  );
}

export default BranchAppRouter;
