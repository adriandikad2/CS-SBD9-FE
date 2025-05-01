"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    if (token) {
      fetchUserProfile(token)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(response.data)
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
      localStorage.removeItem("token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/user/login", { email, password })
      const { token, user } = response.data
      localStorage.setItem("token", token)
      setUser(user)
      toast.success("Login successful!")
      return true
    } catch (error) {
      console.error("Login failed:", error)
      toast.error(error.response?.data?.message || "Login failed")
      return false
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post("/api/user/register", userData)
      toast.success("Registration successful! Please log in.")
      return true
    } catch (error) {
      console.error("Registration failed:", error)
      toast.error(error.response?.data?.message || "Registration failed")
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    toast.success("Logged out successfully")
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
