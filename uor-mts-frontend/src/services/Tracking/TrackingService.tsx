import { apiRequest } from "../api";

// Interface that matches the backend DTO
interface TrackingDetailsDTO {
  email: string;
  insertedAt: string; // This will be converted to LocalDateTime on backend
  mailType: string;
  mailTrackingNumber: string;
}

/**
 * Submit tracking details to the backend
 * @param email User's email address
 * @param mailType Type of mail (REGULAR MAIL or REGISTER POST MAIL)
 * @param trackingNumber Tracking number (UUID for regular mail or register code for register post)
 * @returns API response
 */
export const submitTrackingRequest = async (
  email: string,
  mailType: string,
  trackingNumber: string
): Promise<{ status: number; data?: any }> => {
  try {
    // Create the tracking details DTO
    const trackingDetails: TrackingDetailsDTO = {
      email,
      insertedAt: new Date().toISOString(), // Current date/time in ISO format
      mailType,
      mailTrackingNumber: trackingNumber
    };

    // Log the payload being sent for debugging purposes
    console.log("Sending tracking request to server:", JSON.stringify(trackingDetails, null, 2));

    // Use the correct endpoint: "tracking/save" instead of just "tracking"
    const response = await apiRequest(
      "tracking/save", // Updated endpoint
      "POST",
      trackingDetails
    );

    // Log the response for debugging
    console.log("Server response:", response);

    return response;
  } catch (error) {
    console.error("Error submitting tracking request:", error);
    return { status: 500, data: { message: "Client-side error occurred" } };
  }
};