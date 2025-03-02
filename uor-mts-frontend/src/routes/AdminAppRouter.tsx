import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import MailManagement from "../pages/MailManagement";
import {ClaimMails} from "../pages/ClaimMails";
import Help from "../pages/Help";
import Settings from "../pages/Setting";

function AdminAppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} /> {/* Default route */}
          <Route path="mailmanagement" element={<MailManagement />} />
          <Route path="claimmails" element={<ClaimMails />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="login" element={<div>This is Login Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AdminAppRouter;
