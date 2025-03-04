import React from "react";
import { Routes, Route } from "react-router-dom";
import SuperAdminAppRouter from "./routes/SuperAdminAppRouter";
import Login from "./pages/Login";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import BranchDashboard from "./pages/dashboard/BranchDashboard";
import AdminAppRouter from "./routes/AdminAppRouter";
import BranchAppRouter from "./routes/BranchRouter";

const App: React.FC = () => (
  // <Routes>
  //   <Route path="/" element={<Login />} />
  //   <Route path="/admin/*" element={<SuperAdminAppRouter />} />
  //   <Route path="/mail-handler/*" element={<AdminDashboard />} />
  //   <Route path="/branch/*" element={<BranchDashboard />} />
  // </Routes>

  <AdminAppRouter/>
);

export default App;
