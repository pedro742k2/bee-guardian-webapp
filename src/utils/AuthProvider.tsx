import { createContext, useState } from "react";
import { auth, ICredentials } from "../services/signin";
import { getUserProfile } from "../services/getUserProfile";
import { register, INewUser } from "../services/register";
import { IChildren } from "../Types/Children";

interface IUser {
  error?: string;
  token: string;
  profile: {
    username: string;
    email: string;
    name: string;
    phone: number | null;
    join_date: string;
  };
}

interface ILogin extends ICredentials {
  remember: boolean;
}

interface IRegister extends INewUser {
  remember: boolean;
}

export interface IAuthContext {
  isAuthenticated: () => boolean;
  user: IUser;
  onLogin: (credentials: ILogin) => Promise<
    | {
        success: boolean;
        error: string;
      }
    | {
        success: boolean;
        userInfo: IUser;
      }
  >;
  onRegister: (credentials: IRegister) => Promise<
    | {
        success: boolean;
        error: string;
        userInfo?: undefined;
      }
    | {
        success: boolean;
        userInfo: IUser;
        error?: undefined;
      }
  >;
  onLogout: () => void;
}

const emptyUserState: IUser = {
  token: "",
  profile: {
    username: "",
    email: "",
    name: "",
    phone: null,
    join_date: "",
  },
};

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: IChildren) => {
  const [user, setUser] = useState<IUser>(emptyUserState);

  const updateUserProfile = async (token: string) => {
    const profile = await getUserProfile(token);

    setUser({ token, profile });
  };

  const isAuthenticated = (): boolean => {
    if (user.token) return true;

    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      updateUserProfile(token);
      return true;
    }

    return false;
  };

  const handleLogin = async (credentials: ILogin) => {
    const { remember, ...fields } = credentials;
    const userInfo: IUser = await auth(fields);

    const { error } = userInfo;

    if (error) return { success: false, error: error };

    if (remember) {
      localStorage.setItem("token", userInfo.token);
    } else {
      sessionStorage.setItem("token", userInfo.token);
    }

    setUser(userInfo);
    return { success: true, userInfo };
  };

  const handleRegister = async (credentials: IRegister) => {
    const { remember, ...fields } = credentials;
    const userInfo: IUser = await register(fields);

    const { error } = userInfo;

    if (error) return { success: false, error };

    if (remember) {
      localStorage.setItem("token", userInfo.token);
    } else {
      sessionStorage.setItem("token", userInfo.token);
    }

    setUser(userInfo);
    return { success: true, userInfo };
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(emptyUserState);
    return document.location.replace("/signin");
  };

  const value: IAuthContext = {
    user,
    isAuthenticated,
    onLogin: handleLogin,
    onRegister: handleRegister,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
