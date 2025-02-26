import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import signAni from "../../public/signUp.json";
import Lottie from "lottie-react";

const SignUp = () => {
  const { signUpUser } = useAuth();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const pin = formData.get("pin");
    const nidNumber = formData.get("nid");
    const mobileNumber = formData.get("mobile");
    // console.log({
    //   name,
    //   email,
    //   password,
    //   nidNumber,
    //   mobileNumber,
    //   role,
    // });
    const formInfo = {
      email,
      name,
      nidNumber,
      mobileNumber,
      role,
      pin,
    };
    try {
      signUpUser(formInfo);
      toast.success("Registration successful!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);

      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Animation (Hidden on Small Screens) */}
      <div className="hidden md:flex md:w-1/2 bg-purple-50 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Lottie animationData={signAni} loop={true} />
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-sm w-full">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Create your account
          </h1>
          <p className="text-gray-500 mb-6 text-center">
            Please enter your details
          </p>

          <form onSubmit={handleSubmit}>
            {/* name */}
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Pin Number */}
            <div className="mb-4">
              <label className="block text-gray-700">Pin</label>
              <input
                type="password"
                name="pin"
                placeholder="Enter your 5  digit PIN "
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/*Mobile Number  */}
            <div className="mb-4">
              <label className="block text-gray-700">mobile Number</label>
              <input
                type="number"
                name="mobile"
                placeholder="Enter your mobile number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* email address */}
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Account Type */}
            <div className="mb-4">
              <label className="block text-gray-700">Account Type</label>
              <select
                className="select select-bordered w-full  border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                name="category"
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" disabled selected>
                  Select a account type
                </option>
                <option value="agent">Agent</option>
                <option value="user">User</option>
              </select>
            </div>

            {/* NID Number */}
            <div className="mb-4">
              <label className="block text-gray-700">NID Number</label>
              <input
                type="number"
                name="nid"
                placeholder="Enter your NID number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="border-b w-full"></div>
            <span className="mx-3 text-gray-400">or</span>
            <div className="border-b w-full"></div>
          </div>

          <button
            //onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center border py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle className="mr-2 text-2xl" /> Sign up with Google
          </button>

          <p className="mt-4 text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
