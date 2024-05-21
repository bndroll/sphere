import { UseQueryOptions } from "@tanstack/react-query";
import { axiosInstance } from "@/api";
import { postAuth } from "@/api/services/auth/auth.api";
import {
  AuthResponse,
  TelegramAuthRequest,
} from "@/api/services/auth/auth.types";

export const getProfileQueryOpts = (
  code: TelegramAuthRequest,
  axios = axiosInstance,
): UseQueryOptions<AuthResponse> => ({
  queryKey: ["product", code],
  queryFn: () => postAuth(code, axios),
});
