import React from "react";

type AdminDetailsProps = {
  admin: { [key: string]: string }; // Admin details object
  columns: { key: string; label: string }[]; // Columns definition
  onClose: () => void; // Close function
};

const AdminDetails: React.FC<AdminDetailsProps> = ({ admin, columns, onClose }) => {
  const firstName = admin["First Name"]?.trim() || "";
  const lastName = admin["Last Name"]?.trim() || "";

   const profileLetters =
  (firstName && lastName) 
    ? `${firstName[0]}${lastName[0]}`.toUpperCase()  // If both first and last name are available
    : (firstName ? firstName[0] : lastName ? lastName[0] : "AD").toUpperCase(); // Fallback if one of the names is missing
    

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
          <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center text-xl font-bold rounded-full">
            {profileLetters}
          </div>
        </div>

        {/* Admin Information Table */}
        <div className="mt-4">
          <table className="table-auto w-full border-collapse">
            <tbody>
              {columns.map((column) => (
                <tr key={column.key} className="border-b">
                  <td className="px-4 py-2 font-semibold" style={{ color: "#611010" }}>
                    {column.label}:
                  </td>
                  <td className="px-4 py-2 text-gray-700">{admin[column.key] || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
