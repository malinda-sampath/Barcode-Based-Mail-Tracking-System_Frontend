import React, { useState } from "react";
import Search from "../components/searchBar/Search";
import Table from "../components/branch/AllMailsTable";
import ViewPopup from "../components/popupComponent/ViewPopup";
import DeleteConfirmation from "../components/popupComponent/DeleteConfirmation";
import AllMailsTable from "../components/branch/AllMailsTable";

const currentDate = new Date().toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

type MailData = {
  mailId: string;
  sender: string;
  recipient: string;
};

const mailData: MailData[] = [
  { mailId: "M01", sender: "John Doe", recipient: "Project Update" },
  { mailId: "M02", sender: "Jane Smith", recipient: "Meeting Reminder" },
  { mailId: "M03", sender: "Sam Wilson", recipient: "Invoice Details" },
];

const columns : { key: keyof MailData; label: string } []=[
  { key: "mailId", label: "MailId" },
  { key: "sender", label: "Sender" },
  { key: "recipient", label: "Recipient" },
];

export default function AllMails() {
  const [selectedMail, setSelectedMail] = useState<MailData | null>(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteMailId, setDeleteMailId] = useState<string | null>(null);

  const handleViewClick = (row: MailData) => {
    setSelectedMail(row);
    setShowViewPopup(true);
  };

  const handleDeleteClick = (row: MailData) => {
    setDeleteMailId(row.mailId);
    setShowDeletePopup(true);
  };

  return (
    <div>
      <div className="absolute top-0 px-4 ml-4 sm:ml-8 md:ml-16 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
          All Mails
        </h1>
        <p className="text-xs text-gray-500 sm:text-sm">{currentDate}</p>
      </div>

      <div className="my-16 mx-28">
        <AllMailsTable<MailData> // Explicitly specify MailData type for Table component
          columns={columns}
          data={mailData}
          onViewClick={handleViewClick}
          onDeleteClick={handleDeleteClick}
          hideEditButton={true}
          searchableKeys={["sender", "recipient"]}
        />
      </div>

      {showViewPopup && selectedMail && (
        <ViewPopup onClose={() => setShowViewPopup(false)} />
      )}

      {showDeletePopup && deleteMailId && (
        <DeleteConfirmation
          mailId={deleteMailId}
          onConfirm={() => {
            console.log("Mail deleted:", deleteMailId);
            setShowDeletePopup(false);
          }}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
    </div>
  );
}
