import React from "react";

const NotificationList = ({ notifications, onViewAll = () => {} }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h2 className="font-bold text-gray-900 text-lg mb-4">Recent Notifications</h2>
      <ul className="flex flex-col gap-4">
        {notifications.map((note) => (
          <li key={note.id} className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className={`w-2.5 h-2.5 rounded-full mt-1.5 ${note.color}`} />
              <p className="text-sm text-gray-700 leading-snug">{note.text}</p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">{note.time}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onViewAll}
        className="text-sm text-blue-600 font-medium hover:underline mt-4"
      >
        View All Notifications →
      </button>
    </div>
  );
};

export default NotificationList;