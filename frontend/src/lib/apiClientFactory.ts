import axios, { AxiosError, AxiosInstance } from "axios";
import https from "https";

const baseApiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

baseApiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized access");
    }
    return Promise.reject(error);
  }
);

export const createApiClientWithToken = (token: string | null) => {
  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.warn("Unauthorized access");
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default baseApiClient;
