import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BranchLayout from "../layouts/BranchLayout";
import AllMails from "../pages/BranchMail";
import Help from "../pages/Help";
import Settings from "../pages/Setting";
import BranchDashboard from "../pages/dashboard/BranchDashboard";
import Profile from "../pages/Profile";
import PendingMails from "../pages/PendingMails";
import LogoutButton from "../pages/LogOut";

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
        <Route path="logout" element={<LogoutButton />} />
      </Route>
    </Routes>
  );
}

export default BranchAppRouter;
