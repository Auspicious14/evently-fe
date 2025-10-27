import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "sonner";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:12000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    let normalizedError = {
      status: error.response?.status || 500,
      message: "Something went wrong. Please try again.",
      errors: [] as { field?: string; message: string }[],
      raw: error.response?.data || null,
    };

    if (error.response?.data) {
      const data: any = error.response.data;

      if (data.message) {
        normalizedError.message = data.message;
      }

      if (Array.isArray(data.errors)) {
        normalizedError.errors = data.errors;
      }
    } else if (error.message) {
      normalizedError.message = error.message;
    }

    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        toast.error("Session expired. Please login again.");
        // window.location.href = "/auth/login";
      }
    }

    if (normalizedError.message) {
      toast.error(normalizedError.message);
    }

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
