import React, { useState, useEffect } from "react";
import Table from "../../table/Table";
import { fetchBranches } from "../../../services/BranchService";

interface Branch {
  index?: number;
  branchCode: string;
  branchName: string;
  branchDescription: string;
  insertDate: string; // Dates should be stored as strings when fetched from API
  updateDate: string;
}

const columns: { key: keyof Branch; label: string }[] = [
  { key: "index", label: "ID" },
  { key: "branchCode", label: "Branch Code" },
  { key: "branchName", label: "Branch Name" },
  { key: "branchDescription", label: "Description" },
  { key: "insertDate", label: "Insert Date" },
  { key: "updateDate", label: "Update Date" },
];

const BranchTable: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [formType, setFormType] = useState<"add" | "edit" | "view" | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<number>(0);

  const fetchBranchData = async () => {
    setError("");

    try {
      const response = await fetchBranches();
      console.log("Response:", response);

      if (response.data && Array.isArray(response.data.data)) {
        const branchesWithIndex = response.data.data.map(
          (branch: Branch, index: number) => ({
            ...branch,
            index: index + 1,
          })
        );

        setBranches(branchesWithIndex);
        setStatus(response.status);
      } else {
        setBranches([]);
        setError("Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
      setError("Failed to fetch branches.");
    }
  };

  useEffect(() => {
    fetchBranchData();
  }, []);

  useEffect(() => {}, [branches]);

  const handleViewBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setFormType("view");
  };

  const handleEditBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setFormType("edit");
  };

  return (
    <div>
      <Table
        columns={columns}
        data={branches}
        onViewClick={handleViewBranch}
        onEditClick={handleEditBranch}
      />
    </div>
  );
};

export default BranchTable;
