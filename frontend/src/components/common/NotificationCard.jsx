import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  FileText,
  AlertTriangle,
  Award,
  X
} from 'lucide-react';



export default function NotificationCard() {
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.id) {
        console.error("Logged-in user not found");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/notifications/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  fetchNotifications();
}, []);
  const getNotificationStyle = (index) => {
    const styles = [
      {
        icon: CheckCircle2,
        iconBg: 'bg-green-50',
        iconColor: 'text-green-600',
      },
      {
        icon: FileText,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
      },
      {
        icon: AlertTriangle,
        iconBg: 'bg-orange-50',
        iconColor: 'text-orange-600',
      },
      {
        icon: Award,
        iconBg: 'bg-purple-50',
        iconColor: 'text-purple-600',
      },
    ];

    return styles[index % styles.length];
  };

  const formatTime = (sentOn) => {
    if (!sentOn) return '';

    const notificationDate = new Date(sentOn);
    const today = new Date();

    const difference =
      today.setHours(0, 0, 0, 0) -
      notificationDate.setHours(0, 0, 0, 0);

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days > 1) return `${days} days ago`;

    return sentOn;
  };

  const displayedNotifications = notifications.slice(0, 4);

  return (
    <>
      {/* NOTIFICATION CARD */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <div className="flex items-center justify-between mb-4">

          <h3 className="text-sm font-bold text-slate-800">
            Latest Notifications
          </h3>

          <button
            onClick={() => setShowAll(true)}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            View All
          </button>

        </div>

        <div className="flex flex-col">

          {displayedNotifications.length === 0 ? (
            <p className="text-sm text-slate-400 py-4">
              No notifications available.
            </p>
          ) : (
            displayedNotifications.map((notification, index) => {
              const style = getNotificationStyle(index);
              const Icon = style.icon;

              return (
                <div
                  key={notification._id}
                  className={`flex gap-3 py-3.5 ${
                    index !== 0
                      ? 'border-t border-slate-100'
                      : ''
                  }`}
                >

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${style.iconBg} ${style.iconColor}`}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-sm text-slate-600 leading-snug">
                      {notification.message}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {formatTime(notification.sentOn)}
                    </p>

                  </div>

                </div>
              );
            })
          )}

        </div>
      </div>


      {/* VIEW ALL POPUP */}
      {showAll && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

          <div className="bg-white w-[500px] max-h-[80vh] rounded-2xl shadow-xl">

            {/* POPUP HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">

              <h2 className="text-lg font-bold text-slate-800">
                All Notifications
              </h2>

              <button
                onClick={() => setShowAll(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100"
              >
                <X size={18} />
              </button>

            </div>


            {/* ALL NOTIFICATIONS */}
            <div className="px-6 py-2 overflow-y-auto max-h-[65vh]">

              {notifications.length === 0 ? (
                <p className="text-sm text-slate-400 py-6 text-center">
                  No notifications available.
                </p>
              ) : (
                notifications.map((notification, index) => {
                  const style = getNotificationStyle(index);
                  const Icon = style.icon;

                  return (
                    <div
                      key={notification._id}
                      className={`flex gap-3 py-4 ${
                        index !== 0
                          ? 'border-t border-slate-100'
                          : ''
                      }`}
                    >

                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${style.iconBg} ${style.iconColor}`}
                      >
                        <Icon size={18} />
                      </div>

                      <div className="min-w-0">

                        <p className="text-sm text-slate-600 leading-snug">
                          {notification.message}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {formatTime(notification.sentOn)}
                        </p>

                      </div>

                    </div>
                  );
                })
              )}

            </div>

          </div>

        </div>
      )}

    </>
  );
}