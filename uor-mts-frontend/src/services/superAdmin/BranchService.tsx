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

// Save a new branch
export const saveBranch = async (
  branchName: string,
  branchDescription: string
): Promise<{ status: number; data?: BranchResponse }> => {
  return apiRequest<BranchResponse>("branch/save", "POST", {
    branchName,
    branchDescription,
  });
};

//Delete a branch by branchCode
export const deleteBranch = async (branchCode: string) => {
  return await apiRequest(`branch/delete/${branchCode}`, "DELETE");
};
