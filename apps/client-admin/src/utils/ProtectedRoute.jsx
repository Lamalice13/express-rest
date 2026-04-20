import { Navigate } from "react-router";
import { useState } from "react";

export function ProtectedRoute({ children }) {
  const [isAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });
  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }
  return children;
}
