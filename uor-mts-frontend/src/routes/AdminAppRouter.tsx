import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import MailManagement from "../pages/MailManagement";
import { ClaimMails } from "../pages/ClaimMails";
import Help from "../pages/Help";
import Settings from "../pages/Setting";
import Profile1 from "../pages/Profile";

function AdminAppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />{" "}
        {/* This is the default route */}
        <Route path="mailmanagement" element={<MailManagement />} />
        <Route path="claimmails" element={<ClaimMails />} />
        <Route path="profile" element={<Profile1 />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Routes>
  );
}

export default AdminAppRouter;
