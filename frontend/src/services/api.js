const API_BASE_URL = "http://localhost:5000/api";

function authHeaders() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  baseURL: API_BASE_URL,

  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        ...authHeaders(),
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return response.json();
  },

  // Downloads a file from an authenticated endpoint (the browser can't
  // attach an Authorization header to a plain <a href>, so we fetch the
  // bytes ourselves and save them via a temporary object URL).
  async downloadFile(endpoint, fallbackFilename = "download") {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        ...authHeaders(),
      },
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.message || "Download failed");
    }

    const disposition = response.headers.get("Content-Disposition") || "";
    const match = disposition.match(/filename="?([^"]+)"?/);
    const filename = match ? match[1] : fallbackFilename;

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};