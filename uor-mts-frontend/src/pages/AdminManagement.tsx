import React, { useState } from "react";
//import { FaSearch } from "react-icons/fa";
import Button from "../components/buttonComponents/Button";
import Table from "../components/table/Table";
import DynamicForm from "../components/form/DynamicForm";
import AdminDetails from "../components/table/AdminDetails";
import AdminFormPopup from "../components/form/AdminFormPopup"; // Import the AdminFormPopup component
import SearchButton from "../components/buttonComponents/SearchButton";

type Person = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  userName: string;
  password: string;
};

const data: Person[] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    mobileNo: "071-1112223",
    userName: "john_doe",
    password: "1234"
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    mobileNo: "987-654-3210",
    userName: "jane_smith",
    password: "1234"
  },
  {
    firstName: "Sam",
    lastName: "Wilson",
    email: "sam.wilson@example.com",
    mobileNo: "456-789-1234",
    userName: "sam_wilson",
    password: "1234"
  },
];

const columns: { key: keyof Person; label: string }[] = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "mobileNo", label: "Mobile No" },
];

const formFields: { label: string; name: keyof Person; type: "text" | "number" | "textarea" | "file" | "datetime-local" | "password" }[] = [
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  { label: "Email", name: "email", type: "text" },
  { label: "Mobile No", name: "mobileNo", type: "text" },
  { label: "User Name", name: "userName", type: "text" },
  { label: "Password", name: "password", type: "password" }
];

export default function AdminManagement() {
  const [showForm, setShowForm] = useState(false);
  const [admins, setAdmins] = useState<Person[]>(data);
  const [selectedAdmin, setSelectedAdmin] = useState<Person | null>(null);
  const [formType, setFormType] = useState<"add" | "edit" | "view" | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleToggleForm = () => setShowForm((prev) => !prev);

  const handleFormSubmit = (formData: Record<string, any>) => {
    const updatedAdmin: Person = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobileNo: formData.mobileNo,
      userName: formData.userName,
      password: formData.password,
    };
    const updatedAdmins = admins.map((admin) =>
      admin.userName === updatedAdmin.userName ? updatedAdmin : admin
    );
    setAdmins(updatedAdmins);
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);

    setShowForm(false);
  };

  const handleEditAdmin = (admin: Person) => {
    setSelectedAdmin(admin);
    setFormType("edit");
  };

  const handleViewAdmin = (admin: Person) => {
    setSelectedAdmin(admin);
    setFormType("view");
  };

  const handleClosePopup = () => {
    setSelectedAdmin(null);
    setFormType(null);
  };

  return (
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">Mail Handle Management</h1>
      <p className="text-xs sm:text-sm text-gray-500 text-[#611010]">{currentDate}</p>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-10">
      <div className="flex items-center gap-2">
  <SearchButton 
    searchTerm={searchTerm} 
    setSearchTerm={setSearchTerm} 
    setAdmins={setAdmins} 
    admins={data} 
    allAdmins={data} // Pass the full list for reset
  />
</div>

        <div className="mt-4 sm:mt-0 mr-0 sm:mr-10" onClick={() => setFormType("add")}>
          <Button text="+ ADD" bgColor="bg-[#4B45DA]" hoverColor="bg-[#2019de]" height="h-8" width="w-28" />
        </div>
      </div>

      <div className="p-2 sm:p-4 mt-4 mr-0 sm:mr-8 overflow-x-auto">
        <Table 
          columns={columns} 
          data={admins} 
          onViewClick={handleViewAdmin} 
          onEditClick={handleEditAdmin} />
      </div>

      {formType === "add" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl" onClick={handleClosePopup}>✖</button>
            <DynamicForm 
              title="Admin" 
              fields={formFields} 
              onSubmit={handleFormSubmit} 
              onBack={handleClosePopup} />
          </div>
        </div>
      )}

      {formType === "view" && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <AdminDetails 
            admin={{
              "First Name": selectedAdmin.firstName,
              "Last Name": selectedAdmin.lastName,
              "Email": selectedAdmin.email,
              "Mobile No": selectedAdmin.mobileNo,
              "User Name": selectedAdmin.userName
            }}
            columns={columns} 
            onClose={handleClosePopup} />
        </div>
      )}

      {formType === "edit" && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl" onClick={handleClosePopup}>✖</button>
            <AdminFormPopup 
              title="Admin" 
              fields={formFields} 
              admin={selectedAdmin} 
              onSubmit={handleFormSubmit} 
              onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
}
