import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setUser(res.data.user);
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
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check user session on page load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const authInfo = {
    user,
    loading,
    signUpUser,
    signInUser,
    logOut,
    setUser,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
