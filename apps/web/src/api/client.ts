import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

const apiClient : AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    response => response,
    error => {
      const customErrorMessage = error.response?.message || 'An unexpected error occurred';
      toast.error(customErrorMessage);  
      return Promise.reject(new Error(customErrorMessage));
    }
);

export type ApiError = {
    error: string;
    status: number;
}

export default apiClient;