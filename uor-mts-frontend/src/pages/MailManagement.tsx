import React, { useState } from "react";
import DynamicForm from "../components/form/DynamicForm";
import Table from "../components/table/Table";
import AdminFormPopup from "../components/form/AdminFormPopup";

// Define the Mail type to structure your data
type Mail = {
  mailId: string;
  sender: string;
  recipient: string;
  branch: string;
  code: string;
  description: string;
};

// Define columns for the table display
const columns: { key: keyof Mail; label: string }[] = [
  { key: "mailId", label: "Mail Id" },
  { key: "sender", label: "Sender" },
  { key: "recipient", label: "Recipient" },
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

export default function AdminManagement() {
  // State management
  const [mailData, setMailData] = useState<Mail[]>([]); // Holds the mail data (list of mails)
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null); // Holds the currently selected mail (for viewing/editing)
  const [formType, setFormType] = useState<"add" | "edit" | "view" | null>(null); // Determines the form type (add, edit, view)
  const [showPopup, setShowPopup] = useState(false); // Controls whether the popup for viewing/editing is shown

  
  // Get current date in desired format
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Handle form submission (add/edit mail data)
  const handleFormSubmit = (formData: Record<string, any>) => {
    console.log('Submitted Data:', formData);

    const updatedMail: Mail = {
      mailId: formData.mailId,
      sender: formData.sender,
      recipient: formData.recipient,
      branch: formData.branch,
      code: formData.code,
      description: formData.description,
    };

    if (!updatedMail.mailId || !updatedMail.sender || !updatedMail.recipient) {
      console.error("Missing required fields in form data.");
      return; // Early exit if data is incomplete
    }

    setMailData((prevMailData) => {
      if (formType === "edit" && selectedMail) {
        return prevMailData.map((mail) =>
          mail.mailId === selectedMail.mailId ? updatedMail : mail
        );
      } else {
        return [...prevMailData, updatedMail]; // Add new mail
      }
    });

    setSelectedMail(null); // Reset after form submission
    setFormType(null); // Reset form type
    setShowPopup(false); // Close the popup
  };

  // Handle view mail (open popup in view mode)
  const handleViewMail = (mail: Mail) => {
    setSelectedMail(mail); // Set the selected mail for viewing
    setFormType("view"); // Set form type to 'view'
    setShowPopup(true); // Show the popup
  };

  // Handle edit mail (open popup in edit mode)
  const handleEditMail = (mail: Mail) => {
    setSelectedMail(mail); // Set the selected mail for editing
    setFormType("edit"); // Set form type to 'edit'
    setShowPopup(true); // Show the popup
  };

  // Handle closing the popup (without any action)
  const handleClosePopup = () => {
    setSelectedMail(null); // Reset selected mail
    setFormType(null); // Reset form type
    setShowPopup(false); // Close the popup
  };

  // Handle back button logic (clear form)
  const handleBack = () => {
    setSelectedMail(null); // Reset the selected mail
    setFormType(null); // Clear the form type (i.e., don't set it to "add")
    setShowPopup(false); // Close the popup (if open)
};

  return (
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">Mail Management</h1>
      <p className="text-xs sm:text-sm text-gray-500 text-[#611010] mb-4">{currentDate}</p>

      {/* Table Display (only shows if mailData is available) */}
      {mailData.length > 0 && (
        <Table
          columns={columns}
          data={mailData}
          rowsPerPage={5}
          onViewClick={handleViewMail}
          onEditClick={handleEditMail}
        />
      )}

      {/* Add Mail Form */}
      <DynamicForm
        title=""
        fields={formFields}
        onSubmit={handleFormSubmit}
        onBack={handleBack} // Pass clearForm function to Back button
        
      />

      {/* View Mail Popup */}
      {showPopup && selectedMail && formType === "view" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="w-[40%] mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">View Mail Details</h2>
              <button
                onClick={handleClosePopup}
                className="text-red-600 hover:text-red-800 font-bold text-lg"
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <table className="table-auto w-full mx-auto border-collapse">
                <tbody>
                  {Object.entries(selectedMail).map(([key, value]) => (
                    <tr key={key} className="border-b">
                      <td className="px-4 py-2 font-semibold text-left" style={{ color: "#611010" }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </td>
                      <td className="px-4 py-2 text-gray-700 text-left">{value || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Edit Mail Popup */}
      {showPopup && selectedMail && formType === "edit" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl" onClick={handleClosePopup}>✖</button>
            <AdminFormPopup
              title="Edit Mail"
              fields={formFields}
              admin={selectedMail}
              onSubmit={handleFormSubmit}
              onClose={handleClosePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
}
