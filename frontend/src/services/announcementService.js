import { api } from "./api";

const announcementService = {
  async getAnnouncements() {
    return api.get("/announcements");
  },

  async getRecentAnnouncements() {
    return api.get(
      "/announcements/recent"
    );
  },

  async getAnnouncementById(id) {
    return api.get(
      `/announcements/${id}`
    );
  },

  async addAnnouncement(
    announcementData
  ) {
    return api.post(
      "/announcements",
      announcementData
    );
  },

  async updateAnnouncement(
    id,
    announcementData
  ) {
    return api.put(
      `/announcements/${id}`,
      announcementData
    );
  },

  async deleteAnnouncement(id) {
    return api.delete(
      `/announcements/${id}`
    );
  },
};

export {
  announcementService,
};

export default announcementService;