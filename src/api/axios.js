import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api", // Fallback to /api for local development
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      if (error.response.status === 403) {
        console.error("Access forbidden");
      }
      if (error.response.status >= 500) {
        console.error("Server error");
      }
    } else if (error.request) {
      console.error("Network error");
    } else {
      console.error("Request error", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
