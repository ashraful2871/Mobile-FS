import React from "react";
import { NavLink } from "react-router-dom";

const AgentMenu = () => {
  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        <li>
          <NavLink to="/dashboard/agent-transaction">Transaction</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AgentMenu;
