import axios, { AxiosResponse, AxiosError } from "axios";
import { Product } from "../types";

// Set up the base URL for all Axios requests
const API_BASE_URL = "http://localhost:4000/api";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define the structure of your typical API response if needed
interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number; // Include status in the ApiResponse
  // Add other standard response fields
  [key: string]: any;
}

// Extend your ApiResponse for error handling
interface ApiErrorResponse {
  message?: string;
  status: number;
  data?: any;
}

// Define service endpoints
const ApiService = {
  // Example of GET request with error handling
  getProducts: async (
    searchTerm: string,
    supermarket: string
  ): Promise<ApiResponse<Product[]> | ApiErrorResponse> => {
    try {
      const response: AxiosResponse<ApiResponse<Product[]>> =
        await axiosInstance.get("/products", {
          params: { search: searchTerm, supermarket },
        });

      return { data: response.data, status: response.status }; // Include status code in successful response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ApiErrorResponse>;
        if (serverError && serverError.response) {
          // Return error message and status code from server response
          return {
            message: serverError.response.data.message || "An error occurred",
            status: serverError.response.status,
            data: serverError.response.data, // Optional: include additional data from the error response
          };
        }
      }
      // If error does not come from server or Axios
      return { message: "An unexpected error occurred", status: 500 };
    }
  },
};

export default ApiService;
