import React, { useEffect, useState } from "react";
import FacultyLayout from "../../components/faculty/FacultyLayout";

const Notifications = ({ onNavigate = () => {} }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  if (!userId) {
    console.error("User ID not found");
    setLoading(false);
    return;
  }

  fetch(`http://localhost:5000/api/notifications/user/${userId}`)
    .then((response) => response.json())
    .then(async (data) => {
      console.log("Notifications Page API:", data);

      if (data.success) {
        setNotifications(data.notifications);

        // Mark unread notifications as read
        const unreadNotifications = data.notifications.filter(
          (note) => !note.isRead
        );

        await Promise.all(
          unreadNotifications.map((note) =>
            fetch(
              `http://localhost:5000/api/notifications/${note._id}/read`,
              {
                method: "PUT",
              }
            )
          )
        );
      }

      setLoading(false);
    })
    .catch((error) => {
      console.error("Notifications Page API Error:", error);
      setLoading(false);
    });
}, []);

  return (
    <FacultyLayout
      activeItem="notifications"
      onNavigate={onNavigate}
    >
      <div className="p-6">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Notifications
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            View your latest notifications and updates.
          </p>
        </div>

        {/* Notifications Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">

          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg">
              All Notifications
            </h2>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-gray-500">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">
              No notifications available.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((note) => (
                <div
                  key={note._id}
                  className="p-5 flex items-start gap-4"
                >
                  {/* Notification Dot */}
                  <span
                    className={`w-3 h-3 rounded-full mt-1.5 ${
                      note.isRead
                        ? "bg-gray-300"
                        : "bg-blue-500"
                    }`}
                  />

                  {/* Notification Content */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 font-medium">
                      {note.message}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {note.sentOn
                        ? new Date(note.sentOn).toLocaleDateString()
                        : ""}
                    </p>
                  </div>

                  {/* Status */}
                  {!note.isRead && (
                    <span className="text-xs text-blue-600 font-medium">
                      Unread
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </FacultyLayout>
  );
};

export default Notifications;