import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check the user session
  const checkAuthStatus = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
        withCredentials: true,
      });
      setUser(res.data);
      console.log(res.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  //Check the auth status when the component mounts (like `onAuthStateChanged`)
  useEffect(() => {
    checkAuthStatus();
  }, []);

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
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { mobileNumber, pin },
        { withCredentials: true }
      );
      console.log(res.data);
      setUser(res.data.user);
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
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
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
