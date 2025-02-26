import React from "react";
import useRole from "../../hooks/useRole";
import Loading from "../../components/Loading";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) {
    return <Loading />;
  }
  if (role === "user") {
    return children;
  }
  return (
    <Navigate
      to={
        (role === "admin" && "/dashboard/all-users") ||
        (role === "agent" && "/dashboard/agent-transaction")
      }
    ></Navigate>
  );
};

export default UserRoute;
