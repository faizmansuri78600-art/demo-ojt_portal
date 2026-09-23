const activity = [
  { name: "John Doe", action: "Created a new project", time: "2 min ago", status: "Completed" },
  { name: "Jane Smith", action: "Updated profile settings", time: "15 min ago", status: "Pending" },
  { name: "Mark Lee", action: "Uploaded a document", time: "1 hr ago", status: "Completed" },
  { name: "Alice Ray", action: "Requested access", time: "3 hr ago", status: "Rejected" },
];

const statusStyles = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b border-gray-100">
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Action</th>
              <th className="pb-2 font-medium">Time</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {activity.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-0">
                <td className="py-3 text-gray-800 font-medium">{row.name}</td>
                <td className="py-3 text-gray-500">{row.action}</td>
                <td className="py-3 text-gray-400">{row.time}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
