import { useAuth } from "@clerk/nextjs";
import { createApiClientWithToken } from "@/lib/apiClientFactory";
import { useMemo } from "react";

export const useApiClient = () => {
  const { getToken } = useAuth();

  const apiService = useMemo(
    () => ({
      get: async (url: string, config?: any) => {
        const token = await getToken();
        const apiClient = createApiClientWithToken(token);
        return apiClient.get(url, config);
      },

      post: async (url: string, data?: any, config?: any) => {
        const token = await getToken();
        const apiClient = createApiClientWithToken(token);
        return apiClient.post(url, data, config);
      },

      put: async (url: string, data?: any, config?: any) => {
        const token = await getToken();
        const apiClient = createApiClientWithToken(token);
        return apiClient.put(url, data, config);
      },

      delete: async (url: string, config?: any) => {
        const token = await getToken();
        const apiClient = createApiClientWithToken(token);
        return apiClient.delete(url, config);
      },
    }),
    [getToken]
  );

  return apiService;
};
