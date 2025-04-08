import React, { useState, useEffect } from "react";
import Table from "../../../table/Table";
import {
  fetchBranches,
  deleteBranch,
} from "../../../../services/superAdmin/BranchService";
import { useToggleConfirmation } from "../../../ui/toggle/useToggleConfiremation";
import ToggleConfirmation from "../../../ui/toggle/toggleConfiremation";
import ToastContainer from "../../../ui/toast/toastContainer";
import useWebSocket from "../../../../hooks/useWebSocket";

interface Branch {
  index?: number;
  branchCode: string;
  branchName: string;
  branchDescription: string;
  insertDate: string;
  updateDate: string;
}

interface WCResponse {
  action: string;
  branch: Branch;
}

interface BranchTableProps {
  branches?: Branch[]; // Optional prop for initial branches
  refreshBranches?: () => void; // Callback to refresh branches in parent
}

const columns: { key: keyof Branch; label: string }[] = [
  { key: "index", label: "ID" },
  { key: "branchCode", label: "Branch Code" },
  { key: "branchName", label: "Branch Name" },
  { key: "branchDescription", label: "Description" },
  { key: "insertDate", label: "Insert Date" },
  { key: "updateDate", label: "Update Date" },
];

const BranchTable: React.FC<BranchTableProps> = ({
  branches: initialBranches,
  refreshBranches,
}) => {
  const [branches, setBranches] = useState<Branch[]>(initialBranches || []);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [formType, setFormType] = useState<"add" | "edit" | "view" | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  // Fetch branch data if not provided via props
  const fetchBranchData = async () => {
    if (initialBranches) return; // Skip if branches are provided via props

    setError("");
    setIsLoading(true);

    try {
      const response = await fetchBranches();

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
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete branch
  const handleDeleteBranch = (branch: Branch) => {
    setError("");
    setStatus(0);

    showConfirmation(
      "Are you sure you want to delete this branch?",
      async () => {
        try {
          const response = await deleteBranch(branch.branchCode);
          if (response.status >= 200 && response.status < 300) {
            triggerToast("Branch deleted successfully!", "success");
            // If we have a refresh callback, use it, otherwise fetch locally
            if (refreshBranches) {
              refreshBranches();
            } else {
              fetchBranchData();
            }
          } else {
            triggerToast("Failed to delete branch. Try again!", "error");
          }
        } catch (error) {
          console.error("Error deleting branch:", error);
          triggerToast("An error occurred while deleting the branch!", "error");
        }
        hideConfirmation();
      },
      hideConfirmation,
      "Delete",
      "Cancel"
    );
  };

  // Handle WebSocket messages
  const handleWebSocketMessage = (message: WCResponse) => {
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

        return updatedList.map((b, index) => ({ ...b, index: index + 1 })); // Recalculate indices
      });

      // Notify parent component if needed
      if (refreshBranches) {
        refreshBranches();
      }
    } else if (message.action === "delete") {
      setBranches((prevBranches) => {
        const updatedList = prevBranches.filter(
          (b) => b.branchCode !== message.branch.branchCode
        );
        return updatedList.map((b, index) => ({ ...b, index: index + 1 }));
      });

      // Notify parent component if needed
      if (refreshBranches) {
        refreshBranches();
      }
    }
  };

  // Use WebSocket hook
  useWebSocket("/topic/branch-updates", handleWebSocketMessage);

  useEffect(() => {
    // If initial branches are provided, use them
    if (initialBranches) {
      setBranches(
        initialBranches.map((b, index) => ({ ...b, index: index + 1 }))
      );
    } else {
      fetchBranchData();
    }
  }, [initialBranches]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      {error && <p className="text-red-500 p-2">{error}</p>}
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
