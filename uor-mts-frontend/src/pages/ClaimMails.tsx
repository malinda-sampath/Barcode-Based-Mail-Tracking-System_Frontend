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
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isMailLoading, setIsMailLoading] = useState(false);

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
    const loadInitialData = async () => {
      setIsInitialLoading(true);
      try {
        await fetchBranchData();
        setMailCounts(sampleMailCounts);
      } catch (error) {
        console.error("Initialization error:", error);
        setError("Failed to initialize application");
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadInitialData();
  }, [selectedBranch]);

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

  const renderLoadingSkeleton = (count: number) => (
    <div className="flex flex-wrap gap-5 ml-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-64 h-40 bg-gray-100 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );

  const renderMailDetails = () => {
    if (isMailLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="w-12 h-12 border-4 border-red-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading mail details...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-6 mt-6 bg-red-50 border border-red-200 rounded-lg text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <Button
            onClick={handleBackClick}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white"
          >
            Back to Branches
          </Button>
        </div>
      );
    }

    if (mailDetails.length === 0) {
      return (
        <div className="p-6 mt-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <p className="text-gray-600">
            No pending mails found for this branch
          </p>
          <Button
            onClick={handleBackClick}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white"
          >
            Back to Branches
          </Button>
        </div>
      );
    }

    return (
      <>
        <div className="bg-white p-6 mt-5 rounded-lg shadow-md">
          <Table
            columns={columns}
            data={mailDetails}
            onEditClick={() => {}}
            onDeleteClick={() => {}}
            onViewClick={() => {}}
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
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleBackClick}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Back to Branches
          </Button>
        </div>
      </>
    );
  };

  if (selectedBranch) {
    return (
      <div className="ml-4 sm:ml-6 md:ml-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
          Pending Mails for {selectedBranch.branchName} (
          {selectedBranch.branchCode})
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">{currentDate}</p>
        {renderMailDetails()}
      </div>
    );
  }

  return (
    <div className="ml-4 sm:ml-6 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
        Claim Mails
      </h1>
      <p className="text-xs sm:text-sm text-gray-500">{currentDate}</p>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <Input
          placeholder="Filter Branch..."
          className="max-w-sm mb-4 ml-6"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        {isInitialLoading ? (
          renderLoadingSkeleton(3)
        ) : error ? (
          ""
        ) : filteredBranches.length === 0 ? (
          <div className="ml-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-600">No branches match your search</p>
            <Button
              onClick={() => setFilter("")}
              className="mt-2 bg-gray-200 hover:bg-gray-300"
            >
              Clear Search
            </Button>
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
      <ToastContainer toasts={toasts} />
    </div>
  );
};
