import { URL } from "./api";

export interface INewUser {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
}

export const register = async (credentials: INewUser) => {
  const data = await fetch(`${URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const res = await data.json();

  return res;
};
