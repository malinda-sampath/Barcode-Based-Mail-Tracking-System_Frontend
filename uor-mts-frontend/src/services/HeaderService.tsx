import { apiRequest } from "./api";

export interface HeaderResponse {
  status: number;
  message: string;
  data: {
    name: string;
    profilePicture: string;
  };
}

export const fetchHeader = async () => {
  return await apiRequest<HeaderResponse>("user/header-details", "GET");
};
