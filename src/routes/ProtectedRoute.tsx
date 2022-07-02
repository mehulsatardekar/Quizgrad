import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const ProtectedRoute = () => {
  const location = useLocation();

  return supabase.auth.session() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export { ProtectedRoute };
