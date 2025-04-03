import exp from "constants";
import { apiRequest } from "../api";

// Define the response structure for the API
export interface MailEneterResponse {
  status: number;
  message: string;
  data: [
    branchName: string,
    branchCode: string,
    senderName: string,
    receiverName: string,
    mailType: string,
    trackingNumber: string,
    mailDescription: string
  ];
}

export interface BranchResponse {
  status: number;
  message: string;
  data: [
    branchCode: string,
    branchName: string,
    branchDescription: string,
    insertDate: string,
    updateDate: string
  ];
}

interface MailFetchResponse {
  status: number;
  message: string;
  data: [
    branchCode: string,
    senderName: string,
    receiverName: string,
    mailType: string,
    trackingNumber: string,
    mailDescription: string,
    barcodeId: string,
    barcodeImage: string,
    insertDateTime: string,
    updateDateTime: string
  ];
}

// Save a new mail handler
export const saveMailDetails = async (
  branchCode: string,
  senderName: string,
  receiverName: string,
  mailType: string,
  trackingNumber: string,
  mailDescription: string
) => {
  return await apiRequest<MailEneterResponse>("daily-mail/save", "POST", {
    branchCode,
    senderName,
    receiverName,
    mailType,
    trackingNumber,
    mailDescription,
  });
};

export const fetchBranches = async () => {
  return await apiRequest<BranchResponse>("branch/get-all", "GET");
};

export const fetchMails = async () => {
  return await apiRequest<MailFetchResponse>("daily-mail/get-all", "GET");
};

export const transferMails = async () => {};
