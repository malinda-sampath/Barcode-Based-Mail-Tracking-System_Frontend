import React from "react";
import TableTest from "./components/table/TableTest";
import AppRouter from "./routes/SuperAdminAppRouter";
import AdminAppRouter from "./routes/AdminAppRouter"
import BranchAppRouter from "./routes/BranchRouter"
import SuperAdminAppRouter from "./routes/SuperAdminAppRouter";

const App: React.FC = () => (
  <div>
    {/* <TableTest /> */}
    <SuperAdminAppRouter />
  
  </div>
);

export default App;
