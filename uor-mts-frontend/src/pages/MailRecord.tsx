import React from "react";
import Table from "../components/table/Table";
import { fetchMainMailCart } from "../services/mailHandler/MainMailCartService";
import ToastContainer from "../components/ui/toast/toastContainer";
import { useState, useEffect } from "react";

interface MainMailCart {
  index?: number;
  senderName: string;
  receiverName: string;
  mailType: string;
  trackingNumber: string;
  barcodeId: string;
  // mailDescription: string;
  barcodeImage: string;
  BranchName: string;
  location: string;
  status: string;
  referenceNumber: string;
  insertDateTime: string;
  // updateDateTime: String;
}

const columns: {
  key: keyof MainMailCart;
  label: string;
  render?: (value: any) => JSX.Element | null;
}[] = [
  { key: "index", label: "ID" },
  { key: "barcodeId", label: "Barcode ID" },
  { key: "senderName", label: "Sender" },
  { key: "receiverName", label: "Receiver" },
  { key: "BranchName", label: "Branch Name" },
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
  { key: "location", label: "Location" },
  { key: "status", label: "Status" },
  { key: "referenceNumber", label: "Reference No." },
  // { key: "mailDescription", label: "Description" },
  { key: "insertDateTime", label: "Insert Date" },
  // { key: "updateDateTime", label: "Update Date" },
];

export default function MailRecord() {
  const [mails, setMails] = useState<MainMailCart[]>([]);
  const [toasts, setToasts] = useState<
    { message: string; type: "success" | "error" | "info" | "warning" }[]
  >([]);

  const triggerToast = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    setToasts((prev) => [...prev, { message, type }]);
  };

  // Data fetching
  const fetchMainMailDetails = async () => {
    try {
      const response = await fetchMainMailCart();
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

  const handleViewClick = (mail: MainMailCart) => {
    console.log("View clicked for mail:", mail);
    triggerToast("View clicked", "info");
  };
  const handleEditClick = (mail: MainMailCart) => {
    console.log("Edit clicked for mail:", mail);
    triggerToast("Edit clicked", "info");
  };
  const handleDeleteClick = (mail: MainMailCart) => {
    console.log("Delete clicked for mail:", mail);
    triggerToast("Delete clicked", "info");
  };

  useEffect(() => {
    fetchMainMailDetails();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return (
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
        Main Mail Cart
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 ">{currentDate}</p>
      {/* <div className="bg-white p-6 rounded-lg shadow-md mt-6"> */}
      <Table
        columns={columns}
        data={mails}
        onViewClick={handleViewClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        rowsPerPage={10}
        searchableKeys={[
          "BranchName",
          "mailType",
          "barcodeId",
          "senderName",
          "receiverName",
          "trackingNumber",
        ]}
      />
      {/* </div> */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
