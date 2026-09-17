const CollegeCoordinator = require("../models/CollegeCoordinator");
const Student = require("../models/Student");
const Company = require("../models/Company");
const Opportunity = require("../models/Opportunity");
const Application = require("../models/Application");

/*
|--------------------------------------------------------------------------
| College Coordinator Controllers
|--------------------------------------------------------------------------
*/

const getAllCollegeCoordinators = async (req, res) => {
  try {
    const coordinators = await CollegeCoordinator.find().sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      count: coordinators.length,
      coordinators,
    });
  } catch (error) {
    console.error(
      "Get All College Coordinators Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch college coordinators",
    });
  }
};

const getCollegeCoordinatorById = async (req, res) => {
  try {
    const { id } = req.params;

    const coordinator =
      await CollegeCoordinator.findById(id);

    if (!coordinator) {
      return res.status(404).json({
        success: false,
        message: "College coordinator not found",
      });
    }

    res.status(200).json({
      success: true,
      coordinator,
    });
  } catch (error) {
    console.error(
      "Get College Coordinator By ID Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch college coordinator",
    });
  }
};

const getCoordinatorsByDepartment = async (
  req,
  res
) => {
  try {
    const { department } = req.params;

    const coordinators =
      await CollegeCoordinator.find({
        department,
      }).sort({
        name: 1,
      });

    res.status(200).json({
      success: true,
      count: coordinators.length,
      coordinators,
    });
  } catch (error) {
    console.error(
      "Get Coordinators By Department Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch coordinators by department",
    });
  }
};

const addCollegeCoordinator = async (req, res) => {
  try {
    const {
      _id,
      userId,
      name,
      department,
    } = req.body;

    if (!name || !department) {
      return res.status(400).json({
        success: false,
        message:
          "Name and department are required",
      });
    }

    const coordinatorData = {
      userId: userId || "",
      name,
      department,
    };

    if (_id) {
      coordinatorData._id = _id;
    }

    const coordinator =
      await CollegeCoordinator.create(
        coordinatorData
      );

    res.status(201).json({
      success: true,
      message:
        "College coordinator added successfully",
      coordinator,
    });
  } catch (error) {
    console.error(
      "Add College Coordinator Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to add college coordinator",
    });
  }
};

const updateCollegeCoordinator = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      userId,
      name,
      department,
    } = req.body;

    const coordinator =
      await CollegeCoordinator.findByIdAndUpdate(
        id,
        {
          userId,
          name,
          department,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!coordinator) {
      return res.status(404).json({
        success: false,
        message:
          "College coordinator not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "College coordinator updated successfully",
      coordinator,
    });
  } catch (error) {
    console.error(
      "Update College Coordinator Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update college coordinator",
    });
  }
};

const deleteCollegeCoordinator = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const coordinator =
      await CollegeCoordinator.findByIdAndDelete(id);

    if (!coordinator) {
      return res.status(404).json({
        success: false,
        message:
          "College coordinator not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "College coordinator deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete College Coordinator Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete college coordinator",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Student Management Controllers
|--------------------------------------------------------------------------
*/

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("Get Students Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};

const addStudent = async (req, res) => {
  try {
    const {
      _id,
      userId,
      rollNumber,
      name,
      department,
      cgpa,
      profilePhotoUrl,
      resumeUrl,
      isVerified,
    } = req.body;

    if (
      !_id ||
      !name ||
      !rollNumber ||
      !department
    ) {
      return res.status(400).json({
        success: false,
        message:
          "ID, name, roll number and department are required",
      });
    }

    const existingStudent =
      await Student.findById(_id);

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message:
          "Student with this ID already exists",
      });
    }

    const student = await Student.create({
      _id,
      userId: userId || "",
      rollNumber,
      name,
      department,
      cgpa: cgpa || 0,
      profilePhotoUrl:
        profilePhotoUrl || "",
      resumeUrl:
        resumeUrl || "",
      isVerified:
        isVerified || false,
    });

    res.status(201).json({
      success: true,
      message:
        "Student added successfully",
      student,
    });
  } catch (error) {
    console.error(
      "Add Student Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to add student",
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      rollNumber,
      name,
      department,
      cgpa,
      profilePhotoUrl,
      resumeUrl,
      isVerified,
    } = req.body;

    const student =
      await Student.findByIdAndUpdate(
        id,
        {
          rollNumber,
          name,
          department,
          cgpa,
          profilePhotoUrl,
          resumeUrl,
          isVerified,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error(
      "Update Student Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update student",
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message:
          "Student ID is required",
      });
    }

    const student =
      await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message:
          "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Student deleted successfully",
      student,
    });
  } catch (error) {
    console.error(
      "Delete Student Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete student",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Company Management Controllers
|--------------------------------------------------------------------------
*/

const getCompanies = async (req, res) => {
  try {
    const [
      companies,
      opportunities,
      applications,
    ] = await Promise.all([
      Company.find().sort({
        companyName: 1,
      }),

      Opportunity.find(
        {},
        "_id companyId"
      ),

      Application.find(
        {},
        "studentId opportunityId"
      ),
    ]);

    const opportunityCountByCompany =
      new Map();

    const opportunityCompanyMap =
      new Map();

    opportunities.forEach(
      (opportunity) => {
        const companyId =
          opportunity.companyId;

        if (!companyId) {
          return;
        }

        opportunityCountByCompany.set(
          companyId,
          (opportunityCountByCompany.get(
            companyId
          ) || 0) + 1
        );

        opportunityCompanyMap.set(
          String(opportunity._id),
          companyId
        );
      }
    );

    const studentsByCompany =
      new Map();

    applications.forEach(
      (application) => {
        const companyId =
          opportunityCompanyMap.get(
            String(
              application.opportunityId
            )
          );

        if (!companyId) {
          return;
        }

        if (
          !studentsByCompany.has(
            companyId
          )
        ) {
          studentsByCompany.set(
            companyId,
            new Set()
          );
        }

        studentsByCompany
          .get(companyId)
          .add(
            String(
              application.studentId
            )
          );
      }
    );

    const result =
      companies.map((company) => {
        const item =
          company.toObject();

        return {
          ...item,

          status:
            item.status ||
            (item.isVerified
              ? "Approved"
              : "Pending"),

          opportunities:
            opportunityCountByCompany.get(
              String(item._id)
            ) || 0,

          students:
            studentsByCompany.get(
              String(item._id)
            )?.size || 0,
        };
      });

    res.status(200).json({
      success: true,
      count: result.length,
      companies: result,
    });
  } catch (error) {
    console.error(
      "Get Companies Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch companies",
    });
  }
};

const addCompany = async (req, res) => {
  try {
    const {
      _id,
      companyName,
      industry,
      contactPerson,
      email,
      phone,
      street,
      city,
      state,
      zipCode,
      website,
      description,
    } = req.body;

    if (!companyName || !city) {
      return res.status(400).json({
        success: false,
        message:
          "Company name and city are required",
      });
    }

    const companyId =
      _id || `company-${Date.now()}`;

    const existingCompany =
      await Company.findById(
        companyId
      );

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message:
          "Company with this ID already exists",
      });
    }

    const company =
      await Company.create({
        _id: companyId,
        companyName,
        industry:
          industry || "Other",
        contactPerson:
          contactPerson || "",
        email: email || "",
        phone: phone || "",
        street: street || "",
        city: city || "",
        state: state || "",
        zipCode: zipCode || "",
        website: website || "",
        description:
          description || "",
        isVerified: false,
        status: "Pending",
      });

    res.status(201).json({
      success: true,
      message:
        "Company added successfully",
      company,
    });
  } catch (error) {
    console.error(
      "Add Company Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to add company",
    });
  }
};

const updateCompany = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    const {
      companyName,
      industry,
      contactPerson,
      email,
      phone,
      street,
      city,
      state,
      zipCode,
      website,
      description,
    } = req.body;

    const company =
      await Company.findByIdAndUpdate(
        id,
        {
          companyName,
          industry,
          contactPerson,
          email,
          phone,
          street,
          city,
          state,
          zipCode,
          website,
          description,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!company) {
      return res.status(404).json({
        success: false,
        message:
          "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Company updated successfully",
      company,
    });
  } catch (error) {
    console.error(
      "Update Company Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update company",
    });
  }
};

const approveCompany = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    const coordinatorId =
      req.user?.id ||
      req.user?._id ||
      req.user?.userId ||
      "";

    const company =
      await Company.findByIdAndUpdate(
        id,
        {
          isVerified: true,
          status: "Approved",
          verifiedByCoordinatorId:
            coordinatorId,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!company) {
      return res.status(404).json({
        success: false,
        message:
          "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Company approved successfully",
      company,
    });
  } catch (error) {
    console.error(
      "Approve Company Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to approve company",
    });
  }
};

const rejectCompany = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    const company =
      await Company.findByIdAndUpdate(
        id,
        {
          isVerified: false,
          status: "Rejected",
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!company) {
      return res.status(404).json({
        success: false,
        message:
          "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Company rejected successfully",
      company,
    });
  } catch (error) {
    console.error(
      "Reject Company Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to reject company",
    });
  }
};

const deleteCompany = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    const company =
      await Company.findByIdAndDelete(
        id
      );

    if (!company) {
      return res.status(404).json({
        success: false,
        message:
          "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Company deleted successfully",
      company,
    });
  } catch (error) {
    console.error(
      "Delete Company Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete company",
    });
  }
};

module.exports = {
  getAllCollegeCoordinators,
  getCollegeCoordinatorById,
  getCoordinatorsByDepartment,
  addCollegeCoordinator,
  updateCollegeCoordinator,
  deleteCollegeCoordinator,

  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,

  getCompanies,
  addCompany,
  updateCompany,
  approveCompany,
  rejectCompany,
  deleteCompany,
};