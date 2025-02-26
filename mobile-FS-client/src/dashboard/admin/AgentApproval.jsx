import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import NotApprovedAgent from "./NotApprovedAgent";
import ApprovedAgent from "./ApprovedAgent";
import BlockedAgent from "./BlockedAgent";
import Loading from "../../components/Loading";

const AgentApproval = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allAgent = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agent-approved"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/agent-approved");
      return data;
    },
  });
  //   console.log(data);
  const notApprovedAgent = allAgent.filter(
    (agent) => agent.isApproved === "not-approved"
  );
  console.log(notApprovedAgent);
  const approvedAgent = allAgent.filter(
    (agent) => agent.isApproved === "approved"
  );
  console.log(approvedAgent);
  const blockAgent = allAgent.filter((agent) => agent.isApproved === "blocked");
  console.log(blockAgent);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2>Agent Approval</h2>

      {/* not approved agent */}
      <NotApprovedAgent
        notApprovedAgent={notApprovedAgent}
        refetch={refetch}
      ></NotApprovedAgent>
      {/* approved agent */}
      <ApprovedAgent
        approvedAgent={approvedAgent}
        refetch={refetch}
      ></ApprovedAgent>
      {/* blocked agent */}
      <BlockedAgent blockAgent={blockAgent} refetch={refetch}></BlockedAgent>
    </div>
  );
};

export default AgentApproval;
