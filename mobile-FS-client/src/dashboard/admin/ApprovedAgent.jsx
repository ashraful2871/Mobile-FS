import React, { useState } from "react";
import { FaEdit, FaTrashRestoreAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdOutlineBlock } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const ApprovedAgent = ({ approvedAgent, refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [amount, setAmount] = useState("");
  const axiosSecure = useAxiosSecure();
  //   console.log(selectedAgent);
  const handleAddMoneyClick = (agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  const handleAddMoney = async () => {
    if (!amount || isNaN(amount)) {
      Swal.fire({
        title: "Invalid Amount",
        text: "Please enter a valid amount!",
        icon: "error",
      });
      return;
    }

    try {
      const { data } = await axiosSecure.patch(
        `/add-money/${selectedAgent._id}`,
        {
          amount: parseFloat(amount),
        }
      );
      console.log(data);
      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Success",
          text: "Money has been added successfully!",
          icon: "success",
        });
        refetch();
        setShowModal(false);
        setAmount("");
        setSelectedAgent(null);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add money. Please try again.",
        icon: "error",
      });
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setAmount("");
    setSelectedAgent(null);
  };

  const handleBlock = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to block this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, block it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(`/block-agent/${id}`);
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Blocked!",
            text: "Agent has been blocked.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-3xl font-bold">
        Authorized Agent: <span>{approvedAgent.length}</span>
      </h2>
      {approvedAgent.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table font-semibold">
            <thead className="border border-gray-300 text-center text-sm md:text-lg text-blue-600">
              <tr>
                <th className="border border-gray-300">#</th>
                <th className="border border-gray-300">Agent Name</th>
                <th className="border border-gray-300">Agent Email</th>
                <th className="border border-gray-300">Agent Number</th>
                <th className="border border-gray-300">Status</th>
                <th className="border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="border-2 w-full">
              {approvedAgent.map((agent, idx) => (
                <tr
                  key={idx}
                  className="border border-gray-300 text-xs md:text-base"
                >
                  <th className="border border-gray-300">{idx + 1}</th>
                  <td className="text-center border border-gray-300">
                    {agent.name}
                  </td>
                  <td className="border border-gray-300 text-center">
                    {agent.email}
                  </td>
                  <td className="border border-gray-300 text-center">
                    {agent.mobileNumber}
                  </td>
                  <td className="flex justify-center">
                    <div className="inline-flex items-center px-3 py-1 mt-3 rounded-full gap-x-2 text-sm font-bold shadow-md transition-colors">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-green-600">{agent.isApproved}</span>
                    </div>
                  </td>
                  <th className="border border-gray-300">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleAddMoneyClick(agent)}
                        className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 transition-all flex gap-1 items-center shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                      >
                        <IoMdAdd className="font-bold text-lg" /> Add Money
                      </button>
                      <button
                        onClick={() => handleBlock(agent._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-all flex gap-1 items-center shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                      >
                        <MdOutlineBlock className="font-bold text-lg" /> Block
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="my-7 text-center">
          <span className="text-green-500 font-bold text-2xl">
            No authorized Agent available
          </span>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <dialog
          id="add_money_modal"
          className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          open
        >
          <div className="modal-box border-2 p-6 space-y-6 bg-white rounded-lg w-full max-w-sm sm:max-w-md">
            <h3 className="text-center text-2xl font-bold text-blue-500">
              Add Money to {selectedAgent?.name}
            </h3>
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered w-full"
              required
            />
            <div className="flex justify-between">
              <button
                className="btn bg-red-500 hover:bg-red-600 text-white"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                onClick={handleAddMoney}
                className="btn bg-blue-500 hover:bg-blue-600 text-white"
              >
                Add Money
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ApprovedAgent;
