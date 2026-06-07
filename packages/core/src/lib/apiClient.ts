import axios, { type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../config/server';
import { getToken, clearSession } from './tokenStorage';

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
});

// Attach Bearer token to every outgoing request
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401 — clear session and notify the app to redirect to login
apiClient.interceptors.response.use(
  response => response,
  (error) => {
    const config = error.config as RetryableConfig;
    if (error.response?.status === 401 && !config?._retry) {
      clearSession();
    }
    return Promise.reject(error);
  },
);
