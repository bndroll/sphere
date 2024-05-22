import { axiosInstance } from "@/api";

export const getReccomendation = async (
  profileId: string,
  category: string,
  limit?: number,
  axios = axiosInstance,
) => {
  const { data } = await axios.get<any[]>(
    `/recommendations/list?profileId=${profileId}&category=${category}&limit=${limit}`,
  );

  return data;
};
