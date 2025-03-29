import React from "react";
import Table from "./Table";

// Define the type for table data
type Person = {
  id: number;
  name: string;
  age: number;
};

// Data for the table
const data: Person[] = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
  { id: 3, name: "Sam Wilson", age: 35 },
];

// Column definitions for the table
const columns = [
  { key: "id" as keyof Person, label: "ID" },
  { key: "name" as keyof Person, label: "Name" },
  { key: "age" as keyof Person, label: "Age" },
];

const TableTest: React.FC = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">User List</h1>
    {/* <Table columns={columns} data={data} /> */}
  </div>
);

export default TableTest;
