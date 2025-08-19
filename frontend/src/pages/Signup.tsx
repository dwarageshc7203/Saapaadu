import { useState } from "react";
import { api } from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/signup", form);

      // Expecting backend to return a token on signup
      if (data.access_token) {
        await login(data.access_token); // save token + fetch user
        navigate("/dashboard"); // go directly to dashboard
      } else {
        // If your backend doesn’t return token, fallback to login page
        alert("Signup successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        {error && (
          <p className="text-red-400 text-sm mb-2">
            {error}
          </p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
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
          required
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
