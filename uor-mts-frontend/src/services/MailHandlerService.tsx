import { apiRequest } from "./api";

interface MailHandler {
  name: string;
  contact: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface MailHandlerResponse {
  status: number;
  message: string;
  data: MailHandler[];
}

export const fetchMailHandlers = async () => {
  return await apiRequest<MailHandlerResponse>("mail-handler/get", "GET");
};
