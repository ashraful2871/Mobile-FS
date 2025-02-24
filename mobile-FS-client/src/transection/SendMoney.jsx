import { useState } from "react";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const SendMoney = () => {
  const [recipientPhone, setRecipientPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const axiosSecure = useAxiosSecure();

  const handleSendMoney = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post(`${import.meta.env.VITE_API_URL}/send-money`, {
        recipientPhone,
        amount,
      });
      alert("Money sent successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Transaction failed");
    }
  };

  return (
    <div>
      <h2 className="text-4xl mb-5">Send Money</h2>{" "}
      <form onSubmit={handleSendMoney}>
        <input
          type="text"
          placeholder="Recipient Phone"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          value={recipientPhone}
          onChange={(e) => setRecipientPhone(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          required
        />
        <button type="submit" className="btn btn-primary">
          Send Money
        </button>
      </form>
    </div>
  );
};

export default SendMoney;
