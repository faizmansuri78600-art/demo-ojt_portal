const API_BASE_URL = "http://localhost:5000/api";

export const api = {
  baseURL: API_BASE_URL,

  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

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
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return response.json();
  },
};