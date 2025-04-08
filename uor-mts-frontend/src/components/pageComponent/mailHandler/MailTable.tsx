import React, { useState, useEffect } from "react";
import Table from "../../table/Table";
import { saveMailDetails } from "../../../services/mailHandler/MailService";
import ToggleConfirmation from "../../ui/toggle/toggleConfiremation";
import useWebSocket from "../../../hooks/useWebSocket";
import ToastContainer from "../../ui/toast/toastContainer";
import { useToggleConfirmation } from "../../ui/toggle/useToggleConfiremation";

interface Mail {
  index?: number;
  dailyMailId: string;
  branchCode: string;
  branchName: string;
  senderName: string;
  receiverName: string;
  mailType: string;
  trackingNumber: string;
  mailDescription: string;
  insertDateTime: string;
  updateDateTime: string;
}

interface WCResponse {
  action: string;
  mail: Mail;
}

const columns: { key: keyof Mail; label: string }[] = [
  { key: "index", label: "ID" },
  { key: "dailyMailId", label: "Mail ID" },
  { key: "branchName", label: "Branch" },
  { key: "branchCode", label: "Branch Code" },
  { key: "senderName", label: "Sender" },
  { key: "receiverName", label: "Receiver" },
  { key: "mailType", label: "Type" },
  { key: "trackingNumber", label: "Tracking #" },
  { key: "insertDateTime", label: "Insert Date" },
  { key: "updateDateTime", label: "Update Date" },
];

const MailTable: React.FC = () => {
  const [mails, setMails] = useState<Mail[]>([]);
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
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

  // Fetch mail data
  const fetchMailData = async () => {
    // setError("");
    // try {
    //   const response = await fetchMailDetails(
    //     "dailyMail/getAllMails",
    //     "GET"
    //   );
    //   if (response.data && Array.isArray(response.data.data)) {
    //     const mailsWithIndex = response.data.data.map(
    //       (mail: Mail, index: number) => ({
    //         ...mail,
    //         index: index + 1,
    //       })
    //     );
    //     setMails(mailsWithIndex);
    //   } else {
    //     setMails([]);
    //     setError("No mails found.");
    //   }
    // } catch (err) {
    //   console.error("Error fetching mails:", err);
    //   setError("Failed to fetch mails.");
    // }
  };

  // Handle delete confirmation
  const handleDeleteMail = (mail: Mail) => {
    // setError("");
    // setStatus(0);
    // showConfirmation(
    //   "Are you sure you want to delete this mail record?",
    //   async () => {
    //     try {
    //       const response = await deleteMail(mail.dailyMailId);
    //       if (response.status >= 200 && response.status < 300) {
    //         triggerToast("Mail deleted successfully", "success");
    //       } else {
    //         triggerToast("Failed to delete mail. Try again!", "error");
    //       }
    //     } catch (error) {
    //       console.error("Error deleting mail:", error);
    //       triggerToast("An error occurred while deleting the mail!", "error");
    //     }
    //     hideConfirmation();
    //   },
    //   hideConfirmation,
    //   "Delete",
    //   "Cancel"
    // );
  };

  // Handle WebSocket messages
  const handleWebSocketMessage = (message: WCResponse) => {
    if (message.action === "save") {
      setMails((prevMails) => {
        const existingIndex = prevMails.findIndex(
          (m) => m.dailyMailId === message.mail.dailyMailId
        );

        let updatedList;
        if (existingIndex !== -1) {
          // Update existing mail
          updatedList = prevMails.map((m, index) =>
            m.dailyMailId === message.mail.dailyMailId
              ? { ...message.mail, index: m.index } // Preserve index
              : m
          );
        } else {
          // Add new mail and recalculate indices
          updatedList = [...prevMails, { ...message.mail }];
        }

        return updatedList.map((m, index) => ({ ...m, index: index + 1 })); // Recalculate indices
      });
    } else if (message.action === "delete") {
      setMails((prevMails) => {
        const updatedList = prevMails.filter(
          (m) => m.dailyMailId !== message.mail.dailyMailId
        );
        return updatedList.map((m, index) => ({ ...m, index: index + 1 })); // Recalculate indices after deletion
      });
    }
  };

  // Use WebSocket hook
  useWebSocket("/topic/mail-updates", handleWebSocketMessage);

  // Fetch mail data on component mount
  useEffect(() => {
    fetchMailData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Table
        columns={columns}
        data={mails}
        onViewClick={(mail) => setSelectedMail(mail)}
        onEditClick={(mail) => setSelectedMail(mail)}
        onDeleteClick={handleDeleteMail}
        searchableKeys={[
          "dailyMailId",
          "senderName",
          "receiverName",
          "trackingNumber",
          "branchName",
          "insertDateTime",
          "updateDateTime",
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

export default MailTable;
