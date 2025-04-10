import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  FaSort,
  FaSearch,
  FaTimesCircle,
  FaCheckCircle,
  FaClock,
  FaCheck,
  FaUserCheck,
  FaReply,
} from "react-icons/fa";
import ToastContainer from "../ui/toast/toastContainer";
import { claimMailSave } from "../../services/mailHandler/ClaimMailsService";

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
  searchableKeys?: (keyof T)[];
};

const ClaimMailTable = <T,>({
  columns,
  data,
  rowsPerPage = 10,
  searchableKeys = [],
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [toasts, setToasts] = useState<
    { message: string; type: "success" | "error" | "info" | "warning" }[]
  >([]);

  const triggerToast = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    setToasts((prev) => [...prev, { message, type }]);
  };

  // Filter states
  const [selectedMails, setSelectedMails] = useState<T[]>([]);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [mailTypeFilter, setMailTypeFilter] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Auto-generate ID from current date and time
  const generateClaimId = () => {
    const now = new Date();
    return `REF-${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}-${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
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


  useEffect(() => {
    console.log("Table data received:", data);
  }, [data]);
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


    // Apply mail type filter if not "all"
    if (mailTypeFilter !== "all") {
      result = result.filter((row: any) => row.mailType === mailTypeFilter);
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      result = result.filter((row: any) => {
        if (!row.insertDateTime) return false;
        const mailDate = new Date(row.insertDateTime);

        switch (dateFilter) {
          case "today":
            return (
              mailDate.getDate() === now.getDate() &&
              mailDate.getMonth() === now.getMonth() &&
              mailDate.getFullYear() === now.getFullYear()
            );
          case "week":
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            return mailDate >= startOfWeek;
          case "month":
            return (
              mailDate.getMonth() === now.getMonth() &&
              mailDate.getFullYear() === now.getFullYear()
            );
          default:
            return true;
        }
      });
    }

    return result;
  }, [
    data,
    searchQuery,
    searchableKeys,
    selectedStatus,
    mailTypeFilter,
    dateFilter,
  ]);

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

  const [claimantDetails, setClaimantDetails] = useState({
    id: generateClaimId(),
    name: "",
    contactNumber: "",
    NIC: "",
    status: "",
    note: "",
  });

  // Get unique mail types for filter
  const mailTypeOptions = useMemo(() => {
    const types = new Set<string>();
    data.forEach((row: any) => {
      if (row.mailType) {
        types.add(row.mailType);
      }
    });
    return Array.from(types);
  }, [data]);

  // Handle mail selection for bulk claim
  const toggleMailSelection = (mail: T) => {
    setSelectedMails((prev) =>
      prev.includes(mail) ? prev.filter((m) => m !== mail) : [...prev, mail]
    );
  };

  // Handle bulk claim
  const handleBulkClaim = () => {
    if (selectedMails.length === 0) {
      triggerToast("Please select at least one mail to claim.", "warning");
      return;
    }
    setClaimantDetails((prev) => ({ ...prev, id: generateClaimId() }));
    setIsClaimModalOpen(true);
  };

  // Confirm claim for single or multiple mails
  const confirmClaim = async () => {
    if (
      !claimantDetails.name ||
      !claimantDetails.NIC ||
      !claimantDetails.status
    ) {
      triggerToast("Please fill in all required fields.", "warning");
      return;
    }
    if (selectedMails.length === 0) {
      triggerToast("Please select at least one mail to claim.", "warning");
      return;
    }

    // Ensure barcodeId is correctly retrieved from selectedMails
    const selectedBarcodeIds = selectedMails
      .map((mail: any) => mail?.barcodeId)
      .filter(Boolean);

    if (selectedBarcodeIds.length === 0) {
      triggerToast(
        "No valid barcode IDs found for the selected mails.",
        "error"
      );
      return;
    }

    console.log("Selected barcode IDs:", selectedBarcodeIds);

    const response = await claimMailSave(
      selectedBarcodeIds,
      "branchCode", // Replace with actual branch code
      claimantDetails.id,
      claimantDetails.name,
      claimantDetails.contactNumber,
      claimantDetails.status,
      claimantDetails.NIC,
      claimantDetails.note
    );

    if (response.status === 200) {
      triggerToast("Claim saved successfully!", "success");
      setSelectedMails([]);
      setIsClaimModalOpen(false);
      setClaimantDetails({
        id: generateClaimId(),
        name: "",
        contactNumber: "",
        NIC: "",
        status: "",
        note: "",
      });
    } else {
      triggerToast("Failed to save claim.", "error");
    }
  };

  // Sort and paginate data
  const totalPages = Math.max(Math.ceil(sortedData.length / rowsPerPage), 1);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Status styling
  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800";
      case "returned":
        return "px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800";
      case "claimed":
        return "px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800";
      default:
        return "px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <FaClock className="inline mr-1" />;
      case "returned":
        return <FaReply className="inline mr-1" />;
      case "claimed":
        return <FaCheckCircle className="inline mr-1" />;
      default:
        return null;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  function handleSort(key: keyof T): void {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  return (
    <div className="overflow-x-auto w-auto">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
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
        <div className="w-full md:w-32">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="returned">Returned</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="w-full md:w-32">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        {/* Mail Type Filter */}
        <div className="w-full md:w-32">
          <select
            value={mailTypeFilter}
            onChange={(e) => setMailTypeFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          >
            <option value="all">All Types</option>
            {mailTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Bulk Claim Button */}
        {selectedMails.length > 0 && (
          <button
            onClick={handleBulkClaim}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2 whitespace-nowrap"
          >
            <FaUserCheck /> Claim ({selectedMails.length})
          </button>
        )}
      </div>

      {/* Mail Records Table */}
      <table className="table-auto border-collapse w-full text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 w-10">
              <input
                type="checkbox"
                checked={
                  selectedMails.length === paginatedData.length &&
                  paginatedData.length > 0
                }
                onChange={() => {
                  if (selectedMails.length === paginatedData.length) {
                    setSelectedMails([]);
                  } else {
                    setSelectedMails([...paginatedData]);
                  }
                }}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
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
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row: any, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-t hover:bg-gray-50 ${
                  selectedMails.includes(row) ? "bg-blue-50" : ""
                }`}
              >
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selectedMails.includes(row)}
                    onChange={() => toggleMailSelection(row)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.key.toString()} className="px-3 py-2">
                    {column.key === "status" ? (
                      <span className={getStatusStyle(row[column.key])}>
                        {getStatusIcon(row[column.key])}
                        {row[column.key]}
                      </span>
                    ) : column.render ? (
                      column.render(row[column.key], row)
                    ) : column.key === "insertDateTime" ? (
                      formatDate(row[column.key])
                    ) : (
                      <span className="truncate max-w-xs inline-block">
                        {String(row[column.key])}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                {filteredData.length === 0
                  ? "No mails available"

                  : "No matching records found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-sm text-gray-600">
          Showing {paginatedData.length} of {filteredData.length} mails
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

      {/* Claim Mail Modal */}
      {isClaimModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                <FaUserCheck className="inline mr-2 text-green-600" />
                {selectedMails.length > 1
                  ? "Claim Multiple Mails"
                  : "Claim Mail"}
              </h2>
              <button
                onClick={() => setIsClaimModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimesCircle size={20} />
              </button>
            </div>

            <div className="p-6">
              {selectedMails.length > 1 && (
                <div className="mb-4 bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium">
                    Claiming {selectedMails.length} mails
                  </p>
                  <ul className="mt-1 text-sm text-gray-700 list-disc list-inside">
                    {selectedMails.slice(0, 3).map((mail: any, index) => (
                      <li key={index}>{mail.barcodeId}</li>
                    ))}
                    {selectedMails.length > 3 && (
                      <li>...and {selectedMails.length - 3} more</li>
                    )}
                  </ul>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reference No.
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md bg-gray-100"
                    value={claimantDetails.id}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Claimant Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={claimantDetails.name}
                    onChange={(e) =>
                      setClaimantDetails({
                        ...claimantDetails,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number (Optional)
                  </label>
                  <input
                    type="tel"
                    className="w-full p-2 border rounded-md"
                    value={claimantDetails.contactNumber}
                    onChange={(e) =>
                      setClaimantDetails({
                        ...claimantDetails,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NIC/Student/Staff No.<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md uppercase"
                    value={claimantDetails.NIC}
                    onChange={(e) =>
                      setClaimantDetails({
                        ...claimantDetails,
                        NIC: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={claimantDetails.status}
                    onChange={(e) =>
                      setClaimantDetails({
                        ...claimantDetails,
                        status: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    <option value="claimed">Claimed</option>
                    <option value="picked">Branch Pickup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Note (Optional)
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    value={claimantDetails.note}
                    onChange={(e) =>
                      setClaimantDetails({
                        ...claimantDetails,
                        note: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-2">
                <button
                  onClick={() => setIsClaimModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClaim}
                  disabled={
                    !claimantDetails.name ||
                    !claimantDetails.NIC ||
                    !claimantDetails.status
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <FaCheck /> Confirm Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default ClaimMailTable;
