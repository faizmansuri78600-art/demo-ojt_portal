import { CheckCircle2, FileText, AlertTriangle, Award } from 'lucide-react';

const notifications = [
  {
    icon: CheckCircle2,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    parts: [
      { text: 'Rahul Sharma', bold: true },
      { text: ' has been shortlisted for ' },
      { text: 'Web Development Intern', bold: true },
    ],
    time: '10 min ago',
  },
  {
    icon: FileText,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    parts: [
      { text: 'New application received for ' },
      { text: 'Data Scientist Intern', bold: true },
    ],
    time: '1 hour ago',
  },
  {
    icon: AlertTriangle,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    parts: [
      { text: 'OJT opportunity ' },
      { text: '"UI/UX Design Intern"', bold: true },
      { text: ' closes in 3 days' },
    ],
    time: '2 hours ago',
  },
  {
    icon: Award,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    parts: [
      { text: 'Certificate issued to ' },
      { text: 'Priya Patel', bold: true },
      { text: ' for Web Development Intern' },
    ],
    time: '1 day ago',
  },
];

export default function NotificationCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Latest Notifications</h3>
        <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">
          View All
        </a>
      </div>

      <div className="flex flex-col">
        {notifications.map((n, i) => (
          <div
            key={i}
            className={`flex gap-3 py-3.5 ${i !== 0 ? 'border-t border-slate-100' : ''}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.iconBg} ${n.iconColor}`}>
              <n.icon size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-slate-600 leading-snug">
                {n.parts.map((part, j) => (
                  <span key={j} className={part.bold ? 'font-semibold text-slate-800' : ''}>
                    {part.text}
                  </span>
                ))}
              </p>
              <p className="text-xs text-slate-400 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}