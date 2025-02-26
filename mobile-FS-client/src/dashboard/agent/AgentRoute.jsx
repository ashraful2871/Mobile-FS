import React from "react";
import useRole from "../../hooks/useRole";
import Loading from "../../components/Loading";
import { Navigate } from "react-router-dom";

const AgentRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (role === "agent") {
    return children;
  }
  return (
    <Navigate
      to={
        (role === "admin" && "/dashboard/all-users") ||
        (role === "user" && "/dashboard/user-transaction")
      }
    ></Navigate>
  );
};

export default AgentRoute;
