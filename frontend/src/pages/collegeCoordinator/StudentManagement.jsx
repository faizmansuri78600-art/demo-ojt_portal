import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Search,
  Plus,
  RefreshCw,
  GraduationCap,
  CheckCircle2,
  Clock3,
  Pencil,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  UserCheck,
  Users,
  BookOpen,
} from "lucide-react";
import {
  useSearchParams,
} from "react-router-dom";

import { collegeCoordinatorService } from "../../services/collegeCoordinatorService";
import { useCoordinatorTheme } from "../../context/CoordinatorThemeContext";

const STUDENTS_PER_PAGE = 7;

const STATUS_OPTIONS = [
  "All Status",
  "Verified",
  "Pending",
];

const EMPTY_FORM = {
  studentId: "",
  rollNumber: "",
  name: "",
  department: "",
  cgpa: "",
  profilePhotoUrl: "",
  resumeUrl: "",
  isVerified: false,
};

const getStudentId = (student) =>
  String(
    student?._id ??
      student?.studentId ??
      student?.id ??
      ""
  );

const getStudentName = (student) =>
  String(
    student?.name ??
      student?.fullName ??
      student?.full_name ??
      "Unnamed Student"
  );

const getRollNumber = (student) =>
  String(
    student?.rollNumber ??
      student?.rollNo ??
      student?.roll_number ??
      ""
  );

const getDepartment = (student) =>
  String(
    student?.department ??
      student?.course ??
      ""
  );

const getCgpa = (student) => {
  const value =
    student?.cgpa === null ||
    student?.cgpa === undefined ||
    student?.cgpa === ""
      ? null
      : Number(student.cgpa);

  return Number.isFinite(value)
    ? value
    : null;
};

const getProfilePhoto = (student) =>
  String(
    student?.profilePhotoUrl ??
      student?.profilePhoto ??
      student?.profile_photo_url ??
      ""
  );

const getResumeUrl = (student) =>
  String(
    student?.resumeUrl ??
      student?.resumeURL ??
      student?.resume_url ??
      ""
  );

const isStudentVerified = (student) =>
  Boolean(
    student?.isVerified ??
      student?.verified ??
      false
  );

function StatusBadge({
  verified,
  colors,
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 9px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        background: verified
          ? colors.successSoft
          : colors.warningSoft,
        color: verified
          ? colors.success
          : colors.warning,
        border: `1px solid ${
          verified
            ? `${colors.success}25`
            : `${colors.warning}25`
        }`,
      }}
    >
      {verified ? (
        <CheckCircle2 size={13} />
      ) : (
        <Clock3 size={13} />
      )}

      {verified ? "Verified" : "Pending"}
    </span>
  );
}

/*
=========================================================
STUDENT AVATAR

Important:
- Shows profile photo when it loads correctly.
- If photo URL is empty, shows GraduationCap.
- If photo URL is broken, shows GraduationCap.
- The fallback icon is rendered by React, not hidden behind
  a failed <img>.
=========================================================
*/
function StudentAvatar({
  student,
  colors,
  size = 42,
}) {
  const photo = getProfilePhoto(student);

  const [imageError, setImageError] =
    useState(false);

  useEffect(() => {
    setImageError(false);
  }, [photo]);

  const showPhoto =
    Boolean(photo) && !imageError;

  return (
    <div
      className="student-avatar"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.primarySoft,
        color: colors.primary,
        border: `1px solid ${colors.primary}45`,
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      {showPhoto ? (
        <img
          src={photo}
          alt={getStudentName(student)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={() => {
            setImageError(true);
          }}
        />
      ) : (
        <GraduationCap
          size={size >= 55 ? 24 : 20}
          strokeWidth={2.2}
          color={colors.primary}
        />
      )}
    </div>
  );
}

function Modal({
  children,
  title,
  subtitle,
  onClose,
  colors,
  maxWidth = 620,
}) {
  return (
    <div
      className="student-modal-overlay"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background:
          "rgba(15, 23, 42, 0.55)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="student-modal"
        style={{
          width: "100%",
          maxWidth,
          maxHeight:
            "calc(100vh - 40px)",
          overflowY: "auto",
          background: colors.surface,
          color: colors.text,
          border:
            `1px solid ${colors.border}`,
          borderRadius: "16px",
          boxShadow:
            "0 24px 70px rgba(15, 23, 42, 0.22)",
        }}
      >
        <div
          style={{
            padding:
              "20px 22px",
            borderBottom:
              `1px solid ${colors.border}`,
            display: "flex",
            alignItems: "flex-start",
            justifyContent:
              "space-between",
            gap: "16px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                lineHeight: 1.35,
                fontWeight: 700,
                color: colors.text,
              }}
            >
              {title}
            </h2>

            {subtitle && (
              <p
                style={{
                  margin:
                    "5px 0 0",
                  fontSize: "13px",
                  lineHeight: 1.5,
                  color:
                    colors.textSecondary,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 34,
              height: 34,
              border:
                `1px solid ${colors.border}`,
              background:
                colors.surfaceMuted,
              color:
                colors.textSecondary,
              borderRadius: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <X size={17} />
          </button>
        </div>

        <div
          style={{
            padding: "22px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default function StudentManagement() {
  const { colors } =
    useCoordinatorTheme();

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [
    departmentFilter,
    setDepartmentFilter,
  ] = useState(
    searchParams.get(
      "department"
    ) || "All Departments"
  );

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All Status");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [
    selectedStudent,
    setSelectedStudent,
  ] = useState(null);

  const [
    editingStudent,
    setEditingStudent,
  ] = useState(null);

  const [
    showFormModal,
    setShowFormModal,
  ] = useState(false);

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState(EMPTY_FORM);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const loadStudents = async (
    showLoader = true
  ) => {
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      const response =
        await collegeCoordinatorService.getStudents();

      let data = [];

      if (Array.isArray(response)) {
        data = response;
      } else if (
        Array.isArray(
          response?.students
        )
      ) {
        data = response.students;
      } else if (
        Array.isArray(
          response?.data
        )
      ) {
        data = response.data;
      } else if (
        Array.isArray(
          response?.data?.students
        )
      ) {
        data =
          response.data.students;
      }

      setStudents(data);
    } catch (err) {
      console.error(
        "Failed to load students:",
        err
      );

      setError(
        err?.message ||
          "Unable to load students. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStudents(true);
  }, []);

  useEffect(() => {
    const departmentFromUrl =
      searchParams.get(
        "department"
      );

    if (departmentFromUrl) {
      setDepartmentFilter(
        departmentFromUrl
      );
    } else {
      setDepartmentFilter(
        "All Departments"
      );
    }

    setCurrentPage(1);
  }, [searchParams]);

  const departments = useMemo(() => {
    const values = students
      .map(getDepartment)
      .map((value) =>
        value.trim()
      )
      .filter(Boolean);

    return [
      "All Departments",
      ...Array.from(
        new Set(values)
      ).sort((a, b) =>
        a.localeCompare(b)
      ),
    ];
  }, [students]);

  const filteredStudents =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      return students.filter(
        (student) => {
          const id =
            getStudentId(
              student
            ).toLowerCase();

          const name =
            getStudentName(
              student
            ).toLowerCase();

          const roll =
            getRollNumber(
              student
            ).toLowerCase();

          const department =
            getDepartment(
              student
            ).toLowerCase();

          const matchesSearch =
            !searchValue ||
            id.includes(
              searchValue
            ) ||
            name.includes(
              searchValue
            ) ||
            roll.includes(
              searchValue
            ) ||
            department.includes(
              searchValue
            );

          const matchesDepartment =
            departmentFilter ===
              "All Departments" ||
            getDepartment(
              student
            ) ===
              departmentFilter;

          const verified =
            isStudentVerified(
              student
            );

          const matchesStatus =
            statusFilter ===
              "All Status" ||
            (statusFilter ===
              "Verified" &&
              verified) ||
            (statusFilter ===
              "Pending" &&
              !verified);

          return (
            matchesSearch &&
            matchesDepartment &&
            matchesStatus
          );
        }
      );
    }, [
      students,
      search,
      departmentFilter,
      statusFilter,
    ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length /
        STUDENTS_PER_PAGE
    )
  );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const paginatedStudents =
    filteredStudents.slice(
      (safeCurrentPage - 1) *
        STUDENTS_PER_PAGE,
      safeCurrentPage *
        STUDENTS_PER_PAGE
    );

  const verifiedCount =
    useMemo(
      () =>
        students.filter(
          isStudentVerified
        ).length,
      [students]
    );

  const pendingCount =
    students.length -
    verifiedCount;

  const departmentCount =
    useMemo(
      () =>
        new Set(
          students
            .map(
              getDepartment
            )
            .filter(Boolean)
        ).size,
      [students]
    );

  const openAddModal = () => {
    setEditingStudent(null);

    setFormData({
      ...EMPTY_FORM,
      department:
        departmentFilter !==
        "All Departments"
          ? departmentFilter
          : "",
    });

    setError("");
    setShowFormModal(true);
  };

  const openEditModal = (
    student
  ) => {
    setEditingStudent(student);

    setFormData({
      studentId:
        getStudentId(student),

      rollNumber:
        getRollNumber(student),

      name:
        getStudentName(student),

      department:
        getDepartment(student),

      cgpa:
        getCgpa(student) !==
        null
          ? String(
              getCgpa(student)
            )
          : "",

      profilePhotoUrl:
        getProfilePhoto(
          student
        ),

      resumeUrl:
        getResumeUrl(student),

      isVerified:
        isStudentVerified(
          student
        ),
    });

    setSelectedStudent(null);
    setError("");
    setShowFormModal(true);
  };

  const closeFormModal = () => {
    if (submitting) {
      return;
    }

    setShowFormModal(false);
    setEditingStudent(null);
    setFormData(EMPTY_FORM);
  };

  const handleFormChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData(
      (current) => ({
        ...current,
        [name]:
          type ===
          "checkbox"
            ? checked
            : value,
      })
    );
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const studentId =
      formData.studentId.trim();

    const rollNumber =
      formData.rollNumber.trim();

    const name =
      formData.name.trim();

    const department =
      formData.department.trim();

    if (!studentId) {
      setError(
        "Student ID is required."
      );
      return;
    }

    if (!rollNumber) {
      setError(
        "Roll number is required."
      );
      return;
    }

    if (!name) {
      setError(
        "Student name is required."
      );
      return;
    }

    if (!department) {
      setError(
        "Department is required."
      );
      return;
    }

    if (
      formData.cgpa !==
        "" &&
      (
        Number.isNaN(
          Number(
            formData.cgpa
          )
        ) ||
        Number(
          formData.cgpa
        ) < 0 ||
        Number(
          formData.cgpa
        ) > 10
      )
    ) {
      setError(
        "CGPA must be between 0 and 10."
      );
      return;
    }

    const payload = {
      _id: studentId,

      studentId,

      rollNumber,

      name,

      department,

      cgpa:
        formData.cgpa === ""
          ? 0
          : Number(
              formData.cgpa
            ),

      profilePhotoUrl:
        formData.profilePhotoUrl.trim(),

      resumeUrl:
        formData.resumeUrl.trim(),

      isVerified:
        Boolean(
          formData.isVerified
        ),
    };

    try {
      setSubmitting(true);
      setError("");

      if (editingStudent) {
        await collegeCoordinatorService.updateStudent(
          getStudentId(
            editingStudent
          ),
          payload
        );
      } else {
        await collegeCoordinatorService.addStudent(
          payload
        );
      }

      await loadStudents(
        false
      );

      setShowFormModal(false);
      setEditingStudent(null);
      setFormData(EMPTY_FORM);
    } catch (err) {
      console.error(
        "Failed to save student:",
        err
      );

      setError(
        err?.message ||
          (editingStudent
            ? "Unable to update student."
            : "Unable to add student.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteModal = (
    student
  ) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }

    setShowDeleteModal(false);
    setSelectedStudent(null);
  };

  const handleDelete =
    async () => {
      if (!selectedStudent) {
        return;
      }

      try {
        setDeleting(true);
        setError("");

        await collegeCoordinatorService.deleteStudent(
          getStudentId(
            selectedStudent
          )
        );

        await loadStudents(
          false
        );

        setShowDeleteModal(false);
        setSelectedStudent(null);

        if (
          safeCurrentPage >
            1 &&
          paginatedStudents.length ===
            1
        ) {
          setCurrentPage(
            safeCurrentPage - 1
          );
        }
      } catch (err) {
        console.error(
          "Failed to delete student:",
          err
        );

        setError(
          err?.message ||
            "Unable to delete student."
        );
      } finally {
        setDeleting(false);
      }
    };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter(
      "All Status"
    );
    setDepartmentFilter(
      "All Departments"
    );
    setCurrentPage(1);

    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.delete(
      "department"
    );

    setSearchParams(
      nextParams
    );
  };

  const changeDepartment = (
    value
  ) => {
    setDepartmentFilter(value);
    setCurrentPage(1);

    const nextParams =
      new URLSearchParams(
        searchParams
      );

    if (
      value ===
      "All Departments"
    ) {
      nextParams.delete(
        "department"
      );
    } else {
      nextParams.set(
        "department",
        value
      );
    }

    setSearchParams(
      nextParams
    );
  };

  return (
    <div
      className="student-management-page"
      style={{
        width: "100%",
        minHeight: "100%",
        boxSizing: "border-box",
        padding:
          "26px 28px 34px",
        background:
          colors.workspace,
        color: colors.text,
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        .student-management-page *,
        .student-management-page *::before,
        .student-management-page *::after {
          box-sizing: border-box;
        }

        .student-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .student-breadcrumb {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 7px;
          font-size: 13px;
          color: ${colors.textMuted};
        }

        .student-page-title {
          margin: 0;
          font-size: 28px;
          line-height: 1.25;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: ${colors.text};
        }

        .student-page-description {
          margin: 7px 0 0;
          font-size: 14px;
          line-height: 1.5;
          color: ${colors.textSecondary};
        }

        .student-primary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 40px;
          padding: 0 15px;
          border: 0;
          border-radius: 9px;
          background: ${colors.primary};
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          box-shadow: 0 2px 6px ${colors.primary}22;
          transition: 0.18s ease;
          white-space: nowrap;
        }

        .student-primary-button:hover {
          background: ${colors.primaryHover};
          transform: translateY(-1px);
        }

        .student-primary-button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none;
        }

        .student-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 20px;
        }

        .student-stat-card {
          min-width: 0;
          padding: 17px;
          border: 1px solid ${colors.border};
          border-radius: 12px;
          background: ${colors.surface};
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.045);
        }

        .student-stat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .student-stat-icon {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }

        .student-stat-label {
          margin: 0 0 5px;
          font-size: 12px;
          font-weight: 600;
          color: ${colors.textSecondary};
        }

        .student-stat-value {
          margin: 0;
          font-size: 26px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: ${colors.text};
        }

        .student-directory-card {
          overflow: hidden;
          border: 1px solid ${colors.border};
          border-radius: 14px;
          background: ${colors.surface};
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.045);
        }

        .student-directory-header {
          padding: 19px 20px;
          border-bottom: 1px solid ${colors.border};
        }

        .student-section-heading {
          margin: 0;
          font-size: 17px;
          line-height: 1.35;
          font-weight: 700;
          color: ${colors.text};
        }

        .student-section-description {
          margin: 4px 0 0;
          font-size: 12px;
          line-height: 1.5;
          color: ${colors.textSecondary};
        }

        .student-filter-row {
          display: grid;
          grid-template-columns: minmax(230px, 1.6fr) minmax(170px, 0.8fr) minmax(150px, 0.7fr) auto;
          gap: 10px;
          margin-top: 16px;
        }

        .student-search-wrapper {
          position: relative;
        }

        .student-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: ${colors.textMuted};
          pointer-events: none;
        }

        .student-input,
        .student-select {
          width: 100%;
          min-height: 40px;
          padding: 0 12px;
          border: 1px solid ${colors.border};
          border-radius: 9px;
          outline: none;
          background: ${colors.surface};
          color: ${colors.text};
          font-family: inherit;
          font-size: 14px;
          transition: border-color 0.16s ease, box-shadow 0.16s ease;
        }

        .student-input:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          background: ${colors.surfaceMuted};
        }

        .student-search-wrapper .student-input {
          padding-left: 38px;
        }

        .student-input::placeholder {
          color: ${colors.textMuted};
        }

        .student-input:focus,
        .student-select:focus {
          border-color: ${colors.primary};
          box-shadow: 0 0 0 3px ${colors.primary}18;
        }

        .student-secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 40px;
          padding: 0 13px;
          border: 1px solid ${colors.border};
          border-radius: 9px;
          background: ${colors.surfaceMuted};
          color: ${colors.textSecondary};
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .student-secondary-button:hover {
          background: ${colors.primarySoft};
          color: ${colors.primary};
          border-color: ${colors.primary}45;
        }

        .student-secondary-button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .student-table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .student-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 760px;
        }

        .student-table th {
          padding: 11px 16px;
          text-align: left;
          border-bottom: 1px solid ${colors.border};
          background: ${colors.surfaceMuted};
          color: ${colors.textSecondary};
          font-size: 12px;
          line-height: 1.4;
          font-weight: 700;
          white-space: nowrap;
        }

        .student-table td {
          padding: 13px 16px;
          border-bottom: 1px solid ${colors.borderLight};
          color: ${colors.text};
          font-size: 14px;
          line-height: 1.45;
          vertical-align: middle;
        }

        .student-table tbody tr {
          transition: background 0.15s ease;
          cursor: pointer;
        }

        .student-table tbody tr:hover {
          background: ${colors.primarySoft}55;
        }

        .student-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .student-name-cell {
          display: flex;
          align-items: center;
          gap: 11px;
          min-width: 220px;
        }

        .student-name {
          margin: 0;
          font-size: 14px;
          line-height: 1.35;
          font-weight: 600;
          color: ${colors.text};
        }

        .student-id-small {
          margin-top: 3px;
          font-size: 12px;
          color: ${colors.textMuted};
        }

        .student-department {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: ${colors.textSecondary};
        }

        .student-action-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
        }

        .student-icon-button {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid ${colors.border};
          border-radius: 8px;
          background: ${colors.surface};
          color: ${colors.textSecondary};
          cursor: pointer;
        }

        .student-icon-button:hover {
          color: ${colors.primary};
          border-color: ${colors.primary}55;
          background: ${colors.primarySoft};
        }

        .student-icon-button.danger:hover {
          color: ${colors.danger};
          border-color: ${colors.danger}55;
          background: ${colors.dangerSoft};
        }

        .student-pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 14px 16px;
          border-top: 1px solid ${colors.border};
        }

        .student-pagination-info {
          font-size: 12px;
          color: ${colors.textSecondary};
        }

        .student-pagination-controls {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .student-page-button {
          min-width: 32px;
          height: 32px;
          padding: 0 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid ${colors.border};
          border-radius: 7px;
          background: ${colors.surface};
          color: ${colors.textSecondary};
          font-family: inherit;
          font-size: 12px;
          cursor: pointer;
        }

        .student-page-button:hover:not(:disabled) {
          border-color: ${colors.primary}55;
          color: ${colors.primary};
          background: ${colors.primarySoft};
        }

        .student-page-button.active {
          border-color: ${colors.primary};
          background: ${colors.primary};
          color: #ffffff;
        }

        .student-page-button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .student-state {
          padding: 55px 20px;
          text-align: center;
        }

        .student-state-icon {
          width: 44px;
          height: 44px;
          margin: 0 auto 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: ${colors.primarySoft};
          color: ${colors.primary};
        }

        .student-state-title {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
          color: ${colors.text};
        }

        .student-state-text {
          max-width: 430px;
          margin: 6px auto 0;
          font-size: 13px;
          line-height: 1.55;
          color: ${colors.textSecondary};
        }

        .student-error-banner {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 16px;
          padding: 12px 14px;
          border: 1px solid ${colors.danger}30;
          border-radius: 10px;
          background: ${colors.dangerSoft};
          color: ${colors.danger};
          font-size: 13px;
          line-height: 1.5;
        }

        .student-error-banner strong {
          display: block;
          margin-bottom: 2px;
          font-weight: 700;
        }

        .student-detail-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border: 1px solid ${colors.border};
          border-radius: 12px;
          background: ${colors.surfaceMuted};
          margin-bottom: 18px;
        }

        .student-detail-name {
          margin: 0;
          font-size: 19px;
          font-weight: 700;
          color: ${colors.text};
        }

        .student-detail-subtitle {
          margin: 4px 0 0;
          font-size: 13px;
          color: ${colors.textSecondary};
        }

        .student-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .student-detail-item {
          padding: 12px;
          border: 1px solid ${colors.border};
          border-radius: 10px;
          background: ${colors.surface};
        }

        .student-detail-label {
          margin-bottom: 4px;
          font-size: 11px;
          font-weight: 600;
          color: ${colors.textMuted};
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .student-detail-value {
          font-size: 13px;
          font-weight: 600;
          color: ${colors.text};
          overflow-wrap: anywhere;
        }

        .student-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .student-form-field {
          min-width: 0;
        }

        .student-form-field.full {
          grid-column: 1 / -1;
        }

        .student-form-label {
          display: block;
          margin-bottom: 6px;
          font-size: 13px;
          font-weight: 600;
          color: ${colors.text};
        }

        .student-form-label span {
          color: ${colors.danger};
        }

        .student-form-help {
          margin-top: 5px;
          font-size: 12px;
          color: ${colors.textMuted};
        }

        .student-checkbox-row {
          min-height: 40px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 11px;
          border: 1px solid ${colors.border};
          border-radius: 9px;
          background: ${colors.surface};
        }

        .student-checkbox-row input {
          width: 16px;
          height: 16px;
          accent-color: ${colors.primary};
        }

        .student-checkbox-row label {
          font-size: 13px;
          color: ${colors.text};
          cursor: pointer;
        }

        .student-modal-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 9px;
          margin-top: 22px;
          padding-top: 17px;
          border-top: 1px solid ${colors.border};
        }

        .student-danger-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 40px;
          padding: 0 15px;
          border: 0;
          border-radius: 9px;
          background: ${colors.danger};
          color: #ffffff;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .student-danger-button:hover {
          opacity: 0.92;
        }

        .student-danger-button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .student-delete-content {
          text-align: center;
          padding: 6px 0;
        }

        .student-delete-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          background: ${colors.dangerSoft};
          color: ${colors.danger};
        }

        .student-delete-title {
          margin: 0;
          font-size: 17px;
          font-weight: 700;
          color: ${colors.text};
        }

        .student-delete-text {
          margin: 7px auto 0;
          max-width: 430px;
          font-size: 13px;
          line-height: 1.55;
          color: ${colors.textSecondary};
        }

        @keyframes student-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1000px) {
          .student-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .student-filter-row {
            grid-template-columns: 1fr 1fr;
          }

          .student-filter-row > :first-child {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 720px) {
          .student-management-page {
            padding: 20px 15px 28px !important;
          }

          .student-page-header {
            flex-direction: column;
            align-items: stretch;
          }

          .student-primary-button {
            width: 100%;
          }

          .student-page-title {
            font-size: 24px;
          }

          .student-stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .student-filter-row {
            grid-template-columns: 1fr;
          }

          .student-filter-row > :first-child {
            grid-column: auto;
          }

          .student-pagination {
            flex-direction: column;
            align-items: flex-start;
          }

          .student-pagination-controls {
            width: 100%;
            justify-content: flex-start;
            overflow-x: auto;
          }

          .student-form-grid {
            grid-template-columns: 1fr;
          }

          .student-form-field.full {
            grid-column: auto;
          }

          .student-detail-grid {
            grid-template-columns: 1fr;
          }

          .student-modal-actions {
            flex-direction: column-reverse;
            align-items: stretch;
          }

          .student-modal-actions button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .student-stats-grid {
            grid-template-columns: 1fr;
          }

          .student-stat-card {
            padding: 14px;
          }

          .student-directory-header {
            padding: 16px;
          }

          .student-table td,
          .student-table th {
            padding-left: 12px;
            padding-right: 12px;
          }
        }
      `}</style>

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <div className="student-page-header">
        <div>
          <div className="student-breadcrumb">
            <span>
              College Coordinator
            </span>

            <span>/</span>

            <span
              style={{
                color:
                  colors.textSecondary,
                fontWeight: 500,
              }}
            >
              Student Management
            </span>
          </div>

          <h1 className="student-page-title">
            Student Management
          </h1>

          <p className="student-page-description">
            Manage, verify and maintain
            student records.
          </p>
        </div>

        <button
          type="button"
          className="student-primary-button"
          onClick={
            openAddModal
          }
        >
          <Plus size={17} />
          Add Student
        </button>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}
      {error && (
        <div className="student-error-banner">
          <AlertCircle
            size={18}
            style={{
              flexShrink: 0,
            }}
          />

          <div>
            <strong>
              Unable to complete request
            </strong>

            <div>{error}</div>
          </div>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
            style={{
              marginLeft: "auto",
              border: 0,
              background:
                "transparent",
              color:
                colors.danger,
              cursor:
                "pointer",
              padding: 2,
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* =====================================================
          STATISTICS
      ===================================================== */}
      <div className="student-stats-grid">
        <div className="student-stat-card">
          <div className="student-stat-top">
            <div>
              <p className="student-stat-label">
                Total Students
              </p>

              <p className="student-stat-value">
                {students.length}
              </p>
            </div>

            <div
              className="student-stat-icon"
              style={{
                background:
                  colors.primarySoft,
                color:
                  colors.primary,
              }}
            >
              <Users size={19} />
            </div>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="student-stat-top">
            <div>
              <p className="student-stat-label">
                Verified
              </p>

              <p className="student-stat-value">
                {verifiedCount}
              </p>
            </div>

            <div
              className="student-stat-icon"
              style={{
                background:
                  colors.successSoft,
                color:
                  colors.success,
              }}
            >
              <UserCheck
                size={19}
              />
            </div>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="student-stat-top">
            <div>
              <p className="student-stat-label">
                Pending
              </p>

              <p className="student-stat-value">
                {pendingCount}
              </p>
            </div>

            <div
              className="student-stat-icon"
              style={{
                background:
                  colors.warningSoft,
                color:
                  colors.warning,
              }}
            >
              <Clock3 size={19} />
            </div>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="student-stat-top">
            <div>
              <p className="student-stat-label">
                Departments
              </p>

              <p className="student-stat-value">
                {departmentCount}
              </p>
            </div>

            <div
              className="student-stat-icon"
              style={{
                background:
                  colors.infoSoft,
                color:
                  colors.info,
              }}
            >
              <BookOpen
                size={19}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          DIRECTORY
      ===================================================== */}
      <div className="student-directory-card">
        <div className="student-directory-header">
          <h2 className="student-section-heading">
            Student Directory
          </h2>

          <p className="student-section-description">
            Search, filter and manage
            registered student records.
          </p>

          <div className="student-filter-row">
            <div className="student-search-wrapper">
              <Search
                className="student-search-icon"
                size={17}
              />

              <input
                type="text"
                className="student-input"
                placeholder="Search by name, roll no. or student ID..."
                value={search}
                onChange={(
                  event
                ) => {
                  setSearch(
                    event.target
                      .value
                  );
                  setCurrentPage(
                    1
                  );
                }}
              />
            </div>

            <select
              className="student-select"
              value={
                departmentFilter
              }
              onChange={(
                event
              ) =>
                changeDepartment(
                  event.target
                    .value
                )
              }
            >
              {departments.map(
                (
                  department
                ) => (
                  <option
                    key={
                      department
                    }
                    value={
                      department
                    }
                  >
                    {department}
                  </option>
                )
              )}
            </select>

            <select
              className="student-select"
              value={
                statusFilter
              }
              onChange={(
                event
              ) => {
                setStatusFilter(
                  event.target
                    .value
                );
                setCurrentPage(
                  1
                );
              }}
            >
              {STATUS_OPTIONS.map(
                (status) => (
                  <option
                    key={
                      status
                    }
                    value={
                      status
                    }
                  >
                    {status}
                  </option>
                )
              )}
            </select>

            <button
              type="button"
              className="student-secondary-button"
              onClick={
                clearFilters
              }
            >
              Clear
            </button>
          </div>
        </div>

        {/* =================================================
            LOADING
        ================================================= */}
        {loading ? (
          <div className="student-state">
            <div className="student-state-icon">
              <RefreshCw
                size={21}
                style={{
                  animation:
                    "student-spin 1s linear infinite",
                }}
              />
            </div>

            <h3 className="student-state-title">
              Loading students
            </h3>

            <p className="student-state-text">
              Fetching student records
              from MongoDB.
            </p>
          </div>
        ) : filteredStudents.length ===
          0 ? (
          <div className="student-state">
            <div className="student-state-icon">
              <Search size={21} />
            </div>

            <h3 className="student-state-title">
              No students found
            </h3>

            <p className="student-state-text">
              No student records match
              the current search or
              filters.
            </p>

            <button
              type="button"
              className="student-secondary-button"
              style={{
                marginTop: "15px",
              }}
              onClick={
                clearFilters
              }
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* =============================================
                TABLE
            ============================================= */}
            <div className="student-table-wrapper">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>
                      Student
                    </th>

                    <th>
                      Roll No.
                    </th>

                    <th>
                      Department
                    </th>

                    <th>
                      CGPA
                    </th>

                    <th>
                      Status
                    </th>

                    <th
                      style={{
                        textAlign:
                          "right",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedStudents.map(
                    (
                      student
                    ) => {
                      const id =
                        getStudentId(
                          student
                        );

                      const name =
                        getStudentName(
                          student
                        );

                      const roll =
                        getRollNumber(
                          student
                        );

                      const department =
                        getDepartment(
                          student
                        );

                      const cgpa =
                        getCgpa(
                          student
                        );

                      const verified =
                        isStudentVerified(
                          student
                        );

                      return (
                        <tr
                          key={id}
                          onClick={() =>
                            setSelectedStudent(
                              student
                            )
                          }
                        >
                          <td>
                            <div className="student-name-cell">
                              {/* ===================================
                                  ALWAYS VISIBLE FALLBACK ICON
                              =================================== */}
                              <StudentAvatar
                                student={
                                  student
                                }
                                colors={
                                  colors
                                }
                                size={42}
                              />

                              <div
                                style={{
                                  minWidth:
                                    0,
                                }}
                              >
                                <p className="student-name">
                                  {name}
                                </p>

                                <div className="student-id-small">
                                  ID:{" "}
                                  {id ||
                                    "Not available"}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span
                              style={{
                                fontWeight:
                                  500,
                                color:
                                  colors.text,
                              }}
                            >
                              {roll ||
                                "—"}
                            </span>
                          </td>

                          <td>
                            <span className="student-department">
                              <GraduationCap
                                size={15}
                                style={{
                                  color:
                                    colors.primary,
                                  flexShrink: 0,
                                }}
                              />

                              {department ||
                                "Not assigned"}
                            </span>
                          </td>

                          <td>
                            <span
                              style={{
                                fontWeight:
                                  600,
                              }}
                            >
                              {cgpa !==
                              null
                                ? cgpa.toFixed(
                                    2
                                  )
                                : "—"}
                            </span>
                          </td>

                          <td>
                            <StatusBadge
                              verified={
                                verified
                              }
                              colors={
                                colors
                              }
                            />
                          </td>

                          <td>
                            <div className="student-action-row">
                              <button
                                type="button"
                                className="student-icon-button"
                                title="View student"
                                onClick={(
                                  event
                                ) => {
                                  event.stopPropagation();

                                  setSelectedStudent(
                                    student
                                  );
                                }}
                              >
                                <Eye
                                  size={15}
                                />
                              </button>

                              <button
                                type="button"
                                className="student-icon-button"
                                title="Edit student"
                                onClick={(
                                  event
                                ) => {
                                  event.stopPropagation();

                                  openEditModal(
                                    student
                                  );
                                }}
                              >
                                <Pencil
                                  size={15}
                                />
                              </button>

                              <button
                                type="button"
                                className="student-icon-button danger"
                                title="Delete student"
                                onClick={(
                                  event
                                ) => {
                                  event.stopPropagation();

                                  openDeleteModal(
                                    student
                                  );
                                }}
                              >
                                <Trash2
                                  size={15}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>

            {/* =============================================
                PAGINATION
            ============================================= */}
            <div className="student-pagination">
              <div className="student-pagination-info">
                Showing{" "}
                {filteredStudents.length ===
                0
                  ? 0
                  : (safeCurrentPage -
                      1) *
                      STUDENTS_PER_PAGE +
                    1}{" "}
                to{" "}
                {Math.min(
                  safeCurrentPage *
                    STUDENTS_PER_PAGE,
                  filteredStudents.length
                )}{" "}
                of{" "}
                {
                  filteredStudents.length
                }{" "}
                students
              </div>

              <div className="student-pagination-controls">
                <button
                  type="button"
                  className="student-page-button"
                  disabled={
                    safeCurrentPage ===
                    1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (
                        page
                      ) =>
                        Math.max(
                          1,
                          page -
                            1
                        )
                    )
                  }
                  title="Previous page"
                >
                  <ChevronLeft
                    size={16}
                  />
                </button>

                {Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (
                    _,
                    index
                  ) =>
                    index + 1
                )
                  .filter(
                    (
                      page
                    ) => {
                      if (
                        totalPages <=
                        5
                      ) {
                        return true;
                      }

                      return (
                        page ===
                          1 ||
                        page ===
                          totalPages ||
                        Math.abs(
                          page -
                            safeCurrentPage
                        ) <=
                          1
                      );
                    }
                  )
                  .map(
                    (
                      page,
                      index,
                      pages
                    ) => {
                      const previous =
                        pages[
                          index -
                            1
                        ];

                      const showEllipsis =
                        previous &&
                        page -
                          previous >
                          1;

                      return (
                        <span
                          key={
                            page
                          }
                          style={{
                            display:
                              "inline-flex",
                            alignItems:
                              "center",
                            gap: "5px",
                          }}
                        >
                          {showEllipsis && (
                            <span
                              style={{
                                color:
                                  colors.textMuted,
                                fontSize:
                                  "12px",
                              }}
                            >
                              ...
                            </span>
                          )}

                          <button
                            type="button"
                            className={`student-page-button ${
                              page ===
                              safeCurrentPage
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              setCurrentPage(
                                page
                              )
                            }
                          >
                            {page}
                          </button>
                        </span>
                      );
                    }
                  )}

                <button
                  type="button"
                  className="student-page-button"
                  disabled={
                    safeCurrentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (
                        page
                      ) =>
                        Math.min(
                          totalPages,
                          page +
                            1
                        )
                    )
                  }
                  title="Next page"
                >
                  <ChevronRight
                    size={16}
                  />
                </button>

                <button
                  type="button"
                  className="student-page-button"
                  onClick={() =>
                    loadStudents(
                      false
                    )
                  }
                  disabled={
                    refreshing
                  }
                  title="Refresh students"
                  style={{
                    marginLeft:
                      "3px",
                  }}
                >
                  <RefreshCw
                    size={15}
                    style={
                      refreshing
                        ? {
                            animation:
                              "student-spin 1s linear infinite",
                          }
                        : undefined
                    }
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* =====================================================
          STUDENT DETAILS MODAL
      ===================================================== */}
      {selectedStudent &&
        !showDeleteModal && (
          <Modal
            title="Student Details"
            subtitle="Student profile and verification information"
            onClose={() =>
              setSelectedStudent(
                null
              )
            }
            colors={colors}
            maxWidth={620}
          >
            <div className="student-detail-header">
              <StudentAvatar
                student={
                  selectedStudent
                }
                colors={colors}
                size={58}
              />

              <div
                style={{
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <h3 className="student-detail-name">
                  {getStudentName(
                    selectedStudent
                  )}
                </h3>

                <p className="student-detail-subtitle">
                  {getRollNumber(
                    selectedStudent
                  ) ||
                    "No roll number"}{" "}
                  •{" "}
                  {getDepartment(
                    selectedStudent
                  ) ||
                    "No department"}
                </p>
              </div>

              <StatusBadge
                verified={isStudentVerified(
                  selectedStudent
                )}
                colors={colors}
              />
            </div>

            <div className="student-detail-grid">
              <div className="student-detail-item">
                <div className="student-detail-label">
                  Student ID
                </div>

                <div className="student-detail-value">
                  {getStudentId(
                    selectedStudent
                  ) || "—"}
                </div>
              </div>

              <div className="student-detail-item">
                <div className="student-detail-label">
                  Roll Number
                </div>

                <div className="student-detail-value">
                  {getRollNumber(
                    selectedStudent
                  ) || "—"}
                </div>
              </div>

              <div className="student-detail-item">
                <div className="student-detail-label">
                  Department
                </div>

                <div className="student-detail-value">
                  {getDepartment(
                    selectedStudent
                  ) || "—"}
                </div>
              </div>

              <div className="student-detail-item">
                <div className="student-detail-label">
                  CGPA
                </div>

                <div className="student-detail-value">
                  {getCgpa(
                    selectedStudent
                  ) !== null
                    ? getCgpa(
                        selectedStudent
                      ).toFixed(
                        2
                      )
                    : "—"}
                </div>
              </div>

              <div className="student-detail-item">
                <div className="student-detail-label">
                  Verification
                </div>

                <div className="student-detail-value">
                  {isStudentVerified(
                    selectedStudent
                  )
                    ? "Verified"
                    : "Pending Verification"}
                </div>
              </div>

              <div className="student-detail-item">
                <div className="student-detail-label">
                  Resume
                </div>

                <div className="student-detail-value">
                  {getResumeUrl(
                    selectedStudent
                  ) ? (
                    <a
                      href={getResumeUrl(
                        selectedStudent
                      )}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color:
                          colors.primary,
                        textDecoration:
                          "none",
                      }}
                    >
                      View Resume
                    </a>
                  ) : (
                    "Not uploaded"
                  )}
                </div>
              </div>
            </div>

            <div className="student-modal-actions">
              <button
                type="button"
                className="student-secondary-button"
                onClick={() =>
                  setSelectedStudent(
                    null
                  )
                }
              >
                Close
              </button>

              <button
                type="button"
                className="student-primary-button"
                onClick={() =>
                  openEditModal(
                    selectedStudent
                  )
                }
              >
                <Pencil size={15} />
                Edit Student
              </button>
            </div>
          </Modal>
        )}

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}
      {showFormModal && (
        <Modal
          title={
            editingStudent
              ? "Edit Student"
              : "Add Student"
          }
          subtitle={
            editingStudent
              ? "Update the student record."
              : "Create a new student record."
          }
          onClose={
            closeFormModal
          }
          colors={colors}
          maxWidth={680}
        >
          <form
            onSubmit={
              handleSubmit
            }
          >
            <div className="student-form-grid">
              <div className="student-form-field">
                <label className="student-form-label">
                  Student ID{" "}
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="studentId"
                  className="student-input"
                  value={
                    formData.studentId
                  }
                  onChange={
                    handleFormChange
                  }
                  placeholder="e.g. STU-001"
                  disabled={
                    Boolean(
                      editingStudent
                    )
                  }
                />

                {editingStudent && (
                  <div className="student-form-help">
                    Student ID cannot
                    be changed while
                    editing.
                  </div>
                )}
              </div>

              <div className="student-form-field">
                <label className="student-form-label">
                  Roll Number{" "}
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="rollNumber"
                  className="student-input"
                  value={
                    formData.rollNumber
                  }
                  onChange={
                    handleFormChange
                  }
                  placeholder="Enter roll number"
                />
              </div>

              <div className="student-form-field full">
                <label className="student-form-label">
                  Student Name{" "}
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  className="student-input"
                  value={
                    formData.name
                  }
                  onChange={
                    handleFormChange
                  }
                  placeholder="Enter student full name"
                />
              </div>

              <div className="student-form-field">
                <label className="student-form-label">
                  Department{" "}
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="department"
                  className="student-input"
                  value={
                    formData.department
                  }
                  onChange={
                    handleFormChange
                  }
                  placeholder="e.g. BCA"
                />
              </div>

              <div className="student-form-field">
                <label className="student-form-label">
                  CGPA
                </label>

                <input
                  type="number"
                  name="cgpa"
                  className="student-input"
                  value={
                    formData.cgpa
                  }
                  onChange={
                    handleFormChange
                  }
                  placeholder="0.00 - 10.00"
                  min="0"
                  max="10"
                  step="0.01"
                />
              </div>

              <div className="student-form-field full">
                <label className="student-form-label">
                  Profile Photo URL
                </label>

                <input
                  type="url"
                  name="profilePhotoUrl"
                  className="student-input"
                  value={
                    formData.profilePhotoUrl
                  }
                  onChange={
                    handleFormChange
                  }
                  placeholder="https://..."
                />

                <div className="student-form-help">
                  If no valid photo is
                  available, the student
                  avatar will automatically
                  show the GraduationCap
                  icon.
                </div>
              </div>

              <div className="student-form-field full">
                <label className="student-form-label">
                  Resume URL
                </label>

                <input
                  type="url"
                  name="resumeUrl"
                  className="student-input"
                  value={
                    formData.resumeUrl
                  }
                  onChange={
                    handleFormChange
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="student-form-field full">
                <div className="student-checkbox-row">
                  <input
                    id="student-verification"
                    type="checkbox"
                    name="isVerified"
                    checked={
                      formData.isVerified
                    }
                    onChange={
                      handleFormChange
                    }
                  />

                  <label htmlFor="student-verification">
                    Mark student as
                    verified
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <div
                className="student-error-banner"
                style={{
                  marginTop:
                    "16px",
                  marginBottom:
                    0,
                }}
              >
                <AlertCircle
                  size={17}
                  style={{
                    flexShrink: 0,
                  }}
                />

                <div>
                  {error}
                </div>
              </div>
            )}

            <div className="student-modal-actions">
              <button
                type="button"
                className="student-secondary-button"
                onClick={
                  closeFormModal
                }
                disabled={
                  submitting
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="student-primary-button"
                disabled={
                  submitting
                }
              >
                {submitting ? (
                  <>
                    <RefreshCw
                      size={15}
                      style={{
                        animation:
                          "student-spin 1s linear infinite",
                      }}
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    {editingStudent ? (
                      <Pencil
                        size={15}
                      />
                    ) : (
                      <Plus
                        size={16}
                      />
                    )}

                    {editingStudent
                      ? "Save Changes"
                      : "Add Student"}
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* =====================================================
          DELETE CONFIRMATION
      ===================================================== */}
      {showDeleteModal &&
        selectedStudent && (
          <Modal
            title="Delete Student"
            subtitle="This action cannot be undone."
            onClose={
              closeDeleteModal
            }
            colors={colors}
            maxWidth={460}
          >
            <div className="student-delete-content">
              <div className="student-delete-icon">
                <Trash2 size={22} />
              </div>

              <h3 className="student-delete-title">
                Delete{" "}
                {getStudentName(
                  selectedStudent
                )}
                ?
              </h3>

              <p className="student-delete-text">
                This will permanently
                remove the student
                record from the system.
                Please confirm that you
                want to continue.
              </p>
            </div>

            <div className="student-modal-actions">
              <button
                type="button"
                className="student-secondary-button"
                onClick={
                  closeDeleteModal
                }
                disabled={
                  deleting
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="student-danger-button"
                onClick={
                  handleDelete
                }
                disabled={
                  deleting
                }
              >
                {deleting ? (
                  <>
                    <RefreshCw
                      size={15}
                      style={{
                        animation:
                          "student-spin 1s linear infinite",
                      }}
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2
                      size={15}
                    />
                    Delete Student
                  </>
                )}
              </button>
            </div>
          </Modal>
        )}
    </div>
  );
}