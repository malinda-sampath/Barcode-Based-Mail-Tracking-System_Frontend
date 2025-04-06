import React, { useState } from "react";
import PopupMenu from "../components/popupComponent/Popup";
import { Eye, EyeOff, Check, X } from "lucide-react";
import ToastContainer from "../components/ui/toast/toastContainer";
import Button from "../components/buttonComponents/Button";
import MailHandlerTable from "../components/pageComponent/superAdmin/mailHandler/MailHandlerTable";
import { saveMailHandler } from "../services/superAdmin/MailHandlerService";

export default function AdminManagement() {
  // Toast state
  const [toasts, setToasts] = useState<
    { message: string; type: "success" | "error" | "info" | "warning" }[]
  >([]);

  const triggerToast = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    setToasts((prev) => [...prev, { message, type }]);
  };

  // User input
  const [IsAddMailAdminPopupOpen, setIsAddMailAdminPopupOpen] = useState(false);
  const [mailHandlerName, setMailHandlerName] = useState<string>("");
  const [mailHandlerEmail, setMailHandlerEmail] = useState<string>("");
  const [mailHandlerContact, setMailHandlerContact] = useState<string>("");
  const [mailHandlerPassword, setMailHandlerPassword] = useState<string>("");
  const [mailHandlerConfirmPassword, setMailHandlerConfirmPassword] =
    useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // API response
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<number>(0);

  const handleAddMailAdmin = () => {
    handleClearBtn();
    setIsAddMailAdminPopupOpen(true);
  };

  // Clear button function
  const handleClearBtn = () => {
    setMailHandlerName("");
    setMailHandlerEmail("");
    setMailHandlerContact("");
    setMailHandlerPassword("");
    setMailHandlerConfirmPassword("");
  };

  // Mail-Handler save function
  const handleMailHandlerSaveBtn = async () => {
    setError("");
    setStatus(0);

    if (
      !mailHandlerName ||
      !mailHandlerEmail ||
      !mailHandlerContact ||
      !mailHandlerPassword ||
      !mailHandlerConfirmPassword
    ) {
      triggerToast("Please fill in all fields!", "error");
      return;
    }

    if (mailHandlerPassword !== mailHandlerConfirmPassword) {
      triggerToast("Passwords do not match!", "error");
      return;
    }

    try {
      const response = await saveMailHandler(
        mailHandlerName,
        mailHandlerEmail,
        mailHandlerContact,
        mailHandlerPassword
      );

      if (response.status >= 200 && response.status < 300) {
        triggerToast("Mail-Handler saved successfully!", "success");
        handleClearBtn();
        setIsAddMailAdminPopupOpen(false);
      } else if (response.status === 409) {
        triggerToast("User already exists!", "error");
      } else {
        triggerToast("Failed to add Mail-Handler!", "error");
      }
    } catch (error) {
      console.error("Error saving branch:", error);
      triggerToast("An error occurred while saving!", "error");
    }
  };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
        Mail Handler Management
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 ">{currentDate}</p>

      <div className="flex px-8 items-center justify-end w-full">
        <div className="flex items-end gap-4">
          <div onClick={handleAddMailAdmin}>
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

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold text-[#611010] mb-5">
          Mail Handler Details
        </h2>
        <MailHandlerTable />
      </div>

      <PopupMenu
        isOpen={IsAddMailAdminPopupOpen}
        onClose={() => setIsAddMailAdminPopupOpen(false)}
        topic={"Mail-Handler"}
      >
        {/* Popup content */}
        <div className="space-y-6 pb-4 px-6">
          <label className="block">
            <span className="text-[#611010] font-medium">Full Name</span>
            <input
              type="text"
              className="block w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm 
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none 
        transition duration-300 ease-in-out hover:shadow-lg"
              placeholder="Enter full name"
              value={mailHandlerName}
              onChange={(e) => setMailHandlerName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-[#611010] font-medium">Contact Number</span>
            <input
              type="tel"
              className="block w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm 
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none 
        transition duration-300 ease-in-out hover:shadow-lg"
              placeholder="Enter contact number"
              value={mailHandlerContact}
              onChange={(e) => setMailHandlerContact(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-[#611010] font-medium">Email Address</span>
            <input
              type="email"
              className="block w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm 
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none 
        transition duration-300 ease-in-out hover:shadow-lg"
              placeholder="Enter email address"
              value={mailHandlerEmail}
              onChange={(e) => setMailHandlerEmail(e.target.value)}
            />
            {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailHandlerEmail) &&
              mailHandlerEmail && (
                <span className="text-red-500 text-sm">
                  Invalid email format
                </span>
              )}
          </label>

          <label className="block relative">
            <span className="text-[#611010] font-medium">Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="block w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none 
          transition duration-300 ease-in-out hover:shadow-lg"
                placeholder="Enter password"
                value={mailHandlerPassword}
                onChange={(e) => setMailHandlerPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => {
                  setShowPassword(!showPassword);
                  showConfirmPassword
                    ? setShowConfirmPassword(!showConfirmPassword)
                    : setShowConfirmPassword(showConfirmPassword);
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </label>

          <label className="block relative">
            <span className="text-[#611010] font-medium">Confirm Password</span>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="block w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none 
          transition duration-300 ease-in-out hover:shadow-lg"
                placeholder="Confirm password"
                value={mailHandlerConfirmPassword}
                onChange={(e) => setMailHandlerConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                  showPassword
                    ? setShowPassword(!showPassword)
                    : setShowPassword(showPassword);
                }}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {mailHandlerPassword && mailHandlerConfirmPassword && (
              <div className="text-xs mt-1 flex items-center">
                {mailHandlerPassword === mailHandlerConfirmPassword ? (
                  <>
                    <Check className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-green-500">Passwords match</span>
                  </>
                ) : (
                  <>
                    <X className="w-3 h-3 text-red-500 mr-1" />
                    <span className="text-red-500">Passwords don't match</span>
                  </>
                )}
              </div>
            )}
          </label>
        </div>
        <div className="flex gap-6 p-4 justify-end">
          <button
            onClick={handleClearBtn}
            className="w-28 h-9 bg-cyan-500 text-white font-medium rounded-lg shadow-md 
      transition-all duration-200 transform 
      hover:bg-cyan-600 active:bg-cyan-700 active:scale-95
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
          >
            Clear
          </button>
          <button
            onClick={handleMailHandlerSaveBtn}
            className="w-28 h-9 bg-indigo-600 text-white font-medium rounded-lg shadow-md 
      transition-all duration-200 transform 
      hover:bg-indigo-700 active:bg-indigo-800 active:scale-95
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          >
            Save
          </button>
        </div>
      </PopupMenu>

      {/* {formType === "view" && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <AdminDetails
            admin={{
              "First Name": selectedAdmin.firstName,
              "Last Name": selectedAdmin.lastName,
              Email: selectedAdmin.email,
              "Mobile No": selectedAdmin.mobileNo,
              "User Name": selectedAdmin.userName,
            }}
            columns={columns}
            onClose={handleClosePopup}
          />
        </div>
      )} */}

      {/* {formType === "edit" && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              onClick={handleClosePopup}
            >
              ✖
            </button>
            <AdminFormPopup
              title="Admin"
              fields={formFields}
              admin={selectedAdmin}
              onSubmit={handleFormSubmit}
              onClose={handleClosePopup}
            />
          </div>
        </div>
      )} */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
