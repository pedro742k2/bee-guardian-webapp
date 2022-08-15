import { URL } from "./api";

export interface ICredentials {
  user: string;
  password: string;
}

export const auth = async (credentials: ICredentials) => {
  const data = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const res = await data.json();

  return res;
};
