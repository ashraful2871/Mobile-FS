import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const mobileNumber = formData.get("mobile");
    const pin = formData.get("pin");
    const loginInfo = {
      mobileNumber: mobileNumber,
      pin: pin,
    };
    console.log(loginInfo);
    console.log(import.meta.env.VITE_API_URL);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/login`, loginInfo, {
        withCredentials: true,
      });
      toast.success("Login successful!");
    } catch (error) {
      // toast.error(error.response?.data?.message || "Login failed");
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex md:w-1/2 bg-purple-50 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* <Lottie animationData={login} loop={true} /> */}
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
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="border-b w-full"></div>
            <span className="mx-3 text-gray-400">or</span>
            <div className="border-b w-full"></div>
          </div>

          <button
            //onClick={handleGoogleSignUP}
            className="w-full flex items-center justify-center border py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle className="mr-2 text-2xl" /> Sign in with Google
          </button>

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
