import React from "react";
import { NavLink } from "react-router-dom";

const AgentMenu = () => {
  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        <li>
          <NavLink to="/dashboard/transaction">Transaction</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/create-study">Create study</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/upload-materials">Upload materials</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/view-all-materials">
            View all materials
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AgentMenu;
