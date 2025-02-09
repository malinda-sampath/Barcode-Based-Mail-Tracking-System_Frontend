import React from "react";

import TableTest from "./components/table/TableTest";
import AppRouter from "./routes/AppRouter";
import AdminManagement from "./pages/AdminManagement";
import AllButtonComponents from "./components/buttonComponents/AllButtonComponents";



const App: React.FC = () => (
  <div>
    {/* <TableTest /> */}
      <AppRouter />    
  {/* <AdminManagement/>  */}
  
  
  </div>
);


export default App;
