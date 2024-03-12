const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const { protect } = require("./middleware/protect");
const todoController = require("./controllers/taskController");

dotenv.config({ path: ".env" });

const app = express();
app.use(express.json());
app.use(cors());

// test server message
app.get("/", (req, res) => {
  res.send("welcome to todo app");
});

//using routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/tasks", require("./routes/taskRoute"));
let PORT = 4000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold
  );
});
