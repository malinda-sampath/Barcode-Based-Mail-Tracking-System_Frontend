import React, { useState, useEffect } from "react";
import Table from "../../../table/Table";
import {
  fetchBranches,
  deleteBranch,
} from "../../../../services/BranchService";
import { useToggleConfirmation } from "../../../ui/toggle/useToggleConfiremation";
import ToggleConfirmation from "../../../ui/toggle/toggleConfiremation";
import ToastContainer from "../../../ui/toast/toastContainer";
import useWebSocket from "../../../../hooks/useWebSocket"; // Import WebSocket hook

interface Branch {
  index?: number;
  branchCode: string;
  branchName: string;
  branchDescription: string;
  insertDate: string;
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

  const { isVisible, confirmationConfig, showConfirmation, hideConfirmation } =
    useToggleConfirmation();

  const [toasts, setToasts] = useState<
    { message: string; type: "success" | "error" | "info" | "warning" }[]
  >([]);

  const triggerToast = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    setToasts((prev) => [...prev, { message, type }]);
  };

  // Fetch branch data
  const fetchBranchData = async () => {
    setError("");

    try {
      const response = await fetchBranches();
      // console.log("Response:", response);

      if (response.data && Array.isArray(response.data.data)) {
        const branchesWithIndex = response.data.data.map(
          (branch: Branch, index: number) => ({
            ...branch,
            index: index + 1,
          })
        );

        setBranches(branchesWithIndex);
      } else {
        setBranches([]);
        setError("No branches found.");
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
      setError("Failed to fetch branches.");
    }
  };

  // Handle WebSocket messages
  const handleWebSocketMessage = (message: any) => {
    if (message.action === "save") {
      setBranches((prevBranches) => {
        const existingIndex = prevBranches.findIndex(
          (b) => b.branchCode === message.branch.branchCode
        );

        let updatedList;
        if (existingIndex !== -1) {
          // Update existing branch
          updatedList = prevBranches.map((b, index) =>
            b.branchCode === message.branch.branchCode
              ? { ...message.branch, index: b.index } // Preserve index
              : b
          );
        } else {
          // Add new branch and recalculate indices
          updatedList = [...prevBranches, { ...message.branch }];
        }

        console.log("Updated list:", updatedList);
        return updatedList.map((b, index) => ({ ...b, index: index + 1 })); // Recalculate indices
      });
    } else if (message.action === "delete") {
      setBranches((prevBranches) => {
        const updatedList = prevBranches.filter(
          (b) => b.branchCode !== message.branch.branchCode
        );
        return updatedList.map((b, index) => ({ ...b, index: index + 1 })); // Recalculate indices after deletion
      });
    }
  };

  // Use WebSocket hook
  useWebSocket("/topic/branch-updates", handleWebSocketMessage);

  useEffect(() => {
    fetchBranchData();
  }, []);

  const handleDeleteBranch = (branch: Branch) => {
    showConfirmation(
      "Are you sure you want to delete this item?",
      () => {
        deleteBranch(branch.branchCode)
          .then(() => triggerToast("Branch deleted successfully!", "success"))
          .catch(() =>
            triggerToast("Failed to delete branch. Try again!", "error")
          );
        hideConfirmation();
      },
      hideConfirmation,
      "Delete",
      "Cancel"
    );
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table
        columns={columns}
        data={branches}
        onViewClick={(branch) => setSelectedBranch(branch)}
        onEditClick={(branch) => setSelectedBranch(branch)}
        onDeleteClick={handleDeleteBranch}
        searchableKeys={["branchCode", "branchName", "branchDescription"]}
      />
      {isVisible && confirmationConfig && (
        <ToggleConfirmation
          visible={isVisible}
          message={confirmationConfig.message}
          onConfirm={confirmationConfig.onConfirm}
          onCancel={confirmationConfig.onCancel || hideConfirmation}
          confirmText={confirmationConfig.confirmText}
          cancelText={confirmationConfig.cancelText}
        />
      )}
      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default BranchTable;
