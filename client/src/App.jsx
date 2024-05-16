import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" name="Home" element={<Home />} />
      <Route path="/login" name="Home" element={<Login />} />
      <Route path="/admindash" name="AdminDashboard" element={<AdminDashboard/>} />
    </Routes>
  );
}

export default App;
