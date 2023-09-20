import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (
    loading === false &&
    (isAuthenticated || (user.role === "admin" && user.role !== "admin"))
  ) {
    return <Outlet />;
  }

  if (!isAuthenticated) return <Navigate to="/login" />;
};

export default ProtectedRoute;
