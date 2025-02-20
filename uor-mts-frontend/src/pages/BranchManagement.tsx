import React, { useState } from "react";
import Button from "../components/buttonComponents/Button";
import TableBranch from "../components/table/TableBranch";
import Search from "../components/searchBar/Search";
import PopupMenu from "../components/popupComponent/Popup";

interface BranchSaveRequest {
  branchName: string;
  branchDescription: string;
}

interface BranchSaveResponse {
  status: number;
  message: string;
  data: {};
}

export default function AdminManagement() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen1, setIsPopupOpen1] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isSuccessPopupOpen1, setIsSuccessPopupOpen1] = useState(false);

  const [branchName, setBranchName] = useState<string>("");
  const [branchDescription, setBranchDescrption] = useState<string>("");

  const BrnachSave = async () => {
    const branchSaveRequest: BranchSaveRequest = {
      branchName,
      branchDescription,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/branch/save`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(branchSaveRequest),
        }
      );

      const output: BranchSaveResponse = await response.json();

      console.log("Output : " + output);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleButtonClick = () => {
    setIsPopupOpen(true); // Open the popup when the button is clicked
  };

  const handleButtonClick1 = () => {
    setIsPopupOpen1(true); // Open the popup when the button is clicked
  };

  const handleButtonClick2 = () => {
    setIsSuccessPopupOpen(true); // Open the popup when the button is clicked
  };

  const handleButtonClick3 = () => {
    setIsSuccessPopupOpen1(true); // Open the popup when the button is clicked
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

      <div className="flex px-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Search />
        </div>
        <div className="lg:flex sm:items-center items-end gap-4">
          <div onClick={handleButtonClick1}>
            <Button
              text="+ ADD BRANCHES"
              bgColor="bg-[#4B45DA]"
              hoverColor="bg-[#2019de]"
              height="h-8"
              width="w-full md:w-64"
            />
          </div>
          <div onClick={handleButtonClick}>
            <Button
              text="+ ADD BRANCH USERS"
              bgColor="bg-[#4B45DA]"
              hoverColor="bg-[#2019de]"
              height="h-8"
              width="w-full md:w-64"
            />
          </div>
        </div>
      </div>

      <TableBranch />

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
          <div onClick={handleButtonClick2}>
            <Button
              text="+ ADD"
              bgColor="bg-[#4B45DA]"
              hoverColor="bg-[#2019de]"
              height="h-8"
              width="w-28"
            />
          </div>
        </div>
      </PopupMenu>

      <PopupMenu isOpen={isPopupOpen1} onClose={() => setIsPopupOpen1(false)}>
        {/* Popup content */}
        <label className="block m-4">
          <span className="text-[#611010]">Branch Name</span>
          <input
            type="text"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter branch name"
          />
        </label>
        <label className="block m-4">
          <span className="text-[#611010]">Branch Code</span>
          <input
            type="text"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter branch code"
          />
        </label>

        <div className="flex space-x-12">
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
          <div onClick={handleButtonClick3}>
            <Button
              text="+ ADD"
              bgColor="bg-[#4B45DA]"
              hoverColor="bg-[#2019de]"
              height="h-8"
              width="w-28"
            />
          </div>
        </div>
      </PopupMenu>

      <PopupMenu
        isOpen={isSuccessPopupOpen}
        onClose={() => setIsSuccessPopupOpen(false)}
      >
        <div className="p-4 text-center">
          <h2 className="text-lg font-bold text-green-600">
            Branch User added successfully!
          </h2>
          <div onClick={() => setIsSuccessPopupOpen(false)}>
            <Button
              text="OK"
              bgColor="bg-green-500"
              hoverColor="bg-green-700"
              height="h-8"
              width="w-24"
            />
          </div>
        </div>
      </PopupMenu>

      <PopupMenu
        isOpen={isSuccessPopupOpen1}
        onClose={() => setIsSuccessPopupOpen1(false)}
      >
        <div className="p-4 text-center">
          <h2 className="text-lg font-bold text-green-600">
            Branch added successfully!
          </h2>
          <div onClick={() => setIsSuccessPopupOpen1(false)}>
            <Button
              text="OK"
              bgColor="bg-green-500"
              hoverColor="bg-green-700"
              height="h-8"
              width="w-24"
            />
          </div>
        </div>
      </PopupMenu>
    </div>
  );
}
