import { axiosInstance } from "@/api";
import { UserProfile } from "@/utils/context/UserRegistryContext";

export const createProfile = async (
  profile: UserProfile,
  axios = axiosInstance,
) => {
  const { data } = await axios.post<UserProfile>("account/profile", profile);

  return data;
};
