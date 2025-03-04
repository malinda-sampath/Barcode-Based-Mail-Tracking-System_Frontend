import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BranchLayout from "../layouts/BranchLayout";
import AllMails from "../pages/AllMails";
import Help from "../pages/Help";
import Settings from "../pages/Setting";
import BranchDashboard from "../pages/dashboard/BranchDashboard";
import Profile1 from "../pages/Profile1";


function BranchAppRouter() {
  return (
   
      <Routes>
        <Route path="/" element={<BranchLayout />}>
          <Route index element={<BranchDashboard />} path="dashboard"/> {/* Default route */}
          <Route path="allmails" element={<AllMails />} />
          <Route path="profile" element={<Profile1 />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="login" element={<div>This is Login Page</div>} />
        </Route>
      </Routes>
    
  );
}

export default BranchAppRouter;
