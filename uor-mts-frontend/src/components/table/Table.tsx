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
  onViewClick: (row: T) => void; // Prop for handling the "View" button click
  onEditClick: (row: T) => void;
};

const Table = <T,>({ columns, data, rowsPerPage = 5, onViewClick , onEditClick }: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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
                {/* View Button */}
                <button
                  type="button"
                  className="p-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => onViewClick(row)}
                  title="View"
                >
                  <FaEye className="w-4 h-4 text-blue-500" />
                  <span className="sr-only">View</span>
                </button>

                {/* Edit Button */}
                <button
                  type="button"
                  className="p-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => onEditClick(row)}
                  title="Edit"
                >
                  <FaEdit className="w-4 h-4 text-green-500" />
                  <span className="sr-only">Edit</span>
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  className="p-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => alert(`Deleting ${JSON.stringify(row)}`)}
                  title="Delete"
                >
                  <FaTrash className="w-4 h-4 text-red-500" />
                  <span className="sr-only">Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
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
          type="button"
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