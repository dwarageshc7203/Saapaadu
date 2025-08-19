// src/pages/DashboardRedirect.tsx
import { Navigate } from "react-router-dom";
import { useAuth} from "@/context/AuthContext";
import type { Role } from "@/context/AuthContext";  // 👈 type-only import


export default function DashboardRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role as Role) {
    case "customer":
      return <Navigate to="/customer/dashboard" replace />;
    case "vendor":
      return <Navigate to="/vendor/dashboard" replace />;
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}
