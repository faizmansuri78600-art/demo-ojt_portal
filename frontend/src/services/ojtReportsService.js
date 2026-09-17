import { api } from "./api";

const ojtReportsService = {
  async getReports() {
    return api.get(
      "/college-coordinators/reports"
    );
  },
};

export {
  ojtReportsService,
};

export default ojtReportsService;