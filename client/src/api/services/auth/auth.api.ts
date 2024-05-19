import { axiosInstance } from "@/api";
import {
  AuthResponse,
  TelegramAuthRequest,
} from "@/api/services/auth/auth.types";

export const postAuth = async (
  request: TelegramAuthRequest,
  axios = axiosInstance,
) => {
  const { data } = await axios.post<AuthResponse>(
    "account/auth/sign-in",
    request,
  );

  return data;
};
