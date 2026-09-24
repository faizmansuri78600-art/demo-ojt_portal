import { api } from "./api";

// Get Student Dashboard
export const getDashboard = async () => {
  const response = await api.get("/students/dashboard");
  return response.data.dashboard;
};

// Get Student Profile
export const getProfile = async () => {
  const response = await api.get("/students/profile");
  return response.data;
};

// Update Student Profile
export const updateProfile = async (updates) => {
  const response = await api.put("/students/profile", updates);
  return response.data;
};

// Upload Resume
export const uploadResume = async (formData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:5000/api/students/profile/resume",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Resume upload failed");
  }

  return data;
};

// Get Student Task
export const getStudentTask = async () => {
  const response = await api.get("/tasks/student");
  return response.data;
};

// Complete Student Task
export const completeTask = async (taskId) => {
  const response = await api.put(`/tasks/${taskId}/complete`, {});
  return response.data;
};

// Get Student Notifications
export const getStudentNotifications = async () => {
  const response = await api.get("/notifications/student");
  return response.data;
};

// Get My Applications
export const getMyApplications = async () => {
  const response = await api.get("/students/applications");
  return response.data;
};

// Get All Opportunities
export const getAllOpportunities = async () => {
  const response = await api.get("/opportunities");
  return response.data;
};