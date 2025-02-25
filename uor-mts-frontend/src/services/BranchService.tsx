import { apiRequest } from "./api";

interface Branch {
  branchCode: string;
  branchName: string;
  branchDescription: string;
  insertDate: string;
  updateDate: string;
}

export interface BranchResponse {
  status: number;
  message: string;
  data: Branch[];
}

export const fetchBranches = async () => {
  return await apiRequest<BranchResponse>("branch/get-all", "GET");
};

export const saveBranch = async (
  branchName: string,
  branchDescription: string
): Promise<{ status: number; data?: any }> => {
  return apiRequest<any>("branch/save", "POST", {
    branchName,
    branchDescription,
  });
};

export const deleteBranch = async (branchId: number) => {
  return await apiRequest(`branch/delete/${branchId}`, "DELETE");
};
