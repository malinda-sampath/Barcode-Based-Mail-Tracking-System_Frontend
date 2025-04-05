import { apiRequest } from "../api";

interface BranchManager {
  userID: string;
  branchCode: string;
  branchName: string;
  name: string;
  contact: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Define the response structure for the API
export interface BranchManagerResponse {
  status: number;
  message: string;
  data: BranchManager[];
}

// Fetch all mail handlers
export const fetchBranchManagers = async () => {
  return await apiRequest<BranchManagerResponse>("branch-manager/get", "GET");
};

// Save a new mail handler
export const saveBranchManager = async (
  branchCode: string,
  fullName: string,
  email: string,
  contact: string,
  password: string
) => {
  return await apiRequest<BranchManagerResponse>(
    "branch-manager/save",
    "POST",
    {
      branchCode,
      fullName,
      email,
      contact,
      password,
    }
  );
};

// Delete a mail handler by userID
export const deleteBranchManagers = async (userID: string) => {
  return await apiRequest(`mail-handler/delete/${userID}`, "DELETE");
};
