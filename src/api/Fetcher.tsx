import store from "@/app/store/store";
import axios, { AxiosError } from "axios";

// https://backend1-wcev.onrender.com/api
const axiosClient = axios.create({
  baseURL: "https://backend1-wcev.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const state = store.getState();
  const token = state.user?.userCurrent?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error: AxiosError) {
    return Promise.reject(error.response?.data);
  }
);

export default axiosClient;
