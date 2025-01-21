import axios from "axios";

const version = "/v1";

export const likeProject = async (id: number, token: string) => {
  const BASE_URL = "/api"; // rewrite하기 위해 localhost의 api로 보내는 것

  const apiClient = axios.create({
    baseURL: BASE_URL,
  });

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await apiClient.post(
      `${version}/like/${id}`,
      {},
      {
        headers: headers,
      },
    );
    console.log(response);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
