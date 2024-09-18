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

  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:5000/api/employees");
    const data = await res.json();
    setEmployees(data.data);
  };

  const deleteEmployee = async (id) => {
    try {
      const url = "http://localhost:5000/api/employees/" + id;
      const { data: res } = await axios.delete(url);
      console.log(res.message);
      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-semibold bg-yellow-300 mb-5 sm:mb-10 px-5 py-2">
        Employee List
      </h2>
      <div className="flex flex-col items-center justify-center gap-5 px-5">
        {employees.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">UID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile No</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Create Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
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
                  <TableCell>{employee.createdAt}</TableCell>
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
          <h2 className="text-xl mt-5">No Employees Found</h2>
        )}
      </div>
    </div>
  );
};

export default Employees;
