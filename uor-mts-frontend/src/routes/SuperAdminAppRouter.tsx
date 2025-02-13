import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuperLayout from "../layouts/SuperLayout";
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashboard";
import AdminManagement from "../pages/AdminManagement";
import BranchManagement from "../pages/BranchManagement";
import Help from "../pages/Help";
import Settings from "../pages/Setting";

function SuperAdminAppRouter() {
  return (
      <Routes>
        <Route path="/" element={<SuperLayout />}>
          <Route index element={<SuperAdminDashboard />} /> {/* Default route */}
          <Route path="adminmanagement" element={<AdminManagement />} />
          <Route path="branchmanagement" element={<BranchManagement />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="login" element={<div>This is Login Page</div>} />
        </Route>
    </Routes>
  );
}

export default SuperAdminAppRouter;
