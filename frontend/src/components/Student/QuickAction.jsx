const actions = [
  { label: "New Project", icon: "➕" },
  { label: "Invite User", icon: "📧" },
  { label: "Generate Report", icon: "📊" },
  { label: "Settings", icon: "⚙️" },
];

export default function QuickAction() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <button
            key={a.label}
            className="flex flex-col items-center justify-center gap-2 py-4 rounded-lg border border-gray-100 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
          >
            <span className="text-xl">{a.icon}</span>
            <span className="text-xs font-medium text-gray-600">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
