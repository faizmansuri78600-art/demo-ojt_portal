export default function StatCard({ icon: Icon, label, value, growth, bg, color }) {
  return (
    <div className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${bg} ${color}`}
      >
        <Icon size={21} />
      </div>

      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold my-1 text-slate-800">{value}</p>
        <p className="text-xs font-medium text-green-600">{growth}</p>
      </div>
    </div>
  );
}