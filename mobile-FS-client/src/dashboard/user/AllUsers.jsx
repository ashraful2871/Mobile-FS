import React, { useState } from "react";

import Loading from "../../components/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users", search],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users?search=${search}`);
      return data;
    },
  });

  return (
    <div>
      <input
        type="number"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by numbers"
        className="input input-bordered w-full max-w-xs"
      />
      <>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Current Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr className="hover text-center">
                    <th>{idx + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              referrerPolicy="no-referrer"
                              className="rounded-full"
                              //src={user.photo}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.balance} BDT</td>
                    <th>
                      <Link to={`/dashboard/view-user-transaction/${user._id}`}>
                        <button className="btn hover:bg-blue-600 bg-blue-500 text-white btn-sm">
                          View Transaction
                        </button>
                      </Link>
                      <button
                        //onClick={() => handleMakeTutor(user)}
                        className="btn btn-neutral btn-sm"
                      >
                        Make Tutor
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    </div>
  );
};

export default AllUsers;
