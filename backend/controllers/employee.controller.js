import mongoose from "mongoose";
import { Employee, validateEmployee } from "../models/employee.model.js";

export const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    console.error("Error in getting employees:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Invalid Employee Id");
  }

  try {
    const employee = await Employee.findById(id);
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    console.error("Error in getting employee by id:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { error } = validateEmployee(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let employee = await Employee.findOne({
      email: req.body.email,
    });

    if (employee) return res.status(409).send("Employee already registered.");

    employee = new Employee({
      ...req.body,
    });

    await employee.save();

    res.status(201).send({
      message: "Employee added successfully.",
    });
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Invalid Employee Id");
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedEmployee });
  } catch (error) {
    console.error("Error in updating employee:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Invalid Employee Id");
  }

  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Employee Deleted" });
  } catch (error) {
    console.error("Error in deleting employee:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
