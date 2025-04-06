import { apiRequest } from "../api";

interface MainMailCartFetchResponse {
  status: number;
  message: string;
  data: [
    senderName: string,
    receiverName: string,
    mailType: string,
    trackingNumber: string,
    barcodeId: string,
    mailDescription: string,
    barcodeImage: string,
    BranchName: string,
    location: string,
    status: string,
    referenceNumber: string,
    insertDateTime: string,
    updateDateTime: String
  ];
}

export const fetchMainMailCart = async () => {
  return await apiRequest<MainMailCartFetchResponse>(
    "mailRecord/get-all",
    "GET"
  );
};
