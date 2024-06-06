import { UserProfile } from "@/utils/context/UserRegistryContext";
import { axiosInstance } from "@/api";

export const reccomendationEvents = async (
  profileId: string,
  axios = axiosInstance,
) => {
  const { data } = await axios.post<UserProfile>("swipe/find-profiles", {
    profileId,
  });

  return data;
};
