import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

type SearchButtonProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setAdmins: (admins: any[]) => void;
  admins: any[];
  allAdmins: any[]; // Store the full list to reset later
};

export default function SearchButton({
  searchTerm,
  setSearchTerm,
  setAdmins,
  admins,
  allAdmins,
}: SearchButtonProps) {
  const [isButtonExpanded, setIsButtonExpanded] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false); // Track search state

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (/^\d{8}$/.test(value)) {
      // Auto-search when input is exactly 8 digits (barcode)
      const filteredAdmins = allAdmins.filter(
        (admin) => admin.barcodeID === value
      );
      setAdmins(filteredAdmins);
      setIsSearchActive(true);
    }
  };

  // Handle manual search button click
  const handleSearchButtonClick = () => {
    if (isSearchActive) {
      // Reset functionality
      setSearchTerm("");
      setAdmins(allAdmins); // Restore full list
      setIsSearchActive(false);
      setIsButtonExpanded(false);
    } else {
      // Search functionality
      setIsButtonExpanded(true);

      if (searchTerm.length > 0) {
        const filteredAdmins = allAdmins.filter(
          (admin) =>
            admin.barcodeID === searchTerm || // Exact barcode match
            Object.values(admin).some(
              (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setAdmins(filteredAdmins); // Set filtered results
        setIsSearchActive(true); // Mark search as active
      }
    }
  };

  // Handle pressing "Enter" to trigger search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };

  return (
    <div className="relative flex items-center">
      <FaSearch className="absolute left-3 text-gray-500" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className="border border-gray-300 rounded-md pl-10 pr-2 py-1 w-48 focus:outline-none"
      />
      <button
        className={`ml-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300 ${
          isButtonExpanded ? "w-28" : "w-20"
        }`}
        onClick={handleSearchButtonClick}
      >
        {isSearchActive ? "Reset" : "Search"}
      </button>
    </div>
  );
}
