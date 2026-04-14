
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 20000,
  // If backend uses cookies (session / SSO), make proxy + browser keep them.
  withCredentials: true,
});

export function buildPath(path: string, params: Record<string, string | number>) {
  return Object.entries(params).reduce((current, [key, value]) => {
    return current.replace(`{${key}}`, encodeURIComponent(String(value)));
  }, path);
}

client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    const bearerToken = `Bearer ${token}`;
    config.headers.Authorization = bearerToken;
    config.headers['Admin-Token'] = bearerToken;
  }
  // Ensure cookies are sent even if callers override config partially.
  config.withCredentials ??= true;
  return config;
});

client.interceptors.response.use(
  (response) => {
    const payload = response.data as { success?: boolean; message?: string } | undefined;
    if (payload && payload.success === false) {
      const businessError = new Error(payload.message || '请求失败') as Error & {
        response?: typeof response;
      };
      businessError.response = response;
      return Promise.reject(businessError);
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
