import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "sonner";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:12000",
});

apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
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

      if (Array.isArray(data.message)) {
        normalizedError.message = data.message[0];
      } else if (data.message) {
        normalizedError.message = data.message;
      }

      if (Array.isArray(data.errors)) {
        normalizedError.errors = data.errors;
      }
    } else if (error.message) {
      normalizedError.message = error.message;
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        toast.error("Session expired. Please login again.");
      }
    }
    // (these are likely navigation to non-existent pages)
    else if (error.response?.status === 404) {
      // Only show toast for non-GET requests or explicit API calls
      if (error.config?.method !== 'get') {
        toast.error(normalizedError.message);
      }
    }
    // Handle 403 Forbidden - only show for actual forbidden resources, not missing pages
    else if (error.response?.status === 403) {
    
      const isApiCall = error.config?.url?.startsWith('/api') || 
                        error.config?.baseURL?.includes('localhost:12000');
      
      if (isApiCall && normalizedError.message) {
        toast.error(normalizedError.message);
      }
    }
  
    else if (normalizedError.message && error.response?.status !== 404) {
      toast.error(normalizedError.message);
    }

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
