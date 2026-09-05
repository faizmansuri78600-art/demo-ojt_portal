import { useMemo, useState } from "react";

import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  UserRoundCheck,
  UserRoundX,
  Users,
  UserCheck,
  Clock3,
  Building2,
  Mail,
  Phone,
  BriefcaseBusiness,
  ChevronRight,
  Check,
  X,
  ArrowRightLeft,
} from "lucide-react";

const initialMentors = [
  {
    id: 1,
    name: "Rajesh Kumar",
    initials: "RK",
    department: "Web Development",
    company: "Tech Solutions Inc.",
    email: "rajesh.kumar@techsolutions.com",
    phone: "+91 98765 42101",
    capacity: 8,
    assigned: 6,
    status: "Assigned",
    students: [
      "Aman Verma",
      "Riya Shah",
      "Aditya Patel",
      "Sneha Joshi",
      "Rahul Mehta",
      "Neha Singh",
    ],
  },
  {
    id: 2,
    name: "Priya Iyer",
    initials: "PI",
    department: "Data Analytics",
    company: "DataMind Pvt. Ltd.",
    email: "priya.iyer@datamind.com",
    phone: "+91 98765 42102",
    capacity: 8,
    assigned: 8,
    status: "Full",
    students: [
      "Karan Mehta",
      "Anjali Shah",
      "Vivek Patil",
      "Pooja Desai",
      "Arjun Rao",
      "Meera Nair",
      "Sahil Khan",
      "Nisha Patel",
    ],
  },
  {
    id: 3,
    name: "Amit Verma",
    initials: "AV",
    department: "UI/UX Design",
    company: "Creative Media",
    email: "amit.verma@creativemedia.com",
    phone: "+91 98765 42103",
    capacity: 10,
    assigned: 7,
    status: "Assigned",
    students: [
      "Ishita Shah",
      "Rohan Patil",
      "Tanvi Joshi",
      "Harsh Mehta",
      "Simran Rao",
      "Dev Shah",
      "Maya Patel",
    ],
  },
  {
    id: 4,
    name: "Vivek Singh",
    initials: "VS",
    department: "Cloud Computing",
    company: "CloudTech Solutions",
    email: "vivek.singh@cloudtech.com",
    phone: "+91 98765 42104",
    capacity: 8,
    assigned: 3,
    status: "Assigned",
    students: [
      "Mohit Verma",
      "Ayesha Khan",
      "Yash Patel",
    ],
  },
  {
    id: 5,
    name: "Neha Kapoor",
    initials: "NK",
    department: "Software Development",
    company: "Innovatech Labs",
    email: "neha.kapoor@innovatech.com",
    phone: "+91 98765 42105",
    capacity: 8,
    assigned: 0,
    status: "Unassigned",
    students: [],
  },
  {
    id: 6,
    name: "Sanjay Shah",
    initials: "SS",
    department: "Cyber Security",
    company: "SecureNet Pvt. Ltd.",
    email: "sanjay.shah@securenet.com",
    phone: "+91 98765 42106",
    capacity: 6,
    assigned: 4,
    status: "Assigned",
    students: [
      "Varun Shah",
      "Akash Patel",
      "Nitin Rao",
      "Mansi Mehta",
    ],
  },
  {
    id: 7,
    name: "Anjali Desai",
    initials: "AD",
    department: "Business Analytics",
    company: "Deloitte",
    email: "anjali.desai@deloitte.com",
    phone: "+91 98765 42107",
    capacity: 8,
    assigned: 5,
    status: "Assigned",
    students: [
      "Kunal Shah",
      "Priyanka Patil",
      "Siddharth Rao",
      "Komal Mehta",
      "Aarav Joshi",
    ],
  },
  {
    id: 8,
    name: "Rohan Kulkarni",
    initials: "RK",
    department: "Software Development",
    company: "HCLTech",
    email: "rohan.kulkarni@hcltech.com",
    phone: "+91 98765 42108",
    capacity: 8,
    assigned: 0,
    status: "Unassigned",
    students: [],
  },
];

const departments = [
  "All Departments",
  "Web Development",
  "Data Analytics",
  "UI/UX Design",
  "Cloud Computing",
  "Software Development",
  "Cyber Security",
  "Business Analytics",
];

const statuses = [
  "All Status",
  "Assigned",
  "Unassigned",
  "Full",
];

const students = [
  "Aman Verma",
  "Riya Shah",
  "Aditya Patel",
  "Sneha Joshi",
  "Rahul Mehta",
  "Neha Singh",
  "Karan Mehta",
  "Anjali Shah",
  "Vivek Patil",
  "Pooja Desai",
  "Arjun Rao",
  "Meera Nair",
  "Sahil Khan",
  "Nisha Patel",
  "Ishita Shah",
  "Rohan Patil",
  "Tanvi Joshi",
  "Harsh Mehta",
  "Simran Rao",
  "Dev Shah",
  "Maya Patel",
  "Mohit Verma",
  "Ayesha Khan",
  "Yash Patel",
  "Varun Shah",
  "Akash Patel",
  "Nitin Rao",
  "Mansi Mehta",
  "Kunal Shah",
  "Priyanka Patil",
  "Siddharth Rao",
  "Komal Mehta",
  "Aarav Joshi",
];

function StatusBadge({ status }) {
  const styles = {
    Assigned: {
      background: "#ecfdf5",
      color: "#059669",
    },
    Unassigned: {
      background: "#f8fafc",
      color: "#64748b",
    },
    Full: {
      background: "#fff7ed",
      color: "#d97706",
    },
  };

  const current =
    styles[status] || styles.Unassigned;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 9px",
        borderRadius: "999px",
        backgroundColor: current.background,
        color: current.color,
        fontSize: "10px",
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

function Modal({ children, onClose, width = "540px" }) {
  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: width,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "16px",
          backgroundColor: "#ffffff",
          boxShadow:
            "0 20px 50px rgba(15, 23, 42, 0.18)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({
  title,
  subtitle,
  onClose,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "15px",
        padding: "18px 20px",
        borderBottom: "1px solid #eef2f7",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#1e293b",
            fontSize: "17px",
            fontWeight: 750,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: "5px 0 0",
            color: "#94a3b8",
            fontSize: "11px",
          }}
        >
          {subtitle}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        style={{
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#f8fafc",
          color: "#64748b",
          cursor: "pointer",
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default function MentorAssignment() {
  const [mentors, setMentors] =
    useState(initialMentors);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [actionMentorId, setActionMentorId] =
    useState(null);

  const [viewMentor, setViewMentor] =
    useState(null);

  const [assignmentMentor, setAssignmentMentor] =
    useState(null);

  const [selectedStudent, setSelectedStudent] =
    useState("");

  const mentorsPerPage = 5;

  const filteredMentors = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    return mentors.filter((mentor) => {
      const matchesSearch =
        !search ||
        mentor.name
          .toLowerCase()
          .includes(search) ||
        mentor.company
          .toLowerCase()
          .includes(search) ||
        mentor.department
          .toLowerCase()
          .includes(search) ||
        mentor.email
          .toLowerCase()
          .includes(search);

      const matchesDepartment =
        selectedDepartment ===
          "All Departments" ||
        mentor.department ===
          selectedDepartment;

      const matchesStatus =
        selectedStatus === "All Status" ||
        mentor.status === selectedStatus;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    mentors,
    searchTerm,
    selectedDepartment,
    selectedStatus,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredMentors.length /
        mentorsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    mentorsPerPage;

  const paginatedMentors =
    filteredMentors.slice(
      startIndex,
      startIndex + mentorsPerPage
    );

  const totalMentors = mentors.length;

  const assignedMentors =
    mentors.filter(
      (mentor) =>
        mentor.assigned > 0
    ).length;

  const unassignedMentors =
    mentors.filter(
      (mentor) =>
        mentor.assigned === 0
    ).length;

  const totalCapacity =
    mentors.reduce(
      (total, mentor) =>
        total + mentor.capacity,
      0
    );

  const totalAssigned =
    mentors.reduce(
      (total, mentor) =>
        total + mentor.assigned,
      0
    );

  const totalUnassigned =
    Math.max(
      totalCapacity - totalAssigned,
      0
    );

  const assignmentPercentage =
    totalCapacity === 0
      ? 0
      : Math.round(
          (totalAssigned /
            totalCapacity) *
            100
        );

  const resetPage = () => {
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment(
      "All Departments"
    );
    setSelectedStatus("All Status");
    resetPage();
  };

  const availableStudents =
    students.filter((student) => {
      const alreadyAssigned =
        mentors.some((mentor) =>
          mentor.students.includes(
            student
          )
        );

      return !alreadyAssigned;
    });

  const handleAssignStudent = (
    event
  ) => {
    event.preventDefault();

    if (
      !assignmentMentor ||
      !selectedStudent
    ) {
      return;
    }

    setMentors((current) =>
      current.map((mentor) => {
        if (
          mentor.id !==
          assignmentMentor.id
        ) {
          return mentor;
        }

        if (
          mentor.assigned >=
          mentor.capacity
        ) {
          return mentor;
        }

        return {
          ...mentor,
          assigned:
            mentor.assigned + 1,
          status:
            mentor.assigned + 1 >=
            mentor.capacity
              ? "Full"
              : "Assigned",
          students: [
            ...mentor.students,
            selectedStudent,
          ],
        };
      })
    );

    setAssignmentMentor(null);
    setSelectedStudent("");
  };

  const handleUnassignStudent = (
    mentorId,
    studentName
  ) => {
    setMentors((current) =>
      current.map((mentor) => {
        if (mentor.id !== mentorId) {
          return mentor;
        }

        const newAssigned =
          Math.max(
            mentor.assigned - 1,
            0
          );

        return {
          ...mentor,
          assigned: newAssigned,
          status:
            newAssigned === 0
              ? "Unassigned"
              : "Assigned",
          students:
            mentor.students.filter(
              (student) =>
                student !==
                studentName
            ),
        };
      })
    );

    setViewMentor((current) => {
      if (
        !current ||
        current.id !== mentorId
      ) {
        return current;
      }

      const newAssigned =
        Math.max(
          current.assigned - 1,
          0
        );

      return {
        ...current,
        assigned: newAssigned,
        status:
          newAssigned === 0
            ? "Unassigned"
            : "Assigned",
        students:
          current.students.filter(
            (student) =>
              student !==
              studentName
          ),
      };
    });
  };

  const openAssignment = (
    mentor
  ) => {
    if (
      mentor.assigned >=
      mentor.capacity
    ) {
      return;
    }

    setAssignmentMentor(
      mentor
    );

    setSelectedStudent("");
    setActionMentorId(null);
  };

  return (
    <div
      style={{
        width: "100%",
        minWidth: 0,
        color: "#0f172a",
      }}
    >
      {/* =====================================================
          BREADCRUMB
      ====================================================== */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          marginBottom: "12px",
          fontSize: "12px",
        }}
      >
        <span
          style={{
            color: "#2563eb",
            fontWeight: 700,
          }}
        >
          Dashboard
        </span>

        <ChevronRight
          size={14}
          color="#cbd5e1"
        />

        <span
          style={{
            color: "#64748b",
          }}
        >
          Mentor Assignment
        </span>
      </div>

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div>
          <div
            style={{
              marginBottom: "6px",
              color: "#2563eb",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            OJT Management
          </div>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize:
                "clamp(26px, 3vw, 32px)",
              lineHeight: "1.1",
              fontWeight: 800,
              letterSpacing: "-0.8px",
            }}
          >
            Mentor Assignment
          </h1>

          <p
            style={{
              margin: "7px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Assign and manage OJT mentors
            for students.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const availableMentor =
              mentors.find(
                (mentor) =>
                  mentor.assigned <
                  mentor.capacity
              );

            if (availableMentor) {
              openAssignment(
                availableMentor
              );
            }
          }}
          style={{
            height: "42px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "0 15px",
            border: "none",
            borderRadius: "9px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow:
              "0 4px 10px rgba(37, 99, 235, 0.18)",
          }}
        >
          <Plus size={17} />
          Assign Student
        </button>
      </section>

      {/* =====================================================
          STATISTICS
      ====================================================== */}
      <section
        className="mentor-stat-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        {[
          {
            title: "Total Mentors",
            value: totalMentors,
            subtitle:
              "Registered OJT mentors",
            icon: Users,
            background: "#eff6ff",
            color: "#2563eb",
          },
          {
            title: "Assigned",
            value: assignedMentors,
            subtitle:
              "Mentors with students",
            icon: UserCheck,
            background: "#ecfdf5",
            color: "#059669",
          },
          {
            title: "Unassigned",
            value: unassignedMentors,
            subtitle:
              "Mentors without students",
            icon: UserRoundX,
            background: "#fff7ed",
            color: "#ea580c",
          },
          {
            title: "Assignment Rate",
            value: `${assignmentPercentage}%`,
            subtitle: `${totalUnassigned} available capacity`,
            icon: UserRoundCheck,
            background: "#f5f3ff",
            color: "#7c3aed",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              style={{
                minWidth: 0,
                padding: "16px",
                border:
                  "1px solid #e2e8f0",
                borderRadius: "13px",
                backgroundColor:
                  "#ffffff",
                boxShadow:
                  "0 2px 8px rgba(15, 23, 42, 0.035)",
              }}
            >
              <div
                style={{
                  width: "39px",
                  height: "39px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  borderRadius: "10px",
                  backgroundColor:
                    stat.background,
                  color: stat.color,
                }}
              >
                <Icon size={19} />
              </div>

              <div
                style={{
                  marginTop: "10px",
                  color: "#64748b",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                {stat.title}
              </div>

              <div
                style={{
                  marginTop: "4px",
                  color: "#0f172a",
                  fontSize: "25px",
                  lineHeight: "1",
                  fontWeight: 800,
                }}
              >
                {stat.value}
              </div>

              <div
                style={{
                  marginTop: "5px",
                  color: "#94a3b8",
                  fontSize: "9px",
                }}
              >
                {stat.subtitle}
              </div>
            </div>
          );
        })}
      </section>

      {/* =====================================================
          ASSIGNMENT PROGRESS
      ====================================================== */}
      <section
        style={{
          marginBottom: "18px",
          padding: "16px 18px",
          border:
            "1px solid #dbeafe",
          borderRadius: "13px",
          backgroundColor: "#eff6ff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: "15px",
            marginBottom: "9px",
          }}
        >
          <div>
            <strong
              style={{
                color: "#1e3a8a",
                fontSize: "12px",
              }}
            >
              Overall Mentor Allocation
            </strong>

            <div
              style={{
                marginTop: "3px",
                color: "#64748b",
                fontSize: "10px",
              }}
            >
              {totalAssigned} of{" "}
              {totalCapacity} mentor
              capacity currently assigned
            </div>
          </div>

          <strong
            style={{
              color: "#2563eb",
              fontSize: "16px",
            }}
          >
            {assignmentPercentage}%
          </strong>
        </div>

        <div
          style={{
            width: "100%",
            height: "8px",
            overflow: "hidden",
            borderRadius: "999px",
            backgroundColor: "#dbeafe",
          }}
        >
          <div
            style={{
              width: `${assignmentPercentage}%`,
              height: "100%",
              borderRadius: "999px",
              backgroundColor: "#2563eb",
              transition:
                "width 250ms ease",
            }}
          />
        </div>
      </section>

      {/* =====================================================
          MENTOR TABLE
      ====================================================== */}
      <section
        style={{
          width: "100%",
          minWidth: 0,
          overflow: "hidden",
          border:
            "1px solid #e2e8f0",
          borderRadius: "14px",
          backgroundColor: "#ffffff",
          boxShadow:
            "0 2px 8px rgba(15, 23, 42, 0.035)",
        }}
      >
        <div
          style={{
            padding: "15px 18px",
            borderBottom:
              "1px solid #eef2f7",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: "15px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#1e293b",
                  fontSize: "15px",
                  fontWeight: 750,
                }}
              >
                Mentor Allocation
              </h2>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#94a3b8",
                  fontSize: "10px",
                }}
              >
                Manage mentor and student
                assignments
              </p>
            </div>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "#64748b",
                fontSize: "10px",
              }}
            >
              <Clock3 size={13} />
              Live allocation
            </span>
          </div>

          {/* FILTERS */}
          <div
            className="mentor-filter-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(240px, 1fr) auto auto",
              gap: "9px",
              marginTop: "14px",
            }}
          >
            <div
              style={{
                height: "38px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor:
                  "#ffffff",
                boxSizing:
                  "border-box",
              }}
            >
              <Search
                size={16}
                color="#94a3b8"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(
                    event.target.value
                  );
                  resetPage();
                }}
                placeholder="Search mentor, company, department..."
                style={{
                  width: "100%",
                  minWidth: 0,
                  border: "none",
                  outline: "none",
                  background:
                    "transparent",
                  color: "#334155",
                  fontSize: "11px",
                }}
              />
            </div>

            <select
              value={selectedDepartment}
              onChange={(event) => {
                setSelectedDepartment(
                  event.target.value
                );
                resetPage();
              }}
              style={{
                height: "38px",
                padding: "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor:
                  "#ffffff",
                color: "#64748b",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {departments.map(
                (department) => (
                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>
                )
              )}
            </select>

            <select
              value={selectedStatus}
              onChange={(event) => {
                setSelectedStatus(
                  event.target.value
                );
                resetPage();
              }}
              style={{
                height: "38px",
                padding: "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius: "8px",
                backgroundColor:
                  "#ffffff",
                color: "#64748b",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {statuses.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* RESULT */}
        <div
          style={{
            padding:
              "10px 16px",
            backgroundColor:
              "#f8fafc",
            borderBottom:
              "1px solid #eef2f7",
            color: "#64748b",
            fontSize: "10px",
          }}
        >
          Showing{" "}
          <strong
            style={{
              color: "#334155",
            }}
          >
            {filteredMentors.length ===
            0
              ? 0
              : startIndex + 1}
            -
            {Math.min(
              startIndex +
                mentorsPerPage,
              filteredMentors.length
            )}
          </strong>{" "}
          of{" "}
          <strong
            style={{
              color: "#334155",
            }}
          >
            {filteredMentors.length}
          </strong>{" "}
          mentors
        </div>

        {/* TABLE */}
        <div
          style={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "950px",
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr>
                {[
                  "Mentor",
                  "Company",
                  "Department",
                  "Students",
                  "Capacity",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      padding:
                        "10px 13px",
                      backgroundColor:
                        "#f8fafc",
                      borderBottom:
                        "1px solid #e2e8f0",
                      color: "#94a3b8",
                      fontSize: "9px",
                      fontWeight: 750,
                      textAlign: "left",
                      textTransform:
                        "uppercase",
                      letterSpacing:
                        "0.45px",
                      whiteSpace:
                        "nowrap",
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedMentors.length >
              0 ? (
                paginatedMentors.map(
                  (mentor) => {
                    const percentage =
                      mentor.capacity ===
                      0
                        ? 0
                        : Math.round(
                            (mentor.assigned /
                              mentor.capacity) *
                              100
                          );

                    return (
                      <tr
                        key={
                          mentor.id
                        }
                      >
                        <td
                          style={{
                            padding:
                              "11px 13px",
                            borderBottom:
                              "1px solid #f1f5f9",
                          }}
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "9px",
                            }}
                          >
                            <div
                              style={{
                                width:
                                  "34px",
                                height:
                                  "34px",
                                minWidth:
                                  "34px",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                borderRadius:
                                  "9px",
                                backgroundColor:
                                  "#eff6ff",
                                color:
                                  "#2563eb",
                                fontSize:
                                  "9px",
                                fontWeight:
                                  800,
                              }}
                            >
                              {
                                mentor.initials
                              }
                            </div>

                            <div>
                              <strong
                                style={{
                                  display:
                                    "block",
                                  color:
                                    "#334155",
                                  fontSize:
                                    "11px",
                                  fontWeight:
                                    700,
                                  whiteSpace:
                                    "nowrap",
                                }}
                              >
                                {
                                  mentor.name
                                }
                              </strong>

                              <span
                                style={{
                                  display:
                                    "block",
                                  marginTop:
                                    "2px",
                                  color:
                                    "#94a3b8",
                                  fontSize:
                                    "9px",
                                }}
                              >
                                OJT Mentor
                              </span>
                            </div>
                          </div>
                        </td>

                        <td
                          style={{
                            padding:
                              "11px 13px",
                            borderBottom:
                              "1px solid #f1f5f9",
                            color:
                              "#64748b",
                            fontSize:
                              "10px",
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "5px",
                            }}
                          >
                            <Building2
                              size={
                                12
                              }
                              color="#94a3b8"
                            />

                            {
                              mentor.company
                            }
                          </div>
                        </td>

                        <td
                          style={{
                            padding:
                              "11px 13px",
                            borderBottom:
                              "1px solid #f1f5f9",
                            color:
                              "#64748b",
                            fontSize:
                              "10px",
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          {
                            mentor.department
                          }
                        </td>

                        <td
                          style={{
                            padding:
                              "11px 13px",
                            borderBottom:
                              "1px solid #f1f5f9",
                          }}
                        >
                          <strong
                            style={{
                              color:
                                "#334155",
                              fontSize:
                                "11px",
                            }}
                          >
                            {
                              mentor.assigned
                            }
                          </strong>

                          <div
                            style={{
                              width:
                                "55px",
                              height:
                                "4px",
                              marginTop:
                                "5px",
                              overflow:
                                "hidden",
                              borderRadius:
                                "999px",
                              backgroundColor:
                                "#e2e8f0",
                            }}
                          >
                            <div
                              style={{
                                width: `${percentage}%`,
                                height:
                                  "100%",
                                borderRadius:
                                  "999px",
                                backgroundColor:
                                  percentage >=
                                  100
                                    ? "#f59e0b"
                                    : "#2563eb",
                              }}
                            />
                          </div>
                        </td>

                        <td
                          style={{
                            padding:
                              "11px 13px",
                            borderBottom:
                              "1px solid #f1f5f9",
                            color:
                              "#64748b",
                            fontSize:
                              "10px",
                          }}
                        >
                          {
                            mentor.assigned
                          }{" "}
                          /{" "}
                          {
                            mentor.capacity
                          }
                        </td>

                        <td
                          style={{
                            padding:
                              "11px 13px",
                            borderBottom:
                              "1px solid #f1f5f9",
                          }}
                        >
                          <StatusBadge
                            status={
                              mentor.status
                            }
                          />
                        </td>

                        <td
                          style={{
                            position:
                              "relative",
                            padding:
                              "11px 13px",
                            borderBottom:
                              "1px solid #f1f5f9",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setActionMentorId(
                                actionMentorId ===
                                  mentor.id
                                  ? null
                                  : mentor.id
                              )
                            }
                            style={{
                              width:
                                "30px",
                              height:
                                "30px",
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              border:
                                "none",
                              borderRadius:
                                "7px",
                              backgroundColor:
                                "#f8fafc",
                              color:
                                "#64748b",
                              cursor:
                                "pointer",
                            }}
                          >
                            <MoreHorizontal
                              size={
                                16
                              }
                            />
                          </button>

                          {actionMentorId ===
                            mentor.id && (
                            <div
                              style={{
                                position:
                                  "absolute",
                                right:
                                  "13px",
                                top:
                                  "45px",
                                zIndex:
                                  20,
                                width:
                                  "175px",
                                padding:
                                  "5px",
                                border:
                                  "1px solid #e2e8f0",
                                borderRadius:
                                  "9px",
                                backgroundColor:
                                  "#ffffff",
                                boxShadow:
                                  "0 10px 25px rgba(15, 23, 42, 0.12)",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setViewMentor(
                                    mentor
                                  );
                                  setActionMentorId(
                                    null
                                  );
                                }}
                                className="mentor-action-button"
                              >
                                <Eye
                                  size={
                                    14
                                  }
                                />
                                View Mentor
                              </button>

                              {mentor.assigned <
                                mentor.capacity && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    openAssignment(
                                      mentor
                                    )
                                  }
                                  className="mentor-action-button mentor-action-success"
                                >
                                  <UserRoundCheck
                                    size={
                                      14
                                    }
                                  />
                                  Assign Student
                                </button>
                              )}

                              {mentor.assigned >
                                0 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setViewMentor(
                                      mentor
                                    )
                                  }
                                  className="mentor-action-button"
                                >
                                  <ArrowRightLeft
                                    size={
                                      14
                                    }
                                  />
                                  Manage Students
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      padding:
                        "50px 20px",
                      textAlign:
                        "center",
                      color:
                        "#94a3b8",
                      fontSize:
                        "11px",
                    }}
                  >
                    <Users
                      size={28}
                      color="#cbd5e1"
                      style={{
                        marginBottom:
                          "8px",
                      }}
                    />

                    <div>
                      No mentors found
                    </div>

                    <div
                      style={{
                        marginTop:
                          "4px",
                        fontSize:
                          "10px",
                      }}
                    >
                      Try changing your
                      search or filters.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div
          style={{
            minHeight: "58px",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: "12px",
            padding:
              "10px 16px",
            borderTop:
              "1px solid #eef2f7",
          }}
        >
          <span
            style={{
              color: "#94a3b8",
              fontSize: "10px",
            }}
          >
            Page {safeCurrentPage} of{" "}
            {totalPages}
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <button
              type="button"
              disabled={
                safeCurrentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.max(
                      1,
                      page - 1
                    )
                )
              }
              className="mentor-page-button"
            >
              ‹
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) =>
                index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() =>
                  setCurrentPage(
                    page
                  )
                }
                className={`mentor-page-button ${
                  safeCurrentPage ===
                  page
                    ? "mentor-page-active"
                    : ""
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={
                safeCurrentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.min(
                      totalPages,
                      page + 1
                    )
                )
              }
              className="mentor-page-button"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          VIEW MENTOR MODAL
      ====================================================== */}
      {viewMentor && (
        <Modal
          onClose={() =>
            setViewMentor(null)
          }
          width="560px"
        >
          <ModalHeader
            title="Mentor Details"
            subtitle="Mentor allocation and student details"
            onClose={() =>
              setViewMentor(null)
            }
          />

          <div
            style={{
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "13px",
                padding: "14px",
                borderRadius: "11px",
                backgroundColor:
                  "#f8fafc",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  borderRadius: "12px",
                  backgroundColor:
                    "#eff6ff",
                  color: "#2563eb",
                  fontSize: "13px",
                  fontWeight: 800,
                }}
              >
                {
                  viewMentor.initials
                }
              </div>

              <div
                style={{
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#1e293b",
                    fontSize: "16px",
                    fontWeight: 750,
                  }}
                >
                  {viewMentor.name}
                </h3>

                <div
                  style={{
                    marginTop: "5px",
                    color: "#64748b",
                    fontSize: "10px",
                  }}
                >
                  {viewMentor.department}
                </div>
              </div>

              <StatusBadge
                status={
                  viewMentor.status
                }
              />
            </div>

            <div
              className="mentor-detail-grid"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              {[
                {
                  icon: Building2,
                  label: "Company",
                  value:
                    viewMentor.company,
                },
                {
                  icon: BriefcaseBusiness,
                  label: "Department",
                  value:
                    viewMentor.department,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value:
                    viewMentor.email,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value:
                    viewMentor.phone,
                },
                {
                  icon: Users,
                  label: "Assigned Students",
                  value:
                    `${viewMentor.assigned} / ${viewMentor.capacity}`,
                },
                {
                  icon: UserCheck,
                  label: "Available Capacity",
                  value:
                    Math.max(
                      viewMentor.capacity -
                        viewMentor.assigned,
                      0
                    ),
                },
              ].map(
                ({
                  icon: Icon,
                  label,
                  value,
                }) => (
                  <div
                    key={label}
                    style={{
                      padding:
                        "12px",
                      border:
                        "1px solid #edf2f7",
                      borderRadius:
                        "10px",
                    }}
                  >
                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: "7px",
                        color:
                          "#94a3b8",
                        fontSize:
                          "9px",
                        fontWeight:
                          700,
                        textTransform:
                          "uppercase",
                      }}
                    >
                      <Icon
                        size={13}
                      />
                      {label}
                    </div>

                    <div
                      style={{
                        marginTop:
                          "6px",
                        color:
                          "#334155",
                        fontSize:
                          "11px",
                        fontWeight:
                          650,
                        wordBreak:
                          "break-word",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                )
              )}
            </div>

            <div
              style={{
                marginTop: "17px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  marginBottom:
                    "8px",
                }}
              >
                <strong
                  style={{
                    color:
                      "#334155",
                    fontSize:
                      "11px",
                  }}
                >
                  Assigned Students
                </strong>

                <span
                  style={{
                    color:
                      "#94a3b8",
                    fontSize:
                      "9px",
                  }}
                >
                  {viewMentor.students.length}{" "}
                  students
                </span>
              </div>

              {viewMentor.students.length >
              0 ? (
                <div
                  style={{
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    gap: "6px",
                  }}
                >
                  {viewMentor.students.map(
                    (student) => (
                      <div
                        key={student}
                        style={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "space-between",
                          gap: "10px",
                          padding:
                            "8px 10px",
                          border:
                            "1px solid #edf2f7",
                          borderRadius:
                            "8px",
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width:
                                "26px",
                              height:
                                "26px",
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              borderRadius:
                                "50%",
                              backgroundColor:
                                "#eff6ff",
                              color:
                                "#2563eb",
                              fontSize:
                                "8px",
                              fontWeight:
                                800,
                            }}
                          >
                            {student
                              .split(
                                " "
                              )
                              .map(
                                (
                                  word
                                ) =>
                                  word[0]
                              )
                              .join(
                                ""
                              )
                              .slice(
                                0,
                                2
                              )}
                          </div>

                          <span
                            style={{
                              color:
                                "#475569",
                              fontSize:
                                "10px",
                              fontWeight:
                                600,
                            }}
                          >
                            {student}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleUnassignStudent(
                              viewMentor.id,
                              student
                            )
                          }
                          style={{
                            width:
                              "26px",
                            height:
                              "26px",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            border:
                              "none",
                            borderRadius:
                              "6px",
                            backgroundColor:
                              "#fef2f2",
                            color:
                              "#dc2626",
                            cursor:
                              "pointer",
                          }}
                          title="Unassign student"
                        >
                          <X
                            size={
                              13
                            }
                          />
                        </button>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div
                  style={{
                    padding:
                      "20px",
                    border:
                      "1px dashed #dbe4ee",
                    borderRadius:
                      "9px",
                    textAlign:
                      "center",
                    color:
                      "#94a3b8",
                    fontSize:
                      "10px",
                  }}
                >
                  No students assigned
                  yet.
                </div>
              )}
            </div>

            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "flex-end",
                gap: "8px",
                marginTop:
                  "18px",
              }}
            >
              {viewMentor.assigned <
                viewMentor.capacity && (
                <button
                  type="button"
                  onClick={() =>
                    openAssignment(
                      viewMentor
                    )
                  }
                  style={{
                    height:
                      "36px",
                    display:
                      "inline-flex",
                    alignItems:
                      "center",
                    gap: "6px",
                    padding:
                      "0 13px",
                    border:
                      "none",
                    borderRadius:
                      "8px",
                    backgroundColor:
                      "#2563eb",
                    color:
                      "#ffffff",
                    fontSize:
                      "10px",
                    fontWeight:
                      700,
                    cursor:
                      "pointer",
                  }}
                >
                  <Plus
                    size={13}
                  />
                  Assign Student
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  setViewMentor(
                    null
                  )
                }
                style={{
                  height: "36px",
                  padding:
                    "0 15px",
                  border:
                    "1px solid #dbe4ee",
                  borderRadius:
                    "8px",
                  backgroundColor:
                    "#ffffff",
                  color:
                    "#475569",
                  fontSize:
                    "10px",
                  fontWeight:
                    700,
                  cursor:
                    "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* =====================================================
          ASSIGN STUDENT MODAL
      ====================================================== */}
      {assignmentMentor && (
        <Modal
          onClose={() => {
            setAssignmentMentor(
              null
            );
            setSelectedStudent(
              ""
            );
          }}
          width="470px"
        >
          <ModalHeader
            title="Assign Student"
            subtitle={`Assign a student to ${assignmentMentor.name}`}
            onClose={() => {
              setAssignmentMentor(
                null
              );
              setSelectedStudent(
                ""
              );
            }}
          />

          <form
            onSubmit={
              handleAssignStudent
            }
            style={{
              padding: "20px",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: "10px",
                marginBottom:
                  "16px",
                padding:
                  "12px",
                borderRadius:
                  "9px",
                backgroundColor:
                  "#eff6ff",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  borderRadius:
                    "9px",
                  backgroundColor:
                    "#ffffff",
                  color:
                    "#2563eb",
                  fontSize:
                    "10px",
                  fontWeight:
                    800,
                }}
              >
                {
                  assignmentMentor.initials
                }
              </div>

              <div>
                <strong
                  style={{
                    display:
                      "block",
                    color:
                      "#334155",
                    fontSize:
                      "11px",
                  }}
                >
                  {
                    assignmentMentor.name
                  }
                </strong>

                <span
                  style={{
                    display:
                      "block",
                    marginTop:
                      "3px",
                    color:
                      "#64748b",
                    fontSize:
                      "9px",
                  }}
                >
                  {assignmentMentor.assigned}{" "}
                  /{" "}
                  {
                    assignmentMentor.capacity
                  }{" "}
                  students assigned
                </span>
              </div>
            </div>

            <label
              style={{
                display:
                  "block",
                marginBottom:
                  "6px",
                color:
                  "#475569",
                fontSize:
                  "10px",
                fontWeight:
                  700,
              }}
            >
              Select Student
            </label>

            <select
              required
              value={
                selectedStudent
              }
              onChange={(event) =>
                setSelectedStudent(
                  event.target
                    .value
                )
              }
              style={{
                width:
                  "100%",
                height:
                  "40px",
                padding:
                  "0 11px",
                border:
                  "1px solid #dbe4ee",
                borderRadius:
                  "8px",
                backgroundColor:
                  "#ffffff",
                color:
                  "#334155",
                fontSize:
                  "11px",
                outline:
                  "none",
              }}
            >
              <option value="">
                Choose a student
              </option>

              {availableStudents.map(
                (student) => (
                  <option
                    key={
                      student
                    }
                    value={
                      student
                    }
                  >
                    {student}
                  </option>
                )
              )}
            </select>

            {availableStudents.length ===
              0 && (
              <p
                style={{
                  margin:
                    "8px 0 0",
                  color:
                    "#dc2626",
                  fontSize:
                    "10px",
                }}
              >
                All students are
                currently assigned.
              </p>
            )}

            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "flex-end",
                gap: "8px",
                marginTop:
                  "20px",
                paddingTop:
                  "15px",
                borderTop:
                  "1px solid #eef2f7",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setAssignmentMentor(
                    null
                  );
                  setSelectedStudent(
                    ""
                  );
                }}
                style={{
                  height:
                    "37px",
                  padding:
                    "0 14px",
                  border:
                    "1px solid #dbe4ee",
                  borderRadius:
                    "8px",
                  backgroundColor:
                    "#ffffff",
                  color:
                    "#64748b",
                  fontSize:
                    "10px",
                  fontWeight:
                    700,
                  cursor:
                    "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  !selectedStudent
                }
                style={{
                  height:
                    "37px",
                  padding:
                    "0 15px",
                  border:
                    "none",
                  borderRadius:
                    "8px",
                  backgroundColor:
                    selectedStudent
                      ? "#2563eb"
                      : "#cbd5e1",
                  color:
                    "#ffffff",
                  fontSize:
                    "10px",
                  fontWeight:
                    700,
                  cursor:
                    selectedStudent
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                Assign Student
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* =====================================================
          STYLES
      ====================================================== */}
      <style>
        {`
          .mentor-action-button {
            width: 100%;
            height: 32px;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 0 9px;
            border: none;
            border-radius: 6px;
            background: transparent;
            color: #475569;
            font-size: 10px;
            font-weight: 600;
            text-align: left;
            cursor: pointer;
          }

          .mentor-action-button:hover {
            background: #f8fafc;
          }

          .mentor-action-success {
            color: #059669;
          }

          .mentor-action-success:hover {
            background: #ecfdf5;
          }

          .mentor-page-button {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #e2e8f0;
            border-radius: 7px;
            background: #ffffff;
            color: #64748b;
            font-size: 10px;
            font-weight: 600;
            cursor: pointer;
          }

          .mentor-page-button:hover:not(:disabled) {
            border-color: #bfdbfe;
            background: #eff6ff;
            color: #2563eb;
          }

          .mentor-page-button:disabled {
            color: #cbd5e1;
            cursor: not-allowed;
            background: #f8fafc;
          }

          .mentor-page-active {
            border-color: #2563eb;
            background: #2563eb;
            color: #ffffff;
          }

          @media (max-width: 1000px) {
            .mentor-stat-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 700px) {
            .mentor-stat-grid {
              grid-template-columns: 1fr !important;
            }

            .mentor-filter-grid {
              grid-template-columns: 1fr !important;
            }

            .mentor-detail-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}