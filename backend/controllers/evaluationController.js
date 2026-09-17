const Evaluation = require("../models/Evaluation");
const AssignedOjt = require("../models/AssignedOjt");
const Application = require("../models/Application");
const Student = require("../models/Student");
const Opportunity = require("../models/Opportunity");

// Get All Evaluations
const getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find().sort({
      evaluatedOn: -1,
    });

    res.status(200).json({
      success: true,
      count: evaluations.length,
      evaluations,
    });
  } catch (error) {
    console.error("Get All Evaluations Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch evaluations",
    });
  }
};

// Get Evaluation By ID
const getEvaluationById = async (req, res) => {
  try {
    const { id } = req.params;

    const evaluation = await Evaluation.findById(id);

    if (!evaluation) {
      return res.status(404).json({
        success: false,
        message: "Evaluation not found",
      });
    }

    res.status(200).json({
      success: true,
      evaluation,
    });
  } catch (error) {
    console.error("Get Evaluation Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch evaluation",
    });
  }
};

// Get Evaluations By OJT ID
const getEvaluationsByOjtId = async (req, res) => {
  try {
    const { assignedOjtId } = req.params;

    const evaluations = await Evaluation.find({
      assignedOjtId,
    }).sort({ evaluatedOn: -1 });

    res.status(200).json({
      success: true,
      count: evaluations.length,
      evaluations,
    });
  } catch (error) {
    console.error("Get Evaluations By OJT ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch OJT evaluations",
    });
  }
};

// Add Evaluation
const addEvaluation = async (req, res) => {
  try {
    const {
      _id,
      assignedOjtId,
      evaluatedByFacultyId,
      evaluatedByCoordinatorId,
      hoursMarks,
      performanceMarks,
      punctualityMarks,
      weeklyReportMarks,
      finalReportMarks,
      vivaMarks,
      totalMarks,
      evaluatedOn,
    } = req.body;

    if (!_id || !assignedOjtId) {
      return res.status(400).json({
        success: false,
        message: "Evaluation ID and assignedOjtId are required",
      });
    }

    const existingEvaluation = await Evaluation.findById(_id);

    if (existingEvaluation) {
      return res.status(400).json({
        success: false,
        message: "Evaluation already exists",
      });
    }

    const evaluation = await Evaluation.create({
      _id,
      assignedOjtId,
      evaluatedByFacultyId,
      evaluatedByCoordinatorId,
      hoursMarks,
      performanceMarks,
      punctualityMarks,
      weeklyReportMarks,
      finalReportMarks,
      vivaMarks,
      totalMarks,
      evaluatedOn,
    });

    res.status(201).json({
      success: true,
      message: "Evaluation added successfully",
      evaluation,
    });
  } catch (error) {
    console.error("Add Evaluation Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add evaluation",
    });
  }
};

// Update Evaluation
const updateEvaluation = async (req, res) => {
  try {
    const { id } = req.params;

    const evaluation = await Evaluation.findById(id);

    if (!evaluation) {
      return res.status(404).json({
        success: false,
        message: "Evaluation not found",
      });
    }

    const {
      assignedOjtId,
      evaluatedByFacultyId,
      evaluatedByCoordinatorId,
      hoursMarks,
      performanceMarks,
      punctualityMarks,
      weeklyReportMarks,
      finalReportMarks,
      vivaMarks,
      totalMarks,
      evaluatedOn,
    } = req.body;

    if (assignedOjtId !== undefined) {
      evaluation.assignedOjtId = assignedOjtId;
    }

    if (evaluatedByFacultyId !== undefined) {
      evaluation.evaluatedByFacultyId = evaluatedByFacultyId;
    }

    if (evaluatedByCoordinatorId !== undefined) {
      evaluation.evaluatedByCoordinatorId = evaluatedByCoordinatorId;
    }

    if (hoursMarks !== undefined) {
      evaluation.hoursMarks = hoursMarks;
    }

    if (performanceMarks !== undefined) {
      evaluation.performanceMarks = performanceMarks;
    }

    if (punctualityMarks !== undefined) {
      evaluation.punctualityMarks = punctualityMarks;
    }

    if (weeklyReportMarks !== undefined) {
      evaluation.weeklyReportMarks = weeklyReportMarks;
    }

    if (finalReportMarks !== undefined) {
      evaluation.finalReportMarks = finalReportMarks;
    }

    if (vivaMarks !== undefined) {
      evaluation.vivaMarks = vivaMarks;
    }

    if (totalMarks !== undefined) {
      evaluation.totalMarks = totalMarks;
    }

    if (evaluatedOn !== undefined) {
      evaluation.evaluatedOn = evaluatedOn;
    }

    const updatedEvaluation = await evaluation.save();

    res.status(200).json({
      success: true,
      message: "Evaluation updated successfully",
      evaluation: updatedEvaluation,
    });
  } catch (error) {
    console.error("Update Evaluation Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update evaluation",
    });
  }
};

// Delete Evaluation
const deleteEvaluation = async (req, res) => {
  try {
    const { id } = req.params;

    const evaluation = await Evaluation.findById(id);

    if (!evaluation) {
      return res.status(404).json({
        success: false,
        message: "Evaluation not found",
      });
    }

    await Evaluation.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Evaluation deleted successfully",
    });
  } catch (error) {
    console.error("Delete Evaluation Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete evaluation",
    });
  }
};

// Get Evaluation Students By Faculty ID
const getEvaluationStudentsByFacultyId = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const assignedOjtList = await AssignedOjt.find({
      facultyId,
    });

    const students = [];

    for (const assignment of assignedOjtList) {
      const application = await Application.findById(
        assignment.applicationId
      );

      if (!application) continue;

      const student = await Student.findById(application.studentId);

      if (!student) continue;

      const opportunity = await Opportunity.findById(
        application.opportunityId
      );

      const evaluation = await Evaluation.findOne({
        assignedOjtId: assignment._id,
      });

      students.push({
        id: assignment._id,
        studentId: student._id,
        initials: student.name
          ? student.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()
          : "NA",
        name: student.name || "N/A",
        email: "",
        company: opportunity?.companyId || "N/A",
        location: opportunity?.location || "N/A",
        role: opportunity?.title || "N/A",
        progress: evaluation ? 100 : 0,
        progressColor: evaluation ? "bg-green-500" : "bg-blue-500",
        status: evaluation ? "Evaluated" : "Pending",
        assignedOjtId: assignment._id,
        evaluationId: evaluation?._id || null,
      });
    }

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error(
      "Get Evaluation Students By Faculty Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch evaluation students",
    });
  }
};

module.exports = {
  getAllEvaluations,
  getEvaluationById,
  getEvaluationsByOjtId,
  addEvaluation,
  updateEvaluation,
  deleteEvaluation,
  getEvaluationStudentsByFacultyId,
};