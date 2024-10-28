import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    let url;
    if (import.meta.env.PROD) {
      url = "/api/auth";
    } else {
      url = "http://localhost:5000/api/employees";
    }
    const res = await fetch(url);
    const data = await res.json();
    setEmployees(data.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <h2 className="text-2xl font-semibold bg-yellow-300 px-4 py-2">
        Welcome to Admin Dashboard
      </h2>
      <div className="flex mt-5 sm:mt-10 justify-center items-center">
        <Card>
          <CardHeader>
            <CardTitle>Employees</CardTitle>
            <CardDescription>Total number of Employees</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <h2 className="text-4xl text-center font-semibold">
              {employees ? employees.length : "0"}
            </h2>
          </CardContent>
          <CardFooter>
            <Link className="mx-auto" to="/employees/create">
              <Button className="w-full">Add</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
