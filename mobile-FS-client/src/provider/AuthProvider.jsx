import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to check the user session
  const checkAuthStatus = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
        withCredentials: true, // Make sure the token is sent with the request
      });
      setUser(res.data);
      console.log(res.data); // Update user state if authenticated
    } catch (error) {
      setUser(null); // If an error occurs (invalid token), log out the user
    } finally {
      setLoading(false);
    }
  };

  // Check the auth status when the component mounts (like `onAuthStateChanged`)
  useEffect(() => {
    checkAuthStatus(); // Call the checkAuthStatus function
  }, []); // This effect runs only once on component mount

  // Sign Up
  const signUpUser = async (userData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/sign-up`,
        userData,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Signup failed";
    } finally {
      setLoading(false);
    }
  };

  // Sign In
  const signInUser = async (mobileNumber, pin) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { mobileNumber, pin },
        { withCredentials: true }
      );
      setUser(res.data.user); // Store user data
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        withCredentials: true,
      });
      setUser(null); // Clear user state on logout
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUpUser,
        signInUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
