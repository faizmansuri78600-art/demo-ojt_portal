const AssignOjt = require("../models/AssignOjt");

const getFacultyDashboard = async (req, res) => {
  try {
    const { facultyId } = req.params;

    // Saara assignojt data fetch karo
    const allAssignments = await AssignOjt.find({}).lean();

    return res.status(200).json({
      success: true,
      facultyIdFromURL: facultyId,
      totalDocumentsInAssignOjt: allAssignments.length,
      allAssignments: allAssignments,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getFacultyDashboard,
};