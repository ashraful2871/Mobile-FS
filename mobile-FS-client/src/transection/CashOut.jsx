import React, { useState } from "react";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CashOut = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleCashOut = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.target);
    const agentPhone = formData.get("agent-number");
    const amount = parseFloat(formData.get("amount"));
    const pin = formData.get("pin");

    const cashOutInfo = { agentPhone, amount, pin };

    try {
      const { data } = await axiosSecure.post(`/cash-out`, cashOutInfo);

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
      <h2 className="text-center text-3xl font-bold text-purple-700">
        Cash Out Money
      </h2>
      <div className="flex justify-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 border border-purple-600">
          <form onSubmit={handleCashOut} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Agent Number</span>
              </label>
              <input
                type="number"
                name="agent-number"
                placeholder="Enter Agent Number"
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Enter cash out amount"
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PIN</span>
              </label>
              <input
                type="password"
                name="pin"
                placeholder="Enter your pin number"
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn font-semibold text-base text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Cash Out"}
              </button>
            </div>

            {/* Display API response message */}
            {message && (
              <p
                className={`mt-4 text-center font-semibold ${
                  message.includes("✅") ? "text-green-600" : "text-red-600"
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

export default CashOut;
