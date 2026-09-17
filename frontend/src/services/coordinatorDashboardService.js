import { api } from "./api";

const coordinatorDashboardService = {
  async getDashboard() {
    return api.get("/college-coordinators/dashboard");
  },
};

export { coordinatorDashboardService };

export default coordinatorDashboardService;