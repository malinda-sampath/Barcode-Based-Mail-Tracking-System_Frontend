import React, { useState, useEffect } from "react";
import Table from "../../../table/Table";
import {
  fetchBranches,
  deleteBranch,
} from "../../../../services/BranchService";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

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

  // Function to delete a branch
  const BranchDelete = async (branch: Branch) => {
    setError("");
    setStatus(0);

    // if (!branchName || !branchDescription) {
    //   triggerToast("Please fill in all fields!", "error");
    //   return;
    // }

    try {
      const response = await deleteBranch(branch.branchCode);

      //   if (response.status >= 200 && response.status < 300) {
      //     triggerToast("Branch added successfully!", "success");
      //     setBranchName("");
      //     setBranchDescription("");
      //     setIsAddBranchPopupOpen(false);
      //   } else if (response.status === 409) {
      //     triggerToast("Branch already exists!", "error");
      //   } else {
      //     triggerToast("Failed to add branch!", "error");
      //   }
    } catch (error) {
      console.error("Error saving branch:", error);
      // triggerToast("An error occurred while saving the branch!", "error");
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
        const updatedBranch = JSON.parse(message.body);
        console.log("Received WebSocket update:", updatedBranch);

        setBranches((prevBranches) => {
          const existingIndex = prevBranches.findIndex(
            (b) => b.branchCode === updatedBranch.branchCode
          );

          let updatedList;
          if (existingIndex !== -1) {
            updatedList = prevBranches.map((b, index) =>
              b.branchCode === updatedBranch.branchCode
                ? { ...updatedBranch, index: b.index } // Keep existing index
                : b
            );
          } else {
            // Add new branch with a new index
            updatedList = [
              ...prevBranches,
              { ...updatedBranch, index: prevBranches.length + 1 },
            ];
          }

          console.log("Updated list:", updatedList);
          return updatedList;
        });
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
    setFormType("view");
  };

  const handleEditBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setFormType("edit");
  };

  const handleDeleteBranch = (branch: Branch) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      BranchDelete(branch);
    }
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
      />
    </div>
  );
};

export default BranchTable;
