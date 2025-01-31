import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/dashboard/AdminDashboard";
import AdminManagement from "../pages/AdminManagement";
import BranchManagement from "../pages/BranchManagement";
import Help from "../pages/Help";
import Settings from "../pages/Setting";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} /> {/* Default route */}
          <Route path="adminmanagement" element={<AdminManagement />} />
          <Route path="branchmanagement" element={<BranchManagement />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="login" element={<div>This is Login Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
