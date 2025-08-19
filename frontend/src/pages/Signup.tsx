import { useState } from "react";
import { api } from "@/api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", form);
      alert("Signup successful!");
      navigate("/login");
      console.log(res.data);
    } catch (err) {
      alert("Signup failed. Check console.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
        >
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 py-2 rounded font-semibold"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
