import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import SuperAdminAppRouter from "./routes/SuperAdminAppRouter";
import Login from "./pages/Login";
import AdminAppRouter from "./routes/AdminAppRouter";
import MailManagement from "./pages/MailManagement";



const App: React.FC = () => (
// App.tsx

      <Routes>
         <Route path="/" element={<MailManagement/>} /> 
         <Route path="/admin/*" element={<AdminAppRouter />} /> 
       
        </Routes>
    
);


export default App;
