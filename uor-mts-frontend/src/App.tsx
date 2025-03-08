import React from "react";
import TableTest from "./components/table/TableTest";
import AppRouter from "./routes/AppRouter";
import Form from "./components/form/Form";
import AllButtonComponents from "./components/buttonComponents/AllButtonComponents";

const App: React.FC = () => (
  <div>
    {/* <TableTest /> */}
    <AppRouter />
    {/* <Form />
    <AllButtonComponents /> */}
  </div>
);

export default App;
