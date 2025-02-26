import React from "react";
import useAuth from "../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import { TbCurrencyTaka } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./Loading";
import axios from "axios";
import BalanceDisplay from "./BalanceDisplay ";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user?.userId);

  const { data: balance = {}, isLoading } = useQuery({
    queryKey: ["user-balance", user?.userId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-balance/${user?.userId}`
      );
      return data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  console.log(balance);
  // axios
  //   .get(`${import.meta.env.VITE_API_URL}/user-balance/${user?.userId}`)
  //   .then((res) => {
  //     console.log(res.data);
  //   });
  const links = (
    <>
      <li>
        <a className="justify-between">
          Profile
          <span className="badge">New</span>
        </a>
      </li>
      <li>
        <NavLink to="/sign-up">Sign Up</NavLink>
      </li>
      <li>
        <NavLink to="/login">login</NavLink>
      </li>
      <li>
        <NavLink to="/send-money">Send Money</NavLink>
      </li>
      <li>
        <NavLink to="/cash-out">Cash Out</NavLink>
      </li>
      <li>
        <NavLink to="/cash-in">Cash In</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <button className="btn btn-sm" onClick={logOut}>
          Logout
        </button>
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
        <BalanceDisplay balance={balance}></BalanceDisplay>
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
