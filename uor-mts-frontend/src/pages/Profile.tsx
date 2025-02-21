import React from "react";
import Today from "../components/dateComponenet/Today";
import Button from "../components/buttonComponents/Button";
import { useState } from "react";
import PopupMenu from "../components/popupComponent/Popup";

export default function AdminManagement() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenConfirm, setIsPopupOpenConfirm] = useState(false);
  const [isPopupOpenSuccess, setIsPopupOpenSuccess] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true); // Open the popup when the button is clicked
  };

  const handleButtonClickConfirm = () => {
    setIsPopupOpenConfirm(true); // Open the popup when the button is clicked
  };

  const handleButtonClickSuccess = () => {
    setIsPopupOpenSuccess(true); // Open the popup when the button is clicked
  };

  return <div className="m-12">

      <p className="text-[#611010] text-[18px] font-semibold absolute top-5 left-[335px]">Profile</p>
      <Today/> 
      <div className="relative flex space-x-28 left-40 top-20">  
        <div className="bg-[#E0E1E2] h-28 w-28 border-neutral-800 rounded-xl relative top-12" >
        
        </div>

        <div>
          <label className="block m-4">
              <span className="text-[#611010]">Name</span>
              <input
                type="text"
                className="block mt-1 border-gray-300 rounded-md shadow-sm w-96 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block m-4">
              <span className="text-[#611010]">E-mail</span>
              <input
                type="text"
                className="block mt-1 border-gray-300 rounded-md shadow-sm w-96 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block m-4">
              <span className="text-[#611010]">Contact No.</span>
              <input
                type="text"
                className="block mt-1 border-gray-300 rounded-md shadow-sm w-96 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <div onClick={handleButtonClick}>
              <Button
              text="Edit Profile"
              bgColor="bg-[#F93058]"
              hoverColor="bg-[#f60f3d]"
              height="h-8"
              width="w-28"
            />
          </div>
        </div> 
      </div>

      <PopupMenu isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        {/* Popup content */}
        <label className="block m-4">
              <span className="text-[#611010]">Name</span>
              <input
                type="text"
                className="block mt-1 border-gray-300 rounded-md shadow-sm w-96 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block m-4">
              <span className="text-[#611010]">E-mail</span>
              <input
                type="text"
                className="block mt-1 border-gray-300 rounded-md shadow-sm w-96 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block m-4">
              <span className="text-[#611010]">Contact No.</span>
              <input
                type="text"
                className="block mt-1 border-gray-300 rounded-md shadow-sm w-96 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block m-4">
              <span className="text-[#611010]">Change Password</span>
              <input
                type="text"
                className="block mt-1 border-gray-300 rounded-md shadow-sm w-96 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block m-4">
              <span className="text-[#611010]">Confirm Password</span>
              <input
                type="text"
                className="block mt-1 border-gray-300 rounded-md shadow-sm w-96 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>

        <div className="flex space-x-12" onClick={handleButtonClickConfirm}>
          
          <Button
          text="Save"
          bgColor="bg-[#4B45DA]"
          hoverColor="bg-[#2019de]"
          height="h-8"
          width="w-28"
          />
        </div>

         <PopupMenu isOpen={isPopupOpenConfirm} onClose={() => setIsPopupOpenConfirm(false)}>
            <p className="text-lg text-center text-rose-800">Are you sure you want to change profile details? Confirm</p>
              <div className="flex items-center justify-center" onClick={handleButtonClickSuccess}>
                <Button
                  text="OK"
                  bgColor="bg-[#1D154A]"
                  hoverColor="bg-[#13094e]"
                  height="h-8"
                  width="w-36"
                />
              </div>

              <PopupMenu isOpen={isPopupOpenSuccess} onClose={() => setIsPopupOpenSuccess(false)}>
                <p className="text-[28px] text-center text-green-900 ">Profile Updated Successfully!!!</p>
              </PopupMenu>
        </PopupMenu>


      </PopupMenu>

      
  </div>;
}
