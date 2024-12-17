import apiClient from "./axiosClient";

export const signup = async (email: string, password: string) => {
  const response = await apiClient.post("/user", { email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/user/login", {
    email,
    password,
  });
  return response.data;
};

export const getUserInfo = async () => {
  try {
    const response = await apiClient.get("/user/me");
    return response.data;
  } catch (error) {
    console.error("유저 정보 가져오기 실패:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post("/user/logout");
    return response.data;
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};

export const reIssue = async (email: string, password: string) => {
  const response = await apiClient.post("/user/re-issue", {
    email,
    password,
  });
  return response.data;
};
