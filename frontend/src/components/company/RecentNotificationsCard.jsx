import { useEffect, useState } from "react";

import {
  Bell,
  FileText,
  Award,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";


export default function RecentNotificationsCard() {

  const [notifications, setNotifications] = useState([]);


  // =====================================================
  // GET REAL LOGGED-IN USER NOTIFICATIONS
  // =====================================================

  const fetchNotifications = async () => {
    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const token = localStorage.getItem("token");

      const userId = user?._id || user?.id;


      if (!userId) {
        console.error(
          "Logged-in user ID not found"
        );

        return;
      }


      const response = await fetch(
        `http://localhost:5000/api/notifications/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const data = await response.json();


      if (data.success) {
        setNotifications(
          data.notifications || []
        );
      } else {
        console.error(data.message);
      }

    } catch (error) {

      console.error(
        "Error fetching notifications:",
        error
      );

    }
  };


  useEffect(() => {

    fetchNotifications();

  }, []);


  // =====================================================
  // ICON
  // =====================================================

  const getNotificationIcon = (message = "") => {

    const text = message.toLowerCase();


    if (text.includes("application")) {

      return {
        icon: FileText,
        bg: "bg-blue-50",
        color: "text-blue-600",
      };

    }


    if (text.includes("certificate")) {

      return {
        icon: Award,
        bg: "bg-purple-50",
        color: "text-purple-600",
      };

    }


    if (text.includes("evaluation")) {

      return {
        icon: CheckCircle,
        bg: "bg-green-50",
        color: "text-green-600",
      };

    }


    if (text.includes("attendance")) {

      return {
        icon: AlertTriangle,
        bg: "bg-red-50",
        color: "text-red-500",
      };

    }


    return {
      icon: Bell,
      bg: "bg-blue-50",
      color: "text-blue-600",
    };

  };


  // =====================================================
  // TIME
  // =====================================================

  const getTimeAgo = (date) => {

    if (!date) {
      return "";
    }


    const notificationDate =
      new Date(date);

    const now = new Date();


    const difference = Math.floor(
      (now - notificationDate) / 1000
    );


    if (difference < 60) {
      return "Just now";
    }


    if (difference < 3600) {

      const minutes =
        Math.floor(difference / 60);

      return `${minutes} minute${
        minutes > 1 ? "s" : ""
      } ago`;

    }


    if (difference < 86400) {

      const hours =
        Math.floor(difference / 3600);

      return `${hours} hour${
        hours > 1 ? "s" : ""
      } ago`;

    }


    const days =
      Math.floor(difference / 86400);


    return `${days} day${
      days > 1 ? "s" : ""
    } ago`;

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <section className="bg-white rounded-[20px] p-5 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-[14px] font-semibold text-[#111827]">
          Recent Notifications
        </h2>


        <button
          type="button"
          className="text-[11px] font-semibold text-[#1E5EFF] hover:underline"
        >
          View All
        </button>

      </div>


      <div className="flex flex-col">

        {notifications.length === 0 ? (

          <div className="py-6 text-center">

            <Bell
              size={24}
              className="mx-auto text-gray-300 mb-2"
            />

            <p className="text-[12px] text-gray-400">
              No notifications
            </p>

          </div>

        ) : (

          notifications
            .slice(0, 5)
            .map((notification, index) => {

              const style =
                getNotificationIcon(
                  notification.message
                );

              const Icon = style.icon;


              return (

                <div
                  key={notification._id}
                  className={`flex items-start gap-3 py-3 ${
                    index !== 0
                      ? "border-t border-[#F1F5F9]"
                      : ""
                  }`}
                >

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${style.bg} ${style.color}`}
                  >

                    <Icon size={14} />

                  </div>


                  <div className="flex-1 min-w-0">

                    <p className="text-[12px] text-[#374151] leading-snug">

                      {notification.message}

                    </p>


                    <p className="text-[10px] text-[#9CA3AF] mt-1">

                      {getTimeAgo(
                        notification.sentOn
                      )}

                    </p>

                  </div>


                  {!notification.isRead && (

                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E5EFF] mt-1.5 shrink-0" />

                  )}

                </div>

              );

            })

        )}

      </div>

    </section>

  );
}