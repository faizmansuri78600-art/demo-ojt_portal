import { api } from "./api";

const mentorAssignmentService = {
  async getData() {
    return api.get(
      "/college-coordinators/mentor-assignment"
    );
  },

  async assignMentor(data) {
    return api.post(
      "/college-coordinators/mentor-assignment",
      data
    );
  },

  async updateAssignment(id, data) {
    return api.put(
      `/college-coordinators/mentor-assignment/${id}`,
      data
    );
  },

  async deleteAssignment(id) {
    return api.delete(
      `/college-coordinators/mentor-assignment/${id}`
    );
  },
};

export { mentorAssignmentService };
export default mentorAssignmentService;