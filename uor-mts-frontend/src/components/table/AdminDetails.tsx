import React from "react";

type AdminDetailsProps = {
  admin: { [key: string]: string }; // Admin details object
  columns: { key: string; label: string }[]; // Columns definition
  onClose: () => void; // Close function
};

const AdminDetails: React.FC<AdminDetailsProps> = ({ admin, columns, onClose }) => {
  const firstName = admin["First Name"]?.trim() || "";
  const lastName = admin["Last Name"]?.trim() || "";

  let profileLetters = "AD"; // Default initials if name is missing

  if (firstName && lastName) {
    // First letter of first name + first letter of last name
    profileLetters = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  } else if (firstName) {
    // If only first name exists, take the first letter and try to get the second word (middle name)
    const nameParts = firstName.split(" ");
    profileLetters = nameParts.length > 1 
      ? `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase()
      : firstName.charAt(0).toUpperCase();
  } else if (lastName) {
    // If only last name exists, take its first letter
    profileLetters = lastName.charAt(0).toUpperCase();
  }

  return (
    <div className="w-[35%] mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full"> {/* Full width of parent container */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Admin Details</h2>
          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-800 font-bold text-lg"
          >
            &times;
          </button>
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center text-2xl font-bold rounded-full">
            {profileLetters}
          </div>
        </div>

        {/* Admin Information Table */}
        <div className="mt-4">
          <table className="table-auto w-full mx-auto border-collapse"> {/* Center the table */}
            <tbody>
              {columns.map((column) => {
                const value = admin[column.label] || "N/A"; // Access based on label name from columns
                return (
                  <tr key={column.key} className="border-b">
                    <td className="px-4 py-2 font-semibold text-left" style={{ color: "#611010" }}> {/* Left-align text */}
                      {column.label}:
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-left">{value}</td> {/* Left-align text */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
