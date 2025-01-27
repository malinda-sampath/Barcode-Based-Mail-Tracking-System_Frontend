import React, { useState } from "react";
import { FaSort, FaEye, FaEdit, FaTrash } from "react-icons/fa";

type TableProps = {
  columns: { key: string; label: string }[];
  data: any[];
  actions?: {
    label: string;
    name: "view" | "edit" | "delete"; // Define action types
    icon: React.ReactNode;
    onClick: (row: any) => void;
  }[];
  rowsPerPage?: number;
};

const Table: React.FC<TableProps> = ({
  columns,
  data,
  actions = [],
  rowsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDirection]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto border-collapse w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort(column.key)}
              >
                {column.label}
                <FaSort className="inline ml-2" />
              </th>
            ))}
            {actions.length > 0 && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-2">
                  {row[column.key]}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="px-4 py-2 flex space-x-2">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      className="p-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => action.onClick(row)}
                    >
                      {/* Dynamically change icon color based on action name */}
                      {React.cloneElement(action.icon as React.ReactElement, {
                        className: `w-4 h-4 ${
                          action.name === "delete"
                            ? "text-red-500"
                            : action.name === "edit"
                            ? "text-green-500"
                            : action.name === "view"
                            ? "text-blue-500"
                            : ""
                        }`,
                      })}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="p-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="p-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
