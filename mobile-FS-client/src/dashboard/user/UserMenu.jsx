import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        {" "}
        <li>
          <NavLink to="/dashboard/user-transaction">Transaction</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/create-note">Create note</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/personal-note">Manage personal notes</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-study-materials">
            View all study materials
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
