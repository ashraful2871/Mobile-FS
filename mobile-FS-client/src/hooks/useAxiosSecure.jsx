import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut, user } = useAuth();

  useEffect(() => {
    if (user) {
      const interceptor = axiosSecure.interceptors.response.use(
        (res) => res,
        async (error) => {
          console.log("Error caught from axios interceptor-->", error);

          if (
            error.response?.status === 401 ||
            error.response?.status === 403
          ) {
            await logOut(); // Ensure logout happens before navigating
            navigate("/login", { replace: true });
          }

          return Promise.reject(error);
        }
      );
      // Cleanup to remove duplicate interceptors
      return () => {
        axiosSecure.interceptors.response.eject(interceptor);
      };
    }
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
