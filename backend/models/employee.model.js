import mongoose from "mongoose";
import Joi from "joi";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

const validateEmployee = (employee) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    mobile: Joi.string().required().label("Mobile"),
    designation: Joi.string().required().label("Designation"),
    gender: Joi.string().required().label("Gender"),
    course: Joi.string().required().label("Course"),
    image: Joi.string().required().label("Image"),
  });
  return schema.validate(employee);
};

export { Employee, validateEmployee };
