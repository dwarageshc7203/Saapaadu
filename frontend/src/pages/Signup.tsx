import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/axios";
import { User, Mail, Lock, UserCheck } from "lucide-react";

interface SignupForm {
  username: string;
  email: string;
  password: string;
  role: "customer" | "vendor";
}

export default function Signup() {
  const [form, setForm] = useState<SignupForm>({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitButtonText, setSubmitButtonText] = useState("Sign Up");
  const [submitButtonStyle, setSubmitButtonStyle] = useState({ backgroundColor: "#00bcd4" });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitButtonText("Creating Account...");
    setSubmitButtonStyle({ backgroundColor: "#0097a7" });
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/signup", form);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create account!");
    } finally {
      setSubmitButtonText("Sign Up");
      setSubmitButtonStyle({ backgroundColor: "#00bcd4" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
      <div className="container max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-primary mb-2">Saapaadu</div>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        {/* Signup Form */}
        <div className="card animate-scale-in">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    className="form-input pl-10"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input pl-10"
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    className="form-input pl-10 pr-10"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Role Field */}
              <div className="form-group">
                <label htmlFor="role" className="form-label">Role</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="form-input pl-10"
                    required
                  >
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>
              </div>

              {/* Messages */}
              {error && (
                <div className="form-error text-center">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-center text-green-600 font-medium">
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full"
                style={submitButtonStyle}
              >
                {submitButtonText}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <a
                href="/login"
                className="btn btn-outline w-full"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6">
          <a href="/" className="text-primary hover:underline text-sm">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
