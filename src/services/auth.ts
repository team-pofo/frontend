import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// const BASE_URL = "백엔드 api";

export const signup = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/user`, { email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/user/login`, {
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  await axios.post(`${BASE_URL}/user/logout`);
};

export const reIssue = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/user/re-issue`, {
    email,
    password,
  });
  return response.data;
};
