import { axiosInstance } from "@/api";
import { UserProfile } from "@/utils/context/UserRegistryContext";

export const findProfiles = async (axios = axiosInstance) => {
  const { data } = await axios.get<UserProfile[]>(
    "account/profile/find-by-user",
  );

  return data;
};
