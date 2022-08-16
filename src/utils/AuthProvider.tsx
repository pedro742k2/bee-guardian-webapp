import { createContext, useState } from "react";
import { auth, ICredentials } from "../services/signin";
import { getUserProfile, IProfile } from "../services/getUserProfile";
import { register, INewUser } from "../services/register";
import { IChildren } from "../Types/Children";

interface IUser {
  error?: string;
  token: string;
  refresh_token: string;
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
  updateUserProfile: (token: string, refresh_token: string) => Promise<void>;

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
  refresh_token: "",
  profile: {
    username: "",
    email: "",
    name: "",
    phone: null,
    join_date: "",
  },
};

export const storeTokenInStorage = (
  remember: boolean,
  token: string,
  refreshToken: string
) => {
  if (remember) {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh_token", refreshToken);
  } else {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("refresh_token", refreshToken);
  }
};

export const getTokenFromStorage = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const refreshToken =
    localStorage.getItem("refresh_token") ||
    sessionStorage.getItem("refresh_token");

  if (!token || !refreshToken) return { error: true };

  return { token, refreshToken };
};

export const removeTokenFromStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("refresh_token");
};

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: IChildren) => {
  const [user, setUser] = useState<IUser>(emptyUserState);

  const updateUserProfile = async (token: string, refreshToken: string) => {
    const { error, newToken, newRefreshToken, profile } = await getUserProfile(
      token,
      refreshToken
    );

    if (error) {
      alert("Access denied.");
      return document.location.replace("/");
    }

    if (profile)
      setUser({
        token: newToken || token,
        refresh_token: newRefreshToken || refreshToken,
        profile,
      });
  };

  const isAuthenticated = (): boolean => {
    if (user.token) return true;

    const { error, token, refreshToken } = getTokenFromStorage();

    if (error) {
      return false;
    }

    if (token && refreshToken) {
      updateUserProfile(token, refreshToken);
      return true;
    }

    return false;
  };

  const handleLogin = async (credentials: ILogin) => {
    const { remember, ...fields } = credentials;
    const userInfo: IUser = await auth(fields);

    const { error } = userInfo;

    if (error) return { success: false, error: error };

    storeTokenInStorage(remember, userInfo.token, userInfo.refresh_token);

    setUser(userInfo);
    return { success: true, userInfo };
  };

  const handleRegister = async (credentials: IRegister) => {
    const { remember, ...fields } = credentials;
    const userInfo: IUser = await register(fields);

    const { error } = userInfo;

    if (error) return { success: false, error };

    storeTokenInStorage(remember, userInfo.token, userInfo.refresh_token);
    setUser(userInfo);
    return { success: true, userInfo };
  };

  const handleLogout = () => {
    removeTokenFromStorage();
    setUser(emptyUserState);
    return document.location.replace("/signin");
  };

  const value: IAuthContext = {
    user,
    isAuthenticated,
    updateUserProfile,
    onLogin: handleLogin,
    onRegister: handleRegister,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
