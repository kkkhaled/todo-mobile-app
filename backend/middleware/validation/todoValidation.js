const { body, validationResult } = require("express-validator");
const dayjs = require("dayjs");

// Middleware for validating create todo requests
exports.validateCreateTodo = [
  // Validate task field
  body("task").notEmpty().withMessage("Task is required"),

  // Validate startedAt field
  body("startedAt").notEmpty().withMessage("Start date is required"),

  // Validate endedAt field
  body("endedAt")
    .notEmpty()
    .withMessage("End date is required")
    .custom((value, { req }) => {
      const startedAt = dayjs(req.body.startedAt);
      const endedAt = dayjs(value);
      if (startedAt.isAfter(endedAt)) {
        throw new Error("End date must be greater than start date");
      }
      return true;
    }),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware for validating update todo requests
exports.validateUpdateTodo = [
  // Validate task field
  body("task").optional().notEmpty().withMessage("Task is required"),

  // Validate startedAt field
  body("startedAt")
    .optional()
    .custom((value, { req }) => {
      // If updatedAt is provided, ensure startedAt is also provided
      if (req.body.updatedAt && !req.body.startedAt) {
        throw new Error("Started date is required when updating the todo");
      }
      return true;
    }),

  // Validate endedAt field
  body("endedAt")
    .optional()
    .custom((value, { req }) => {
      const startedAt = dayjs(req.body.startedAt);
      const endedAt = dayjs(value);
      if (startedAt.isAfter(endedAt)) {
        throw new Error("End date must be greater than start date");
      }
      return true;
    }),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
