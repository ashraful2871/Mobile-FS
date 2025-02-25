import React from "react";
import { useParams } from "react-router-dom";

const ViewAllUserTransaction = () => {
  const { id } = useParams();
  console.log(id);
  return <div>{id}</div>;
};

export default ViewAllUserTransaction;
