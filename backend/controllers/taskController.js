const Task = require("../models/Task");

// Get student's task
const getStudentTask = async (req, res) => {
  try {
    const studentId = req.user._id || req.user.userId;

    const task = await Task.findOne({
      studentId: studentId,
    }).sort({ dueDate: 1 });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "No task found",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Get task error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get task",
    });
  }
};

// Mark task as completed
const completeTask = async (req, res) => {
  try {
    const studentId = req.user._id || req.user.userId;

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        studentId: studentId,
      },
      {
        status: "Completed",
      },
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task completed successfully",
      task,
    });
  } catch (error) {
    console.error("Complete task error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to complete task",
    });
  }
};

module.exports = {
  getStudentTask,
  completeTask,
};