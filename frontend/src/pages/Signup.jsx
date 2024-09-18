/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/users`;
      const { user: res } = await axios.post(url, user);
      console.log(res.message);
      navigate("/login");
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
      <h1 className="bg-yellow-400 text-3xl font-bold px-5 py-2 mb-5">
        Signup Page
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full mx-auto sm:w-1/2 md:w-1/3 px-5"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-center">
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            className="col-span-2"
            placeholder="Username"
            value={user.username}
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
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-center">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            className="col-span-2"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-1/4 mx-auto" variant={"success"}>
          Signup
        </Button>
      </form>
    </div>
  );
};

export default Signup;
