import { apiRequest } from "../api";

interface Branch {
  branchCode: string;
  branchName: string;
  branchDescription: string;
  insertDate: string;
  updateDate: string;
}

// Define the response structure for the API
export interface BranchResponse {
  status: number;
  message: string;
  data: Branch[];
}

export interface MailDetailsResponse {
  status: number;
  message: string;
  data: {
    senderName: string;
    receiverName: string;
    mailType: string;
    trackingNumber: string;
    barcodeId: string;
    mailDescription: string;
    barcodeImage: string;
    BranchName: string;
    location: string;
    status: string;
    referenceNumber: string;
    insertDateTime: string;
    updateDateTime: String;
  };
}

// Fetch all branches
export const fetchBranches = async () => {
  return await apiRequest<BranchResponse>("branch/get-all", "GET");
};

// Fetch pending branch mails
export const fetchPendingBranchMails = async () => {
  return await apiRequest<MailDetailsResponse>(
    `mailRecord/get-by-branch`,
    "GET"
  );
};

export const fetchBranchMails = async () => {
  return await apiRequest<MailDetailsResponse>(
    `branch-mail/branch-mail-data`,
    "GET"
  );
};
