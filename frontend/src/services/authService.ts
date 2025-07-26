import { RegisterRequest } from "@/types/auth";
import { ApiResponse } from "@/types/api-response";
import baseApiClient from "@/lib/apiClientFactory";

export const authService = {
  register: async (
    data: RegisterRequest,
    token?: string
  ): Promise<ApiResponse<object>> => {
    const config = token
      ? {
          headers: { Authorization: `Bearer ${token}` },
        }
      : {};
    const res = await baseApiClient.post("/auth/register", data, config);
    return res.data;
  },
};
