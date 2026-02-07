import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: "member" | "trainer" | "admin";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If no token, redirect to auth
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // If user role doesn't match required role, redirect to their correct dashboard
  if (userRole !== requiredRole) {
    if (userRole === "trainer") {
      return <Navigate to="/trainer/dashboard" replace />;
    } else if (userRole === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/member/dashboard" replace />;
    }
  }

  // Role matches, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
