import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { isDev } from '../../../config/env';

const REQUEST_TIMEOUT_MS = 10000;

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: REQUEST_TIMEOUT_MS,
      headers: { 'Content-Type': 'application/json' },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (isDev) {
          console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      (error) => {
        if (isDev) console.error('[API Request Error]', error);
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (isDev) {
          console.log(`[API] Response ${response.status} ${response.config.url}`);
        }
        return response;
      },
      (error) => {
        const message = error.response?.data?.message ?? error.message ?? 'Unknown error';
        if (isDev) console.error('[API Response Error]', message);
        return Promise.reject(new Error(message));
      },
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }
}

export const newsApiClient = new ApiClient('https://newsapi.org/v2');
