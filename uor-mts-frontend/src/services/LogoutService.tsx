import { apiRequest } from "./api";

interface LogoutResponse {
  status: number;
  message?: string;
}

export const logoutUser = async (): Promise<{ status: number; data?: LogoutResponse }> => {
  try {
    // First call the logout API endpoint
    const response = await apiRequest<LogoutResponse>("auth/logout", "POST");
    
    // Clear the token from localStorage regardless of API response
    localStorage.removeItem("token");
    
    // Optionally clear other auth-related items if they exist
    localStorage.removeItem("user");
    localStorage.removeItem("expiry");
    
    // Return the API response status
    return response;
  } catch (error) {
    console.error("Logout failed:", error);
    // Still clear storage even if API fails
    localStorage.removeItem("token");
    
    // Return error status
    return { status: 500 };
  }
};

// Additional helper function to handle the redirect
export const redirectToLogin = () => {
  window.location.href = "/login"; // Or your login route
};