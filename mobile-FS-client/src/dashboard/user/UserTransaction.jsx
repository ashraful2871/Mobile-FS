import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { format } from "date-fns";

const UserTransaction = () => {
  const { user } = useAuth();
  console.log(user?.userId);
  const axiosSecure = useAxiosSecure();
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["user-transaction", user?.userId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/user-transaction/${user?.userId}`
      );
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(transactions);
  return (
    <div className="space-y-10">
      <h2 className="text-center text-4xl font-bold mt-5">
        Transaction History
      </h2>
      <div>
        {transactions.map((transaction, idx) => (
          <div
            key={idx}
            className="w-full flex justify-center items-center mt-4"
          >
            <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 w-3/4 text-center relative">
              <h2 className="text-lg font-bold text-green-700 mb-2">
                {transaction.type}
              </h2>
              <p className="text-lg font-semibold text-gray-800">
                Tk {transaction.amount} BDT has been{" "}
                {transaction.type.toLowerCase()} successfully.
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Transaction Fee: {transaction.fee} BDT.
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Current Balance: 4955 BDT.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Date: {format(new Date(transaction.timestamp), "dd MMM yyyy")}{" "}
                at Time: {format(new Date(transaction.timestamp), "hh:mm:ss a")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTransaction;
