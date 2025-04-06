import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  FaSort,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimesCircle,
  FaCalendarAlt,
  FaFilter,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TableColumn<T> = {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  isDate?: boolean;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  rowsPerPage?: number;
  onViewClick: (row: T) => void;
  onEditClick: (row: T) => void;
  onDeleteClick: (row: T) => void;
  searchableKeys?: (keyof T)[];
};

const TableWithFilter = <T,>({
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
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRecordCounts, setDateRecordCounts] = useState<
    Record<string, number>
  >({});
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Get date columns
  const dateColumns = columns.filter((column) => column.isDate);

  // Calculate record counts per date
  useEffect(() => {
    const counts: Record<string, number> = {};

    if (dateColumns.length > 0) {
      data.forEach((row) => {
        dateColumns.forEach((column) => {
          const dateValue = row[column.key];
          if (dateValue) {
            try {
              const date = new Date(dateValue as any);
              if (!isNaN(date.getTime())) {
                const dateStr = date.toISOString().split("T")[0];
                counts[dateStr] = (counts[dateStr] || 0) + 1;
              }
            } catch (e) {
              console.error("Error parsing date", e);
            }
          }
        });
      });
    }

    setDateRecordCounts(counts);
  }, [data, dateColumns]);

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // Filter data by search query and date
  const filteredData = useMemo(() => {
    let result = data;

    if (searchQuery) {
      result = result.filter((row) =>
        searchableKeys.some((key) => {
          const value = row[key]?.toString().toLowerCase() ?? "";
          return value.includes(searchQuery.toLowerCase());
        })
      );
    }

    if (dateFilter && dateColumns.length > 0) {
      const filterDateStr = dateFilter.toISOString().split("T")[0];
      result = result.filter((row) => {
        return dateColumns.some((column) => {
          const dateValue = row[column.key];
          if (!dateValue) return false;

          try {
            const rowDate = new Date(dateValue as any);
            if (isNaN(rowDate.getTime())) return false;

            const rowDateStr = rowDate.toISOString().split("T")[0];
            return rowDateStr === filterDateStr;
          } catch (e) {
            return false;
          }
        });
      });
    }

    return result;
  }, [data, searchQuery, searchableKeys, dateFilter, dateColumns]);

  // Sort the filtered data
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
  };

  const clearDateFilter = () => {
    setDateFilter(null);
  };

  // Custom day component to show record counts
  const renderDayContents = (day: number, date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    const count = dateRecordCounts[dateStr] || 0;

    return (
      <div className="react-datepicker__day-container">
        <div className="react-datepicker__day">{day}</div>
        {count > 0 && (
          <div className="react-datepicker__day-record-count">{count}</div>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto w-full">
      {/* Filter Toggle Button - Visible on mobile */}
      <div className="block md:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg shadow-sm"
        >
          <FaFilter />
          <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } md:flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg`}
      >
        {/* Text Search */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <div className="flex items-center border rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="pl-3 pr-2 text-gray-500">
                <FaSearch size={20} />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full p-2 pl-0 outline-none text-gray-700"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="mr-2 ml-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimesCircle size={20} />
                </button>
              )}
            </div>

            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <span className="text-gray-700">{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date Filter */}
        <div className="relative" ref={datePickerRef}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm transition-all duration-300 bg-white ${
                dateFilter ? "border-blue-300 bg-blue-50" : ""
              }`}
            >
              <FaCalendarAlt className="text-gray-600" />
              <span className="whitespace-nowrap">
                {dateFilter
                  ? dateFilter.toLocaleDateString()
                  : "Filter by date"}
              </span>
              {dateFilter && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearDateFilter();
                  }}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <FaTimesCircle size={16} />
                </button>
              )}
            </button>
          </div>

          {showDatePicker && (
            <div className="absolute z-50 mt-2 right-0 bg-white border rounded-lg shadow-lg">
              <DatePicker
                selected={dateFilter}
                onChange={(date) => {
                  setDateFilter(date);
                  setShowDatePicker(false);
                }}
                inline
                calendarClassName="border-0"
                renderDayContents={renderDayContents}
                highlightDates={Object.keys(dateRecordCounts).map(
                  (dateStr) => new Date(dateStr)
                )}
              />
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key.toString()}
                  className="px-4 py-2 cursor-pointer whitespace-nowrap"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    <FaSort className="ml-2" />
                  </div>
                </th>
              ))}
              <th className="px-4 py-2 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key.toString()} className="px-4 py-2">
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key])}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewClick(row)}
                        className="p-2 text-blue-500 hover:text-blue-700"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => onEditClick(row)}
                        className="p-2 text-green-500 hover:text-green-700"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDeleteClick(row)}
                        className="p-2 text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FaTrash />
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
      </div>

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

export default TableWithFilter;
