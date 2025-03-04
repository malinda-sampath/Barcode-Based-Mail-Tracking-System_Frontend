import React, { useState } from "react";
import Button from "../components/buttonComponents/Button";
import Search from "../components/searchBar/Search";
import PopupMenu from "../components/popupComponent/Popup";
import ToastContainer from "../components/ui/toastContainer";
import { saveBranch } from "../../src/services/BranchService";
import BranchTable from "../components/pageComponent/superAdmin/branchManagement/BranchTable";

export default function AdminManagement() {
  const [toasts, setToasts] = useState<
    { message: string; type: "success" | "error" | "info" | "warning" }[]
  >([]);

  const triggerToast = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    setToasts((prev) => [...prev, { message, type }]);
  };

  // Popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddbranchPopupOpen, setIsAddBranchPopupOpen] = useState(false);
  const [isBranchPopupOpen, setIsBranchPopupOpen] = useState(false);

  // User input
  const [branchName, setBranchName] = useState<string>("");
  const [branchDescription, setBranchDescription] = useState<string>("");

  // API response
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string>("");

  // Branch save function
  const BranchSave = async () => {
    setError("");
    setStatus(0);

    if (!branchName || !branchDescription) {
      triggerToast("Please fill in all fields!", "error");
      return;
    }

    try {
      const response = await saveBranch(branchName, branchDescription);

      if (response.status >= 200 && response.status < 300) {
        triggerToast("Branch added successfully!", "success");
        setBranchName("");
        setBranchDescription("");
        setIsAddBranchPopupOpen(false);
      } else if (response.status === 409) {
        triggerToast("Branch already exists!", "error");
      } else {
        triggerToast("Failed to add branch!", "error");
      }
    } catch (error) {
      console.error("Error saving branch:", error);
      triggerToast("An error occurred while saving the branch!", "error");
    }
  };

  const handleButtonClick = () => {
    setIsPopupOpen(true); // Open the popup when the button is clicked
  };

  const handleAddBranch = () => {
    setIsAddBranchPopupOpen(true);
  };

  // Handle Branch save button click
  const handleBranchSaveBtn = () => {
    setIsBranchPopupOpen(true);
    BranchSave();
  };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
        Branch Management
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 ">{currentDate}</p>

      <div className="flex px-8 items-center justify-end w-full">
        <div className="flex items-end gap-4">
          <div onClick={handleAddBranch}>
            <Button
              text="+ ADD BRANCHES"
              bgColor="bg-[#4B45DA]"
              hoverColor="bg-[#2019de]"
              height="h-8"
              width="w-60 sm:w-55"
            />
          </div>
          <div onClick={handleButtonClick}>
            <Button
              text="+ ADD USERS"
              bgColor="bg-[#4B45DA]"
              hoverColor="bg-[#2019de]"
              height="h-8"
              width="w-60 sm:w-55"
            />
          </div>
        </div>
      </div>

      <BranchTable />

      <PopupMenu isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        {/* Popup content */}
        <label className="block m-4">
          <span className="text-[#611010]">Branch Name</span>
          <select className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="branch1">FOS</option>
            <option value="branch2">FOM</option>
            <option value="branch3">VCO</option>
          </select>
        </label>
        <label className="block m-4">
          <span className="text-[#611010]">Branch Code</span>
          <input
            type="text"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Auto-filled branch code"
          />
        </label>
        <label className="block m-4">
          <span className="text-[#611010]">Username</span>
          <input
            type="text"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter username"
          />
        </label>
        <label className="block m-4">
          <span className="text-[#611010]">Password</span>
          <input
            type="text"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter password"
          />
        </label>
        <label className="block m-4">
          <span className="text-[#611010]">Confirm Password</span>
          <input
            type="text"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Re-enter password"
          />
        </label>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            text="Back"
            bgColor="bg-[#F93058]"
            hoverColor="bg-[#f60f3d]"
            height="h-8"
            width="w-28"
          />
          <Button
            text="Clear"
            bgColor="bg-[#2FBFDE]"
            hoverColor="bg-[#12bbe0]"
            height="h-8"
            width="w-28"
          />
          <div>
            <Button
              text="Save"
              bgColor="bg-[#4B45DA]"
              hoverColor="bg-[#2019de]"
              height="h-8"
              width="w-28"
            />
          </div>
        </div>
      </PopupMenu>

      <PopupMenu
        isOpen={isAddbranchPopupOpen}
        onClose={() => setIsAddBranchPopupOpen(false)}
      >
        {/* Popup content */}
        <div className="space-y-6 pb-3">
          <label className="block m-4">
            <span className="text-[#611010]">Branch Name</span>
            <input
              type="text"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter branch name"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
            />
          </label>
          <label className="block m-4">
            <span className="text-[#611010]">Branch Description</span>
            <></>
            <input
              type="text"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Description"
              value={branchDescription}
              onChange={(e) => setBranchDescription(e.target.value)}
            />
          </label>
        </div>

        <div className="flex gap-10 p-4 justify-end">
          <button
            className="w-28 h-8 bg-cyan-500 text-white font-medium rounded-lg shadow-sm 
          transition-all duration-200 transform 
          hover:bg-cyan-600 active:bg-cyan-700 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Clear
          </button>
          <button
            onClick={handleBranchSaveBtn}
            className="w-28 h-8 bg-indigo-600 text-white font-medium rounded-lg shadow-sm 
          transition-all duration-200 transform 
          hover:bg-indigo-700 active:bg-indigo-800 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Saves
          </button>
        </div>
      </PopupMenu>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
