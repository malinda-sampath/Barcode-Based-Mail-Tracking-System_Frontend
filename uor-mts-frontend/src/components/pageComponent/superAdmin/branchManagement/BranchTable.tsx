import React, { useState, useEffect } from "react";
import Table from "../../../table/Table";
import {
  fetchBranches,
  deleteBranch,
} from "../../../../services/BranchService";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useToggleConfirmation } from "../../../ui/toggle/useToggleConfiremation";
import ToggleConfirmation from "../../../ui/toggle/toggleConfiremation";
import ToastContainer from "../../../ui/toastContainer";

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
  const [status, setStatus] = useState<number>(0);
  const [stompClient, setStompClient] = useState<Client | null>(null);
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

  // Function to delete a branch
  const BranchDelete = async (branch: Branch) => {
    setError("");
    setStatus(0);

    try {
      const response = await deleteBranch(branch.branchCode);

      if (response.status === 200) {
        triggerToast("Branch deleted successfully!", "success");
      } else {
        triggerToast("Failed to delete branch!", "error");
      }
    } catch (error) {
      console.error("Error saving branch:", error);
      // triggerToast("An error occurred while deleting the branch!", "error");
    }
  };

  // Fetch branch data
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
    fetchBranchData(); // Fetch initial data

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("JWT Token not found. WebSocket connection aborted.");
      return;
    }

    const socket = new SockJS(`http://localhost:8081/ws?token=${token}`);
    const stomp = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    stomp.onConnect = () => {
      console.log("Connected to WebSocket");

      stomp.subscribe("/topic/branch-updates", (message) => {
        const wcResponse = JSON.parse(message.body);

        if (wcResponse.action === "save") {
          setBranches((prevBranches) => {
            const existingIndex = prevBranches.findIndex(
              (b) => b.branchCode === wcResponse.branch.branchCode
            );

            let updatedList;
            if (existingIndex !== -1) {
              // Update existing branch
              updatedList = prevBranches.map((b, index) =>
                b.branchCode === wcResponse.branch.branchCode
                  ? { ...wcResponse.branch, index: b.index } // Preserve index
                  : b
              );
            } else {
              // Add new branch and recalculate indices
              updatedList = [...prevBranches, { ...wcResponse.branch }];
            }

            console.log("Updated list:", updatedList);
            return updatedList.map((b, index) => ({ ...b, index: index + 1 })); // Recalculate indices
          });
        } else if (wcResponse.action === "delete") {
          setBranches((prevBranches) => {
            const updatedList = prevBranches.filter(
              (b) => b.branchCode !== wcResponse.branch.branchCode
            );
            return updatedList.map((b, index) => ({ ...b, index: index + 1 })); // Recalculate indices after deletion
          });
        }
      });
    };

    stomp.onStompError = (frame) => {
      console.error("WebSocket STOMP error:", frame);
    };

    stomp.activate();
    setStompClient(stomp);

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  const handleViewBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    alert(selectedBranch?.branchCode);
    setFormType("view");
  };

  const handleEditBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setFormType("edit");
  };

  // const handleDeleteBranch = (branch: Branch) => {
  //   if (window.confirm("Are you sure you want to delete this branch?")) {
  //   }
  // };

  const handleDeleteBranch = (branch: Branch) => {
    showConfirmation(
      "Are you sure you want to delete this item?",
      () => {
        BranchDelete(branch);
        console.log("Item deleted!");
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
        onViewClick={handleViewBranch}
        onEditClick={handleEditBranch}
        onDeleteClick={handleDeleteBranch}
        searchableKeys={["branchCode", "branchName", "branchDescription"]} // Define searchable keys
      />
      {/* Confirmation dialog */}
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
      {/* Toasts */}
      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default BranchTable;
