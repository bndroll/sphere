import { axiosInstance } from "@/api";
import { ProfileCardType } from "@/api/services/reccomendation/recomendation.types";

export const getReccomendation = async (
  profileId: string,
  category: string,
  limit?: number,
  axios = axiosInstance,
) => {
  const { data } = await axios.get<ProfileCardType[]>(
    `/recommendations/list?profileId=${profileId}&category=${category}&limit=${limit}`,
  );

  return data;
};
