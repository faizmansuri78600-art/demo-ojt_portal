import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Eye,
  UserCheck,
  ClipboardCheck,
  Award,
  Download,
} from 'lucide-react';

const actions = [
  {
    icon: Plus,
    label: 'Add New Opportunity',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    path: '/company/manage-ojt-opportunity',
  },
  {
    icon: Eye,
    label: 'View All Applications',
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    path: '/company/applications',
  },
  {
    icon: UserCheck,
    label: 'Shortlisted Students',
    color: 'text-green-600',
    bg: 'bg-green-100',
    path: '/company/applications',
    state: { filter: 'shortlisted' },
  },
  {
    icon: ClipboardCheck,
    label: 'Attendance & Evaluation',
    color: 'text-orange-600',
    bg: 'bg-orange-100',
    path: '/company/attendance',
  },
  {
    icon: Award,
    label: 'Generate Certificate',
    color: 'text-purple-600',
    bg: 'bg-purple-100',
    path: '/company/certificate',
  },
  {
    icon: Download,
    label: 'Download Reports',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    path: null, // no page yet
    confirmBeforeNav: true,
  },
];

export default function QuickAction() {
  const navigate = useNavigate();
  const [confirmAction, setConfirmAction] = useState(null);

  const handleClick = (action) => {
    if (action.confirmBeforeNav) {
      setConfirmAction(action);
      return;
    }
    if (!action.path) {
      console.warn(`No route defined for "${action.label}" yet.`);
      return;
    }
    navigate(action.path, action.state ? { state: action.state } : undefined);
  };

  const handleConfirmOpen = () => {
    if (confirmAction?.path) {
      navigate(confirmAction.path, confirmAction.state ? { state: confirmAction.state } : undefined);
    } else {
      // no route/download logic yet — plug in your download function here later
      console.log('Download confirmed — hook up actual download logic here');
    }
    setConfirmAction(null);
  };

  const handleConfirmCancel = () => {
    setConfirmAction(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-full flex flex-col relative">
      <h3 className="text-sm font-bold text-slate-800 mb-4">Quick Actions</h3>

      <div className="flex flex-col gap-3">
        {actions.map((action) => {
          const { icon: Icon, label, color, bg } = action;
          return (
            <button
              key={label}
              onClick={() => handleClick(action)}
              className={`w-full h-[48px] px-4 rounded-xl ${bg} flex items-center gap-3 text-left shrink-0 transition hover:brightness-95`}
            >
              <Icon size={18} strokeWidth={1.8} className={`${color} shrink-0`} />
              <span className={`${color} text-[12px] font-semibold`}>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={handleConfirmCancel}
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-6 w-[320px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-sm font-bold text-slate-800 mb-2">
              Download Reports
            </h4>
            <p className="text-[13px] text-slate-600 mb-5">
              Do you want to open the reports page?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-lg text-[13px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOpen}
                className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                Open
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}