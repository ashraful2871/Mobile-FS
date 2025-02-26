import React, { useState } from "react";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CashIn = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleCashIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.target);
    const userPhone = formData.get("userPhone");
    const amount = parseFloat(formData.get("amount"));
    const agentPin = formData.get("pin");

    const cashInInfo = { userPhone, amount, agentPin };

    try {
      const { data } = await axiosSecure.post(`/cash-in`, cashInInfo);

      setMessage(`✅ ${data.message}`);
      e.target.reset();
    } catch (error) {
      setMessage(
        `❌ ${error.response?.data?.message || "Something went wrong"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-center text-3xl font-bold text-blue-700">
        Cash In Money
      </h2>
      <div className="flex justify-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 border border-blue-600">
          <form onSubmit={handleCashIn} className="card-body">
            {/* User Phone */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Phone</span>
              </label>
              <input
                type="text"
                name="userPhone"
                placeholder="Enter user's phone number"
                className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                required
              />
            </div>

            {/* Amount */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Enter cash-in amount"
                className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                required
              />
            </div>

            {/* PIN */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Agent PIN</span>
              </label>
              <input
                type="password"
                name="pin"
                placeholder="Enter your PIN"
                className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn font-semibold text-base text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Cash In"}
              </button>
            </div>

            {/* Display API response message */}
            {message && (
              <p
                className={`mt-4 text-center font-semibold ${
                  message.includes("✅") ? "text-blue-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CashIn;
