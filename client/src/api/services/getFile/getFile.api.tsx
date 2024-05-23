import { axiosInstance } from "@/api";

export const upload = async (url: string, axios = axiosInstance) => {
  const { data } = await axios.get<{ as: string }>(`account/url/`);
  return data;
};
