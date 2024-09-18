import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import employeeRoutes from "./routes/employee.route.js";

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

app.use(express.json({ limit: '10mb' })); //allows to accept json in req.body

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server running on http://localhost:" + PORT);
});
