// Importing Express
const express = require("express");
const app = express();

// Importing Mongoose
const mongoose = require("mongoose");

// Importing Routes
const tasksRouter = require("./routes/tasks");

// Dotenv
const dotenv = require("dotenv");
dotenv.config();

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routing
app.use("/api/tasks", tasksRouter);

const port = process.env.PORT;

// Connect to database
const DB_URI = process.env.MONGO_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Server is active & running on http://localhost:${port} & connected to database.`,
      );
    });
  })
  .catch((err) => console.error("DB Error: ", err.message));
