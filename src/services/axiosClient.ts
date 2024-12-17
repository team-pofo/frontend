import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 쿠키 및 인증 정보 포함
});

// 토큰 갱신 여부를 추적하는 변수
let isRefreshing = false;
let failedQueue: Array<() => void> = []; // 실패한 요청 큐

// 요청 인터셉터: 모든 요청에 토큰 자동 포함
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 401 에러 발생 시 리프레시 토큰 사용해 재발급 처리
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이면서 리프레시 토큰으로 재시도한 요청이 아닐 때
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;

          // 리프레시 토큰으로 재발급 요청
          const refreshResponse = await axios.post(
            `${BASE_URL}/user/re-issue`,
            {},
            { withCredentials: true },
          );

          const newAccessToken = refreshResponse.data.accessToken;
          if (newAccessToken) {
            // 상태 업데이트 및 axios 헤더 설정
            useAuthStore.getState().setAccessToken(newAccessToken);

            apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

            // 실패한 요청 재시도
            failedQueue.forEach((cb) => cb());
            failedQueue = [];
          }
        }

        return new Promise((resolve) => {
          failedQueue.push(() => resolve(apiClient(originalRequest)));
        });
      } catch (refreshError) {
        console.error("토큰 재발급 실패:", refreshError);
        // 리프레시 토큰도 없거나 실패한 경우
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 리프레시 토큰도 없는 경우
    return Promise.reject(error);
  },
);

export default apiClient;
