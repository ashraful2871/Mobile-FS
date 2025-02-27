import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        {" "}
        <li>
          <NavLink to="/dashboard/all-users">View all users</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/request-approval">Approval Request</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
