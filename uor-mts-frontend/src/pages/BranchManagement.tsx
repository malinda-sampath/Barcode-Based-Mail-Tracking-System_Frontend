import React, { useState, useEffect } from "react";
import Button from "../components/buttonComponents/Button";
import { fetchBranches } from "../services/mailHandler/MailService";
import PopupMenu from "../components/popupComponent/Popup";
import ToastContainer from "../components/ui/toast/toastContainer";
import { saveBranch } from "../services/superAdmin/BranchService";
import { Eye, EyeOff, Check, X } from "lucide-react";
import BranchTable from "../components/pageComponent/superAdmin/branchManagement/BranchTable";
import BranchManagerTable from "../components/pageComponent/superAdmin/branchManagement/BranchManagerTable";
import { saveBranchManager } from "../services/superAdmin/BranchManagerService";

interface Branch {
  branchCode: string;
  branchName: string;
  branchDescription: string;
  insertDate: string;
  updateDate: string;
}

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

  // Popup states
  const [isAddBranchPopupOpen, setIsAddBranchPopupOpen] = useState(false);
  const [isAddBranchManagerPopupOpen, setIsAddBranchManagerPopupOpen] =
    useState(false);

  // Branch form states
  const [branchName, setBranchName] = useState<string>("");
  const [branchDescription, setBranchDescription] = useState<string>("");

  // Branch Manager form states
  const [branchManagerName, setBranchManagerName] = useState<string>("");
  const [branchManagerEmail, setBranchManagerEmail] = useState<string>("");
  const [branchManagerPassword, setBranchManagerPassword] =
    useState<string>("");
  const [branchManagerConfirmPassword, setBranchManagerConfirmPassword] =
    useState<string>("");
  const [branchManagerContact, setBranchManagerContact] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBranchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchBranches();
      if (response.data && Array.isArray(response.data.data)) {
        setBranches(
          response.data.data.map((branch: any) => ({
            branchCode: branch.branchCode,
            branchName: branch.branchName,
            branchDescription: branch.branchDescription,
            insertDate: branch.insertDate,
            updateDate: branch.updateDate,
          }))
        );
      } else {
        setBranches([]);
        triggerToast("No branches found.", "warning");
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
      triggerToast("Failed to fetch branches", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const BranchSave = async () => {
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
        fetchBranchData(); // Refresh branch list
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

  const BranchManagerSave = async () => {
    if (
      !branchManagerName ||
      !branchManagerEmail ||
      !branchManagerContact ||
      !branchManagerPassword ||
      !branchManagerConfirmPassword ||
      !selectedBranch
    ) {
      triggerToast("Please fill in all fields!", "error");
      return;
    }

    if (branchManagerPassword !== branchManagerConfirmPassword) {
      triggerToast("Passwords do not match!", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(branchManagerEmail)) {
      triggerToast("Invalid email format!", "error");
      return;
    }

    try {
      const selectedBranchObj = branches.find(
        (b) => b.branchName === selectedBranch
      );
      if (!selectedBranchObj) {
        triggerToast("Selected branch not found!", "error");
        return;
      }

      const response = await saveBranchManager(
        selectedBranchObj.branchCode,
        branchManagerName,
        branchManagerEmail,
        branchManagerContact,
        branchManagerPassword
      );

      if (response.status === 200) {
        triggerToast("Branch Manager added successfully!", "success");
        resetBranchManagerForm();
        setIsAddBranchManagerPopupOpen(false);
      } else if (response.status === 409) {
        triggerToast("Branch Manager already exists!", "error");
      } else {
        triggerToast("Failed to add Branch Manager!", "error");
      }
    } catch (error) {
      console.error("Error saving Branch Manager:", error);
      triggerToast(
        "An error occurred while saving the Branch Manager!",
        "error"
      );
    }
  };

  const resetBranchForm = () => {
    setBranchName("");
    setBranchDescription("");
  };

  const resetBranchManagerForm = () => {
    setBranchManagerName("");
    setBranchManagerEmail("");
    setBranchManagerContact("");
    setSelectedBranch("");
    setBranchManagerPassword("");
    setBranchManagerConfirmPassword("");
  };

  useEffect(() => {
    fetchBranchData();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const getSelectedBranchCode = () => {
    const branch = branches.find((b) => b.branchName === selectedBranch);
    return branch ? branch.branchCode : "";
  };

  return (
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
        Branch Management
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 ">{currentDate}</p>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold text-[#611010]">Branches</h2>
        <div className="flex px-4 items-center justify-end w-full">
          <Button
            text="+ ADD BRANCHES"
            bgColor="bg-[#4B45DA]"
            hoverColor="bg-[#2019de]"
            height="h-8"
            width="w-60 sm:w-55"
            onClick={() => setIsAddBranchPopupOpen(true)}
          />
        </div>
        <BranchTable branches={branches} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold text-[#611010]">
          Branch Managers
        </h2>
        <div className="flex px-4 items-center justify-end w-full">
          <Button
            text="+ ADD BRANCH MANAGERS"
            bgColor="bg-[#4B45DA]"
            hoverColor="bg-[#2019de]"
            height="h-8"
            width="w-60 sm:w-55"
            onClick={() => setIsAddBranchManagerPopupOpen(true)}
          />
        </div>
        <BranchManagerTable />
      </div>

      {/* Add Branch Popup */}
      <PopupMenu
        isOpen={isAddBranchPopupOpen}
        onClose={() => setIsAddBranchPopupOpen(false)}
        topic="Add Branch"
      >
        <div className="space-y-6 pb-4 px-6">
          <label className="block">
            <span className="text-[#611010] font-medium">Branch Name</span>
            <input
              type="text"
              className="block w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none 
              transition duration-300 ease-in-out hover:shadow-lg"
              placeholder="Enter branch name"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-[#611010] font-medium">
              Branch Description
            </span>
            <textarea
              className="block w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none 
              transition duration-300 ease-in-out hover:shadow-lg"
              placeholder="Description"
              value={branchDescription}
              onChange={(e) => setBranchDescription(e.target.value)}
            />
          </label>
        </div>

        <div className="flex gap-6 p-4 justify-end">
          <button
            onClick={resetBranchForm}
            className="w-28 h-9 bg-cyan-500 text-white font-medium rounded-lg shadow-md 
            transition-all duration-200 transform 
            hover:bg-cyan-600 active:bg-cyan-700 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
          >
            Clear
          </button>
          <button
            onClick={BranchSave}
            className="w-28 h-9 bg-indigo-600 text-white font-medium rounded-lg shadow-md 
            transition-all duration-200 transform 
            hover:bg-indigo-700 active:bg-indigo-800 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          >
            Save
          </button>
        </div>
      </PopupMenu>

      {/* Add Branch Manager Popup */}
      <PopupMenu
        isOpen={isAddBranchManagerPopupOpen}
        onClose={() => setIsAddBranchManagerPopupOpen(false)}
        topic="Add Branch Manager"
      >
        <div className="space-y-6 pb-4 px-6">
          <label className="block">
            <span className="text-[#611010] font-medium">Full Name</span>
            <input
              type="text"
              className="block w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none 
              transition duration-300 ease-in-out hover:shadow-lg"
              placeholder="Enter full name"
              value={branchManagerName}
              onChange={(e) => setBranchManagerName(e.target.value)}
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
              value={branchManagerContact}
              onChange={(e) => setBranchManagerContact(e.target.value)}
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
              value={branchManagerEmail}
              onChange={(e) => setBranchManagerEmail(e.target.value)}
              required
            />
            {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(branchManagerEmail) &&
              branchManagerEmail && (
                <span className="text-red-500 text-sm">
                  Invalid email format
                </span>
              )}
          </label>

          <label className="block">
            <span className="text-[#611010] font-medium">Branch Name</span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="block w-full mt-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none 
              transition duration-300 ease-in-out hover:shadow-lg"
              required
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.branchCode} value={branch.branchName}>
                  {branch.branchName}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[#611010] font-medium">Branch Code</span>
            <input
              type="text"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
              value={getSelectedBranchCode()}
              readOnly
            />
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
                value={branchManagerPassword}
                onChange={(e) => setBranchManagerPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
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
                value={branchManagerConfirmPassword}
                onChange={(e) =>
                  setBranchManagerConfirmPassword(e.target.value)
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {branchManagerPassword && branchManagerConfirmPassword && (
              <div className="text-xs mt-1 flex items-center">
                {branchManagerPassword === branchManagerConfirmPassword ? (
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
            onClick={resetBranchManagerForm}
            className="w-28 h-9 bg-cyan-500 text-white font-medium rounded-lg shadow-md 
            transition-all duration-200 transform 
            hover:bg-cyan-600 active:bg-cyan-700 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
          >
            Clear
          </button>
          <button
            onClick={BranchManagerSave}
            className="w-28 h-9 bg-indigo-600 text-white font-medium rounded-lg shadow-md 
            transition-all duration-200 transform 
            hover:bg-indigo-700 active:bg-indigo-800 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          >
            Save
          </button>
        </div>
      </PopupMenu>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
