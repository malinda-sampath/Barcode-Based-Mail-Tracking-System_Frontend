import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { BranchCard } from "../components/pageComponent/BranchCard";
import { Button } from "../components/ui/button";
import Table from "../components/table/Table";

type BranchInfo = {
  code: string;
  name: string;
};

type MailCount = {
  branchCode: string;
  count: number;
};

type Branch = BranchInfo & { count: number };

type Mail = {
  dailyMailId: number;
  branchCode: string;
  branchName: string;
  senderName: string;
  receiverName: string;
  mailType: string;
  trackingNumber: string;
  barcodeId: string;
  insertDateTime: string;
  updateDateTime: string;
  mailId: string;
  description: string;
};

export const ClaimMails = () => {
  // Temporary sample data
  const sampleBranches: BranchInfo[] = [
    { code: "BR001", name: "Faculty of Science" },
    { code: "BR002", name: "Faculty of Science" },
    { code: "BR003", name: "Faculty of Science" },
  ];

  const sampleMailCounts: MailCount[] = [
    { branchCode: "BR001", count: 5 },
    { branchCode: "BR002", count: 3 },
    { branchCode: "BR003", count: 7 },
  ];

  const sampleMailDetails: Mail[] = [
    {
      dailyMailId: 1,
      branchCode: "BR001",
      branchName: "Faculty of Science",
      senderName: "John Doe",
      receiverName: "Jane Smith",
      mailType: "Parcel",
      trackingNumber: "TRK123456",
      barcodeId: "BC001",
      insertDateTime: "2023-05-15T10:30:00",
      updateDateTime: "2023-05-15T10:30:00",
      mailId: "ML001",
      description: "Important documents",
    },
    {
      dailyMailId: 2,
      branchCode: "BR001",
      branchName: "Faculty of Science",
      senderName: "Acme Corp",
      receiverName: "XYZ Ltd",
      mailType: "Package",
      trackingNumber: "TRK789012",
      barcodeId: "BC002",
      insertDateTime: "2023-05-16T14:45:00",
      updateDateTime: "2023-05-16T14:45:00",
      mailId: "ML002",
      description: "Product samples",
    },
  ];

  const [branches, setBranches] = useState<BranchInfo[]>([]);
  const [mailCounts, setMailCounts] = useState<MailCount[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [mailDetails, setMailDetails] = useState<Mail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate initial data loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Use sample data instead of empty arrays
      setBranches(sampleBranches);
      setMailCounts(sampleMailCounts);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate fetching mail details
  const fetchMailDetails = async (branchCode: string) => {
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      // Use sample data for the selected branch
      const details = sampleMailDetails.filter(
        (mail) => mail.branchCode === branchCode
      );
      setMailDetails(details);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  };

  const handleBranchClick = (branch: Branch) => {
    setSelectedBranch(branch);
    fetchMailDetails(branch.code);
  };

  const handleBackClick = () => {
    setSelectedBranch(null);
    setMailDetails([]);
  };

  // Define columns for the Table component
  const mailColumns: { key: keyof Mail; label: string }[] = [
    { key: "mailId", label: "Mail ID" },
    { key: "branchCode", label: "Branch Code" },
    { key: "branchName", label: "Branch Name" },
    { key: "senderName", label: "Sender" },
    { key: "receiverName", label: "Receiver" },
    { key: "mailType", label: "Mail Type" },
    { key: "trackingNumber", label: "Tracking Number" },
    { key: "barcodeId", label: "Barcode ID" },
    { key: "insertDateTime", label: "Insert Date" },
    { key: "updateDateTime", label: "Update Date" },
    { key: "description", label: "Description" },
  ];

  const filteredBranches = useMemo(() => {
    return branches
      .map((branch) => ({
        ...branch,
        count:
          mailCounts.find((mc) => mc.branchCode === branch.code)?.count || 0,
      }))
      .filter(
        (branch) =>
          branch.code.toLowerCase().includes(filter.toLowerCase()) ||
          branch.name.toLowerCase().includes(filter.toLowerCase())
      );
  }, [filter, branches, mailCounts]);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (selectedBranch) {
    return (
      <div className="m-12">
        <div className="flex items-center mb-6 ml-12">
          <h2 className="text-lg font-semibold">
            Mail Details for {selectedBranch.name} ({selectedBranch.code})
          </h2>
        </div>

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
              {/* <Table
                columns={mailColumns}
                data={mailDetails}
                rowsPerPage={5}
                searchableKeys={["mailId", "senderName", "receiverName", "trackingNumber"]}
                showActions={false}
              /> */}
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
    <div className="m-12">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010] ml-12">
        Claim Mails
      </h1>
      <p className="text-sm text-gray-500 ml-12">{currentDate}</p>
      <br />

      <Input
        placeholder="Filter Branch..."
        className="max-w-sm mb-4 ml-12"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64 ml-12">
          <p className="animate-pulse">Loading branches...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 border rounded ml-12">
          Error: {error}
        </div>
      ) : filteredBranches.length === 0 ? (
        <div className="text-gray-600 p-4  ml-12">
          No branches match your filter
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 ml-12">
          {filteredBranches.map((branch) => (
            <BranchCard
              key={branch.code}
              {...branch}
              onClick={() => handleBranchClick(branch)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
