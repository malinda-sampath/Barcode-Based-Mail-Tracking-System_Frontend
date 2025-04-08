import React, { useState, useEffect } from "react";
import Table from "../../../table/Table";
import {
  deleteBranchManagers,
  fetchBranchManagers,
} from "../../../../services/superAdmin/BranchManagerService";
import ToggleConfirmation from "../../../ui/toggle/toggleConfiremation";
import useWebSocket from "../../../../hooks/useWebSocket";
import ToastContainer from "../../../ui/toast/toastContainer";
import { useToggleConfirmation } from "../../../ui/toggle/useToggleConfiremation";

interface BranchManager {
  index?: number;
  branchCode: string;
  branchName: string;
  userID: string;
  name: string;
  email: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
}

interface WCResponse {
  action: string;
  BranchManager: BranchManager;
}

const columns: { key: keyof BranchManager; label: string }[] = [
  { key: "index", label: "ID" },
  { key: "userID", label: "User ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "contact", label: "Contact" },
  { key: "branchCode", label: "Branch ID" },
  { key: "branchName", label: "Branch Name" },
  { key: "createdAt", label: "Insert Date" },
  { key: "updatedAt", label: "Update Date" },
];

const BranchManagerTable: React.FC = () => {
  const [BranchManagers, setBranchManagers] = useState<BranchManager[]>([]);
  const [selectedBranchManager, setSelectedBranchManager] =
    useState<BranchManager | null>(null);
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

  const [status, setStatus] = useState<number>(0);

  // Fetch Branch Manager data
  const fetchBranchManagerData = async () => {
    setError("");

    try {
      const response = await fetchBranchManagers();

      if (response.data && Array.isArray(response.data.data)) {
        const BranchManagersWithIndex = response.data.data.map(
          (BranchManager: BranchManager, index: number) => ({
            ...BranchManager,
            index: index + 1,
          })
        );
        setBranchManagers(BranchManagersWithIndex);
      } else {
        setBranchManagers([]);
        setError("No Branch Managers found.");
      }
    } catch (err) {
      console.error("Error fetching Branch Managers:", err);
      setError("Failed to fetch Branch Managers.");
    }
  };

  // Handle delete confirmation
  const handleDeleteBranchManager = (BranchManager: BranchManager) => {
    setError("");
    setStatus(0);

    showConfirmation(
      "Are you sure you want to delete this user?",
      async () => {
        try {
          const response = await deleteBranchManagers(BranchManager.userID);
          if (response.status >= 200 && response.status < 300) {
            triggerToast("Branch Manager deleted successfully", "success");
          } else {
            triggerToast(
              "Failed to delete Branch Manager. Try again!",
              "error"
            );
          }
        } catch (error) {
          console.error("Error deleting Branch Manager:", error);
          triggerToast(
            "An error occurred while deleting the Branch Manager!",
            "error"
          );
        }
        hideConfirmation();
      },
      hideConfirmation,
      "Delete",
      "Cancel"
    );
  };

  //Handle WebSocket messages
  const handleWebSocketMessage = (message: WCResponse) => {
    if (message.action === "save") {
      setBranchManagers((prevBranchManager) => {
        const existingIndex = prevBranchManager.findIndex(
          (b) => b.userID === message.BranchManager.userID
        );

        let updatedList;
        if (existingIndex !== -1) {
          // Update existing branch
          updatedList = prevBranchManager.map((b, index) =>
            b.userID === message.BranchManager.userID
              ? { ...message.BranchManager, index: b.index } // Preserve index
              : b
          );
        } else {
          // Add new branch and recalculate indices
          updatedList = [...prevBranchManager, { ...message.BranchManager }];
        }

        return updatedList.map((b, index) => ({ ...b, index: index + 1 })); // Recalculate indices
      });
    } else if (message.action === "delete") {
      setBranchManagers((prevBranchManager) => {
        const updatedList = prevBranchManager.filter(
          (b) => b.userID !== message.BranchManager.userID
        );
        return updatedList.map((b, index) => ({ ...b, index: index + 1 })); // Recalculate indices after deletion
      });
    }
  };

  // Use WebSocket hook
  useWebSocket("/topic/mail-handler-updates", handleWebSocketMessage);

  // Fetch Branch Manager data on component mount
  useEffect(() => {
    fetchBranchManagerData();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table
        columns={columns}
        data={BranchManagers}
        onViewClick={(BranchManager) => setSelectedBranchManager(BranchManager)}
        onEditClick={(BranchManager) => setSelectedBranchManager(BranchManager)}
        onDeleteClick={handleDeleteBranchManager}
        searchableKeys={[
          "userID",
          "name",
          "email",
          "contact",
          "createdAt",
          "updatedAt",
        ]}
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

export default BranchManagerTable;
