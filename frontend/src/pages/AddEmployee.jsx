/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setEmployee({ ...employee, [input.name]: input.value });
    console.log(input.name, input.value);
  };

  const handleCourseChange = (e) => {
    setEmployee({ ...employee, course: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setEmployee({ ...employee, image: base64 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url;
      if (import.meta.env.PROD) {
        url = "/api/auth";
      } else {
        url = `http://localhost:5000/api/api/employees`;
      }
      const { data: res } = await axios.post(url, employee, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      console.log(res.message);
      navigate("/employees");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center">
      <h1 className="bg-yellow-300 text-3xl font-bold px-5 py-2 mb-5">
        Create Employee
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full mx-auto sm:w-1/2 md:w-1/3 px-5"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-center">
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            className="col-span-2"
            placeholder="Name"
            value={employee.name}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-center">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            className="col-span-2"
            placeholder="Email"
            value={employee.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-center">
          <Label>Mobile</Label>
          <Input
            type="text"
            name="mobile"
            className="col-span-2"
            placeholder="Mobile"
            value={employee.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-center">
          <Label>Designation</Label>
          <select
            name="designation"
            onChange={handleChange}
            value={employee.designation}
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-center">
          <Label>Gender</Label>
          <div className="flex gap-2">
            <Label>Male</Label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
            />

            <Label>Female</Label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-center">
          <Label>Course</Label>
          <div className="flex gap-2">
            <Label>MCA</Label>
            <input
              type="checkbox"
              name="course"
              value="MCA"
              checked={employee.course === "MCA"}
              onChange={handleCourseChange}
            />
            <Label>BCA</Label>
            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={employee.course === "BCA"}
              onChange={handleCourseChange}
            />
            <Label>B.Sc</Label>
            <input
              type="checkbox"
              name="course"
              value="B.Sc"
              checked={employee.course === "B.Sc"}
              onChange={handleCourseChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-center">
          <Label>Image</Label>
          <Input
            type="file"
            name="image"
            id="image-upload"
            accept=".jpg, .jpeg, .png"
            className="col-span-2"
            onChange={handleImageUpload}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-1/4 mx-auto" variant={"success"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddEmployee;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
