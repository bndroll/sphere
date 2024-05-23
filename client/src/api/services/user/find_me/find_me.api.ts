import { axiosInstance } from "@/api";
import { UserAccount } from "@/api/services/user/find_me/find_me.types";

export const findMe = async (axios = axiosInstance) => {
  const { data } = await axios.get<UserAccount>("/account/user/find-me");

  return data;
};
