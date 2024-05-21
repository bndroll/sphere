import { axiosInstance } from "@/api";
import { AuthResponse } from "@/api/services/auth/auth.types";

export const findMe = async (axios = axiosInstance) => {
  const { data } = await axios.get<AuthResponse>("user/find-me");

  return data;
};
