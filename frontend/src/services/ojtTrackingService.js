import { api } from "./api";

const ojtTrackingService = {
  async getTrackingStudents() {
    return api.get(
      "/college-coordinators/tracking"
    );
  },

  async updateTrackingProgress(
    id,
    data
  ) {
    return api.put(
      `/college-coordinators/tracking/${id}/progress`,
      data
    );
  },
};

export {
  ojtTrackingService,
};

export default ojtTrackingService;