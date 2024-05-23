import { axiosInstance } from "@/api";
import { CategoryT } from "@/api/services/category/category.types";

export const getCategories = async (axios = axiosInstance) => {
  const { data } = await axios.get<CategoryT[]>("account/category");
  return data;
};
