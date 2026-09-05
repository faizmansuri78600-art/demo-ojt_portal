import React from "react";

const RemindersList = ({ reminders, onViewAll = () => {} }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h2 className="font-bold text-gray-900 text-lg mb-4">Reminders</h2>
      <ul className="flex flex-col gap-4">
        {reminders.map((reminder) => (
          <li key={reminder.id} className="flex items-start gap-3">
            <span className={`w-2.5 h-2.5 rounded-full mt-1.5 ${reminder.color}`} />
            <p className="text-sm text-gray-700 leading-snug">{reminder.text}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={onViewAll}
        className="text-sm text-blue-600 font-medium hover:underline mt-4"
      >
        View All Reminders →
      </button>
    </div>
  );
};

export default RemindersList;