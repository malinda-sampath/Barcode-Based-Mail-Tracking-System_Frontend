import { apiRequest } from "../api";

interface MailHandler {
  userID: string;
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
