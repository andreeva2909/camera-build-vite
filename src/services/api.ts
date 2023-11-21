import axios, {AxiosInstance, AxiosError} from 'axios';
import {toast} from 'react-toastify';

type DetailMessageType = {
  type: string;
  message: string;
}

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {

  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error) {
        const detailMessage = (error);
        toast.error(detailMessage.message, {
          autoClose: 4000,
          toastId: detailMessage.message,
        });
      }
      throw error;
    }
  );

  return api;
};
