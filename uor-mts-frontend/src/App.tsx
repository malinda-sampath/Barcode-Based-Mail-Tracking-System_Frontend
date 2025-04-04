import React from "react";
import { Routes, Route } from "react-router-dom";
import SuperAdminAppRouter from "./routes/SuperAdminAppRouter";
import Login from "./pages/Login";
import BranchDashboard from "./pages/dashboard/BranchDashboard";
import AdminAppRouter from "./routes/AdminAppRouter";
import Tracking from "./pages/Tracking";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/admin/*" element={<SuperAdminAppRouter />} />
    <Route path="/mail_handler/*" element={<AdminAppRouter />} />
    <Route path="/branch/*" element={<BranchDashboard />} />
    <Route path="/tracking" element={<Tracking />} />
  </Routes>
);

export default App;
