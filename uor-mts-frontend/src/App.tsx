import React from "react";
import Table from "./components/table/Table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// Data for the table
const data = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
  { id: 3, name: "Sam Wilson", age: 35 },
];

// Column definitions for the table
const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
];

// Action definitions with explicit types
const actions: {
  label: string;
  name: "view" | "edit" | "delete"; // Match the type from the TableProps definition
  icon: React.ReactNode;
  onClick: (row: any) => void;
}[] = [
  { 
    name: "view", 
    label: "View", 
    icon: <FaEye />, 
    onClick: (row) => alert(`View ${row.name}`) 
  },
  { 
    name: "edit", 
    label: "Edit", 
    icon: <FaEdit />, 
    onClick: (row) => alert(`Edit ${row.name}`) 
  },
  { 
    name: "delete", 
    label: "Delete", 
    icon: <FaTrash />, 
    onClick: (row) => alert(`Delete ${row.name}`) 
  },
];

// App component
const App: React.FC = () => (
  <Table columns={columns} data={data} actions={actions} />
);

export default App;
