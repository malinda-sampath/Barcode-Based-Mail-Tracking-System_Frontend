export async function apiRequest<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: unknown
): Promise<{ status: number; data?: T }> {
  try {
    const token = localStorage.getItem("token");

    // Determine if we're sending FormData
    const isFormData = body instanceof FormData;

    const headers: HeadersInit = {
      // Only set Content-Type for non-FormData requests
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
      method,
      headers,
      body: isFormData
        ? (body as FormData)
        : body
        ? JSON.stringify(body)
        : undefined,
    });

    // Handle response
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
