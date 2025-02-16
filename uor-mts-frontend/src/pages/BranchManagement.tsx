import React, { useState } from "react";
import Today from "../components/dateComponenet/Today";
import Button from "../components/buttonComponents/Button";
import TableBranch from "../components/table/TableBranch";
import Search from "../components/searchBar/Search";
import PopupMenu from "../components/popupComponent/Popup";

export default function AdminManagement() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen1, setIsPopupOpen1] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isSuccessPopupOpen1, setIsSuccessPopupOpen1] = useState(false);

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

  return <div className="m-4 md:m-12">

    <p className="text-[#611010] text-lg font-semibold text-center md:text-left md:absolute md:top-5 md:left-80">Branch Management</p>
    
    <Today/>
    <div className="flex flex-wrap items-center justify-center md:justify-between px-4 md:px-8 gap-4 md:gap-[10px]">
      <Search/>
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
    <TableBranch/>

    <PopupMenu isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        {/* Popup content */}
        <label className="block m-4">
          <span className="text-[#611010]">Branch Name</span>
          <select
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          >
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

      <PopupMenu isOpen={isSuccessPopupOpen} onClose={() => setIsSuccessPopupOpen(false)}>
        <div className="p-4 text-center">
          <h2 className="text-lg font-bold text-green-600">Branch User added successfully!</h2>
          <div onClick={() => setIsSuccessPopupOpen(false)}>
            <Button text="OK" bgColor="bg-green-500" hoverColor="bg-green-700" height="h-8" width="w-24"/>
          </div>
        </div>
      </PopupMenu>

      <PopupMenu isOpen={isSuccessPopupOpen1} onClose={() => setIsSuccessPopupOpen1(false)}>
        <div className="p-4 text-center">
          <h2 className="text-lg font-bold text-green-600">Branch added successfully!</h2>
          <div onClick={() => setIsSuccessPopupOpen1(false)}>
            <Button text="OK" bgColor="bg-green-500" hoverColor="bg-green-700" height="h-8" width="w-24"/>
          </div>
        </div>
      </PopupMenu>
    

  </div>;
}
