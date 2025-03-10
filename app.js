const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

//cors middleware
app.use(cors());

app.use((req, res, next) => {
  // console.log("Request Method:", req.method);
  // console.log("Request URL:", req.url);
  // console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body); // Log body to check if it is being parsed correctly
  next(); // Pass control to the next middleware or route
});

// Routes
app.use("/api/auth", authRoutes);
app.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server is running" });
});

// Error Handling Middleware
app.use(errorHandler);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
