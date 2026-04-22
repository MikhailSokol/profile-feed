import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

export const BASE_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export type ErrorApp = {
  message?: {
    code?: string;
    message?: string;
  };
  statusCode?: number;
};

let onError: ((message: ErrorApp) => void) | null = null;

export const setGlobalErrorHandler = (handler: (message: ErrorApp) => void) => {
  onError = handler;
};

const getMessage = (error: AxiosError) => {
  const data = error.response?.data as ErrorApp;
  return data;
};

let isRefreshing = false;
let queue: Array<() => void> = [];

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;

    if (error.response?.status === 401 && originalRequest.url?.includes("/auth/login")) {
      onError?.(getMessage(error));
      return Promise.reject(error);
    }
    if (!error.response || error.response.status !== 401) {
      onError?.(getMessage(error));
      return Promise.reject(error);
    }

    // защита от бесконечного retry
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // если уже идёт refresh → ставим в очередь
    if (isRefreshing) {
      return new Promise((resolve) => {
        queue.push(() => resolve(api(originalRequest)));
      });
    }

    isRefreshing = true;

    try {
      await api.post("/auth/refresh");

      queue.forEach((cb) => cb());
      queue = [];

      return api(originalRequest);
    } catch (err) {
      queue = [];
      window.location.href = "/";

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);
