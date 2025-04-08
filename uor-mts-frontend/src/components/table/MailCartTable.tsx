
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  FaSort,
  FaEye,
  FaSearch,
  FaTimesCircle,
  FaCheckCircle,
  FaTruck,
  FaUndo,
  FaClock,
  FaBoxOpen,
} from "react-icons/fa";

type TableColumn<T> = {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  rowsPerPage?: number;
  onViewClick: (row: T) => void;
  searchableKeys?: (keyof T)[];
  statusFilter?: string[]; // Add status filter option
};

const MailCartTable = <T,>({
  columns,
  data,
  rowsPerPage = 10,
  onViewClick,
  searchableKeys = [],
  statusFilter = [], // Default empty array means show all
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
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
    let result = data;

    // Apply search filter
    if (searchQuery) {
      result = result.filter((row) =>
        searchableKeys.some((key) => {
          const value = row[key]?.toString().toLowerCase() ?? "";
          return value.includes(searchQuery.toLowerCase());
        })
      );
    }

    // Apply status filter if not "all"
    if (selectedStatus !== "all") {
      result = result.filter(
        (row: any) => row.status?.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    return result;
  }, [data, searchQuery, searchableKeys, selectedStatus]);

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

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Status styling with icons
  const getStatusStyle = (status: string) => {
    const baseStyle =
      "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1";

    switch (status?.toLowerCase()) {
      case "claimed":
        return `${baseStyle} bg-green-100 text-green-800`;
      case "pending":
        return `${baseStyle} bg-yellow-100 text-yellow-800`;
      case "returned":
        return `${baseStyle} bg-red-100 text-red-800`;
      case "picked":
        return `${baseStyle} bg-blue-100 text-blue-800`;
      default:
        return `${baseStyle} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "claimed":
        return <FaCheckCircle className="text-green-500" />;
      case "pending":
        return <FaClock className="text-yellow-500" />;
      case "returned":
        return <FaUndo className="text-red-500" />;
      case "picked":
        return <FaTruck className="text-blue-500" />;
      default:
        return <FaBoxOpen className="text-gray-500" />;
    }
  };

  // Get unique statuses for filter dropdown
  const statusOptions = useMemo(() => {
    const statusSet = new Set<string>();
    data.forEach((row: any) => {
      if (row.status) {
        statusSet.add(row.status);
      }
    });
    return Array.from(statusSet);
  }, [data]);

  return (
    <div className="overflow-x-auto w-auto">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mt-5 mb-5">
        {/* Search Input */}
        <div className="relative flex-grow">
          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm transition-all duration-300">
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

            {isSearchExpanded && (
              <>
                <div className="pl-3 pr-2 text-gray-500">
                  <FaSearch size={20} />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search by barcode, sender, receiver, etc..."
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

        {/* Status Filter */}
        <div className="w-full md:w-64">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm outline-none text-gray-700"
          >
            <option value="all">All Statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mail Records Table */}
      <table className="table-auto border-collapse w-full text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key.toString()}
                className={`px-3 py-2 cursor-pointer ${column.width || ""}`}
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center">
                  {column.label}
                  <FaSort className="inline ml-2 opacity-70" size={14} />
                </div>
              </th>
            ))}
            <th className="px-3 py-2 w-24">View</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row: any, rowIndex) => (
              <tr key={rowIndex} className="border-t hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key.toString()} className="px-3 py-2">
                    {column.key === "status" ? (
                      <span className={getStatusStyle(row[column.key])}>
                        {getStatusIcon(row[column.key])}
                        {row[column.key]}
                      </span>
                    ) : column.key === "insertDateTime" ? (
                      formatDate(row[column.key])
                    ) : column.key === "barcodeImage" ? (
                      row[column.key] ? (
                        <img
                          src={`data:image/png;base64,${row[column.key]}`}
                          alt="Barcode"
                          className="h-8 w-auto"
                        />
                      ) : null
                    ) : column.key === "branch" ? (
                      row[column.key] || "N/A" // Ensure branch name is displayed or fallback to "N/A"
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
                  <button
                    type="button"
                    className="p-1.5 text-sm bg-gray-100 rounded hover:bg-gray-200"
                    onClick={() => onViewClick(row)}
                    title="View Details"
                  >
                    <FaEye className="w-4 h-4 text-blue-500" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-sm text-gray-600">
          Showing {paginatedData.length} of {filteredData.length} records
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 text-sm"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-100 rounded text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailCartTable;
