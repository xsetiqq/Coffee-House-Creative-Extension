import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleSuccess = (response: AxiosResponse) => response;

const handleError = (error: AxiosError) => {
  console.error(error);
  throw error;
};

api.interceptors.response.use(handleSuccess, handleError);

export { api };
