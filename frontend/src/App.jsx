import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

function App() {
  const user = localStorage.getItem("token");
  return (
    <div className="h-screen">
      <Navbar />
      <Routes>
        {user && <Route path="/" exact element={<HomePage />} />}
        <Route path="/create" exact element={<CreatePage />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/employees" exact element={<Employees />} />
        <Route path="/employees/create" exact element={<AddEmployee />} />
        <Route path="/employees/edit/:id" exact element={<EditEmployee />} />
        <Route path="/" exact element={<Navigate replace to="/login" />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
