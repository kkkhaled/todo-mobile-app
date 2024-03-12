const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const protect = require("../middleware/protect");

// Create a todo
exports.createTodo = async (req, res) => {
  try {
    const { task, startedAt, endedAt } = req.body;
    const userId = req.user.userId; // Retrieve userId from protected route
    const todo = await prisma.todo.create({
      data: {
        task,
        startedAt,
        endedAt,
        userId,
      },
    });
    res.status(201).json({ todo });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all todos for the authenticated user
exports.getUserTodos = async (req, res) => {
  try {
    const userId = req.user.userId; // Retrieve userId from protected route
    const todos = await prisma.todo.findMany({
      where: { userId },
    });
    res.json({ todos });
  } catch (error) {
    console.error("Error fetching user todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, startedAt, endedAt, completed } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: {
        task,
        startedAt,
        endedAt,
        completed,
      },
    });
    res.json({ todo: updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.todo.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
