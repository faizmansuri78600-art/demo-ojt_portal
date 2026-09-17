const Attendance = require("../models/Attendance");

// ======================================
// Get All Attendance
// ======================================

const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance: attendance,
    });
  } catch (error) {
    console.error(
      "Get All Attendance Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
    });
  }
};


// ======================================
// Get Attendance By Assigned OJT ID
// ======================================

const getAttendanceByOjtId = async (req, res) => {
  try {
    const { assignedOjtId } = req.params;

    const attendance = await Attendance.find({
      assignedOjtId: assignedOjtId,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance: attendance,
    });
  } catch (error) {
    console.error(
      "Get Attendance By OJT ID Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
    });
  }
};


// ======================================
// Get Attendance By Date
// ======================================

const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const attendance = await Attendance.find({
      date: date,
    });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance: attendance,
    });
  } catch (error) {
    console.error(
      "Get Attendance By Date Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
    });
  }
};


// ======================================
// Get Attendance Statistics
// ======================================

const getAttendanceStats = async (req, res) => {
  try {
    const total = await Attendance.countDocuments();

    const present = await Attendance.countDocuments({
      status: "Present",
    });

    const absent = await Attendance.countDocuments({
      status: "Absent",
    });

    const leave = await Attendance.countDocuments({
      status: "Leave",
    });

    const totalHoursResult =
      await Attendance.aggregate([
        {
          $group: {
            _id: null,
            totalHours: {
              $sum: "$hoursLogged",
            },
          },
        },
      ]);

    const totalHours =
      totalHoursResult.length > 0
        ? totalHoursResult[0].totalHours
        : 0;

    res.status(200).json({
      success: true,
      stats: {
        total,
        present,
        absent,
        leave,
        totalHours,
      },
    });
  } catch (error) {
    console.error(
      "Attendance Stats Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance statistics",
    });
  }
};


// ======================================
// Add Attendance
// ======================================

const addAttendance = async (req, res) => {
  try {
    const {
      assignedOjtId,
      date,
      status,
      hoursLogged,
    } = req.body;

    if (!assignedOjtId || !date || !status) {
      return res.status(400).json({
        success: false,
        message:
          "assignedOjtId, date and status are required",
      });
    }

    const attendance = await Attendance.create({
      assignedOjtId,
      date,
      status,
      hoursLogged: hoursLogged || 0,
    });

    res.status(201).json({
      success: true,
      message: "Attendance added successfully",
      attendance: attendance,
    });
  } catch (error) {
    console.error(
      "Add Attendance Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to add attendance",
    });
  }
};


// ======================================
// Update Attendance
// ======================================

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance =
      await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    const {
      assignedOjtId,
      date,
      status,
      hoursLogged,
    } = req.body;

    if (assignedOjtId !== undefined) {
      attendance.assignedOjtId =
        assignedOjtId;
    }

    if (date !== undefined) {
      attendance.date = date;
    }

    if (status !== undefined) {
      attendance.status = status;
    }

    if (hoursLogged !== undefined) {
      attendance.hoursLogged =
        hoursLogged;
    }

    const updatedAttendance =
      await attendance.save();

    res.status(200).json({
      success: true,
      message:
        "Attendance updated successfully",
      attendance: updatedAttendance,
    });
  } catch (error) {
    console.error(
      "Update Attendance Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update attendance",
    });
  }
};


// ======================================
// Delete Attendance
// ======================================

const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance =
      await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    await Attendance.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message:
        "Attendance deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Attendance Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete attendance",
    });
  }
};


// ======================================
// Export
// ======================================

module.exports = {
  getAllAttendance,
  getAttendanceByOjtId,
  getAttendanceByDate,
  getAttendanceStats,
  addAttendance,
  updateAttendance,
  deleteAttendance,
};