import {
  removeTokenFromStorage,
  storeTokenInStorage,
} from "../utils/AuthProvider";
import { URL } from "./api";

export interface IProfile {
  name: string;
  username: string;
  email: string;
  phone: number | null;
  join_date: string;
}

const doRememberLogin = () => {
  const remember_token = localStorage.getItem("token");

  return remember_token ? true : false;
};

export const getUserProfile = async (token: string, refreshToken: string) => {
  // Try to fetch the profile
  let profileReq = await fetch(`${URL}/get-user-profile`, {
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  // Function scope variables that will store the new tokens in case the actual is expired
  let globalNewToken = "";
  let globalNewRefreshToken = "";

  // In case of invalid/expired token, try to refresh the token
  if (profileReq.status === 401) {
    // Refresh token route
    const refreshReq = await fetch(`${URL}/refresh-token`, {
      headers: {
        "Content-Type": "application/json",
        refresh_token: refreshToken,
      },
    });

    const refreshRes = await refreshReq.json();

    const {
      error,
      token: newToken,
      refresh_token: newRefreshToken,
    } = refreshRes;

    // If there is an error, it means both token and refresh_token are invalid
    if (error) {
      removeTokenFromStorage();
      return { error: true };
    }

    // Update function scope variables with new tokens
    globalNewToken = newToken;
    globalNewRefreshToken = newRefreshToken;

    // Stores the new tokens on the browser storage
    storeTokenInStorage(doRememberLogin(), newToken, newRefreshToken);

    // Get user profile with the new token
    profileReq = await fetch(`${URL}/get-user-profile`, {
      headers: {
        "Content-Type": "application/json",
        token: newToken,
      },
    });
  }

  const res: IProfile = await profileReq.json();

  return {
    profile: res,
    newToken: globalNewToken,
    newRefreshToken: globalNewRefreshToken,
  };
};
