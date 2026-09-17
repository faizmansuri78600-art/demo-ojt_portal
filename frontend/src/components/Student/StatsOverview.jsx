import StatsCard from "./Statscard";

const stats = [
  {
    title: "Total Users",
    value: "12,430",
    change: "8.2% this month",
    positive: true,
    icon: "👤",
  },
  {
    title: "Revenue",
    value: "$48,900",
    change: "3.1% this month",
    positive: true,
    icon: "💰",
  },
  {
    title: "Active Sessions",
    value: "1,204",
    change: "1.4% this week",
    positive: false,
    icon: "📈",
  },
  {
    title: "Pending Tasks",
    value: "37",
    change: "5 new today",
    positive: false,
    icon: "📝",
  },
];

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <StatsCard key={s.title} {...s} />
      ))}
    </div>
  );
}
