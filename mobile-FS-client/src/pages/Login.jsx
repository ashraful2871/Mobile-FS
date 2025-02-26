import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ButtonLoading from "../components/ButtonLoading";
import Lottie from "lottie-react";
import loginAni from "../../public/login.json";
const Login = () => {
  const { signInUser, checkAuthStatus } = useAuth();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const mobileNumber = formData.get("mobile");
    const pin = formData.get("pin");

    try {
      const result = await signInUser(mobileNumber, pin);
      // console.log(result);
      toast.success("Login successful!");
      navigate(location?.state ? location.state : "/");
      checkAuthStatus();
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex md:w-1/2 bg-purple-50 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="w-full max-w-sm">
            <Lottie animationData={loginAni} loop={true} />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-sm w-full">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Welcome back
          </h1>
          <p className="text-gray-500 mb-6 text-center">
            Please enter your details
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="number"
                name="mobile"
                placeholder="Enter your number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Pin</label>
              <input
                type="password"
                name="pin"
                placeholder="Enter your pin"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            {loading ? (
              <ButtonLoading />
            ) : (
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
              >
                Sign in
              </button>
            )}
          </form>
          <p className="mt-4 text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/sign-up" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
