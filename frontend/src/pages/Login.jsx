import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url;
      if (import.meta.env.PROD) {
        url = "/api/auth";
      } else {
        url = "http://localhost:5000/api/auth";
      }
      const { data: res } = await axios.post(url, user);
      localStorage.setItem("token", res.data);
      localStorage.setItem("username", user.username);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center">
      <h1 className="bg-yellow-300 text-3xl font-bold px-5 py-2 mb-5">
        Login Page
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
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
