import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const fetchEmployees = async () => {
    let url;
    if (import.meta.env.PROD) {
      url = "/api/auth";
    } else {
      url = `http://localhost:5000/api/employees`;
    }
    const res = await fetch(url, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    setEmployees(data.data);
  };

  const deleteEmployee = async (id) => {
    try {
      let url;
      if (import.meta.env.PROD) {
        url = "/api/auth";
      } else {
        url = `http://localhost:5000/api/employees/${id}`;
      }
      const { data: res } = await axios.delete(url, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      console.log(res.message);
      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedEmployees = [...employees]
    .filter((employee) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return (
        employee.name.toLowerCase().includes(lowerSearchTerm) ||
        employee.email.toLowerCase().includes(lowerSearchTerm) ||
        employee._id.includes(lowerSearchTerm) ||
        employee.createdAt.includes(lowerSearchTerm)
      );
    })
    .sort((a, b) => {
      if (sortConfig.key) {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.direction === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      }
      return 0;
    });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-semibold bg-yellow-300 mb-5 sm:mb-10 px-5 py-2">
        Employee List
      </h2>
      <Link to="/employees/create">
        <Button className="ml-5">Add</Button>
      </Link>
      <div className="flex flex-col justify-center gap-5 px-5">
        <p className="text-right font-semibold">
          Search
          <span>
            <input
              type="text"
              placeholder="Search by name, email, ID, or date"
              value={searchTerm}
              onChange={handleSearch}
              className="mb-5 ml-2 px-4 py-2 border rounded-md"
            />
          </span>
        </p>
        {sortedEmployees.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-200">
                <TableHead
                  className="w-[100px] cursor-pointer"
                  onClick={() => handleSort("_id")}
                >
                  UID{" "}
                  {sortConfig.key === "_id"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </TableHead>
                <TableHead>Image</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name{" "}
                  {sortConfig.key === "name"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Email{" "}
                  {sortConfig.key === "email"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </TableHead>
                <TableHead>Mobile No</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Course</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  Create Date{" "}
                  {sortConfig.key === "createdAt"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEmployees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{employee._id}</TableCell>
                  <TableCell>
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.mobile}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.gender}</TableCell>
                  <TableCell>{employee.course}</TableCell>
                  <TableCell>
                    {employee.createdAt &&
                      new Date(employee.createdAt)
                        .toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/ /g, "-")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center items-center">
                      <Link to={`/employees/edit/${employee._id}`}>
                        <Button variant={"link"} className="text-blue-500">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => deleteEmployee(employee._id)}
                        variant={"link"}
                        className="text-red-500"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <>
            <h2 className="text-xl mt-5">No Employees Found</h2>
            <Link className="mx-auto" to="/employees/create">
              <Button className="w-full">Add</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Employees;
