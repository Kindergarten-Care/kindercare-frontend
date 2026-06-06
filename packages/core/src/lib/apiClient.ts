import axios, { type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, SERVER } from '../config/server';
import { tokenStorage } from './tokenStorage';

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
});

// Attach Bearer token to every request
apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Queue of callbacks waiting for a refreshed token
let isRefreshing = false;
let waitingQueue: Array<(token: string) => void> = [];

function drainQueue(token: string) {
  waitingQueue.forEach(cb => cb(token));
  waitingQueue = [];
}

// On 401 — attempt refresh, retry original request, or force logout
apiClient.interceptors.response.use(
  response => response,
  async (error) => {
    const original = error.config as RetryConfig;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      tokenStorage.clearAll();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise(resolve => {
        waitingQueue.push(token => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(original));
        });
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}${SERVER.auth.refresh}`,
        { refreshToken },
      );
      const newToken: string = data.data.accessToken;
      tokenStorage.setAccessToken(newToken);
      drainQueue(newToken);
      original.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(original);
    } catch {
      tokenStorage.clearAll();
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);
