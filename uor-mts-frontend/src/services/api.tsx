export async function apiRequest<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: unknown
): Promise<{ status: number; data?: T }> {
  try {
    const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage

    const response = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // Add JWT token if available
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Check if response is JSON, otherwise handle it accordingly
    const contentType = response.headers.get("Content-Type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text(); // Handle non-JSON responses
    }

    return { status: response.status, data };
  } catch (error) {
    console.error("API request error:", error);
    return { status: 500 };
  }
}
