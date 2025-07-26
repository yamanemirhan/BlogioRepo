import { useApiClient } from "@/hooks/useApiClient";
import { ApiResponse } from "@/types/api-response";
import { Post } from "@/types/post";

export interface CreatePostRequest {
  Title: string;
  Content: string;
}

export const usePostService = () => {
  const apiClient = useApiClient();

  return {
    create: async (data: CreatePostRequest): Promise<ApiResponse<object>> => {
      const response = await apiClient.post("/posts/create", data);
      return response.data;
    },

    getAll: async (): Promise<ApiResponse<Post[]>> => {
      const response = await apiClient.get("/posts/all");
      return response.data;
    },

    getById: async (id: string): Promise<ApiResponse<Post>> => {
      const response = await apiClient.get(`/posts/${id}`);
      return response.data;
    },
  };
};
