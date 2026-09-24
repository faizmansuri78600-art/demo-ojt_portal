const API_BASE_URL = "http://localhost:5000/api";

function authHeaders() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
}

export const api = {
  baseURL: API_BASE_URL,

  // GET
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: authHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Something went wrong"
      );
    }

    return {
      data: data,
    };
  },

  // POST
  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message || "Something went wrong"
      );
    }

    return {
      data: responseData,
    };
  },

  // PUT
  async put(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message || "Something went wrong"
      );
    }

    return {
      data: responseData,
    };
  },

  // DELETE
  async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message || "Something went wrong"
      );
    }

    return {
      data: responseData,
    };
  },

  // DOWNLOAD FILE
  async downloadFile(
    endpoint,
    fallbackFilename = "download"
  ) {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        method: "GET",
        headers: {
          Authorization:
            localStorage.getItem("token")
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
        },
      }
    );

    if (!response.ok) {
      const body = await response
        .json()
        .catch(() => null);

      throw new Error(
        body?.message || "Download failed"
      );
    }

    const disposition =
      response.headers.get("Content-Disposition") || "";

    const match = disposition.match(
      /filename="?([^"]+)"?/
    );

    const filename = match
      ? match[1]
      : fallbackFilename;

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