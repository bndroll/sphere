import { axiosInstance } from "@/api";

export const upload = async (
  file: File,
  bucket: string = "picture",
  axios = axiosInstance,
) => {
  const { data } = await axios.post<string>(
    "account/s3/upload",
    {
      file: file,
      bucket: bucket,
    },
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return data;
};
