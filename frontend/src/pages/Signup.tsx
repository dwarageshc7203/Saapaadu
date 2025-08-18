import { useState } from "react";
import api from "../services/api";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      alert("Signup successful! You can now login.");
    } catch {
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input className="w-full p-2 border rounded mb-3" type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <input className="w-full p-2 border rounded mb-3" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input className="w-full p-2 border rounded mb-3" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded mb-3">
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>
        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Signup</button>
      </form>
    </div>
  );
}
