import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const ProtectedRoute = ({ children }: any) => {

  const location = useLocation();

  return supabase.auth.session() ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export { ProtectedRoute };
