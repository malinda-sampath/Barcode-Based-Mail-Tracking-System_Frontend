import { apiRequest } from "../api";

interface EmailVerification {
  email: string;
  otp: string;
}

export interface EmailVerificationResponse {
  status: number;
  message: string;
  data?: EmailVerification;
}

/**
 * Makes a public API request without authentication
 */
async function publicApiRequest<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: unknown
): Promise<{ status: number; data?: T }> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get("Content-Type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return { status: response.status, data };
  } catch (error) {
    console.error("API request error:", error);
    return { status: 500 };
  }
}

// Store the OTP for development fallback
let lastGeneratedOTP = "";

/**
 * Sends a verification email to the specified email address
 */
export const sendVerificationEmail = async (email: string) => {
  try {
    const response = await publicApiRequest<EmailVerificationResponse>(`email-verification/verify/${encodeURIComponent(email)}`, "POST");
    
    if (response.data?.data?.email && response.data?.data?.otp) {
      lastGeneratedOTP = response.data.data.otp;
      // Log the OTP received from backend for debugging
      console.log("Backend generated OTP:", lastGeneratedOTP);
      console.log("Email:", response.data.data.email);
    }
    
    return response;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { status: 500 };
  }
};

/**
 * Verifies the OTP sent to the user's email
 */
export const verifyOTP = async (email: string, otp: string) => {
  const enableFallback = true;
  
  // Log verification attempt details
  console.log("Verifying OTP:");
  console.log("- Email:", email);
  console.log("- User entered OTP:", otp);
  console.log("- Stored backend OTP:", lastGeneratedOTP);
  
  if (enableFallback && lastGeneratedOTP) {
    // Log that we're using fallback
    console.log("Using fallback verification");
    
    if (otp === lastGeneratedOTP) {
      console.log("OTP match: Verification successful");
      return {
        status: 200,
        data: {
          message: "OTP verified successfully",
          success: true
        }
      };
    } else {
      console.log("OTP mismatch: Verification failed");
      return {
        status: 400,
        data: {
          message: "Invalid OTP",
          success: false
        }
      };
    }
  }
  
  // If fallback not available or not enabled, try API
  console.log("Attempting verification via API");
  try {
    const response = await publicApiRequest<any>("email-verification/verify/otp", "POST", {
      email,
      otp
    });
    
    console.log("API verification response:", response);
    return response;
  } catch (error) {
    console.error("Error in verifyOTP function:", error);
    return { status: 500, data: { message: "Server error" } };
  }
};