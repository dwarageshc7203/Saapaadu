import { useState } from "react";
import { apiBase } from "@/api/axios";
import { UserCheck } from "lucide-react";

export default function Signup() {
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const oauthBase = apiBase.endsWith("/api") ? apiBase : `${apiBase}/api`;
  const oauthUrl = `${oauthBase}/oauth2/authorization/google?role=${role}`;

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
            <div className="space-y-6">
              <div className="form-group">
                <label htmlFor="role" className="form-label">Role</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as "customer" | "vendor")}
                    className="form-input pl-10"
                    required
                  >
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => (window.location.href = oauthUrl)}
                className="btn btn-primary w-full"
                style={{ backgroundColor: "#00bcd4" }}
              >
                Continue with Google
              </button>
            </div>

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
