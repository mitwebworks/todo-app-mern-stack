const Task = require("../models/Task");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { task, isCompleted } = req.body;

  if (!task || task.length == 0) {
    return res.status(400).json({
      success: false,
      message: "Task field is required and cannot be empty.",
    });
  }

  try {
    const response = await Task.create({ task, isCompleted });

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// update a task by id
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { task, isCompleted } = req.body;

  if (!task || task.length == 0) {
    return res.status(400).json({
      success: false,
      message: "Task field is required and cannot be empty.",
    });
  }

  try {
    const response = await Task.findByIdAndUpdate(
      id,
      { task, isCompleted },
      { new: true, runValidators: true },
    );

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// mark completed a task by id
const markTask = async (req, res) => {
  const { id } = req.params;

  const { isCompleted } = req.body || false;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true, runValidators: true },
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete a task by id
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// search tasks by label
const searchTask = async (req, res) => {
  const { query } = req.params || '';

  // if (!query || query.length == 0 || query == " ") {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Query string is required",
  //   });
  // }

  try {
    const tasks = await Task.find({ task: new RegExp(query, "i") }).sort({createdAt: -1});

    // if (!tasks || tasks.length == 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No matching result found",
    //   });
    // }

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  markTask,
  deleteTask,
  searchTask,
};
