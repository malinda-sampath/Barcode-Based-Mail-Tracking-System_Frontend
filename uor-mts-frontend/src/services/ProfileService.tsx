import { apiRequest } from "./api";

// Define the response structure for the API
export interface ProfileResponse {
  status: number;
  message: string;
  data: {
    userID: string;
    name: string;
    contact: string;
    email: string;
    profilePicture: string;
  };
}

// Fetch user profile data
export const fetchProfile = async () => {
  return await apiRequest<ProfileResponse>("user/me", "GET");
};

export const updateProfile = async (
  data: {
    name: string;
    contact: string;
    email: string;
    password: string;
    profilePicture: File | null;
  },
  userID: string
) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("contact", data.contact);
  formData.append("email", data.email);
  formData.append("password", data.password);

  if (data.profilePicture) {
    formData.append("profilePicture", data.profilePicture);
  }

  return await apiRequest<ProfileResponse>(
    `user/update/${userID}`,
    "PUT",
    formData
  );
};
