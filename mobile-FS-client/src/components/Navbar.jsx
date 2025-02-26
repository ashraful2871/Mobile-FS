import React from "react";
import useAuth from "../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import BalanceDisplay from "./BalanceDisplay ";
import useRole from "../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role] = useRole();

  const { data: balance = {}, isLoading } = useQuery({
    queryKey: ["user-balance", user?.userId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user-balance/${user?.userId}`);
      return data;
    },
  });
  // console.log(balance);
  const links = user ? (
    <>
      {role === "user" && (
        <>
          {" "}
          <li>
            <NavLink to="/send-money">Send Money</NavLink>
          </li>
          <li>
            <NavLink to="/cash-out">Cash Out</NavLink>
          </li>
        </>
      )}
      {role === "agent" && (
        <>
          <li>
            <NavLink to="/cash-in">Cash In</NavLink>
          </li>
        </>
      )}
      {role === "admin" && (
        <>
          <li>
            <NavLink to="/dashboard/all-users">Dashboard</NavLink>
          </li>
        </>
      )}
      {role === "agent" && (
        <>
          <li>
            <NavLink to="/dashboard/agent-transaction">Dashboard</NavLink>
          </li>
        </>
      )}
      {role === "user" && (
        <>
          <li>
            <NavLink to="/dashboard/user-transaction">Dashboard</NavLink>
          </li>
        </>
      )}
      <li>
        <button className="btn btn-sm" onClick={logOut}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink to="/sign-up">Sign Up</NavLink>
      </li>
      <li>
        <NavLink to="/login">login</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className=" text-3xl font-extrabold">
          Akash-MFS
        </Link>
      </div>
      <div className="flex-none gap-2">
        {/* show balance here */}
        {/* <div className="flex items-center gap-[2px] text-2xl font-semibold">
          <span>
            <TbCurrencyTaka />
          </span>
          <span>{balance.balance} BDT</span>
        </div> */}
        {user && isLoading ? (
          <button className="btn btn-square">
            <span className="loading loading-spinner"></span>
          </button>
        ) : (
          user && <BalanceDisplay balance={balance}></BalanceDisplay>
        )}

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
