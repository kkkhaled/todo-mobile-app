const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE, // Set token expiration time if needed
  });

  res.status(201).json({ message: "User created successfully", token });
});

exports.logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE, // Set token expiration time if needed
  });
  res.json({ token });
});

// get user data
exports.getUserData = asyncHandler(async (req, res) => {
  console.log(req.user);
  // Retrieve user data from request (added by protect middleware)
  const { userId } = req.user;

  // Query user data from database
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true }, // Select specific fields to return
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user });
});
