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
import ClaimMailTable from "../components/table/ClaimMailTable";
import ToastContainer from "../components/ui/toast/toastContainer";
import BranchAllMailTable from "../components/table/BranchAllMailTable";

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

const AllMails = () => {
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
  // const fetchBranchMailData = async () => {
  //   setError("");
  //   try {
  //     const response = await fetchPendingBranchMails(); // Example branch code
  //     if (response.data && Array.isArray(response.data.data)) {
  //       const mailDetailsWithIndex = response.data.data
  //         .filter((mail: any) => mail.status?.toLowerCase() === "")
  //         .map((mail: any, index: number) => ({
  //           ...mail,
  //           index: index + 1,
  //         }));
  //       setMailDetails(mailDetailsWithIndex);
  //     } else {
  //       setMailDetails([]);
  //       setError("No mail details found.");
  //       triggerToast("No mail details found.", "warning");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching mail details:", err);
  //     setError("Failed to fetch mail details.");
  //     triggerToast("Failed to fetch mail details", "error");
  //   }
  // };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
        Mail Handler Management
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 ">{currentDate}</p>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold text-[#611010] mb-5">
          All Branch Mail Details
        </h2>
        <BranchAllMailTable
          columns={columns}
          data={mailDetails}
          // onViewClick={() => {}}
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
    </div>
  );
};

export default AllMails;
