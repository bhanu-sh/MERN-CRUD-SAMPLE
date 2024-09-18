import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployeeById,
  updateEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", getEmployee);
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
