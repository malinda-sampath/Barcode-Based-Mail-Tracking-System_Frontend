import React, { useState } from "react";
import Button from "../buttonComponents/Button";

interface Field {
  label: string;
  name: string;
  type: "text" | "number" | "textarea" | "file" | "datetime-local" | "password"; // Fixed typo and extra space
}

interface FormProps {
  title: string; // Example: "Admin", "Branch"
  fields: Field[];
  onSubmit: (formData: Record<string, any>) => void; // Function to send form data to parent
  onBack: () => void; // Function to handle "Back" button
}

const DynamicForm: React.FC<FormProps> = ({ title, fields, onSubmit, onBack }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [successMessage, setSuccessMessage] = useState(false);

  // Handle input change for form fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit (on clicking + ADD)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Send data to parent
    setSuccessMessage(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);

    // Optionally, you can reset the form after submission
    setFormData({});
  };

  // Handle clear button (reset form)
  const handleClear = () => {
    setFormData({}); // Reset the form data
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* ✅ Dynamic Success Message */}
      {successMessage && (
        <div className="flex items-center justify-between bg-green-600 text-white p-3 rounded-md mb-4">
          <div className="flex items-center gap-2">
            ✅ <span>{title} Added Successfully</span>
          </div>
          <button
            onClick={() => setSuccessMessage(false)}
            className="text-white font-bold"
          >
            ✖
          </button>
        </div>
      )}

      {/* 🔽 Form Section */}
      <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "#611010" }}>
        {title}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-full sm:w-1/3 text-sm font-medium" style={{ color: "#611010" }}>
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                className="w-full sm:w-2/3 px-3 py-2 border rounded-md"
                style={{ backgroundColor: "#DAD9D9" }}
                required
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                className="w-full sm:w-2/3 px-3 py-2 border rounded-md"
                style={{ backgroundColor: "#DAD9D9" }}
                required
              />
            )}
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8  ">
          <div onClick={onBack}>
            <Button
              text="Back"
              bgColor="bg-[#F93058]"
              hoverColor="bg-[#f60f3d]"
              height="h-8"
              width="w-26"
            />
          </div>
          <div onClick={handleClear}>
            <Button
              text="Clear"
              bgColor="bg-[#2FBFDE]"
              hoverColor="bg-[#12bbe0]"
              height="h-8"
              width="w-26"
            />
          </div>
          <Button
            text="+ ADD"
            bgColor="bg-[#4B45DA]"
            hoverColor="bg-[#2019de]"
            height="h-8"
            width="w-26"
          />
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
