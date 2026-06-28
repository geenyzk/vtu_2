import axios from 'axios';
import { env } from '../env';
import Cookies from "js-cookie";

export const apiClient = axios.create({
  // Replace with your actual backend API base URL
  baseURL: env("VITE_API_BASE_URL", 'https://api.swiftvtu.com/api/v1'),
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (config.url?.includes("/sanctum/csrf-cookie")) {
    config.baseURL = env("VITE_API_BASE_URL", 'https://api.swiftvtu.com/api/v1').replace("/api/v1", "").replace("/api", "");
  }
  const token = Cookies.get("XSRF-TOKEN");
  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }
  return config;
});


// Request Interceptor: Automatically attach the auth token to outgoing requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// export const formatApiResponse = async <T>(
//   apiPromise: Promise<AxiosResponse<T>>
// ): Promise<FormattedResponse<T>> => {
//   try {
//     // Wait for the Axios request to finish
//     const response = await apiPromise;

//     return {
//       success: true,
//       data: response.data,
//       // Laravel often sends a message in the response body, fallback to default if not present
//       message: (response.data as any)?.message || "Request successful",
//       errors: null,
//       statusCode: response.status,
//     };
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       // Handle Axios HTTP errors (e.g., 401, 419, 422, 500)
//       const data = error.response?.data;
      
//       return {
//         success: false,
//         data: null,
//         message: data?.message || error.message || "An unexpected error occurred.",
//         // Laravel puts validation errors inside an 'errors' object
//         errors: data?.errors || null, 
//         statusCode: error.response?.status || null,
//       };
//     }

//     // Handle non-Axios generic JavaScript errors (e.g., network failure, coding error)
//     return {
//       success: false,
//       data: null,
//       message: error instanceof Error ? error.message : "Unknown error occurred",
//       errors: null,
//       statusCode: 500,
//     };
//   }
// };