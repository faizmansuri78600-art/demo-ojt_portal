export const coordinatorProfile = {
  name: "Safwan Baduda",
  role: "College Coordinator",
  initials: "SB",
};

export const dashboardStats = [
  {
    id: "students",
    title: "Total Students",
    value: 248,
    change: "+12",
    changeLabel: "this month",
    icon: "students",
    tone: "blue",
  },
  {
    id: "companies",
    title: "Total Companies",
    value: 56,
    change: "+5",
    changeLabel: "this month",
    icon: "companies",
    tone: "indigo",
  },
  {
    id: "activeOjt",
    title: "Active OJT Programs",
    value: 32,
    change: "+3",
    changeLabel: "this month",
    icon: "ojt",
    tone: "green",
  },
  {
    id: "approvals",
    title: "Pending Approvals",
    value: 18,
    change: "+2",
    changeLabel: "this month",
    icon: "approvals",
    tone: "orange",
  },
  {
    id: "reports",
    title: "Total Reports",
    value: 24,
    change: "+4",
    changeLabel: "this month",
    icon: "reports",
    tone: "purple",
  },
];

export const applicationOverview = [
  { month: "May 1", applications: 18 },
  { month: "May 6", applications: 36 },
  { month: "May 11", applications: 49 },
  { month: "May 16", applications: 45 },
  { month: "May 21", applications: 62 },
  { month: "May 26", applications: 48 },
  { month: "May 31", applications: 64 },
];

export const applicationStatus = [
  {
    label: "Applied",
    value: 120,
    percentage: 48,
    status: "info",
  },
  {
    label: "Under Review",
    value: 68,
    percentage: 27,
    status: "warning",
  },
  {
    label: "Selected",
    value: 42,
    percentage: 17,
    status: "success",
  },
  {
    label: "Rejected",
    value: 18,
    percentage: 8,
    status: "danger",
  },
];

export const mentorAssignment = {
  assigned: 24,
  unassigned: 8,
  total: 32,
  percentage: 75,
};

export const recentApplications = [
  {
    id: 1,
    student: "Rahul Sharma",
    company: "Tech Solutions Inc.",
    position: "Web Development Intern",
    status: "Under Review",
    statusType: "warning",
    time: "2 hrs ago",
  },
  {
    id: 2,
    student: "Priya Singh",
    company: "Digital Innovations",
    position: "Data Analytics Intern",
    status: "Selected",
    statusType: "success",
    time: "5 hrs ago",
  },
  {
    id: 3,
    student: "Aman Verma",
    company: "WebCraft Pvt. Ltd.",
    position: "Frontend Developer Intern",
    status: "Applied",
    statusType: "info",
    time: "1 day ago",
  },
  {
    id: 4,
    student: "Neha Patil",
    company: "Innovatech Labs",
    position: "UI/UX Design Intern",
    status: "Under Review",
    statusType: "warning",
    time: "1 day ago",
  },
  {
    id: 5,
    student: "Karan Mehta",
    company: "Sunbridge Solutions",
    position: "Cloud Computing Intern",
    status: "Rejected",
    statusType: "danger",
    time: "2 days ago",
  },
];

export const recentAnnouncements = [
  {
    id: 1,
    title: "OJT Orientation Program",
    description:
      "Orientation program for students starting their OJT journey.",
    date: "May 19, 2025",
    type: "orientation",
  },
  {
    id: 2,
    title: "Company Registration Drive",
    description:
      "New companies can register for the upcoming OJT cycle.",
    date: "May 18, 2025",
    type: "company",
  },
  {
    id: 3,
    title: "Report Submission Reminder",
    description:
      "Mentors are requested to submit monthly OJT reports.",
    date: "May 17, 2025",
    type: "report",
  },
];

export const upcomingActivities = [
  {
    id: 1,
    title: "Mentor Meeting",
    description:
      "Discussion with mentors regarding OJT progress.",
    date: "May 22, 2025",
    time: "11:00 AM",
    type: "meeting",
  },
  {
    id: 2,
    title: "OJT Progress Review",
    description:
      "Review of ongoing OJT programs.",
    date: "May 24, 2025",
    time: "02:00 PM",
    type: "review",
  },
  {
    id: 3,
    title: "Monthly Report Submission",
    description:
      "Submit monthly OJT progress reports.",
    date: "May 25, 2025",
    time: "05:00 PM",
    type: "report",
  },
  {
    id: 4,
    title: "Company Onboarding Session",
    description:
      "Session for new company partners.",
    date: "May 27, 2025",
    time: "10:30 AM",
    type: "company",
  },
];

export const ojtPrograms = [
  {
    id: 1,
    program: "Web Development Internship",
    company: "Tech Solutions Inc.",
    mentor: "Mr. Rajesh Kumar",
    students: 12,
    startDate: "May 01, 2025",
    endDate: "Jul 31, 2025",
    status: "In Progress",
  },
  {
    id: 2,
    program: "Data Analytics Internship",
    company: "DataMind Pvt. Ltd.",
    mentor: "Ms. Priya Iyer",
    students: 8,
    startDate: "Apr 15, 2025",
    endDate: "Jul 15, 2025",
    status: "In Progress",
  },
  {
    id: 3,
    program: "UI/UX Design Internship",
    company: "Creative Media",
    mentor: "Mr. Amit Verma",
    students: 10,
    startDate: "May 10, 2025",
    endDate: "Aug 10, 2025",
    status: "Upcoming",
  },
  {
    id: 4,
    program: "Cloud Computing Internship",
    company: "CloudTech Solutions",
    mentor: "Mr. Vivek Singh",
    students: 8,
    startDate: "Jun 01, 2025",
    endDate: "Aug 31, 2025",
    status: "Upcoming",
  },
];

export const reportsOverview = [
  {
    id: 1,
    title: "Monthly Reports",
    value: 12,
    icon: "monthly",
  },
  {
    id: 2,
    title: "Company Reports",
    value: 8,
    icon: "company",
  },
  {
    id: 3,
    title: "Student Reports",
    value: 24,
    icon: "student",
  },
  {
    id: 4,
    title: "OJT Summary",
    value: 6,
    icon: "summary",
  },
];

export const quickActions = [
  {
    id: "student",
    label: "Add New Student",
    path: "/coordinator/students",
  },
  {
    id: "company",
    label: "Add New Company",
    path: "/coordinator/companies",
  },
  {
    id: "mentor",
    label: "Assign Mentor",
    path: "/coordinator/mentors",
  },
  {
    id: "announcement",
    label: "Create Announcement",
    path: "/coordinator/announcements",
  },
  {
    id: "report",
    label: "Generate Report",
    path: "/coordinator/reports",
  },
];