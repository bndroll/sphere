import { UserProfile } from "@/utils/context/UserRegistryContext";
import { axiosInstance } from "@/api";

export const updateProfile = async (
  profile: UserProfile,
  id: string,
  axios = axiosInstance,
) => {
  const { data } = await axios.patch<UserProfile>(
    `account/profile/${id}`,
    profile,
  );

  return data;
};
