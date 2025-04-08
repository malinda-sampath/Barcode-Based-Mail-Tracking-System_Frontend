import React, { useState, useMemo, useEffect } from "react";
import Table from "../components/table/Table";
import {
  fetchBranches,
  fetchPendingBranchMails,
} from "../services/branchManager/PendindMailService";
import ToastContainer from "../components/ui/toast/toastContainer";
import BranchPendingTable from "../components/table/BranchPendingTable";
import { FaTimesCircle } from "react-icons/fa";

interface PendingMailCart {
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
  key: keyof PendingMailCart;
  label: string;
  render?: (value: any) => JSX.Element | null;
}[] = [
  { key: "index", label: "ID" },
  { key: "barcodeId", label: "Barcode ID" },
  { key: "senderName", label: "Sender" },
  { key: "receiverName", label: "Receiver" },
  { key: "mailType", label: "Type" },
  { key: "trackingNumber", label: "Tracking No." },
  { key: "insertDateTime", label: "Insert Date" },
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
  // { key: "referenceNumber", label: "Reference No." },
  // { key: "mailDescription", label: "Description" },
  // { key: "updateDateTime", label: "Update Date" },
];

export default function PendingMails() {
  const [selectedMail, setSelectedMail] = useState<PendingMailCart | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const triggerToast = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    setToasts((prev) => [...prev, { message, type }]);
  };
  const [toasts, setToasts] = useState<
    { message: string; type: "success" | "error" | "info" | "warning" }[]
  >([]);
  const [mailDetails, setMailDetails] = useState<PendingMailCart[]>([]);
  const [error, setError] = useState<string>("");

  //Fetch Mail Data
  const fetchBranchMailData = async () => {
    setError("");
    try {
      const response = await fetchPendingBranchMails(); // Example branch code
      if (response.data && Array.isArray(response.data.data)) {
        const mailDetailsWithIndex = response.data.data
          .filter((mail: any) => mail.status?.toLowerCase() === "pending")
          .map((mail: any, index: number) => ({
            ...mail,
            index: index + 1,
          }));
        setMailDetails(mailDetailsWithIndex);
      } else {
        setMailDetails([]);
        setError("No mail details found.");
        triggerToast("No mail details found.", "warning");
      }
    } catch (err) {
      console.error("Error fetching mail details:", err);
      setError("Failed to fetch mail details.");
      triggerToast("Failed to fetch mail details", "error");
    }
  };

  useEffect(() => {
    fetchBranchMailData();
  }, []);

  const handleViewClick = (mail: PendingMailCart) => {
    setSelectedMail(mail);
    setIsDetailModalOpen(true);
  };

  const getStatusStyle = (status: string) => {
    const baseStyle =
      "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1";

    switch (status?.toLowerCase()) {
      case "claimed":
        return `${baseStyle} bg-green-100 text-green-800`;
      case "pending":
        return `${baseStyle} bg-yellow-100 text-yellow-800`;
      case "returned":
        return `${baseStyle} bg-red-100 text-red-800`;
      case "picked":
        return `${baseStyle} bg-blue-100 text-blue-800`;
      default:
        return `${baseStyle} bg-gray-100 text-gray-800`;
    }
  };

  // Add this new component above your MailRecord component
  const DetailCard = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </div>
  );

  // Update your DetailItem component to be more compact
  const DetailItem = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <div className="grid grid-cols-3 gap-2">
      <dt className="text-sm text-gray-500 col-span-1">{label}</dt>
      <dd className="text-sm text-gray-900 font-medium col-span-2">{value}</dd>
    </div>
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return (
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
        Pending Mails
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 ">{currentDate}</p>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        {isDetailModalOpen && selectedMail && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <span className="bg-[#611010]/10 text-[#611010] p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </span>
                    <span>Mail Details</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Tracking #: {selectedMail.trackingNumber}
                  </p>
                </div>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  <FaTimesCircle size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <DetailCard title="Sender Information">
                      <DetailItem
                        label="Name"
                        value={selectedMail.senderName}
                      />
                      <DetailItem
                        label="Branch"
                        value={selectedMail.BranchName}
                      />
                    </DetailCard>

                    <DetailCard title="Recipient Information">
                      <DetailItem
                        label="Name"
                        value={selectedMail.receiverName}
                      />
                      <DetailItem
                        label="Location"
                        value={selectedMail.location}
                      />
                    </DetailCard>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <DetailCard title="Mail Information">
                      <DetailItem label="Type" value={selectedMail.mailType} />
                      <DetailItem
                        label="Status"
                        value={
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                              selectedMail.status
                            )}`}
                          >
                            {selectedMail.status}
                          </span>
                        }
                      />
                      <DetailItem
                        label="Inserted Date"
                        value={formatDate(selectedMail.insertDateTime)}
                      />
                    </DetailCard>

                    <DetailCard title="Tracking Information">
                      <DetailItem
                        label="Barcode ID"
                        value={selectedMail.barcodeId}
                      />
                      <DetailItem
                        label="Tracking Number"
                        value={selectedMail.trackingNumber}
                      />
                    </DetailCard>
                  </div>
                </div>

                {/* Barcode Section */}
                {selectedMail.barcodeImage && (
                  <div className="mt-6 border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Barcode
                    </h3>
                    <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg">
                      <img
                        src={`data:image/png;base64,${selectedMail.barcodeImage}`}
                        alt="Barcode"
                        className="h-24 w-auto"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        {selectedMail.barcodeId}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end">
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 bg-[#611010] text-white rounded-md hover:bg-[#611010]/90 transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <BranchPendingTable
          columns={columns}
          data={mailDetails}
          onViewClick={handleViewClick}
          rowsPerPage={10}
          searchableKeys={[
            "barcodeId",
            "senderName",
            "receiverName",
            "mailType",
            "trackingNumber",
          ]}
        />
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  );
}
