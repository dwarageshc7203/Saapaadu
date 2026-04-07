import { useState } from "react";
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
    <div className="min-h-screen flex items-center justify-center bg-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-dark">
            Welcome back to Saapaadu
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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

          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-primary w-full"
            >
              Continue with Google
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary hover:text-primary-dark font-medium">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
