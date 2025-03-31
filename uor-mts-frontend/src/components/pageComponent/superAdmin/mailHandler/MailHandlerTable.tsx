import React, { useState, useEffect } from "react";
import Table from "../../../table/Table";
import { fetchMailHandlers } from "../../../../services/superAdmin/MailHandlerService";
import useWebSocket from "../../../../hooks/useWebSocket";

interface MailHandler {
  index?: number;
  userID: string;
  name: string;
  email: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
}

interface WCResponse {
  action: string;
  mailHandler: MailHandler;
}

const columns: { key: keyof MailHandler; label: string }[] = [
  { key: "index", label: "ID" },
  { key: "userID", label: "User ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "contact", label: "Contact" },
  { key: "createdAt", label: "Insert Date" },
  { key: "updatedAt", label: "Update Date" },
];

const MailHandlerTable: React.FC = () => {
  const [mailHandlers, setMailHandlers] = useState<MailHandler[]>([]);
  const [selectedMailHandler, setSelectedMailHandler] =
    useState<MailHandler | null>(null);
  const [error, setError] = useState<string>("");

  const fetchMailHandlerData = async () => {
    setError("");

    try {
      const response = await fetchMailHandlers();

      if (response.data && Array.isArray(response.data.data)) {
        const mailHandlersWithIndex = response.data.data.map(
          (mailHandler: MailHandler, index: number) => ({
            ...mailHandler,
            index: index + 1,
          })
        );
        setMailHandlers(mailHandlersWithIndex);
      } else {
        setMailHandlers([]);
        setError("No Mail-Handlers found.");
      }
    } catch (err) {
      console.error("Error fetching mail handlers:", err);
      setError("Failed to fetch mail handlers.");
    }
  };

  //Handle WebSocket messages
  const handleWebSocketMessage = (message: WCResponse) => {
    if (message.action === "save") {
      setMailHandlers((prevMailHandler) => {
        const existingIndex = prevMailHandler.findIndex(
          (b) => b.userID === message.mailHandler.userID
        );

        let updatedList;
        if (existingIndex !== -1) {
          // Update existing branch
          updatedList = prevMailHandler.map((b, index) =>
            b.userID === message.mailHandler.userID
              ? { ...message.mailHandler, index: b.index } // Preserve index
              : b
          );
        } else {
          // Add new branch and recalculate indices
          updatedList = [...prevMailHandler, { ...message.mailHandler }];
        }

        return updatedList.map((b, index) => ({ ...b, index: index + 1 })); // Recalculate indices
      });
    } else if (message.action === "delete") {
      setMailHandlers((prevMailHandler) => {
        const updatedList = prevMailHandler.filter(
          (b) => b.userID !== message.mailHandler.userID
        );
        return updatedList.map((b, index) => ({ ...b, index: index + 1 })); // Recalculate indices after deletion
      });
    }
  };

  // Use WebSocket hook
  useWebSocket("/topic/mail-handler-updates", handleWebSocketMessage);

  useEffect(() => {
    fetchMailHandlerData();
  }, []);

  const handleDeleteMailHandler = () => {};

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table
        columns={columns}
        data={mailHandlers}
        onViewClick={(mailHandler) => setSelectedMailHandler(mailHandler)}
        onEditClick={(mailHandler) => setSelectedMailHandler(mailHandler)}
        onDeleteClick={handleDeleteMailHandler}
        searchableKeys={["userID", "name", "email", "contact"]}
      />
    </div>
  );
};

export default MailHandlerTable;
