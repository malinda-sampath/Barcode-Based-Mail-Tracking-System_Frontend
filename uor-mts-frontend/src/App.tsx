import React from "react";

import TableTest from "./components/table/TableTest";
import AdminManagement from "./pages/AdminManagement";
import AllButtonComponents from "./components/buttonComponents/AllButtonComponents";
import SuperAdminAppRouter from "./routes/SuperAdminAppRouter";



const App: React.FC = () => (
  <div>
    <SuperAdminAppRouter />
  </div>
);


export default App;
