import React, { useState, useMemo, useRef } from "react";
import {
  FaSort,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimesCircle,
} from "react-icons/fa";

type TableColumn<T> = {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode; // Add this line
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  rowsPerPage?: number;
  onViewClick: (row: T) => void;
  onEditClick: (row: T) => void;
  onDeleteClick: (row: T) => void;
  searchableKeys?: (keyof T)[]; // Optional: Define which keys to search
};

const Table = <T,>({
  columns,
  data,
  rowsPerPage = 5,
  onViewClick,
  onEditClick,
  onDeleteClick,
  searchableKeys = [],
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

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-x-auto w-auto">
      {/* Advanced Search Input */}
      <div className="relative w-1/2 mt-5 mb-5">
        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm transition-all duration-300">
          {/* Search Icon */}
          {!isSearchExpanded && (
            <button
              onClick={() => setIsSearchExpanded(true)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <FaSearch
                className="text-gray-600 hover:text-blue-500 transition-transform hover:scale-110"
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
                className="w-full p-2 pl-2 outline-none text-gray-700 transition-all duration-300"
              />

              {/* Clear Button */}
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="mr-2 ml-2 text-gray-500 hover:text-gray-700 transition-colors"
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
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between group"
              >
                <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                  {suggestion}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rest of the table remains the same as before */}
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
          {paginatedData.length > 0 ? (
            paginatedData.map((row: any, rowIndex) => (
              <tr key={rowIndex} className="border-t hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key.toString()} className="px-3 py-2">
                    {column.key === "insertDate" ? (
                      formatDate(row[column.key])
                    ) : column.key === "updateDate" ? (
                      formatDate(row[column.key])
                    ) : column.key === "createdAt" ? (
                      formatDate(row[column.key])
                    ) : column.key === "updatedAt" ? (
                      formatDate(row[column.key])
                    ) : column.key === "barcodeImage" ? (
                      row[column.key] ? (
                        <img
                          src={`data:image/png;base64,${row[column.key]}`}
                          alt="Barcode"
                          className="h-8 w-auto"
                        />
                      ) : null
                    ) : column.render ? (
                      column.render(row[column.key], row)
                    ) : (
                      <span className="truncate max-w-xs inline-block">
                        {String(row[column.key])}
                      </span>
                    )}
                  </td>
                ))}
                <td className="px-3 py-2">
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      className="p-1.5 text-sm bg-gray-100 rounded hover:bg-gray-200"
                      onClick={() => onViewClick(row)}
                      title="View"
                    >
                      <FaEye className="w-3.5 h-3.5 text-blue-500" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 text-sm bg-gray-100 rounded hover:bg-gray-200"
                      onClick={() => onEditClick(row)}
                      title="Edit"
                    >
                      <FaEdit className="w-3.5 h-3.5 text-green-500" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 text-sm bg-gray-100 rounded hover:bg-gray-200"
                      onClick={() => onDeleteClick(row)}
                      title="Delete"
                    >
                      <FaTrash className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                No matching results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-sm text-gray-600">
          Showing {paginatedData.length} of {filteredData.length} results
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-100 rounded">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
