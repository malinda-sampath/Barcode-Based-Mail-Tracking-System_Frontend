import React, { useState } from "react";
import Button from "../buttonComponents/Button";

interface Field {
  label: string;
  name: string;
  type: "text" | "number" | "textarea" | "file" | "datetime-local" | "password";
}

type AdminFormPopupProps = {
  title: string; // Example: "Admin", "Branch"
  fields: Field[];
  admin: Record<string, any>; // admin data to pre-fill the form
  onSubmit: (formData: Record<string, any>) => void;
  onClose: () => void;
};

const AdminFormPopup: React.FC<AdminFormPopupProps> = ({
  title,
  fields,
  admin,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(admin);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  setTimeout(() => {
    setSuccessMessage(false);
  }, 3000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
    setFormData(admin);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded-md mb-4 text-center">
            ✅ {title} Updated Successfully
          </div>
        )}
        <h2 className="text-xl font-bold text-center" style={{ color: "#611010" }}>
          {title}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {fields.map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className="font-medium" style={{ color: "#611010" }}>
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                  style={{ backgroundColor: "#DAD9D9", color: "black" }}
                  required
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                  style={{ backgroundColor: "#DAD9D9", color: "black" }}
                  required
                />
              )}
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <div onClick={onClose}>
              <Button
                text="Back"
                bgColor="bg-[#F93058]"
                hoverColor="bg-[#f60f3d]"
                height="h-8"
                width="w-28"
              />
            </div>
            <div onClick={onSubmit}>
              <Button
                text="Save"
                bgColor="bg-[#228B22]"
                hoverColor="bg-[#f60f3d]"
                height="h-8"
                width="w-28"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminFormPopup;
