import {
  Plus,
  Eye,
  UserCheck,
  ClipboardCheck,
  Award,
  Download,
} from 'lucide-react';

const actions = [
  { icon: Plus, label: 'Add New Opportunity', color: 'text-blue-600', bg: 'bg-blue-100' },
  { icon: Eye, label: 'View All Applications', color: 'text-slate-700', bg: 'bg-slate-100' },
  { icon: UserCheck, label: 'Shortlisted Students', color: 'text-green-600', bg: 'bg-green-100' },
  { icon: ClipboardCheck, label: 'Attendance & Evaluation', color: 'text-orange-600', bg: 'bg-orange-100' },
  { icon: Award, label: 'Generate Certificate', color: 'text-purple-600', bg: 'bg-purple-100' },
  { icon: Download, label: 'Download Reports', color: 'text-blue-600', bg: 'bg-blue-100' },
];

export default function QuickAction() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-full flex flex-col">
      <h3 className="text-sm font-bold text-slate-800 mb-4">Quick Actions</h3>

      <div className="flex flex-col gap-3">
        {actions.map(({ icon: Icon, label, color, bg }) => (
          <button
            key={label}
            className={`w-full h-[48px] px-4 rounded-xl ${bg} flex items-center gap-3 text-left shrink-0 transition hover:brightness-95`}
          >
            <Icon size={18} strokeWidth={1.8} className={`${color} shrink-0`} />
            <span className={`${color} text-[12px] font-semibold`}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}