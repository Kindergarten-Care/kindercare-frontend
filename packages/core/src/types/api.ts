/** Standard API response wrapper used across all KinderCare endpoints. */
export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
