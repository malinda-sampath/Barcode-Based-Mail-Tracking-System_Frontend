import { apiRequest } from "./api";

// Define the structure of the user profile

// Define the response structure for the API
export interface ProfileResponse {
  status: number;
  message: string;
  data: {
    userID: string;
    name: string;
    contact: string;
    email: string;
  };
}

// Fetch user profile data
export const fetchProfile = async () => {
  return await apiRequest<ProfileResponse>("user/me", "GET");
};
