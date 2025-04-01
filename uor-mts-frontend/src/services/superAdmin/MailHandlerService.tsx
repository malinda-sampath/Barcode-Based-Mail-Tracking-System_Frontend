import { apiRequest } from "../api";

interface MailHandler {
  userID: string;
  name: string;
  contact: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Define the response structure for the API
export interface MailHandlerResponse {
  status: number;
  message: string;
  data: MailHandler[];
}

// Fetch all mail handlers
export const fetchMailHandlers = async () => {
  return await apiRequest<MailHandlerResponse>("mail-handler/get", "GET");
};

// Save a new mail handler
export const saveMailHandler = async (
  fullName: string,
  email: string,
  contact: string,
  password: string
) => {
  return await apiRequest<MailHandlerResponse>("mail-handler/save", "POST", {
    fullName,
    email,
    contact,
    password,
  });
};

// Delete a mail handler by userID
export const deleteMailHandler = async (userID: string) => {
  return await apiRequest(`mail-handler/delete/${userID}`, "DELETE");
};
