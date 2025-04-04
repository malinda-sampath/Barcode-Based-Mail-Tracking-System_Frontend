import React, { useState, useMemo, useRef } from "react";
import {
  FaSort,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimesCircle,
} from "react-icons/fa";

type AllMailsTableProps<T> = {
  columns: { key: keyof T; label: string }[]; // Column definitions
  data: T[]; // The data to be displayed
  rowsPerPage?: number;
  onViewClick: (row: T) => void;
  onEditClick?: (row: T) => void;
  onDeleteClick: (row: T) => void;
  hideEditButton?: boolean;
  searchableKeys?: (keyof T)[]; // Keys that can be searched
};

const AllMailsTable = <T,>({
  columns,
  data,
  rowsPerPage = 5,
  onViewClick,
  onEditClick,
  onDeleteClick,
  hideEditButton,
  searchableKeys = [],
}: AllMailsTableProps<T>) => {
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

  // Generate suggestions based on searchable columns
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

  // **Search and filter data**
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((row) =>
      searchableKeys.some((key) => {
        const value = row[key]?.toString().toLowerCase() ?? "";
        return value.includes(searchQuery.toLowerCase());
      })
    );
  }, [data, searchQuery, searchableKeys]);

  // **Sort the filtered data**
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

    // Generate suggestions
    const newSuggestions = generateSuggestions(value);
    setSuggestions(newSuggestions);
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
    <div className="w-full overflow-x-auto">
      {/* Advanced Search Input */}
      <div className="relative w-1/2 mt-5 mb-5">
        <div className="flex items-center overflow-hidden transition-all duration-300 border rounded-lg shadow-sm">
          {/* Search Icon */}
          {!isSearchExpanded && (
            <button
              onClick={() => setIsSearchExpanded(true)}
              className="p-2 transition-colors hover:bg-gray-100"
            >
              <FaSearch
                className="text-gray-600 transition-transform hover:text-blue-500 hover:scale-110"
                size={20}
              />
            </button>
          )}

          {/* Search Input */}
          {isSearchExpanded && (
            <>
              <div className="pl-3 pr-2 text-gray-500">
                <FaSearch size={20} />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for anything ..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onBlur={() => {
                  setTimeout(() => {
                    if (searchQuery.trim() === "") {
                      setIsSearchExpanded(true);
                    }
                  }, 200);
                }}
                autoFocus
                className="w-full p-2 pl-2 text-gray-700 transition-all duration-300 outline-none"
              />

              {/* Clear Button */}
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="ml-2 mr-2 text-gray-500 transition-colors hover:text-gray-700"
                >
                  <FaTimesCircle size={20} />
                </button>
              )}
            </>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg animate-fade-in">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 group"
              >
                <span className="text-gray-700 transition-colors group-hover:text-blue-600">
                  {suggestion}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rest of the table remains the same as before */}
      <table className="w-full text-left border-collapse table-auto">
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
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                {columns.map((column) => (
                  <td key={column.key.toString()} className="px-4 py-2">
                    {String(row[column.key])}
                  </td>
                ))}
                <td className="flex px-4 py-2 space-x-2">
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
                  {!hideEditButton && onEditClick && (
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

                  {/* Delete Button */}
                  <button
                    type="button"
                    className="p-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => onDeleteClick(row)}
                    title="Delete"
                  >
                    <FaTrash className="w-4 h-4 text-red-500" />
                    <span className="sr-only">Delete</span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="py-4 text-center">
                No matching results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
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

export default AllMailsTable;
