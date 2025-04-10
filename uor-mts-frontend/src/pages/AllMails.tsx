import React, { useState } from "react";
import Search from "../components/searchBar/Search";
import ViewPopup from "../components/popupComponent/ViewPopup";
import DeleteConfirmation from "../components/popupComponent/DeleteConfirmation";

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

const columns: { key: keyof MailData; label: string }[] = [
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
    <div className="ml-4 sm:ml-8 md:ml-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mt-2 text-[#611010]">
        All Mails
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 ">{currentDate}</p>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        {/* <div className="my-16 mx-28">
          <AllMailsTable<MailData> // Explicitly specify MailData type for Table component
            columns={columns}
            data={mailData}
            onViewClick={handleViewClick}
            onDeleteClick={handleDeleteClick}
            hideEditButton={true}
            searchableKeys={["sender", "recipient"]}
          />
        </div> */}

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
    </div>
  );
}
