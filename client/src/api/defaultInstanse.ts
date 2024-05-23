import axios, { CreateAxiosDefaults } from "axios";

export const createDefaultAxios = () => {
  const defaultAxios: CreateAxiosDefaults = {
    baseURL: "https://sphereapp.ru/api",
  };
  const axiosInstance = axios.create(defaultAxios);

  axiosInstance.interceptors.request.use(
    (request) => {
      const token = localStorage.getItem("tcn");
      if (token) {
        request.headers.set("Authorization", `Bearer ${token}`);
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
