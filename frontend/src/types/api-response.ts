export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  statusCode: number;
  errors?: string[];
  data?: T;
}
