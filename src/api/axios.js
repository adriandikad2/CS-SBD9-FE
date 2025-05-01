import axios from "axios"

// Create an axios instance with default config
const api = axios.create({
  baseURL: "/api", // Assuming your backend API is served at /api
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }

      // Handle 403 Forbidden errors
      if (error.response.status === 403) {
        console.error("Access forbidden")
      }

      // Handle 500 Server errors
      if (error.response.status >= 500) {
        console.error("Server error")
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network error")
    } else {
      // Something happened in setting up the request
      console.error("Request error", error.message)
    }

    return Promise.reject(error)
  },
)

export default api
