import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import employeeRoutes from "./routes/employee.route.js";
import authMiddleware from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); //allows to accept json in req.body

//auth middleware for api routes only
app.use("/api/auth", authRoutes);
app.use("/api", authMiddleware);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server running on http://localhost:" + PORT);
});
