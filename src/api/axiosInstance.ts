import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

import { useUserStore } from '@/stores/userStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const newConfig = { ...config };
    const { accessToken } = useUserStore.getState();

    // 로그인, 회원가입 등 토큰이 필요 없는 API
    const publicApis = ['/users/login', '/users/signup/'];

    if (newConfig.url && publicApis.includes(newConfig.url)) {
      return newConfig;
    }

    if (accessToken) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return newConfig;
  },
  error => {
    throw error;
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    const excludedApis = ['/users/password/verify/'];

    if (
      error.response?.status === 401 &&
      !originalRequest.isRetry &&
      !excludedApis.includes(originalRequest.url)
    ) {
      originalRequest.isRetry = true;

      const { refreshToken, login, logout } = useUserStore.getState();

      if (refreshToken) {
        try {
          const response = await axios.post('/api/v1/auth/refresh/', {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.access;

          const { user } = useUserStore.getState();
          if (user) {
            login(user, newAccessToken, refreshToken);
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          return await axiosInstance(originalRequest);
        } catch (refreshError) {
          logout();
          window.location.href = '/auth/login';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
