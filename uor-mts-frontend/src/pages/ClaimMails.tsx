import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  fetchBranches,
  fetchPendingBranchMails,
} from "../services/mailHandler/ClaimMailsService";
import { Input } from "../components/ui/input";
import { BranchCard } from "../components/pageComponent/BranchCard";
import { Button } from "../components/ui/button";
import Table from "../components/table/Table";
import ToastContainer from "../components/ui/toast/toastContainer";

interface Branch {
  branchCode: string;
  branchName: string;
  branchDescription: string;
  insertDate: string;
  updateDate: string;
}

type MailCount = {
  branchCode: string;
  count: number;
};

interface MailDetails {
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
  key: keyof MailDetails;
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

export const ClaimMails = () => {
  const sampleMailCounts: MailCount[] = [
    { branchCode: "BR001", count: 5 },
    { branchCode: "BR002", count: 3 },
    { branchCode: "BR003", count: 7 },
  ];

  const [branches, setBranches] = useState<Branch[]>([]);
  const [mailCounts, setMailCounts] = useState<MailCount[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [mailDetails, setMailDetails] = useState<MailDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerToast = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    setToasts((prev) => [...prev, { message, type }]);
  };
  const [toasts, setToasts] = useState<
    { message: string; type: "success" | "error" | "info" | "warning" }[]
  >([]);

  // Simulate initial data loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Use sample data instead of empty arrays
      fetchBranchData();
      setMailCounts(sampleMailCounts);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  //Fetch Branch Data
  const fetchBranchData = async () => {
    setError("");
    try {
      const response = await fetchBranches();
      if (response.data && Array.isArray(response.data.data)) {
        setBranches(
          response.data.data.map((branch: Branch) => ({
            branchCode: branch.branchCode,
            branchName: branch.branchName,
            branchDescription: branch.branchDescription,
            insertDate: branch.insertDate,
            updateDate: branch.updateDate,
          }))
        );
      } else {
        setBranches([]);
        setError("No branches found.");
        triggerToast("No branches found.", "warning");
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
      setError("Failed to fetch branches.");
      triggerToast("Failed to fetch branches", "error");
    }
  };

  //Fetch Mail Data
  const fetchBranchMailData = async (branchCode: string) => {
    setError("");
    try {
      const response = await fetchPendingBranchMails(branchCode); // Example branch code
      if (response.data && Array.isArray(response.data.data)) {
        const mailDetailsWithIndex = response.data.data.map(
          (mail: any, index: number) => ({
            ...mail,
            index: index + 1,
          })
        );
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

  const handleBranchClick = (branch: Branch) => {
    setSelectedBranch(branch);
    fetchBranchMailData(branch.branchCode);
  };

  const handleBackClick = () => {
    setSelectedBranch(null);
    setMailDetails([]);
  };

  const filteredBranches = useMemo(() => {
    return branches
      .map((branch) => ({
        ...branch,
        count:
          mailCounts.find((mc) => mc.branchCode === branch.branchCode)?.count ||
          0,
      }))
      .filter(
        (branch) =>
          branch.branchCode.toLowerCase().includes(filter.toLowerCase()) ||
          branch.branchName.toLowerCase().includes(filter.toLowerCase())
      );
  }, [filter, branches, mailCounts]);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (selectedBranch) {
    return (
      <div className="ml-4 sm:ml-6 md:ml-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
          Pending Mails for {selectedBranch.branchName} - (
          {selectedBranch.branchCode})
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 ">{currentDate}</p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="animate-pulse">Loading mail details...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 border rounded">Error: {error}</div>
        ) : mailDetails.length === 0 ? (
          <div className="ml-12">
            <div className="text-gray-500 p-4 border rounded">
              No data available for this branch
            </div>
            <div className="p-4 bg-white">
              <Button
                onClick={handleBackClick}
                className="bg-[#F93058] hover:bg-[#f60f3d] text-white h-8 w-28"
              >
                Back
              </Button>
            </div>
          </div>
        ) : (
          <div className="ml-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Table
                columns={columns}
                onEditClick={() => {}}
                onDeleteClick={() => {}}
                onViewClick={() => {}}
                data={mailDetails}
                rowsPerPage={10}
                searchableKeys={[
                  "barcodeId",
                  "senderName",
                  "receiverName",
                  "mailType",
                  "senderName",
                  "receiverName",
                  "trackingNumber",
                ]}
                // showActions={false}
              />
            </div>
            <div className="p-4 bg-white">
              <Button
                onClick={handleBackClick}
                className="bg-[#F93058] hover:bg-[#f60f3d] text-white h-8 w-28"
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="ml-4 sm:ml-6 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
        Daily Mail Cart
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 ">{currentDate}</p>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <Input
          placeholder="Filter Branch..."
          className="max-w-sm mb-4 ml-6"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64 ml-6">
            <p className="animate-pulse">Loading branches...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 border rounded ml-6">
            Error: {error}
          </div>
        ) : filteredBranches.length === 0 ? (
          <div className="text-gray-600 p-4  ml-6">
            No branches match your filter
          </div>
        ) : (
          <div className="flex flex-wrap gap-5 ml-6">
            {filteredBranches.map((branch) => (
              <BranchCard
                key={branch.branchCode}
                code={branch.branchCode}
                name={branch.branchName}
                description={branch.branchDescription}
                count={branch.count}
                onClick={() => handleBranchClick(branch)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
