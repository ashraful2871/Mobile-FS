import React from "react";
import SendMoney from "../transection/SendMoney";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoMdCard } from "react-icons/io";
import { MdAccountBalance } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-extrabold leading-tight mb-4">
          Welcome to MFS
        </h1>
        <p className="text-xl font-medium mb-6">
          Your reliable partner for seamless mobile financial services.
        </p>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card w-full bg-white shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 transform hover:scale-105 border-2">
            <FaMoneyBillWave className="text-4xl text-blue-600 mx-auto" />
            <h3 className="text-xl text-center mt-4 font-semibold text-black">
              Send Money
            </h3>
            <p className="text-center mt-2 text-gray-700">
              Quickly and securely send money to anyone, anytime, anywhere.
            </p>
            <Link to="/send-money">
              <button className="btn btn-sm btn-outline w-full mt-4 hover:bg-blue-500 hover:text-white transition-all">
                Learn More
              </button>
            </Link>
          </div>

          <div className="card w-full bg-white shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 transform hover:scale-105 border-2">
            <IoMdCard className="text-4xl text-green-600 mx-auto" />
            <h3 className="text-xl text-center mt-4 font-semibold text-black">
              Cash In/Out
            </h3>
            <p className="text-center mt-2 text-gray-700">
              Deposit or withdraw funds easily through our service.
            </p>
            <Link to="cash-out">
              <button className="btn btn-sm btn-outline w-full mt-4 hover:bg-green-500 hover:text-white transition-all">
                Learn More
              </button>
            </Link>
          </div>

          <div className="card w-full bg-white shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 transform hover:scale-105 border-2">
            <MdAccountBalance className="text-4xl text-yellow-600 mx-auto" />
            <h3 className="text-xl text-center mt-4 font-semibold text-black">
              Mobile Banking
            </h3>
            <p className="text-center mt-2 text-gray-700">
              Effortlessly manage your finances with our mobile banking
              solution.
            </p>
            <Link to="/soon">
              <button className="btn btn-sm btn-outline w-full mt-4 hover:bg-yellow-500 hover:text-white transition-all">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features/CTA Section */}
      <div className="bg-blue-600 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Why Choose MFS?
        </h2>
        <p className="text-lg text-white mb-6">
          Fast, secure, and hassle-free mobile financial services, available at
          your fingertips.
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>© 2025 MFS. All rights reserved.</p>
          <p className="text-sm mt-2">
            <a href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            {" | "}
            <a href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
