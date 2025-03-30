import React, { useState, useEffect } from "react";
import DynamicForm from "../components/form/DynamicForm";
import Table from "../components/table/Table";
import AdminFormPopup from "../components/form/AdminFormPopup";

// Define the Mail type
type Mail = {
  dailyMailId: number;
  branchCode: number;
  branchName: string;
  senderName: string;
  receiverName: string;
  mailType: string;
  trackingNumber: string;
  barcodeId: string;
  insertDateTime: string;
  updateDateTime: string;
  mailId: string; // Add this
  sender: string; // Add this
  recipient: string; // Add this
  branch: string; // Add this
  code: string; // Add this
  description: string; // Add this
};

// Define columns for the table display
const columns: { key: keyof Mail; label: string }[] = [
  { key: "dailyMailId", label: "Daily Mail Id" },
  { key: "branchCode", label: "Branch Code" },
  { key: "branchName", label: "Branch Name" },
  { key: "senderName", label: "Sender Name" },
  { key: "receiverName", label: "Receiver Name" },
  { key: "mailType", label: "Mail Type" },
  { key: "trackingNumber", label: "Tracking Number" },
  { key: "barcodeId", label: "Barcode Id" },
  { key: "insertDateTime", label: "Insert Date Time" },
  { key: "updateDateTime", label: "Update Date Time" },
];

// Define form fields for the DynamicForm component
const formFields: { label: string; name: keyof Mail; type: "text" | "textarea" }[] = [
  { label: "Mail Id", name: "mailId", type: "text" },
  { label: "Sender", name: "sender", type: "text" },
  { label: "Recipient", name: "recipient", type: "text" },
  { label: "EndPoint(Branch)", name: "branch", type: "text" },
  { label: "Code(Postal/Tracking)", name: "code", type: "text" },
  { label: "Description", name: "description", type: "text" },
];

export default function MailManagement() {
  const [mailData, setMailData] = useState<Mail[]>([]); // State to hold mail data
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
  const [formType, setFormType] = useState<"add" | "edit" | "view" | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch data from the backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mails"); // Replace with your API endpoint
        const data = await response.json();
        setMailData(data);
      } catch (error) {
        console.error("Failed to fetch mail data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleFormSubmit = (formData: Record<string, any>) => {
    console.log('Submitted Data:', formData);

    // Here, you can send the form data to the backend or handle it as needed
    // For example, you might make an API call to add the data to the backend

    // Reset form state
    setSelectedMail(null);
    setFormType(null);
    setShowPopup(false);
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setSelectedMail(null); // Reset selected mail
    setFormType(null); // Reset form type
    setShowPopup(false); // Close the popup
  };

  // Handle back button logic
  const handleBack = () => {
    setSelectedMail(null); // Reset the selected mail
    setFormType(null); // Clear the form type (i.e., don't set it to "add")
    setShowPopup(false); // Close the popup (if open)
  };

  // Handle view icon click
  const handleViewClick = (mail: Mail) => {
    setSelectedMail(mail);
    setFormType("view");
    setShowPopup(true);
  };

  // Handle edit icon click
  const handleEditClick = (mail: Mail) => {
    setSelectedMail(mail);
    setFormType("edit");
    setShowPopup(true);
  };

  // Handle delete icon click
  const handleDeleteClick = (mail: Mail) => {
    setMailData((prev) => prev.filter((m) => m.dailyMailId !== mail.dailyMailId));
  };
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="m-12">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010] ml-12">Mail Management</h1>
      <p className="text-xs sm:text-sm text-gray-500 ml-12">{currentDate}</p>
      <br></br>
      {/* Table Container */}
      <div className="bg-white p-6 rounded-lg shadow-md ml-12">
        <Table
          columns={columns}
          data={mailData}
          rowsPerPage={5}
          onViewClick={handleViewClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          searchableKeys={["dailyMailId", "senderName", "receiverName"]}
        />
      </div>

      {/* Transfer Button (Outside the Table Container) */}
    <div className="mt-4 ml-12 flex justify-end">
      <button
        onClick={() => console.log("Transfer button clicked")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Transfer
      </button>
    </div>

      {/* Add Mail Form */}
      <div className="mt-4 ml-12">
        <DynamicForm
          title=""
          fields={formFields}
          onSubmit={handleFormSubmit} // Pass the correct function
          onBack={handleBack} // Pass the correct function
        />
      </div>

      {/* Popups for View/Edit */}
      {showPopup && selectedMail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl" onClick={handleClosePopup}>✖</button>
            <AdminFormPopup
              title={formType === "view" ? "View Mail" : "Edit Mail"}
              fields={formFields}
              admin={selectedMail}
              onSubmit={handleFormSubmit} // Pass the correct function
              onClose={handleClosePopup} // Pass the correct function
            />
          </div>
        </div>
      )}
    </div>
  );
}