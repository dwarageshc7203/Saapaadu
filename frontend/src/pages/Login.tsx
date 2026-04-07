import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBase } from "@/api/axios";
import { User } from "lucide-react";

export default function Login() {
  const [role, setRole] = useState<"customer" | "vendor">("customer");

  const oauthBase = apiBase.endsWith("/api") ? apiBase : `${apiBase}/api`;
  const oauthUrl = `${oauthBase}/oauth2/authorization/google?role=${role}`;

  const handleGoogleLogin = () => {
    window.location.href = oauthUrl;
  };

  return (
    <div className="min-h-screen bg-sand px-4 py-16 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Welcome back to Saapaadu</h1>
          <p className="mt-2 text-ink/60">Sign in to your account to continue</p>
        </div>

        <div className="mt-8 rounded-3xl border border-ink/10 bg-white p-8 shadow-xl shadow-amber-100/60">
          <div className="space-y-6">
            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 w-5 -translate-y-1/2 text-gray-400" />
                <select
                  id="role"
                  name="role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value as "customer" | "vendor")}
                  className="form-input pl-10"
                >
                  <option value="customer">Customer</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
            </div>

            <button type="button" onClick={handleGoogleLogin} className="btn btn-primary w-full">
              Continue with Google
            </button>

            <div className="text-center text-sm text-ink/60">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-amber-600 hover:text-amber-500">
                Sign up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
