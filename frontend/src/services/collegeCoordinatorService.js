import { api } from "./api";

const collegeCoordinatorService = {
  // STUDENT MANAGEMENT

  async getStudents() {
    return api.get(
      "/college-coordinators/students"
    );
  },

  async addStudent(studentData) {
    return api.post(
      "/college-coordinators/students",
      studentData
    );
  },

  async updateStudent(
    id,
    studentData
  ) {
    return api.put(
      `/college-coordinators/students/${id}`,
      studentData
    );
  },

  async deleteStudent(id) {
    return api.delete(
      `/college-coordinators/students/${id}`
    );
  },

  // COMPANY MANAGEMENT

  async getCompanies() {
    return api.get(
      "/college-coordinators/companies"
    );
  },

  async addCompany(companyData) {
    return api.post(
      "/college-coordinators/companies",
      companyData
    );
  },

  async updateCompany(
    id,
    companyData
  ) {
    return api.put(
      `/college-coordinators/companies/${id}`,
      companyData
    );
  },

  async approveCompany(id) {
    return api.put(
      `/college-coordinators/companies/${id}/approve`,
      {}
    );
  },

  async rejectCompany(id) {
    return api.put(
      `/college-coordinators/companies/${id}/reject`,
      {}
    );
  },

  async deleteCompany(id) {
    return api.delete(
      `/college-coordinators/companies/${id}`
    );
  },

  // COLLEGE COORDINATOR MANAGEMENT

  async getAllCollegeCoordinators() {
    return api.get(
      "/college-coordinators"
    );
  },

  async getCollegeCoordinatorById(
    id
  ) {
    return api.get(
      `/college-coordinators/${id}`
    );
  },

  async getCoordinatorsByDepartment(
    department
  ) {
    return api.get(
      `/college-coordinators/department/${encodeURIComponent(
        department
      )}`
    );
  },

  async addCollegeCoordinator(
    coordinatorData
  ) {
    return api.post(
      "/college-coordinators",
      coordinatorData
    );
  },

  async updateCollegeCoordinator(
    id,
    coordinatorData
  ) {
    return api.put(
      `/college-coordinators/${id}`,
      coordinatorData
    );
  },

  async deleteCollegeCoordinator(id) {
    return api.delete(
      `/college-coordinators/${id}`
    );
  },
};

export {
  collegeCoordinatorService,
};

export default collegeCoordinatorService;