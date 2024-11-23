import axios from "axios";

const BASE_URL = "/api";
// const BASE_URL = "백엔드 api";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data;
};

export const logout = async () => {
  await axios.post(`${BASE_URL}/logout`);
};
