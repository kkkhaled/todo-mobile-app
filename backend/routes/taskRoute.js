const express = require("express");
const router = express.Router();

// user actions from controllers
const {
  createTodo,
  deleteTodo,
  getUserTodos,
  updateTodo,
} = require("../controllers/taskController");

// auth middleware to access req
const { protect } = require("../middleware/protect");
const {
  validateCreateTodo,
  validateUpdateTodo,
} = require("../middleware/validation/todoValidation");

// Apply protect middleware to routes that require authentication
router.route("/").post(protect, validateCreateTodo, createTodo);
router.route("/").get(protect, getUserTodos);
router.route("/edit/:id").put(protect, validateUpdateTodo, updateTodo);
router.route("/:id").delete(protect, deleteTodo);

module.exports = router;
