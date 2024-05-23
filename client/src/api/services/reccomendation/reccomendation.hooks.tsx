import { axiosInstance } from "@/api";
import { UseQueryOptions } from "@tanstack/react-query";
import { getReccomendation } from "@/api/services/reccomendation/recomendation.api";

export const getReccomendationsQueryOpts = (
  axios = axiosInstance,
): UseQueryOptions<any> => ({
  queryKey: ["product"],
  queryFn: () => getReccomendation(axios),
});
