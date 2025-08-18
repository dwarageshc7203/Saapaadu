import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Routes>
        <Route path="/" element={<h1 className="text-3xl p-6">Welcome to Saapadu</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
