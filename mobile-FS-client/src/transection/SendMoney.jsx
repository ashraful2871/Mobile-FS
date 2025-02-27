import { useState } from "react";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import ButtonLoading from "../components/ButtonLoading";
import { useNavigate } from "react-router-dom";

const SendMoney = () => {
  const [loading, setLoading] = useState(false);
  const [recipientPhone, setRecipientPhone] = useState("");
  const [amount, setAmount] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleSendMoney = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosSecure.post(`/send-money`, {
        recipientPhone,
        amount,
      });
      // toast.success("Money sent successfully!");
      toast.success(data?.message);
      setRecipientPhone("");
      setAmount("");
      setLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
      // console.log(error.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-center text-3xl font-bold text-purple-700">
        Send Money
      </h2>
      <div className="flex justify-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 border border-purple-600">
          <form onSubmit={handleSendMoney} className="card-body">
            {/* User Phone */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Phone</span>
              </label>
              <input
                type="number"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="Enter  phone number"
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
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
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                required
              />
            </div>

            <div className="form-control mt-6">
              {loading ? (
                <ButtonLoading />
              ) : (
                <button
                  type="submit"
                  className={`btn font-semibold text-base text-white bg-purple-600 hover:bg-purple-700
                `}
                >
                  Send Money
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
