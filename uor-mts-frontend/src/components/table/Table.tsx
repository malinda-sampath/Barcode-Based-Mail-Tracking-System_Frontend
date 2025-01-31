import React, { useState, useMemo } from "react";
import { FaSort, FaEye, FaEdit, FaTrash } from "react-icons/fa";

type ActionType<T> = {
  label: string;
  name: "view" | "edit" | "delete";
  icon: React.ReactNode;
  onClick: (row: T) => void;
};

type TableProps<T> = {
  columns: { key: keyof T; label: string }[];
  data: T[];
  rowsPerPage?: number;
};

const Table = <T,>({ columns, data, rowsPerPage = 5 }: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Define default actions inside Table
  const actions: ActionType<T>[] = [
    {
      name: "view",
      label: "View",
      icon: <FaEye />,
      onClick: (row) => alert(`Viewing ${JSON.stringify(row)}`),
    },
    {
      name: "edit",
      label: "Edit",
      icon: <FaEdit />,
      onClick: (row) => alert(`Editing ${JSON.stringify(row)}`),
    },
    {
      name: "delete",
      label: "Delete",
      icon: <FaTrash />,
      onClick: (row) => alert(`Deleting ${JSON.stringify(row)}`),
    },
  ];

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortKey] ?? "";
      const bValue = b[sortKey] ?? "";

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });
  }, [data, sortKey, sortDirection]);

  const totalPages = Math.max(Math.ceil(data.length / rowsPerPage), 1);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto border-collapse w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key.toString()}
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort(column.key)}
              >
                {column.label}
                <FaSort className="inline ml-2" />
              </th>
            ))}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {columns.map((column) => (
                <td key={column.key.toString()} className="px-4 py-2">
                  {String(row[column.key])}
                </td>
              ))}
              <td className="px-4 py-2 flex space-x-2">
                {actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    className="p-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => action.onClick(row)}
                  >
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
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="p-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="p-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
