import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuperLayout from "../layouts/SuperLayout";
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashboard";
import AdminManagement from "../pages/AdminManagement";
import BranchManagement from "../pages/BranchManagement";
import Help from "../pages/Help";
import Settings from "../pages/Setting";
import Profile from "../pages/Profile";
import Logs from "../pages/Logs";
import MailRecord from "../pages/MailRecord";
import LogoutButton from "../pages/LogOut";

function SuperAdminAppRouter() {
  return (
    <Routes>
      <Route path="/" element={<SuperLayout />}>
        <Route index element={<SuperAdminDashboard />} /> {/* Default route */}
        <Route path="adminmanagement" element={<AdminManagement />} />
        <Route path="branchmanagement" element={<BranchManagement />} />
        <Route path="mainmailcart" element={<MailRecord />} />
        <Route path="logs" element={<Logs />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="logout" element={<LogoutButton />} />
      </Route>
    </Routes>
  );
}

export default SuperAdminAppRouter;
