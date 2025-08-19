import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input className="w-full p-2 border rounded mb-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-2 border rounded mb-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
}
