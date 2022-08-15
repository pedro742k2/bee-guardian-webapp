import { URL } from "./api";

export interface IProfile {
  name: string;
  username: string;
  email: string;
  phone: number;
  join_date: string;
}

export const getUserProfile = async (token: string): Promise<IProfile> => {
  const data = await fetch(`${URL}/get-user-profile`, {
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  const res = await data.json();

  return res;
};
