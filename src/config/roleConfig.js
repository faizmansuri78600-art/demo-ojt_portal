const roleConfig = {

  student: {
    title: "Student Portal",

    menuItems: [
      {
        name: "Dashboard",
        path: "/student/dashboard"
      },
      {
        name: "My Profile",
        path: "/student/profile"
      },
      {
        name: "OJT Opportunities",
        path: "/student/opportunities"
      },
      {
        name: "Applications",
        path: "/student/applications"
      },
      {
        name: "Attendance",
        path: "/student/attendance"
      }
    ]
  },

  company: {
    title: "Company Portal",

    menuItems: [
      {
        name: "Dashboard",
        path: "/company/dashboard"
      },
      {
        name: "Company Profile",
        path: "/company/profile"
      },
      {
        name: "OJT Opportunities",
        path: "/company/opportunities"
      },
      {
        name: "Applications",
        path: "/company/applications"
      }
    ]
  },

  coordinator: {
    title: "OJT Coordinator Portal",

    menuItems: [
      {
        name: "Dashboard",
        path: "/coordinator/dashboard"
      },
      {
        name: "Students",
        path: "/coordinator/students"
      },
      {
        name: "Companies",
        path: "/coordinator/companies"
      },
      {
        name: "Mentor Assignment",
        path: "/coordinator/mentors"
      }
    ]
  },

  admin: {
    title: "Administrator Portal",

    menuItems: [
      {
        name: "Dashboard",
        path: "/admin/dashboard"
      },
      {
        name: "Manage Users",
        path: "/admin/users"
      },
      {
        name: "Analytics",
        path: "/admin/analytics"
      },
      {
        name: "Settings",
        path: "/admin/settings"
      }
    ]
  },

  mentor: {
    title: "Faculty Mentor Portal",

    menuItems: [
      {
        name: "Dashboard",
        path: "/mentor/dashboard"
      },
      {
        name: "Assigned Students",
        path: "/mentor/students"
      },
      {
        name: "Weekly Diary",
        path: "/mentor/diary"
      },
      {
        name: "Evaluation",
        path: "/mentor/evaluation"
      }
    ]
  }

};

export default roleConfig;