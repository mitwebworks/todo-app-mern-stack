const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      require: true,
    },
    isCompleted: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
