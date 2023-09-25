import { Results } from "../interfaces";

const URL = "https://randomuser.me/api/?results=100";

export const getUsers = async (): Promise<Results> => {
  const response = await fetch(URL);
  return await response.json();
};
