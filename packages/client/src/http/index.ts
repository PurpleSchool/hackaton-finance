import axios, { AxiosRequestConfig } from "axios";

const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const request = async <T>(
  config: AxiosRequestConfig,
  token?: string
) => {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await $api.request<T>({
    ...config,
    headers,
  });
  return response;
};
