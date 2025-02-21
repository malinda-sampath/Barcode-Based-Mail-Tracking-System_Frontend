import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import MailManagement from "../pages/MailManagement";
import {ClaimMails} from "../pages/ClaimMails";
import Help from "../pages/Help";
import Settings from "../pages/Setting";
import Profile from "../pages/Profile";

function AdminAppRouter() {
  return (
    
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} /> {/* Default route */}
          <Route path="mailmanagement" element={<MailManagement />} />
          <Route path="claimmails" element={<ClaimMails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="login" element={<div>This is Login Page</div>} />
        </Route>
      </Routes>
  
  );
}

export default AdminAppRouter;
