import { useContext } from "react";
import { AuthContext, IAuthContext } from "../utils/AuthProvider";

export const useAuth = () => useContext(AuthContext) as IAuthContext;
