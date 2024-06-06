import { UserProfile } from "@/utils/context/UserRegistryContext";
import { axiosInstance } from "@/api";

export enum SwipeType {
  Like = "like",
  Dislike = "dislike",
  Skip = "skip",
}

export const swipeProfile = async (
  profileId: string,
  type: SwipeType,
  recProfileId: string,
  axios = axiosInstance,
) => {
  const { data } = await axios.post<UserProfile>("reactions/create", {
    profileId,
    type,
    recProfileId,
  });

  return data;
};
