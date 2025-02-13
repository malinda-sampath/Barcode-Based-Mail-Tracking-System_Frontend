import React from "react";
import Table from "./Table";

// Define the type for table data
type Branch = {
  code: number;
  name: string;
};

// Data for the table
const data: Branch[] = [
  { code: 8123, name: "FOS" }
];

// Column definitions for the table
const columns = [
  { key: "code" as keyof Branch, label: "Branch Code" },
  { key: "name" as keyof Branch, label: "Branch Name" },
];

const TableBranch: React.FC = () => (
  <div className="p-4">
    <Table
      columns={columns}
      data={data}
      onViewClick={(row) => alert(`Viewing ${JSON.stringify(row)}`)}
      onEditClick={(row) => alert(`Editing ${JSON.stringify(row)}`)}
    />
  </div>
);

export default TableBranch;
