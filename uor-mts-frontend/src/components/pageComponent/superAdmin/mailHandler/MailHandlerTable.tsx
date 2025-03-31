import React, { useState, useEffect } from "react";
import Table from "../../../table/Table";
import { fetchMailHandlers } from "../../../../services/MailHandlerService";

interface MailHandler {
  index?: number;
  name: string;
  email: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
}

const columns: { key: keyof MailHandler; label: string }[] = [
  { key: "index", label: "ID" },
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
      console.log("Response:", response);

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
        searchableKeys={["name", "email", "contact"]}
      />
    </div>
  );
};

export default MailHandlerTable;
