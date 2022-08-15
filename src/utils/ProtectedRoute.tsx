import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../services/useAuth";
import { IChildren } from "../Types/Children";

export const ProtectedRoute = ({ children }: IChildren) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated())
    return <Navigate to="/signin" replace state={{ from: location }} />;

  return children;
};
