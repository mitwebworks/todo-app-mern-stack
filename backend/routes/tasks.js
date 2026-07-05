// Importing Express
const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  markTask,
  deleteTask,
} = require("../controllers/TaskController");
const router = express.Router();

/**
 * Endpoint: /tasks
 * Method: GET
 * Description: Get all tasks
 * Body: NA
 * Params: NA
 * Access: Public
 */
router.get("/", getAllTasks);

/**
 * Endpoint: /tasks
 * Method: POST
 * Description: Create a new task
 * Body: {"task": "", isCompleted: false}
 * Params: NA
 * Access: Public
 */
router.post("/", createTask);

/**
 * Endpoint: /tasks/:id
 * Method: PUT
 * Description: Update a task
 * Body: {"task": "", isCompleted: false}
 * Params: id
 * Access: Public
 */
router.put("/:id", updateTask);

/**
 * Endpoint: /tasks/mark-complete/:id
 * Method: PATCH
 * Description: Mark a task as completed or not
 * Body: { "isCompleted" : boolean}
 * Params: id
 * Access: Public
 */
router.patch("/:id", markTask);

/**
 * Endpoint: /delete/:id
 * Method: DELETE
 * Description: Delete a task
 * Body: NA
 * Params: id
 * Access: Public
 */
router.delete("/:id", deleteTask);

module.exports = router;
