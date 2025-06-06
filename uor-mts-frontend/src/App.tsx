import React from "react";
import { Routes, Route } from "react-router-dom";
import SuperAdminAppRouter from "./routes/SuperAdminAppRouter";
import Login from "./pages/Login";
import AdminAppRouter from "./routes/AdminAppRouter";
import Tracking from "./pages/Tracking";
import BranchAppRouter from "./routes/BranchRouter";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/admin/*" element={<SuperAdminAppRouter />} />
    <Route path="/mail_handler/*" element={<AdminAppRouter />} />
    <Route path="/branch/*" element={<BranchAppRouter />} />
    <Route path="/tracking" element={<Tracking />} />
  </Routes>
);

export default App;
