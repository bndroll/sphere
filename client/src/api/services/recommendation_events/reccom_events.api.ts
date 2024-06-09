import { axiosInstance } from "@/api";
import { ProfileCardType } from "@/api/services/reccomendation/recomendation.types";

export const reccomendationEvents = async (
  profileId: string,
  axios = axiosInstance,
) => {
  const { data } = await axios.post<ProfileCardType[]>("swipe/find-profiles", {
    profileId,
  });

  return data;
};
