import React, { useState } from 'react';



// Define the DailyMail interface
interface DailyMail {
  branchCode: number;
  branchName: string;
  senderName: string;
  receiverName: string;
  mailType: string;
  trackingNumber: string;
  mailDescription: string;
  barcodeId: string;
  barcodeImage: File | null;
  insertDateTime: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<DailyMail>({
    branchCode: 0,
    branchName: '',
    senderName: '',
    receiverName: '',
    mailType: '',
    trackingNumber: '',
    mailDescription: '',
    barcodeId: '',
    barcodeImage: null,
    insertDateTime: new Date().toISOString(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBarcodeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, barcodeImage: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted successfully!');
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6" style={{ color: '#611010', fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}>DAILY MAIL</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {[
          { label: 'Branch Code', name: 'branchCode', type: 'number' },
          { label: 'Branch Name', name: 'branchName', type: 'text' },
          { label: 'Sender Name', name: 'senderName', type: 'text' },
          { label: 'Receiver Name', name: 'receiverName', type: 'text' },
          { label: 'Mail Type', name: 'mailType', type: 'text' },
          { label: 'Tracking Number', name: 'trackingNumber', type: 'text' },
          { label: 'Barcode ID', name: 'barcodeId', type: 'text' },
        ].map((field, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-full sm:w-1/3 text-sm font-medium" style={{ color: '#611010', fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={(formData as any)[field.name]}
              onChange={handleInputChange}
              className="w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: '#DAD9D9', fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}
              required
            />
          </div>
        ))}

        {/* Mail Description */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="w-full sm:w-1/3 text-sm font-medium" style={{ color: '#611010', fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}>Mail Description</label>
          <textarea
            name="mailDescription"
            value={formData.mailDescription}
            onChange={handleInputChange}
            className="w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: '#DAD9D9', fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}
            required
          />
        </div>

        {/* Barcode Image */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="w-full sm:w-1/3 text-sm font-medium" style={{ color: '#611010', fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}>Barcode Image</label>
          <input
            type="file"
            name="barcodeImage"
            onChange={handleBarcodeImageUpload}
            accept="image/*"
            className="w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}
          />
        </div>

        {/* Insert Date and Time */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="w-full sm:w-1/3 text-sm font-medium" style={{ color: '#611010', fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}>Insert Date and Time</label>
          <input
            type="datetime-local"
            name="insertDateTime"
            value={formData.insertDateTime.slice(0, 16)}
            onChange={handleInputChange}
            className="w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: '#DAD9D9', fontFamily: 'Roboto, sans-serif', fontWeight: '600' }}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
