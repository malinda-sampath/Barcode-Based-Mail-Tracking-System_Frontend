import React, { useState, useMemo, useRef } from "react";
import {
  FaSort,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimesCircle,
} from "react-icons/fa";

type TableProps<T> = {
  columns: { key: keyof T; label: string }[];
  data: T[];
  rowsPerPage?: number;
  onViewClick?: (row: T) => void;
  onEditClick?: (row: T) => void;
  onDeleteClick?: (row: T) => void;
  searchableKeys?: (keyof T)[];
  showActions?: boolean;
};

const Table = <T,>({
  columns,
  data,
  rowsPerPage = 5,
  onViewClick,
  onEditClick,
  onDeleteClick,
  searchableKeys = [],
  showActions = true,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const generateSuggestions = (query: string) => {
    if (!query) return [];
    const suggestionSet = new Set<string>();
    data.forEach((row) => {
      searchableKeys.forEach((key) => {
        const value = row[key]?.toString().toLowerCase() ?? "";
        if (value.includes(query.toLowerCase())) {
          suggestionSet.add(value);
        }
      });
    });
    return Array.from(suggestionSet).slice(0, 5);
  };

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((row) =>
      searchableKeys.some((key) => {
        const value = row[key]?.toString().toLowerCase() ?? "";
        return value.includes(searchQuery.toLowerCase());
      })
    );
  }, [data, searchQuery, searchableKeys]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
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
  }, [filteredData, sortKey, sortDirection]);

  const totalPages = Math.max(Math.ceil(sortedData.length / rowsPerPage), 1);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSuggestions(generateSuggestions(value));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setIsSearchExpanded(true);
  };

  return (
    <div className="overflow-x-auto w-full">
      {/* Search input section remains unchanged */}
      <div className="relative w-1/2 mt-5 mb-5">
        {/* ... existing search input code ... */}
      </div>

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
            {showActions && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row: T, rowIndex: number) => (
              <tr key={rowIndex} className="border-t">
                {columns.map((column) => (
                  <td key={column.key.toString()} className="px-4 py-2">
                    {String(row[column.key])}
                  </td>
                ))}
                {showActions && (
                  <td className="px-4 py-2 flex space-x-2">
                    {onViewClick && (
                      <button
                        type="button"
                        className="p-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => onViewClick(row)}
                        title="View"
                      >
                        <FaEye className="w-4 h-4 text-blue-500" />
                        <span className="sr-only">View</span>
                      </button>
                    )}
                    {onEditClick && (
                      <button
                        type="button"
                        className="p-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => onEditClick(row)}
                        title="Edit"
                      >
                        <FaEdit className="w-4 h-4 text-green-500" />
                        <span className="sr-only">Edit</span>
                      </button>
                    )}
                    {onDeleteClick && (
                      <button
                        type="button"
                        className="p-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => onDeleteClick(row)}
                        title="Delete"
                      >
                        <FaTrash className="w-4 h-4 text-red-500" />
                        <span className="sr-only">Delete</span>
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={columns.length + (showActions ? 1 : 0)} 
                className="text-center py-4"
              >
                No matching results found.
              </td>
            </tr>
          )}
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;