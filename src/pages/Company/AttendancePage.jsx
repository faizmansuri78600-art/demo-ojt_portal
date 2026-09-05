import CompanySidebar from "../../components/common/CompanySidebar";
import CompanyHeader from "../../components/common/CompanyHeader";
import CompanyFooter from "../../components/common/CompanyFooter";
import AttendanceHeader from "../../components/company/AttendanceHeader";
import AttendanceFiltersBar from "../../components/company/AttendanceFiltersBar";
import AttendanceStatsCards from "../../components/company/AttendanceStatsCards";
import StudentAttendanceTable from "../../components/company/StudentAttendanceTable";
import AttendanceCalendarWidget from "../../components/company/AttendanceCalendarWidget";
import AttendanceSummaryChart from "../../components/company/AttendanceSummaryChart";
import QuickActionsPanel from "../../components/company/QuickActionsPanel";
import { AttendanceProvider } from "../../components/company/AttendanceContext";

export default function AttendancePage() {
  return (
    <AttendanceProvider>
      <div className="flex min-h-screen bg-slate-50">
        <CompanySidebar />

        <div className="flex flex-1 flex-col">
          <CompanyHeader />

          <main className="flex-1 p-6">
            <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
              <AttendanceHeader />
              <AttendanceFiltersBar />
              <AttendanceStatsCards />

              <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
                <StudentAttendanceTable />

                <div className="flex flex-col gap-5">
                  <AttendanceCalendarWidget />
                  <AttendanceSummaryChart />
                  <QuickActionsPanel />
                </div>
              </div>
            </div>
          </main>

          <CompanyFooter />
        </div>
      </div>
    </AttendanceProvider>
  );
}
