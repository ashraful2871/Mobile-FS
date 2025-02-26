import React from "react";
import { FaEdit, FaTrashRestoreAlt } from "react-icons/fa";

const BlockedAgent = ({ blockAgent }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-3xl font-bold">
        Block Agent: {blockAgent.length}
      </h2>
      {blockAgent.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table font-semibold">
            {/* head */}
            <thead className="text-center text-sm md:text-lg text-blue-600 ">
              <tr>
                <th className="border border-gray-300">#</th>
                <th className="border border-gray-300">Agent NAme</th>
                <th className="border border-gray-300">Agent Email</th>
                <th className="border border-gray-300">Agent Number</th>
                <th className="border border-gray-300">Status</th>
                <th className="border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="border-2 w-full ">
              {blockAgent.map((agent, idx) => (
                <tr className="border border-gray-300 text-xs md:text-base">
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
                        //onClick={() => handleDelete(session._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-all flex gap-1 items-center shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                      >
                        <FaTrashRestoreAlt /> Unblock
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
          <span className="text-red-500 font-bold text-2xl">
            no Blocked Agent available
          </span>
        </div>
      )}
    </div>
  );
};

export default BlockedAgent;
