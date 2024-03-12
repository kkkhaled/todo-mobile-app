const express = require("express");
const router = express.Router();

// user actions from controllers
const {
  register,
  logIn,
  getUserData,
} = require("../controllers/authController");

// auth middleware to access req
const { protect } = require("../middleware/protect");

// users routes
router.route("/register").post(register);
router.route("/login").post(logIn);
router.route("/user").get(protect, getUserData);

module.exports = router;
