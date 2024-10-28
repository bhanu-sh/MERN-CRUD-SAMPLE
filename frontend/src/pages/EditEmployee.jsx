/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();

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

  const fetchEmployee = async () => {
    let url;
    if (import.meta.env.PROD) {
      url = "/api/auth";
    } else {
      url = `http://localhost:5000/api/employees/${id}`;
    }
    const res = await fetch(url, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    setEmployee({
      name: data.data.name,
      email: data.data.email,
      mobile: data.data.mobile,
      designation: data.data.designation,
      gender: data.data.gender,
      course: data.data.course,
      image: data.data.image,
    });
  };

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
        url = `http://localhost:5000/api/employees/${id}`;
      }
      const { data: res } = await axios.put(url, employee, {
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

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  return (
    <div className="flex flex-col gap-2 justify-center">
      <h1 className="bg-yellow-300 text-3xl font-bold px-5 py-2 mb-5">
        Employee Edit
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
              checked={employee.gender === "Male"} // Check if the gender is Male
              onChange={handleChange}
            />

            <Label>Female</Label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={employee.gender === "Female"} // Check if the gender is Female
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
          <div className="flex gap-2 justify-center w-full items-center">
            <img
              src={employee.image}
              alt={employee.name}
              className="w-10 h-10 rounded-full"
            />
            <Input
              type="file"
              name="image"
              id="image-upload"
              accept=".jpg, .jpeg, .png"
              className="col-span-2 w-full"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-1/4 mx-auto" variant={"success"}>
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditEmployee;

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
