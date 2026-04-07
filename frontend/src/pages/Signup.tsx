import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBase } from "@/api/axios";
import { UserCheck } from "lucide-react";

export default function Signup() {
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const oauthBase = apiBase.endsWith("/api") ? apiBase : `${apiBase}/api`;
  const oauthUrl = `${oauthBase}/oauth2/authorization/google?role=${role}`;

  return (
    <div className="min-h-screen bg-sand px-4 py-16 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <div className="text-3xl font-semibold">Saapaadu</div>
          <p className="mt-2 text-ink/60">Create your account to get started</p>
        </div>

        <div className="mt-8 rounded-3xl border border-ink/10 bg-white p-8 shadow-xl shadow-amber-100/60">
          <div className="space-y-6">
            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 w-5 -translate-y-1/2 text-gray-400" />
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
            >
              Continue with Google
            </button>

            <div className="text-center text-sm text-ink/60">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-amber-600 hover:text-amber-500">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <Link to="/" className="text-amber-600 hover:text-amber-500">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
