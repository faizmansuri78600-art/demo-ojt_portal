import {
  Users,
  BadgeCheck,
  Clock,
  ClipboardList,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    label: "Total Interns",
    value: "18",
    sub: "This Month",
    bg: "bg-[#EEF4FF]",
    color: "text-[#1E5EFF]",
    subColor: "text-[#94A3B8]",
  },
  {
    icon: BadgeCheck,
    label: "Certificates Issued",
    value: "12",
    sub: "66.67%",
    bg: "bg-[#ECFDF3]",
    color: "text-[#16A34A]",
    subColor: "text-[#16A34A]",
  },
  {
    icon: Clock,
    label: "Pending Certificates",
    value: "6",
    sub: "33.33%",
    bg: "bg-[#FFF7E8]",
    color: "text-[#F59E0B]",
    subColor: "text-[#F59E0B]",
  },
  {
    icon: ClipboardList,
    label: "Total This Year",
    value: "48",
    sub: "2025",
    bg: "bg-[#F5EEFF]",
    color: "text-[#8B5CF6]",
    subColor: "text-[#94A3B8]",
  },
];

export default function CertificateStats() {
  return (
    <div className="grid grid-cols-4 gap-3 w-full">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="
              h-[88px]
              bg-white
              border
              border-[#E5E7EB]
              rounded-[10px]
              px-4
              flex
              items-center
              gap-3
            "
          >

            {/* ICON */}

            <div
              className={`
                w-[42px]
                h-[42px]
                rounded-[10px]
                flex
                items-center
                justify-center
                shrink-0
                ${stat.bg}
                ${stat.color}
              `}
            >
              <Icon
                size={19}
                strokeWidth={1.8}
              />
            </div>


            {/* TEXT */}

            <div className="min-w-0">

              <p className="text-[10px] font-medium text-[#64748B] leading-tight">
                {stat.label}
              </p>

              <p className="text-[21px] font-bold text-[#111827] leading-tight mt-1">
                {stat.value}
              </p>

              <p
                className={`
                  text-[8px]
                  font-medium
                  mt-0.5
                  ${stat.subColor}
                `}
              >
                {stat.sub}
              </p>

            </div>

          </div>
        );
      })}

    </div>
  );
}