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

// Fetch all branches
export const fetchBranches = async () => {
  return await apiRequest<BranchResponse>("branch/get-all", "GET");
};

// Fetch pending branch mails
export const fetchPendingBranchMails = async (branchCode: string) => {
  return await apiRequest<BranchResponse>(
    `mailRecord/get-by-branch/${branchCode}`,
    "GET"
  );
};
