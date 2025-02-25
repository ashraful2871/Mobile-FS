import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import Loading from "../../components/Loading";

const ViewAllUserTransaction = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["view-transaction", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/view-transaction/${id}`
      );
      return data;
    },
  });
  console.log(transactions);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Transaction Details
      </h2>
      {transactions.map((transaction, idx) => (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl space-y-6">
          {/* {transactions.map((transaction, idx) => (
    ))} */}
          <div className="flex flex-col items-center space-y-4">
            {/* User Details */}
            <div className="bg-blue-50 p-4 rounded-xl shadow-md w-full">
              <div className="flex items-center space-x-4">
                <FaUser className="text-4xl text-blue-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {transaction.userName}
                  </h3>
                  <p className="text-gray-600">{transaction.userPhone}</p>
                </div>
              </div>
            </div>

            {/* Agent Details */}
            <div className="bg-green-50 p-4 rounded-xl shadow-md w-full">
              <div className="flex items-center space-x-4">
                <FaUser className="text-4xl text-green-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {transaction.agentName}
                  </h3>
                  <p className="text-gray-600">{transaction.agentPhone}</p>
                </div>
              </div>
            </div>

            {/* Transaction Summary */}
            <div className="bg-yellow-50 p-4 rounded-xl shadow-md w-full">
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-800">Amount</p>
                  <p className="text-xl text-gray-600">
                    {transaction.amount} BDT
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">Fee</p>
                  <p className="text-xl text-gray-600">{transaction.fee} BDT</p>
                </div>
              </div>
            </div>

            {/* Income Details */}
            <div className="bg-indigo-50 p-4 rounded-xl shadow-md w-full">
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Agent Income
                  </p>
                  <p className="text-xl text-gray-600">
                    {transaction.agentIncome} BDT
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Admin Income
                  </p>
                  <p className="text-xl text-gray-600">
                    {transaction.adminIncome} BDT
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction Type & Timestamp */}
            <div className="bg-purple-50 p-4 rounded-xl shadow-md w-full">
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Transaction Type
                  </p>
                  <p className="text-xl text-gray-600">{transaction.type}</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Timestamp
                  </p>
                  <p className="text-xl text-gray-600">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Transaction Icon */}
          <div className="flex justify-center">
            <AiOutlineTransaction className="text-6xl text-gray-500" />
          </div>
        </div>
      ))}
    </>
  );
};

export default ViewAllUserTransaction;
