import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";
import {
  saveMailDetails,
  fetchBranches,
  fetchMails,
  deleteMail,
  updateMailDetails,
} from "../services/mailHandler/MailService";
import ToastContainer from "../components/ui/toast/toastContainer";
import Button from "../components/buttonComponents/Button";
import MailDetailsPopup from "../components/pageComponent/mailHandler/MailDetailsPopup";
import useWebSocket from "../hooks/useWebSocket";
import ToggleConfirmation from "../components/ui/toggle/toggleConfiremation";
import { useToggleConfirmation } from "../components/ui/toggle/useToggleConfiremation";

interface Mail {
  index?: number;
  branchCode: string;
  senderName: string;
  receiverName: string;
  mailType: string;
  trackingNumber: string;
  mailDescription: string;
  barcodeId: string;
  barcodeImage: string;
  insertDateTime: string;
  updateDateTime: string;
}

const columns: {
  key: keyof Mail;
  label: string;
  render?: (value: any) => JSX.Element | null;
}[] = [
  { key: "index", label: "ID" },
  { key: "barcodeId", label: "Barcode ID" },
  { key: "senderName", label: "Sender" },
  { key: "receiverName", label: "Receiver" },
  { key: "branchCode", label: "Branch Code" },
  { key: "mailType", label: "Type" },
  { key: "trackingNumber", label: "Tracking No." },
  // { key: "mailDescription", label: "Description" },

  {
    key: "barcodeImage",
    label: "Barcode",
    render: (value: string) =>
      value ? (
        <img
          src={`data:image/png;base64,${value}`}
          alt="Barcode"
          className="h-12 w-auto"
        />
      ) : null,
  },
  { key: "insertDateTime", label: "Insert Date" },
  // { key: "updateDateTime", label: "Update Date" },
];

interface MailInput {
  branchName: string;
  branchCode: string;
  senderName: string;
  receiverName: string;
  mailType: string;
  trackingNumber: string;
  mailDescription: string;
}

interface Branch {
  branchCode: string;
  branchName: string;
  branchDescription: string;
  insertDate: string;
  updateDate: string;
}

// interface WebSocketMessage {
//   action: string;
//   mail: Mail;
// }

const MailManagement: React.FC = () => {
  const [selectedMail, setSelectedMail] = React.useState<Mail | null>(null);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [mails, setMails] = useState<Mail[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<Partial<MailInput>>({
    branchName: "",
    branchCode: "",
    senderName: "",
    receiverName: "",
    mailType: "",
    trackingNumber: "",
    mailDescription: "",
  });
  const [toasts, setToasts] = useState<
    { message: string; type: "success" | "error" | "info" | "warning" }[]
  >([]);
  const [isTransferring, setIsTransferring] = useState(false);

  const { isVisible, confirmationConfig, showConfirmation, hideConfirmation } =
    useToggleConfirmation();

  // Create branchCodeMap from branches data
  const branchCodeMap = branches.reduce<Record<string, string>>(
    (acc, branch) => {
      acc[branch.branchName] = branch.branchCode;
      return acc;
    },
    {}
  );

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const triggerToast = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    setToasts((prev) => [...prev, { message, type }]);
  };

  // Fetch branches
  const fetchBranchData = async () => {
    setError("");
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
        setError("No branches found.");
        triggerToast("No branches found.", "warning");
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
      setError("Failed to fetch branches.");
      triggerToast("Failed to fetch branches", "error");
    }
  };

  const fetchMailData = async () => {
    try {
      const response = await fetchMails();
      if (response.data && Array.isArray(response.data.data)) {
        const mailsWithIndex = response.data.data.map(
          (mail: any, index: number) => ({
            ...mail,
            index: index + 1,
          })
        );
        setMails(mailsWithIndex);
      }
    } catch (err) {
      console.error("Error fetching mails:", err);
      triggerToast("Failed to fetch mails", "error");
    }
  };

  // const handleWebSocketMessage = (message: WebSocketMessage) => {
  //   if (message.action === "save") {
  //     setMails((prevMails) => {
  //       const existingIndex = prevMails.findIndex(
  //         (m) => m.dailyMailId === message.mail.dailyMailId
  //       );
  //       const updatedList =
  //         existingIndex !== -1
  //           ? prevMails.map((m) =>
  //               m.dailyMailId === message.mail.dailyMailId ? message.mail : m
  //             )
  //           : [...prevMails, message.mail];
  //       return updatedList.map((m, index) => ({ ...m, index: index + 1 }));
  //     });
  //   } else if (message.action === "delete") {
  //     setMails((prevMails) => {
  //       const updatedList = prevMails.filter(
  //         (m) => m.dailyMailId !== message.mail.dailyMailId
  //       );
  //       return updatedList.map((m, index) => ({ ...m, index: index + 1 }));
  //     });
  //   }
  // };

  // useWebSocket("/topic/mail-updates", handleWebSocketMessage);

  useEffect(() => {
    fetchBranchData();
    fetchMailData();
  }, []);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "branchName") {
      setFormData({
        ...formData,
        branchName: value,
        branchCode: branchCodeMap[value] || "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleClearForm = () => {
    setFormData({
      branchName: "",
      branchCode: "",
      senderName: "",
      receiverName: "",
      mailType: "",
      trackingNumber: "",
      mailDescription: "",
    });
  };

  // Handle form submission
  const handleSaveMail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.branchName ||
      !formData.senderName ||
      !formData.receiverName ||
      !formData.mailType
    ) {
      triggerToast("Please fill in all required fields!", "error");
      return;
    }
    try {
      let response;
      if (selectedMail) {
        // Update existing mail
        response = await updateMailDetails(
          selectedMail.barcodeId,
          formData.branchCode || "",
          formData.senderName,
          formData.receiverName,
          formData.mailType,
          formData.trackingNumber || "",
          formData.mailDescription || ""
        );
      } else {
        // Create new mail
        response = await saveMailDetails(
          formData.branchCode || "",
          formData.senderName,
          formData.receiverName,
          formData.mailType,
          formData.trackingNumber || "",
          formData.mailDescription || ""
        );
      }
      if (response.status >= 200 && response.status < 300) {
        triggerToast(
          selectedMail
            ? "Mail updated successfully!"
            : "Mail saved successfully!",
          "success"
        );
        handleClearForm();
        setSelectedMail(null);
        fetchMailData(); // Refresh the mail list
      } else {
        triggerToast(
          selectedMail ? "Failed to update mail!" : "Failed to save mail!",
          "error"
        );
      }
    } catch (error) {
      console.error("Error saving mail:", error);
      triggerToast(
        selectedMail
          ? "An error occurred while updating mail!"
          : "An error occurred while saving mail!",
        "error"
      );
    }
  };

  // Handle view button click
  const handleViewClick = (mail: Mail) => {
    setSelectedMail(mail);
    setPopupOpen(true);
  };

  // Handle Delete button click
  const handleDeleteClick = async (mail: Mail) => {
    setError("");
    setStatus(0);

    showConfirmation(
      "Are you sure you want to delete this mail?",
      async () => {
        try {
          const response = await deleteMail(mail.barcodeId);
          if (response.status >= 200 && response.status < 300) {
            triggerToast("Mail deleted successfully!", "success");
            fetchMailData(); // Refresh the mail list
          } else {
            triggerToast("Failed to delete mail!", "error");
          }
        } catch (error) {
          console.error("Error deleting mail:", error);
          triggerToast("An error occurred while deleting mail!", "error");
        }
        hideConfirmation();
      },
      hideConfirmation,
      "Delete",
      "Cancel"
    );
  };

  // Handle Edit button click
  const handleEditClick = (mail: Mail) => {
    // Find the corresponding branch name for the mail's branch code
    const branch = branches.find((b) => b.branchCode === mail.branchCode);

    setFormData({
      branchName: branch?.branchName || "",
      branchCode: mail.branchCode,
      senderName: mail.senderName,
      receiverName: mail.receiverName,
      mailType: mail.mailType,
      trackingNumber: mail.trackingNumber,
      mailDescription: mail.mailDescription,
    });

    // Store the barcodeId of the mail being edited
    setSelectedMail(mail);

    // Show the form if it's not already visible
    if (!isFormVisible) {
      setIsFormVisible(true);
      setTimeout(() => {
        document
          .getElementById("mail-form")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleTransferMails = async () => {
    if (mails.length === 0) {
      triggerToast("No mails to transfer!", "warning");
      return;
    }

    setIsTransferring(true);
    // try {
    //   const response = await transferMails();
    //   if (response.status >= 200 && response.status < 300) {
    //     triggerToast(
    //       `${mails.length} mails transferred successfully!`,
    //       "success"
    //     );
    //     setMails([]);
    //   } else {
    //     triggerToast("Failed to transfer mails!", "error");
    //   }
    // } catch (error) {
    //   console.error("Error transferring mails:", error);
    //   triggerToast("An error occurred while transferring mails!", "error");
    // } finally {
    //   setIsTransferring(false);
    // }
  };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
        Mail Management
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 ">{currentDate}</p>
      {selectedMail ? (
        ""
      ) : (
        <div className="flex px-8 items-center justify-end w-full mt-4">
          <Button
            text={isFormVisible ? "CANCEL ADD MAIL" : "+ ADD MAILS"}
            bgColor={isFormVisible ? "bg-gray-500" : "bg-[#4B45DA]"}
            hoverColor={isFormVisible ? "bg-gray-600" : "bg-[#2019de]"}
            height="h-10"
            width="w-40 sm:w-48"
            onClick={() => {
              setIsFormVisible(!isFormVisible);
              if (!isFormVisible) {
                setTimeout(() => {
                  document
                    .getElementById("mail-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
          />
        </div>
      )}

      {isFormVisible && (
        <div id="mail-form" className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-lg font-semibold text-[#611010] mb-4">
            {selectedMail ? "Edit Mail" : "Add New Mail"}
          </h2>
          <form onSubmit={handleSaveMail} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Branch Name *
                </label>
                <select
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch.branchCode} value={branch.branchName}>
                      {branch.branchName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Branch Code
                </label>
                <input
                  type="text"
                  name="branchCode"
                  value={formData.branchCode}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sender Name *
                </label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Receiver Name *
                </label>
                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mail Type *
                </label>
                <select
                  name="mailType"
                  value={formData.mailType}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Registered">Registered</option>
                  <option value="Regular">Regular</option>
                  <option value="Express">Express</option>
                  <option value="Parcel">Parcel</option>
                  <option value="Document">Document</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tracking Number *
                </label>
                <input
                  type="text"
                  name="trackingNumber"
                  value={formData.trackingNumber}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="mailDescription"
                value={formData.mailDescription}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              {selectedMail ? (
                ""
              ) : (
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Clear
                </button>
              )}

              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {selectedMail ? "Update Mail" : "Save Mail"}
              </button>
              {selectedMail && (
                <button
                  type="button"
                  onClick={() => {
                    handleClearForm();
                    setIsFormVisible(false);
                    setSelectedMail(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <Table
          columns={columns}
          data={mails}
          onViewClick={handleViewClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          rowsPerPage={10}
          searchableKeys={[
            "branchCode",
            "mailType",
            "barcodeId",
            "senderName",
            "receiverName",
            "trackingNumber",
          ]}
        />
      </div>

      {mails.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleTransferMails}
            disabled={isTransferring}
            className={`px-6 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
              isTransferring
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isTransferring
              ? "Transferring..."
              : `Transfer All (${mails.length})`}
          </button>
        </div>
      )}

      <ToastContainer toasts={toasts} />
      <MailDetailsPopup
        mail={selectedMail}
        open={popupOpen}
        onClose={handleClosePopup}
      />
      {isVisible && confirmationConfig && (
        <ToggleConfirmation
          visible={isVisible}
          message={confirmationConfig.message}
          onConfirm={confirmationConfig.onConfirm}
          onCancel={confirmationConfig.onCancel || hideConfirmation}
          confirmText={confirmationConfig.confirmText}
          cancelText={confirmationConfig.cancelText}
        />
      )}
    </div>
  );
};

export default MailManagement;
