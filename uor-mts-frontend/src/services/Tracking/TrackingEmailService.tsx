import { apiRequest } from "../apiTracking";

// Define response interface to match backend structure
interface EmailVerificationResponse {
  status: number;
  message: string;
  data?: {
    email?: string;
    otp?: string;
  };
}

// Store OTPs at application level with email as key
const otpCache = new Map<string, string>();

/**
 * Sends verification email to the provided email address
 */
export const sendVerificationEmail = async (email: string) => {
  try {
    // Check if we already have an OTP for this email
    if (otpCache.has(email)) {
      console.log(`Using cached OTP for ${email}`);
      return { 
        status: 200, 
        data: { 
          message: "OTP sent successfully",
          data: { email, otp: otpCache.get(email) }
        }
      };
    }

    // Make API request to trigger email verification
    const response = await apiRequest<EmailVerificationResponse>(
      `email-verification/verify/${encodeURIComponent(email)}`,
      "POST"
    );
    
    // Cache the OTP if successful
    if (response.status === 200 && response.data?.data?.otp) {
      otpCache.set(email, response.data.data.otp);
    }
    
    return response;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { status: 500 };
  }
};

/**
 * Gets the cached OTP for an email (for component state synchronization)
 */
export const getCachedOtp = (email: string): string | undefined => {
  return otpCache.get(email);
};

/**
 * Verifies the OTP sent to the user's email
 * 
 * @param email User's email address
 * @param userOtp OTP entered by the user
 * @param backendOtp OTP received from the backend
 */
export const verifyOTP = async (
  email: string, 
  userOtp: string,
  backendOtp: string
) => {
  try {
    const cleanUserOtp = String(userOtp).replace(/\s+/g, '').trim();
    const cleanBackendOtp = String(backendOtp).replace(/\s+/g, '').trim();
    
    // Check for exact match
    const isMatch = cleanUserOtp === cleanBackendOtp;
    
    if (isMatch) {
      // Store verified email in localStorage for later use
      localStorage.setItem('verified_email', email);
      
      // Clear the OTP from cache after successful verification
      otpCache.delete(email);
      
      return {
        status: 200,
        data: {
          message: "OTP verification successful",
          success: true
        }
      };
    } else {
      return {
        status: 400,
        data: {
          message: "Invalid OTP. Please try again.",
          success: false
        }
      };
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { 
      status: 500, 
      data: { message: "An unexpected error occurred during verification" } 
    };
  }
};

/**
 * Gets the verified email from storage
 */
export const getUserEmail = (): string => {
  return localStorage.getItem('verified_email') || '';
};