import apiClient from "./axiosClient";

const version = "/v1";

export const signup = async (email: string, password: string) => {
  const response = await apiClient.post(`${version}/user`, { email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await apiClient.post(
    `${version}/user/login`,
    {
      email,
      password,
    },
    { withCredentials: true },
  );
  return response.data;
};

export const getUserInfo = async () => {
  try {
    const response = await apiClient.get(`${version}/user/me`);
    return response.data;
  } catch (error) {
    console.error("유저 정보 가져오기 실패:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post(`${version}/user/logout`);
    return response.data;
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};

export const reIssue = async () => {
  try {
    const response = await apiClient.post(`${version}/user/re-issue`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
