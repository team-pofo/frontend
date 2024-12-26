import axios from "axios";

const version = "/v1";

export const stackAutoComplete = async (word: string) => {
  const BASE_URL = "/api"; // rewrite하기 위해 localhost의 api로 보내는 것

  const apiClient = axios.create({
    baseURL: BASE_URL,
  });

  try {
    const response = await apiClient.get(`${version}/tech-stack/autocomplete`, {
      params: { query: word },
    });

    const autocomplete = response.data.data.autocomplete;
    if (response.data.success) {
      return autocomplete;
    }
    return autocomplete;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
