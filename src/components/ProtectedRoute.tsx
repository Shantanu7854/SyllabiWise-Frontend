import { Navigate } from "react-router-dom";
import { getToken } from "../utils/jwt";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
};
