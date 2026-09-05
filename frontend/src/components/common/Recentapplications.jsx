const applications = [
  { initials: 'RS', name: 'Rahul Sharma', role: 'BCA', opportunity: 'Web Development Intern', code: 'OJT-2026-08', appliedOn: '15 Jul 2026', status: 'New' },
  { initials: 'PP', name: 'Priya Patel', role: 'MCA', opportunity: 'Data Science Intern', code: 'OJT-2026-07', appliedOn: '15 Jul 2026', status: 'New' },
  { initials: 'AS', name: 'Aniket Singh', role: 'B.Sc IT', opportunity: 'Software Testing Intern', code: 'OJT-2026-06', appliedOn: '14 Jul 2026', status: 'Shortlisted' },
  { initials: 'SV', name: 'Sneha Verma', role: 'BCA', opportunity: 'Web Development Intern', code: 'OJT-2026-08', appliedOn: '13 Jul 2026', status: 'In Review' },
  { initials: 'AG', name: 'Aman Gupta', role: 'MCA', opportunity: 'Data Analyst Intern', code: 'OJT-2026-05', appliedOn: '13 Jul 2026', status: 'Rejected' },
];

const statusColors = {
  New: 'bg-blue-50 text-blue-700',
  'In Review': 'bg-orange-50 text-orange-700',
  Shortlisted: 'bg-green-50 text-green-700',
  Rejected: 'bg-red-50 text-red-700',
};

export default function RecentApplications() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Recent Applications</h3>
        <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">View All</a>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400 text-xs">
            <th className="pb-3 font-medium">Student</th>
            <th className="pb-3 font-medium">Opportunity</th>
            <th className="pb-3 font-medium">Applied On</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.name} className="border-t border-slate-100">
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {app.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800">{app.name}</p>
                    <p className="text-xs text-slate-400">{app.role}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="text-slate-700">{app.opportunity}</p>
                <p className="text-xs text-slate-400">{app.code}</p>
              </td>
              <td className="text-slate-600">{app.appliedOn}</td>
              <td>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[app.status]}`}>
                  {app.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}